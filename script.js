/* ========================================
   SMOOTH SCROLLING E NAVEGAÇÃO
   ======================================== */

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ========================================
   ANIMAÇÃO DE ENTRADA PARA ELEMENTOS
   ======================================== */

function onDomReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
        return;
    }
    callback();
}

// Observador para animar elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observador a cards e elementos
onDomReady(() => {
    const elementsToObserve = document.querySelectorAll(
        '.servico-card, .diferencial-item, .portfolio-card, .stat, .kpi-card, .dashboard-card, .quality-row'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

/* ========================================
   EFEITO DE SCROLL NA NAVEGAÇÃO
   ======================================== */

// Adicionar classe quando scroll ultrapassa hero
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('#hero');

window.addEventListener('scroll', () => {
    if (heroSection && window.scrollY > heroSection.offsetHeight - 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

/* ========================================
   ANIMAÇÃO DO NÚMERO DE ESTATÍSTICAS
   ======================================== */

function animateCounter(element, target, duration = 2000) {
    const isVisible = isElementInViewport(element);
    if (!isVisible) return;
    
    if (element.getAttribute('data-animated') === 'true') return;
    
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(interval);
            element.setAttribute('data-animated', 'true');
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Iniciar animação dos números quando a seção de sobre fica visível
const statNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(number => {
    statsObserver.observe(number);
});

/* ========================================
   EFEITO HOVER EM LINKS
   ======================================== */

document.querySelectorAll('.portfolio-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

/* ========================================
   VALIDAÇÃO E SUBMISSÃO DE FORMULÁRIO (futuro)
   ======================================== */

// Placeholder para integração de formulário de contato
// Quando adicionar um formulário, este código pode ser expandido

const contactForm = document.querySelector('form[name="contact"]');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('[name="name"]').value,
            email: this.querySelector('[name="email"]').value,
            message: this.querySelector('[name="message"]').value
        };
        
        // Validar campos
        if (!formData.name || !formData.email || !formData.message) {
            console.warn('Por favor, preencha todos os campos');
            return;
        }
        
        // Aqui seria integrado com serviço de backend ou EmailJS
        console.log('Formulário pronto para envio:', formData);
    });
}

/* ========================================
   COPY EMAIL PARA CLIPBOARD
   ======================================== */

// Permitir cópia do email ao clicar
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const email = this.getAttribute('href').replace('mailto:', '');
        // Navegador vai abrir cliente de email padrão
        // Se quiser copiar em vez disso, descomente:
        /*
        e.preventDefault();
        navigator.clipboard.writeText(email);
        console.log('Email copiado: ' + email);
        alert('Email copiado para clipboard!');
        */
    });
});

/* ========================================
   PERFORMANCE: LAZY LOADING DE IMAGENS
   ======================================== */

// Se adicionar imagens no futuro, usar observador para lazy loading
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

/* ========================================
   DARK MODE TOGGLE (Futuro)
   ======================================== */

// Verificar se usuário prefere dark/light mode do sistema
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
}

/* ========================================
   MONITORAR ATIVIDADE DO USUÁRIO
   ======================================== */

// Rastrear qual seção está sendo visualizada para analytics
const sections = document.querySelectorAll('section');
const currentSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Aqui poderia enviar dados de analytics
            console.log('Seção visualizada:', sectionId);
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    currentSectionObserver.observe(section);
});

/* ========================================
   INICIALIZAÇÃO
   ======================================== */

onDomReady(() => {
    console.log('Landing page carregada com sucesso');
    loadQualityMetrics();
});

/* ========================================
   TRATAMENTO DE RESIZE
   ======================================== */

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('Página redimensionada');
        // Recalcular posições se necessário
    }, 250);
});

/* ========================================
   DASHBOARD DE QUALIDADE
   ======================================== */

