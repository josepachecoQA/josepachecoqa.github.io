const fs = require('fs');
const path = require('path');

const METRICS_PATH = process.env.METRICS_PATH || path.join('metrics', 'quality-metrics.json');
const INPUT_PATH = process.env.METRICS_INPUT_PATH || '';
const RESULTS_PATH = process.env.METRICS_RESULTS_PATH || '';
const COVERAGE_PATH = process.env.METRICS_COVERAGE_PATH || '';

function readJson(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
}

function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}

// O reporter JSON do Cypress grava um objeto por spec no mesmo stdout,
// intercalado com logs de outras ferramentas.
function extractJsonObjects(text) {
    const objects = [];
    let depth = 0;
    let start = -1;
    let inString = false;
    let escaped = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (inString) {
            if (escaped) escaped = false;
            else if (char === '\\') escaped = true;
            else if (char === '"') inString = false;
            continue;
        }

        if (char === '"' && depth > 0) {
            inString = true;
        } else if (char === '{') {
            if (depth === 0) start = i;
            depth++;
        } else if (char === '}' && depth > 0) {
            depth--;
            if (depth === 0) {
                try {
                    objects.push(JSON.parse(text.slice(start, i + 1)));
                } catch (error) {
                    // trecho entre chaves que não é JSON (ex.: log); ignorar
                }
            }
        }
    }

    return objects;
}

function mergeCypressReports(reports) {
    const withStats = reports.filter(report => report && report.stats);
    if (withStats.length === 0) return null;

    return withStats.reduce((acc, report) => ({
        stats: {
            tests: acc.stats.tests + toNumber(report.stats.tests, 0),
            failures: acc.stats.failures + toNumber(report.stats.failures, 0),
            duration: acc.stats.duration + toNumber(report.stats.duration, 0)
        },
        tests: acc.tests.concat(Array.isArray(report.tests) ? report.tests : [])
    }), { stats: { tests: 0, failures: 0, duration: 0 }, tests: [] });
}

function toNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function getOverrides(existingTotals) {
    return {
        executedTests: toNumber(process.env.METRICS_EXECUTED, existingTotals.executedTests),
        failedTests: toNumber(process.env.METRICS_FAILED, existingTotals.failedTests),
        durationSeconds: toNumber(process.env.METRICS_DURATION, existingTotals.durationSeconds),
        flakinessPercent: toNumber(process.env.METRICS_FLAKINESS, existingTotals.flakinessPercent),
        coveragePercent: toNumber(process.env.METRICS_COVERAGE, existingTotals.coveragePercent),
        bugsPrevented: toNumber(process.env.METRICS_BUGS, existingTotals.bugsPrevented)
    };
}

function mergeTotals(existingTotals, inputTotals) {
    return {
        executedTests: inputTotals.executedTests ?? existingTotals.executedTests ?? 0,
        failedTests: inputTotals.failedTests ?? existingTotals.failedTests ?? 0,
        durationSeconds: inputTotals.durationSeconds ?? existingTotals.durationSeconds ?? 0,
        flakinessPercent: inputTotals.flakinessPercent ?? existingTotals.flakinessPercent ?? 0,
        coveragePercent: inputTotals.coveragePercent ?? existingTotals.coveragePercent ?? 0,
        bugsPrevented: inputTotals.bugsPrevented ?? existingTotals.bugsPrevented ?? 0
    };
}

function parseCypressResults(resultsPath) {
    if (!resultsPath || !fileExists(resultsPath)) return null;
    const raw = fs.readFileSync(resultsPath, 'utf8').trim();
    if (!raw) return null;

    let data;
    try {
        data = JSON.parse(raw);
    } catch (error) {
        data = mergeCypressReports(extractJsonObjects(raw));
    }

    if (!data || !data.stats) return null;

    const durationMs = toNumber(data.stats.duration, 0);
    const tests = Array.isArray(data.tests) ? data.tests : [];
    const retryTests = tests.filter(test => toNumber(test.currentRetry, 0) > 0).length;
    const flakinessPercent = tests.length ? (retryTests / tests.length) * 100 : 0;
    return {
        executedTests: toNumber(data.stats.tests, 0),
        failedTests: toNumber(data.stats.failures, 0),
        durationSeconds: Math.round(durationMs / 1000),
        flakinessPercent
    };
}

function parseCoverageSummary(coveragePath) {
    if (!coveragePath || !fileExists(coveragePath)) return null;
    const data = readJson(coveragePath);
    const lines = data?.total?.lines?.pct;
    if (!Number.isFinite(lines)) return null;
    return {
        coveragePercent: lines
    };
}

function buildSource(existingSource) {
    const serverUrl = process.env.GITHUB_SERVER_URL || 'https://github.com';
    const repo = process.env.GITHUB_REPOSITORY;
    const runId = process.env.GITHUB_RUN_ID;

    if (repo && runId) {
        return {
            label: 'GitHub Actions',
            url: `${serverUrl}/${repo}/actions/runs/${runId}`
        };
    }

    return existingSource || { label: 'GitHub Actions', url: '' };
}

function upsertHistory(history, entry) {
    const nextHistory = Array.isArray(history) ? [...history] : [];
    if (nextHistory.length === 0) {
        nextHistory.push(entry);
        return nextHistory;
    }

    const lastIndex = nextHistory.length - 1;
    if (nextHistory[lastIndex].date === entry.date) {
        nextHistory[lastIndex] = entry;
        return nextHistory;
    }

    nextHistory.push(entry);
    return nextHistory;
}

function run() {
    if (!fileExists(METRICS_PATH)) {
        throw new Error(`Metrics file not found at ${METRICS_PATH}`);
    }

    const data = readJson(METRICS_PATH);
    const inputData = INPUT_PATH && fileExists(INPUT_PATH) ? readJson(INPUT_PATH) : {};
    const resultsTotals = parseCypressResults(RESULTS_PATH);
    const coverageTotals = parseCoverageSummary(COVERAGE_PATH);

    const existingTotals = data.totals || {};
    const inputTotals = inputData.totals || {};
    const baseTotals = mergeTotals(existingTotals, inputTotals);
    const withResults = resultsTotals ? mergeTotals(baseTotals, resultsTotals) : baseTotals;
    const withCoverage = coverageTotals ? mergeTotals(withResults, coverageTotals) : withResults;
    const overrides = getOverrides(withCoverage);
    const totals = mergeTotals(withCoverage, overrides);

    const now = new Date();
    const today = now.toISOString().slice(0, 10);

    const historyEntry = {
        date: today,
        executedTests: totals.executedTests || 0,
        failedTests: totals.failedTests || 0,
        durationSeconds: totals.durationSeconds || 0,
        flakinessPercent: totals.flakinessPercent || 0,
        coveragePercent: totals.coveragePercent || 0
    };

    const updated = {
        ...data,
        source: buildSource(data.source),
        lastUpdated: now.toISOString(),
        totals,
        history: upsertHistory(data.history, historyEntry)
    };

    fs.writeFileSync(METRICS_PATH, JSON.stringify(updated, null, 2) + '\n', 'utf8');
}

run();
