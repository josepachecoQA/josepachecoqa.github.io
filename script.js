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

        const metricsRequest = getMetricsRequest();
        const response = await fetch(metricsRequest.url, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Falha ao carregar metricas');
        }

        const data = await response.json();

        renderQualityDashboard(data);

        const updated = data.lastUpdated ? formatDateTime(data.lastUpdated) : 'Nao informado';
        updatedEl.textContent = updated;
        const sourceLabel = data.source?.label || metricsRequest.sourceLabel || 'Fonte do CI';
        const sourceUrl = data.source?.url || metricsRequest.sourceUrl || metricsRequest.url || '#';
        sourceEl.href = sourceUrl;
        sourceEl.textContent = sourceLabel;
        statusEl.textContent = 'Dados atualizados';
    } catch (error) {
        console.warn('Erro ao carregar metricas:', error);
        statusEl.textContent = 'Erro ao carregar dados';
        updatedEl.textContent = 'Nao disponivel';
    }
}

function renderQualityDashboard(data) {
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
    updateSummary(failureRate, flakiness, coverage, executed, bugs, targets);
    updateTargetsText(targets);
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

    if (executed === 0) {
        status.textContent = 'Sem dados';
        status.className = 'status-pill is-neutral';
        return;
    }

    if (failureRate <= targets.failureRateMax && flakiness <= targets.flakinessMax && coverage >= targets.coverageMin) {
        status.textContent = 'Estavel';
        status.className = 'status-pill is-good';
        return;
    }

    if (failureRate <= targets.failureRateWarn && flakiness <= targets.flakinessWarn && coverage >= targets.coverageWarn) {
        status.textContent = 'Atenção';
        status.className = 'status-pill is-warning';
        return;
    }

    status.textContent = 'Risco alto';
    status.className = 'status-pill is-danger';
}

function updateSummary(failureRate, flakiness, coverage, executed, bugs, targets) {
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
        `metas: falhas <= ${targets.failureRateMax.toFixed(1)}%, flakiness <= ${targets.flakinessMax.toFixed(1)}%, cobertura >= ${targets.coverageMin.toFixed(0)}%`
    ];

    summary.textContent = parts.join('. ') + '.';
}

function updateTargetsText(targets) {
    const targetsEl = document.getElementById('metricsTargets');
    if (!targetsEl) return;
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

function getMetricsRequest() {
    const params = new URLSearchParams(window.location.search);
    const metricsUrl = params.get('metricsUrl') || params.get('metrics') || params.get('artifactUrl');
    if (metricsUrl) {
        return {
            url: metricsUrl,
            sourceLabel: 'Fonte externa',
            sourceUrl: metricsUrl
        };
    }

    const repo = params.get('repo');
    if (repo) {
        const branch = params.get('branch') || 'main';
        const path = params.get('path') || 'metrics/quality-metrics.json';
        const rawUrl = `https://raw.githubusercontent.com/${repo}/${branch}/${path}`;
        const repoUrl = `https://github.com/${repo}/tree/${branch}/${path}`;
        return {
            url: rawUrl,
            sourceLabel: `${repo}@${branch}`,
            sourceUrl: repoUrl
        };
    }

    return {
        url: 'metrics/quality-metrics.json'
    };
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