async function loadQualityMetrics() {
    const statusEl = document.getElementById('dashboardStatus');
    const updatedEl = document.getElementById('dashboardUpdated');
    const sourceEl = document.getElementById('metricsSource');

    if (!statusEl || !updatedEl || !sourceEl) return;

    try {
        statusEl.textContent = 'Carregando dados...';

        const requests = getMetricsRequests();
        const results = await Promise.all(requests.map(request => fetchMetrics(request)));
        const successes = results.filter(result => result.data);

        if (successes.length === 0) {
            throw new Error('Falha ao carregar metricas');
        }

        const aggregated = aggregateMetrics(successes);
        renderQualityDashboard(aggregated.data, { isMulti: aggregated.isMulti });
        renderProjectList(aggregated.projects);

        const updated = aggregated.updatedAt ? formatDateTime(aggregated.updatedAt) : 'Nao informado';
        updatedEl.textContent = updated;

        if (aggregated.isMulti) {
            sourceEl.href = '#';
            sourceEl.textContent = 'Multiplas fontes';
        } else {
            const project = aggregated.projects[0];
            sourceEl.href = project.sourceUrl || project.request.url || '#';
            sourceEl.textContent = project.sourceLabel || 'Fonte do CI';
        }
        statusEl.textContent = 'Dados atualizados';
    } catch (error) {
        console.warn('Erro ao carregar metricas:', error);
        statusEl.textContent = 'Erro ao carregar dados';
        updatedEl.textContent = 'Nao disponivel';
    }
}

function renderQualityDashboard(data, options) {
    const isMulti = Boolean(options && options.isMulti);
    const history = Array.isArray(data.history) ? data.history : [];
    const totals = data.totals || {};
    const latest = history[history.length - 1] || {};
    const previous = history[history.length - 2] || {};
    const targets = normalizeTargets(data.targets);

    const executed = totals.executedTests ?? latest.executedTests ?? 0;
    const failed = totals.failedTests ?? latest.failedTests ?? 0;
    const durationSeconds = totals.durationSeconds ?? latest.durationSeconds ?? 0;
    const flakiness = totals.flakinessPercent ?? latest.flakinessPercent ?? 0;
    const coverage = totals.coveragePercent ?? latest.coveragePercent ?? 0;
    const bugs = totals.bugsPrevented ?? 0;

    const failureRate = executed ? (failed / executed) * 100 : 0;

    setText('kpiFailureRate', `${failureRate.toFixed(1)}%`);
    setText('kpiExecuted', executed.toLocaleString('pt-BR'));
    setText('kpiDuration', formatDuration(durationSeconds));
    setText('kpiFlakiness', `${flakiness.toFixed(1)}%`);
    setText('kpiCoverage', `${coverage.toFixed(0)}%`);
    setText('kpiBugs', bugs.toString());

    setText('kpiFailureDelta', buildDeltaText(previous, latest, 'failedTests', 'falhas'));
    setText('kpiExecutedDelta', buildDeltaText(previous, latest, 'executedTests', 'testes'));
    setText('kpiDurationDelta', buildDeltaText(previous, latest, 'durationSeconds', 'segundos', true));
    setText('kpiFlakinessDelta', buildDeltaText(previous, latest, 'flakinessPercent', '%'));
    setText('kpiCoverageDelta', buildDeltaText(previous, latest, 'coveragePercent', '%'));

    setBar('barCoverage', coverage, 'barCoverageValue');
    setBar('barFailure', Math.min(failureRate, 100), 'barFailureValue');
    setBar('barFlaky', Math.min(flakiness, 100), 'barFlakyValue');
    setBar('barDuration', normalizeDuration(durationSeconds, history), 'barDurationValue', formatDuration(durationSeconds));

    updateQualityStatus(failureRate, flakiness, coverage, executed, targets);
    updateSummary(failureRate, flakiness, coverage, executed, bugs, targets, isMulti);
    updateTargetsText(targets, isMulti);
    drawTrendChart(history);
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function buildDeltaText(previous, latest, field, label, isDuration) {
    if (!previous || !latest || previous[field] == null || latest[field] == null) {
        return 'Sem comparacao recente';
    }

    const delta = latest[field] - previous[field];
    const signal = delta > 0 ? '+' : '';
    const value = isDuration ? formatDuration(Math.abs(delta)) : Math.abs(delta).toFixed(1).replace('.0', '');

    if (delta === 0) {
        return `Estavel em ${formatDeltaValue(latest[field], label, isDuration)}`;
    }

    return `${signal}${value} ${label} vs ultima execucao`;
}

function formatDeltaValue(value, label, isDuration) {
    if (isDuration) return formatDuration(value);
    if (label === '%') return `${value.toFixed(1)}%`;
    return `${value} ${label}`;
}

function setBar(barId, value, valueId, overrideLabel) {
    const bar = document.getElementById(barId);
    const label = document.getElementById(valueId);
    if (!bar || !label) return;

    const safeValue = Math.max(0, Math.min(value, 100));
    bar.style.width = `${safeValue}%`;
    label.textContent = overrideLabel || `${safeValue.toFixed(0)}%`;
}

function updateQualityStatus(failureRate, flakiness, coverage, executed, targets) {
    const status = document.getElementById('qualityStatus');
    if (!status) return;

    const result = buildQualityStatus(failureRate, flakiness, coverage, executed, targets);
    status.textContent = result.label;
    status.className = `status-pill ${result.className}`;
}

function buildQualityStatus(failureRate, flakiness, coverage, executed, targets) {
    if (executed === 0) {
        return { label: 'Sem dados', className: 'is-neutral' };
    }

    if (failureRate <= targets.failureRateMax && flakiness <= targets.flakinessMax && coverage >= targets.coverageMin) {
        return { label: 'Estavel', className: 'is-good' };
    }

    if (failureRate <= targets.failureRateWarn && flakiness <= targets.flakinessWarn && coverage >= targets.coverageWarn) {
        return { label: 'Atencao', className: 'is-warning' };
    }

    return { label: 'Risco alto', className: 'is-danger' };
}

function updateSummary(failureRate, flakiness, coverage, executed, bugs, targets, isMulti) {
    const summary = document.getElementById('qualitySummary');
    if (!summary) return;

    if (executed === 0) {
        summary.textContent = 'Nenhum teste executado no periodo mais recente.';
        return;
    }

    const parts = [
        `Taxa de falhas em ${failureRate.toFixed(1)}%`,
        `flakiness em ${flakiness.toFixed(1)}%`,
        `cobertura de cenarios em ${coverage.toFixed(0)}%`,
        `bugs evitados registrados: ${bugs}`,
        isMulti
            ? 'metas por projeto (consulte a lista abaixo)'
            : `metas: falhas <= ${targets.failureRateMax.toFixed(1)}%, flakiness <= ${targets.flakinessMax.toFixed(1)}%, cobertura >= ${targets.coverageMin.toFixed(0)}%`
    ];

    summary.textContent = parts.join('. ') + '.';
}

function updateTargetsText(targets, isMulti) {
    const targetsEl = document.getElementById('metricsTargets');
    if (!targetsEl) return;
    if (isMulti) {
        targetsEl.textContent = 'Metas por projeto (status agregado usa valores padrao).';
        return;
    }
    targetsEl.textContent = `Metas: falhas <= ${targets.failureRateMax.toFixed(1)}%, flakiness <= ${targets.flakinessMax.toFixed(1)}%, cobertura >= ${targets.coverageMin.toFixed(0)}%`;
}

function normalizeTargets(targets) {
    const defaults = {
        failureRateMax: 1.0,
        failureRateWarn: 3.0,
        flakinessMax: 2.5,
        flakinessWarn: 5.0,
        coverageMin: 80,
        coverageWarn: 75
    };

    if (!targets) return defaults;

    return {
        failureRateMax: toNumber(targets.failureRateMax, defaults.failureRateMax),
        failureRateWarn: toNumber(targets.failureRateWarn, defaults.failureRateWarn),
        flakinessMax: toNumber(targets.flakinessMax, defaults.flakinessMax),
        flakinessWarn: toNumber(targets.flakinessWarn, defaults.flakinessWarn),
        coverageMin: toNumber(targets.coverageMin, defaults.coverageMin),
        coverageWarn: toNumber(targets.coverageWarn, defaults.coverageWarn)
    };
}

function toNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function getMetricsRequests() {
    const params = new URLSearchParams(window.location.search);
    const urlParams = [
        ...params.getAll('metricsUrl'),
        ...params.getAll('metrics'),
        ...params.getAll('artifactUrl')
    ].filter(Boolean);

    const repoParams = params.getAll('repo').filter(Boolean);

    const requests = [];

    urlParams.forEach((url, index) => {
        requests.push({
            id: `url-${index}`,
            url,
            sourceLabel: 'Fonte externa',
            sourceUrl: url
        });
    });

    repoParams.forEach((repoSpec, index) => {
        const parsed = parseRepoSpec(repoSpec, params);
        const rawUrl = `https://raw.githubusercontent.com/${parsed.repo}/${parsed.branch}/${parsed.path}`;
        const repoUrl = `https://github.com/${parsed.repo}/tree/${parsed.branch}/${parsed.path}`;
        requests.push({
            id: `repo-${index}`,
            url: rawUrl,
            sourceLabel: `${parsed.repo}@${parsed.branch}`,
            sourceUrl: repoUrl,
            repo: parsed.repo
        });
    });

    if (requests.length) return requests;

    return [{
        id: 'local',
        url: 'metrics/quality-metrics.json',
        sourceLabel: 'Repositorio local'
    }];
}

function parseRepoSpec(repoSpec, params) {
    const defaults = {
        branch: params.get('branch') || 'main',
        path: params.get('path') || 'metrics/quality-metrics.json'
    };

    let repo = repoSpec;
    let branch = defaults.branch;
    let path = defaults.path;

    if (repoSpec.includes('@')) {
        const parts = repoSpec.split('@');
        repo = parts[0];
        if (parts[1]) {
            if (parts[1].includes(':')) {
                const [branchPart, pathPart] = parts[1].split(':');
                branch = branchPart || branch;
                path = pathPart || path;
            } else {
                branch = parts[1];
            }
        }
    } else if (repoSpec.includes(':')) {
        const parts = repoSpec.split(':');
        repo = parts[0];
        path = parts[1] || path;
    }

    return { repo, branch, path };
}

async function fetchMetrics(request) {
    try {
        const response = await fetch(request.url, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Falha ao carregar ${request.url}`);
        }
        const data = await response.json();
        return { request, data };
    } catch (error) {
        console.warn('Erro ao carregar metricas:', request.url, error);
        return { request, error };
    }
}

function aggregateMetrics(items) {
    const projects = items.map(item => buildProjectSummary(item));
    const isMulti = projects.length > 1;

    if (!isMulti) {
        return {
            isMulti: false,
            data: items[0].data,
            updatedAt: items[0].data.lastUpdated,
            projects
        };
    }

    const aggregateTotals = buildAggregatedTotals(items);
    const aggregateHistory = buildAggregatedHistory(items);
    const latestUpdated = projects.reduce((latest, project) => {
        if (!project.lastUpdated) return latest;
        if (!latest) return project.lastUpdated;
        return new Date(project.lastUpdated) > new Date(latest) ? project.lastUpdated : latest;
    }, null);

    return {
        isMulti: true,
        updatedAt: latestUpdated,
        projects,
        data: {
            totals: aggregateTotals,
            history: aggregateHistory,
            targets: null
        }
    };
}

function buildProjectSummary(item) {
    const data = item.data || {};
    const projectName = getProjectName(data, item.request);
    const totals = data.totals || {};
    const history = Array.isArray(data.history) ? data.history : [];
    const latest = history[history.length - 1] || {};
    const executed = totals.executedTests ?? latest.executedTests ?? 0;
    const failed = totals.failedTests ?? latest.failedTests ?? 0;
    const durationSeconds = totals.durationSeconds ?? latest.durationSeconds ?? 0;
    const flakiness = totals.flakinessPercent ?? latest.flakinessPercent ?? 0;
    const coverage = totals.coveragePercent ?? latest.coveragePercent ?? 0;
    const bugs = totals.bugsPrevented ?? 0;
    const failureRate = executed ? (failed / executed) * 100 : 0;
    const targets = normalizeTargets(data.targets);
    const status = buildQualityStatus(failureRate, flakiness, coverage, executed, targets);

    return {
        request: item.request,
        projectName,
        sourceLabel: data.source?.label || item.request.sourceLabel,
        sourceUrl: data.source?.url || item.request.sourceUrl,
        lastUpdated: data.lastUpdated,
        totals: {
            executedTests: executed,
            failedTests: failed,
            durationSeconds,
            flakinessPercent: flakiness,
            coveragePercent: coverage,
            bugsPrevented: bugs,
            failureRate
        },
        status
    };
}

function buildAggregatedTotals(items) {
    let executed = 0;
    let failed = 0;
    let durationSeconds = 0;
    let bugsPrevented = 0;
    let flakinessWeight = 0;
    let coverageWeight = 0;
    let flakinessSum = 0;
    let coverageSum = 0;

    items.forEach(item => {
        const totals = item.data.totals || {};
        const history = Array.isArray(item.data.history) ? item.data.history : [];
        const latest = history[history.length - 1] || {};
        const exec = totals.executedTests ?? latest.executedTests ?? 0;
        const fail = totals.failedTests ?? latest.failedTests ?? 0;
        const dur = totals.durationSeconds ?? latest.durationSeconds ?? 0;
        const flake = totals.flakinessPercent ?? latest.flakinessPercent ?? 0;
        const cover = totals.coveragePercent ?? latest.coveragePercent ?? 0;
        const bugs = totals.bugsPrevented ?? 0;

        executed += exec;
        failed += fail;
        durationSeconds += dur;
        bugsPrevented += bugs;

        flakinessSum += flake * exec;
        coverageSum += cover * exec;
        flakinessWeight += exec;
        coverageWeight += exec;
    });

    const flakinessPercent = flakinessWeight ? flakinessSum / flakinessWeight : 0;
    const coveragePercent = coverageWeight ? coverageSum / coverageWeight : 0;

    return {
        executedTests: executed,
        failedTests: failed,
        durationSeconds,
        flakinessPercent,
        coveragePercent,
        bugsPrevented
    };
}

function buildAggregatedHistory(items) {
    const bucket = new Map();

    items.forEach(item => {
        const history = Array.isArray(item.data.history) ? item.data.history : [];
        history.forEach(entry => {
            if (!entry || !entry.date) return;
            if (!bucket.has(entry.date)) {
                bucket.set(entry.date, {
                    date: entry.date,
                    executedTests: 0,
                    failedTests: 0,
                    durationSeconds: 0,
                    flakinessSum: 0,
                    coverageSum: 0,
                    weight: 0
                });
            }

            const target = bucket.get(entry.date);
            const exec = entry.executedTests || 0;
            target.executedTests += exec;
            target.failedTests += entry.failedTests || 0;
            target.durationSeconds += entry.durationSeconds || 0;
            target.flakinessSum += (entry.flakinessPercent || 0) * exec;
            target.coverageSum += (entry.coveragePercent || 0) * exec;
            target.weight += exec;
        });
    });

    return Array.from(bucket.values())
        .sort((a, b) => a.date.localeCompare(b.date))
        .map(entry => ({
            date: entry.date,
            executedTests: entry.executedTests,
            failedTests: entry.failedTests,
            durationSeconds: entry.durationSeconds,
            flakinessPercent: entry.weight ? entry.flakinessSum / entry.weight : 0,
            coveragePercent: entry.weight ? entry.coverageSum / entry.weight : 0
        }));
}

function renderProjectList(projects) {
    const list = document.getElementById('projectList');
    const empty = document.getElementById('projectEmpty');
    if (!list || !empty) return;

    if (!projects || projects.length === 0) {
        list.innerHTML = '';
        empty.textContent = 'Nenhum projeto carregado.';
        return;
    }

    empty.textContent = '';
    list.innerHTML = projects.map(project => {
        const statusClass = project.status.className || '';
        const statusLabel = project.status.label || 'Aguardando';
        const failureRate = project.totals.failureRate || 0;
        const coverage = project.totals.coveragePercent || 0;
        const flakiness = project.totals.flakinessPercent || 0;
        const executed = project.totals.executedTests || 0;
        const sourceLink = project.sourceUrl || '#';
        const sourceLabel = project.sourceLabel || 'Fonte do CI';
        const projectName = project.projectName || 'Projeto';

        return `
            <div class="project-item">
                <div class="project-meta">
                    <span class="project-name">${projectName}</span>
                    <div class="project-subtitle">
                        <span>${sourceLabel}</span>
                        <a class="project-link" href="${sourceLink}" target="_blank" rel="noopener noreferrer">Fonte</a>
                    </div>
                </div>
                <div class="project-kpis">
                    <span>Falhas: ${failureRate.toFixed(1)}%</span>
                    <span>Cobertura: ${coverage.toFixed(0)}%</span>
                    <span>Flakiness: ${flakiness.toFixed(1)}%</span>
                    <span>Testes: ${executed.toLocaleString('pt-BR')}</span>
                </div>
                <div class="project-status">
                    <span class="status-pill ${statusClass}">${statusLabel}</span>
                </div>
            </div>
        `;
    }).join('');
}

function getProjectName(data, request) {
    if (data.project && data.project.name) return data.project.name;
    if (data.projectName) return data.projectName;
    if (request && request.repo) {
        const parts = request.repo.split('/');
        return parts[parts.length - 1] || request.repo;
    }
    return 'Projeto principal';
}

function drawTrendChart(history) {
    const canvas = document.getElementById('qualityTrendChart');
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (!history.length) {
        ctx.fillStyle = '#8b949e';
        ctx.font = '14px sans-serif';
        ctx.fillText('Sem dados de tendencia.', 16, 28);
        return;
    }

    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxFailures = Math.max(...history.map(item => calcFailureRate(item)), 5);
    const maxFlaky = Math.max(...history.map(item => item.flakinessPercent || 0), 5);
    const maxDuration = Math.max(...history.map(item => item.durationSeconds || 0), 1);

    const maxValue = Math.max(maxFailures, maxFlaky, 5);

    drawGrid(ctx, padding, chartWidth, chartHeight);

    drawLine(ctx, history, item => calcFailureRate(item), maxValue, padding, chartWidth, chartHeight, '#5ad5ff');
    drawLine(ctx, history, item => item.flakinessPercent || 0, maxValue, padding, chartWidth, chartHeight, '#ffb86b');
    drawLine(ctx, history, item => normalizeDuration(item.durationSeconds || 0, history), 100, padding, chartWidth, chartHeight, '#6ee7b7');

    drawXAxisLabels(ctx, history, padding, chartWidth, height);
}

function drawGrid(ctx, padding, chartWidth, chartHeight) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i += 1) {
        const y = padding.top + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();
    }
}

function drawLine(ctx, history, selector, maxValue, padding, chartWidth, chartHeight, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    history.forEach((item, index) => {
        const value = selector(item);
        const x = padding.left + (chartWidth / Math.max(history.length - 1, 1)) * index;
        const y = padding.top + chartHeight - (value / maxValue) * chartHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
}

function drawXAxisLabels(ctx, history, padding, chartWidth, canvasHeight) {
    ctx.fillStyle = '#8b949e';
    ctx.font = '12px sans-serif';

    const step = Math.max(1, Math.floor(history.length / 4));

    history.forEach((item, index) => {
        if (index % step !== 0 && index !== history.length - 1) return;

        const label = item.date ? item.date.slice(5) : '';
        const x = padding.left + (chartWidth / Math.max(history.length - 1, 1)) * index;
        ctx.fillText(label, x - 12, canvasHeight - 10);
    });
}

function calcFailureRate(item) {
    const executed = item.executedTests || 0;
    const failed = item.failedTests || 0;
    if (!executed) return 0;
    return (failed / executed) * 100;
}

function normalizeDuration(durationSeconds, history) {
    if (!history || history.length === 0) return 0;
    const maxDuration = Math.max(...history.map(item => item.durationSeconds || 0), 1);
    return (durationSeconds / maxDuration) * 100;
}

function formatDuration(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes === 0) return `${seconds}s`;
    return `${minutes}m ${seconds}s`;
}

function formatDateTime(isoString) {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return 'Nao informado';
    return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}
