const STORAGE_KEYS = {
  users: 'qaLabUsers',
  session: 'qaLabSession',
  profile: 'qaLabProfile',
  bugs: 'qaLabBugs',
  missions: 'qaLabMissions',
  activities: 'qaLabActivities',
  challengeMode: 'qaLabChallengeMode'
};

const CHALLENGE_ACCESS_KEY = 'QA-LAB-CHAVE-2026';

const PAGE_SIZE = 6;
const qaLabRules = window.QaLabRules;

const scenarioSeed = [
  { id: 1, name: 'Cadastro com e-mail válido', type: 'Funcional', risk: 'Alto', tags: ['cadastro', 'email'] },
  { id: 2, name: 'Cadastro sem aceitar termos', type: 'Funcional', risk: 'Alto', tags: ['cadastro', 'validação'] },
  { id: 3, name: 'Login com senha incorreta', type: 'Funcional', risk: 'Alto', tags: ['login', 'negativo'] },
  { id: 4, name: 'Atualização de bio no perfil', type: 'UI', risk: 'Médio', tags: ['perfil', 'textarea'] },
  { id: 5, name: 'Busca por tag no catálogo', type: 'UI', risk: 'Médio', tags: ['busca', 'filtro'] },
  { id: 6, name: 'Ordenação por risco', type: 'Regressão', risk: 'Médio', tags: ['ordenação'] },
  { id: 7, name: 'Paginação e troca de página', type: 'Regressão', risk: 'Médio', tags: ['paginação'] },
  { id: 8, name: 'Payload de bug report completo', type: 'API', risk: 'Alto', tags: ['bug', 'payload'] },
  { id: 9, name: 'Campos obrigatórios no report', type: 'Funcional', risk: 'Alto', tags: ['bug', 'validação'] },
  { id: 10, name: 'Mensagem de sessão não autenticada', type: 'UI', risk: 'Baixo', tags: ['sessão'] },
  { id: 11, name: 'Persistência de usuário no refresh', type: 'Regressão', risk: 'Médio', tags: ['localstorage'] },
  { id: 12, name: 'Contato entre formulário e log', type: 'API', risk: 'Baixo', tags: ['log', 'auditoria'] }
];

const missionIds = [
  'register-user',
  'login-success',
  'profile-update',
  'catalog-filter',
  'invalid-login',
  'bug-report'
];

let scenariosState = {
  page: 1,
  search: '',
  type: 'all',
  sort: 'risk-desc'
};

let challengeEnabled = false;

function initQaLab() {
  bootstrapChallengeFromUrl();
  bindChallengeControls();
  bindForms();
  bindApiSimulation();
  bindCatalogControls();
  bindReset();
  hydrateScreen();
  renderScenarios();
  renderActivityLog();
  renderMissionSummary();
}

function bootstrapChallengeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const challengeParam = params.get('challenge');
  const keyParam = params.get('key');

  if (challengeParam === '1' && keyParam === CHALLENGE_ACCESS_KEY) {
    writeStorage(STORAGE_KEYS.challengeMode, true);
  }
}

function bindChallengeControls() {
  const activateButton = document.getElementById('activateChallenge');
  const deactivateButton = document.getElementById('deactivateChallenge');

  if (activateButton) {
    activateButton.addEventListener('click', () => {
      const key = getInputValue('challengeKey');
      if (key !== CHALLENGE_ACCESS_KEY) {
        setFeedback('challengeFeedback', 'Chave inválida para o modo desafio.');
        return;
      }

      writeStorage(STORAGE_KEYS.challengeMode, true);
      hydrateChallengeStatus();
      setFeedback('challengeFeedback', 'Modo desafio ativado.', true);
      logActivity('Modo desafio ativado');
    });
  }

  if (deactivateButton) {
    deactivateButton.addEventListener('click', () => {
      writeStorage(STORAGE_KEYS.challengeMode, false);
      hydrateChallengeStatus();
      setFeedback('challengeFeedback', 'Modo desafio desativado.', true);
      logActivity('Modo desafio desativado');
    });
  }
}

function bindForms() {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const profileForm = document.getElementById('profileForm');
  const bugForm = document.getElementById('bugForm');
  const exportBug = document.getElementById('exportBug');
  const profileBio = document.getElementById('profileBio');

  if (registerForm) registerForm.addEventListener('submit', onRegisterSubmit);
  if (loginForm) loginForm.addEventListener('submit', onLoginSubmit);
  if (profileForm) profileForm.addEventListener('submit', onProfileSubmit);
  if (bugForm) bugForm.addEventListener('submit', onBugSubmit);
  if (exportBug) exportBug.addEventListener('click', onBugExport);

  if (profileBio) {
    profileBio.addEventListener('input', () => {
      updateBioCounter(profileBio.value.length);
    });
  }
}

function bindApiSimulation() {
  const apiSimForm = document.getElementById('apiSimForm');
  if (!apiSimForm) return;

  apiSimForm.addEventListener('submit', onApiSimulationSubmit);
}

function bindCatalogControls() {
  const search = document.getElementById('scenarioSearch');
  const type = document.getElementById('scenarioType');
  const sort = document.getElementById('scenarioSort');
  const prev = document.getElementById('prevPage');
  const next = document.getElementById('nextPage');

  if (search) {
    search.addEventListener('input', (event) => {
      scenariosState.search = event.target.value.trim().toLowerCase();
      scenariosState.page = 1;
      markMission('catalog-filter');
      logActivity('Filtro aplicado no catálogo');
      renderScenarios();
    });
  }

  if (type) {
    type.addEventListener('change', (event) => {
      scenariosState.type = event.target.value;
      scenariosState.page = 1;
      renderScenarios();
    });
  }

  if (sort) {
    sort.addEventListener('change', (event) => {
      scenariosState.sort = event.target.value;
      scenariosState.page = 1;
      renderScenarios();
    });
  }

  if (prev) {
    prev.addEventListener('click', () => {
      if (scenariosState.page > 1) {
        scenariosState.page -= 1;
        renderScenarios();
      }
    });
  }

  if (next) {
    next.addEventListener('click', () => {
      const totalPages = getTotalScenarioPages();
      if (scenariosState.page < totalPages) {
        scenariosState.page += 1;
        renderScenarios();
      }
    });
  }
}

function bindReset() {
  const resetButton = document.getElementById('resetEnvironment');
  if (!resetButton) return;

  resetButton.addEventListener('click', () => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    setFeedback('registerFeedback', 'Ambiente resetado com sucesso.', true);
    logActivity('Ambiente resetado manualmente');
    hydrateScreen();
    renderScenarios();
    renderActivityLog();
    renderMissionSummary();
  });
}

function hydrateScreen() {
  hydrateChallengeStatus();

  const profile = readStorage(STORAGE_KEYS.profile, { name: '', bio: '' });
  const session = readStorage(STORAGE_KEYS.session, null);

  setInputValue('profileName', profile.name || '');
  setInputValue('profileBio', profile.bio || '');
  updateBioCounter((profile.bio || '').length);

  const sessionEl = document.getElementById('sessionStatus');
  if (sessionEl) {
    sessionEl.textContent = session ? `Autenticado como ${session.email}` : 'Não autenticado';
  }

  const bugList = readStorage(STORAGE_KEYS.bugs, []);
  renderBugPreview(bugList[bugList.length - 1]);
}

function hydrateChallengeStatus() {
  challengeEnabled = Boolean(readStorage(STORAGE_KEYS.challengeMode, false));

  const status = document.getElementById('challengeStatus');
  if (status) {
    status.textContent = challengeEnabled ? 'Ativado' : 'Desativado';
    status.className = `status-pill ${challengeEnabled ? 'is-warning' : 'is-neutral'}`;
  }

  document.body.classList.toggle('challenge-on', challengeEnabled);
}

function onRegisterSubmit(event) {
  event.preventDefault();

  const name = getInputValue('registerName');
  const email = getInputValue('registerEmail').toLowerCase();
  const role = getInputValue('registerRole');
  const password = getInputValue('registerPassword');
  const terms = document.getElementById('registerTerms')?.checked;

  if (!name || !email || !role || !password || !terms) {
    setFeedback('registerFeedback', 'Preencha todos os campos e aceite os termos.');
    return;
  }

  if (!qaLabRules.isValidEmail(email, challengeEnabled)) {
    setFeedback('registerFeedback', 'Informe um e-mail válido.');
    return;
  }

  if (!qaLabRules.isValidPassword(password)) {
    setFeedback('registerFeedback', 'A senha deve ter pelo menos 8 caracteres e um número.');
    return;
  }

  const users = readStorage(STORAGE_KEYS.users, []);
  const duplicated = users.some((user) => user.email === email);
  if (duplicated) {
    setFeedback('registerFeedback', 'Já existe usuário cadastrado com esse e-mail.');
    return;
  }

  users.push({ name, email, role, password, createdAt: new Date().toISOString() });
  writeStorage(STORAGE_KEYS.users, users);

  setFeedback('registerFeedback', 'Usuário cadastrado com sucesso.', true);
  markMission('register-user');
  logActivity(`Usuário ${email} cadastrado`);
  event.target.reset();
}

function onLoginSubmit(event) {
  event.preventDefault();

  const email = getInputValue('loginEmail').toLowerCase();
  const password = getInputValue('loginPassword');

  const users = readStorage(STORAGE_KEYS.users, []);
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    setFeedback('loginFeedback', 'Credenciais inválidas.');
    markMission('invalid-login');
    logActivity(`Tentativa de login inválida para ${email || 'sem email'}`);
    return;
  }

  writeStorage(STORAGE_KEYS.session, { email: user.email, loggedAt: new Date().toISOString() });
  setFeedback('loginFeedback', 'Login realizado com sucesso.', true);
  markMission('login-success');
  logActivity(`Login realizado por ${email}`);
  hydrateScreen();
}

function onProfileSubmit(event) {
  event.preventDefault();

  const name = getInputValue('profileName');
  const bio = getInputValue('profileBio');

  if (!name || !bio) {
    setFeedback('profileFeedback', 'Informe nome e bio para salvar.');
    return;
  }

  const maxBio = qaLabRules.getBioMaxLength(challengeEnabled);
  if (bio.length > maxBio) {
    setFeedback('profileFeedback', `A bio deve ter no máximo ${maxBio} caracteres.`);
    return;
  }

  writeStorage(STORAGE_KEYS.profile, { name, bio });
  setFeedback('profileFeedback', 'Perfil atualizado.', true);
  markMission('profile-update');
  logActivity('Perfil atualizado com sucesso');
}

function onBugSubmit(event) {
  event.preventDefault();

  const title = getInputValue('bugTitle');
  const severity = getInputValue('bugSeverity');
  const steps = getInputValue('bugSteps');
  const expected = getInputValue('bugExpected');
  const actual = getInputValue('bugActual');

  if (!title || !severity || !steps || !expected || !actual) {
    setFeedback('bugFeedback', 'Preencha todos os campos do bug report.');
    return;
  }

  const payload = {
    id: Date.now(),
    title,
    severity: challengeEnabled && severity === 'critica' ? 'media' : severity,
    steps,
    expected,
    actual,
    createdAt: new Date().toISOString()
  };

  const bugs = readStorage(STORAGE_KEYS.bugs, []);
  bugs.push(payload);
  writeStorage(STORAGE_KEYS.bugs, bugs);

  setFeedback('bugFeedback', 'Bug report salvo.', true);
  renderBugPreview(payload);
  markMission('bug-report');
  logActivity(`Bug report criado: ${title}`);
}

function onBugExport() {
  const bugs = readStorage(STORAGE_KEYS.bugs, []);
  const latest = bugs[bugs.length - 1];

  if (!latest) {
    setFeedback('bugFeedback', 'Cadastre um bug antes de exportar.');
    return;
  }

  const markdown = createBugMarkdown(latest);
  navigator.clipboard.writeText(markdown)
    .then(() => {
      setFeedback('bugFeedback', 'Markdown copiado para a área de transferência.', true);
      logActivity('Bug report exportado em Markdown');
    })
    .catch(() => {
      setFeedback('bugFeedback', 'Não foi possível copiar automaticamente. Use o preview manualmente.');
    });
}

async function onApiSimulationSubmit(event) {
  event.preventDefault();

  const endpoint = getInputValue('apiEndpoint');
  const mode = getInputValue('apiMode');
  const latency = Number(getInputValue('apiLatency'));
  const boundedLatency = Number.isFinite(latency) ? Math.min(Math.max(latency, 100), 8000) : 500;
  const expectedStatus = getInputValue('apiExpectedStatus');
  const expectedMessageContains = getInputValue('apiExpectedMessage');
  const slaInput = Number(getInputValue('apiSla'));
  const maxLatency = Number.isFinite(slaInput) ? Math.min(Math.max(slaInput, 100), 8000) : 1200;

  setFeedback('apiSimFeedback', 'Executando chamada simulada...');

  try {
    const result = await simulateApiCall({ endpoint, mode, latency: boundedLatency });
    setFeedback('apiSimFeedback', 'Chamada simulada concluída com sucesso.', true);
    renderApiSimulationResult(result);
    const evidence = qaLabRules.evaluateApiEvidence(result, {
      expectedStatus,
      expectedMessageContains,
      maxLatency
    });
    renderApiEvidence(evidence);
    logActivity(`API simulada com sucesso: ${endpoint} (${result.status})`);
  } catch (error) {
    const failedResult = {
      ok: false,
      endpoint,
      status: error.status || 'TIMEOUT',
      latency: boundedLatency,
      message: error.message,
      timestamp: new Date().toISOString()
    };

    setFeedback('apiSimFeedback', `Falha simulada: ${error.message}`);
    renderApiSimulationResult(failedResult);
    const evidence = qaLabRules.evaluateApiEvidence(failedResult, {
      expectedStatus,
      expectedMessageContains,
      maxLatency
    });
    renderApiEvidence(evidence);
    logActivity(`Falha simulada em API: ${endpoint} (${error.status || 'TIMEOUT'})`);
  }
}

function simulateApiCall({ endpoint, mode, latency }) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      const session = readStorage(STORAGE_KEYS.session, null);
      const protectedEndpoint = endpoint === '/users/profile' || endpoint === '/bugs';

      if (mode === 'timeout') {
        reject({ status: 'TIMEOUT', message: 'Tempo limite excedido na chamada simulada.' });
        return;
      }

      if (mode === 'unauthorized' || (protectedEndpoint && !session)) {
        reject({ status: 401, message: 'Não autorizado. Faça login para acessar este recurso.' });
        return;
      }

      if (mode === 'server-error') {
        reject({ status: 500, message: 'Erro interno simulado no servidor.' });
        return;
      }

      resolve({
        ok: true,
        status: 200,
        endpoint,
        latency,
        message: 'Resposta simulada entregue com sucesso.',
        timestamp: new Date().toISOString()
      });
    }, latency);
  });
}

function renderApiSimulationResult(result) {
  const container = document.getElementById('apiSimResult');
  if (!container) return;

  container.textContent = [
    `Endpoint: ${result.endpoint}`,
    `Status: ${result.status}`,
    `Latência: ${result.latency}ms`,
    `Mensagem: ${result.message}`,
    `Horário: ${new Date(result.timestamp).toLocaleString('pt-BR')}`
  ].join('\n');
}

function renderApiEvidence(evidence) {
  const list = document.getElementById('apiEvidenceList');
  const summary = document.getElementById('apiEvidenceSummary');
  if (!list || !summary) return;

  summary.textContent = `Evidências aprovadas: ${evidence.passedCount}/${evidence.totalChecks} (${evidence.passRate}%)`;

  list.innerHTML = evidence.checks.map((check) => {
    const status = check.pass ? 'PASS' : 'FAIL';
    const statusClass = check.pass ? 'is-pass' : 'is-fail';
    return `<li class="activity-item evidence-item ${statusClass}">
      <span>${check.label}<br><small>Esperado: ${check.expected} · Atual: ${check.actual}</small></span>
      <strong>${status}</strong>
    </li>`;
  }).join('');
}

function createBugMarkdown(bug) {
  return [
    `## Bug Report - ${bug.title}`,
    `- Severidade: ${bug.severity}`,
    `- Data: ${new Date(bug.createdAt).toLocaleString('pt-BR')}`,
    '',
    '### Passos para reproduzir',
    bug.steps,
    '',
    '### Resultado esperado',
    bug.expected,
    '',
    '### Resultado atual',
    bug.actual
  ].join('\n');
}

function renderBugPreview(bug) {
  const preview = document.getElementById('bugPreview');
  if (!preview) return;

  if (!bug) {
    preview.textContent = 'Nenhum bug registrado ainda.';
    return;
  }

  preview.textContent = createBugMarkdown(bug);
}

function renderScenarios() {
  const list = document.getElementById('scenarioList');
  const pageInfo = document.getElementById('pageInfo');
  if (!list || !pageInfo) return;

  const filtered = qaLabRules.filterScenarios(scenarioSeed, scenariosState);
  const sorted = qaLabRules.sortScenarios(filtered, scenariosState.sort, challengeEnabled);
  const totalPages = qaLabRules.getTotalPages(sorted.length, PAGE_SIZE);

  if (scenariosState.page > totalPages) scenariosState.page = totalPages;

  const current = qaLabRules.paginate(sorted, scenariosState.page, PAGE_SIZE);

  list.innerHTML = current.map((scenario) => `
    <article class="scenario-card" data-id="${scenario.id}">
      <h3>${scenario.name}</h3>
      <div class="scenario-meta">
        <span>${scenario.type}</span>
        <span>${scenario.risk}</span>
      </div>
      <p>Tags: ${scenario.tags.join(', ')}</p>
    </article>
  `).join('');

  pageInfo.textContent = `Página ${scenariosState.page} de ${totalPages}`;
}

function getTotalScenarioPages() {
  const filtered = qaLabRules.filterScenarios(scenarioSeed, scenariosState);
  const sorted = qaLabRules.sortScenarios(filtered, scenariosState.sort, challengeEnabled);
  return qaLabRules.getTotalPages(sorted.length, PAGE_SIZE);
}

function markMission(missionId) {
  const missions = readStorage(STORAGE_KEYS.missions, {});
  missions[missionId] = true;
  writeStorage(STORAGE_KEYS.missions, missions);
  renderMissionSummary();
}

function renderMissionSummary() {
  const summary = document.getElementById('missionSummary');
  if (!summary) return;

  const missions = readStorage(STORAGE_KEYS.missions, {});
  const completed = missionIds.filter((id) => missions[id]).length;

  summary.textContent = `${completed} de ${missionIds.length} missões concluídas`;

  document.querySelectorAll('.mission-card').forEach((card) => {
    const mission = card.getAttribute('data-mission');
    card.classList.toggle('is-completed', Boolean(missions[mission]));
  });
}

function logActivity(message) {
  const activities = readStorage(STORAGE_KEYS.activities, []);
  activities.unshift({ message, at: new Date().toISOString() });
  writeStorage(STORAGE_KEYS.activities, activities.slice(0, 25));
  renderActivityLog();
}

function renderActivityLog() {
  const container = document.getElementById('activityLog');
  if (!container) return;

  const activities = readStorage(STORAGE_KEYS.activities, []);

  if (!activities.length) {
    container.innerHTML = '<li class="activity-item">Sem atividades registradas ainda.</li>';
    return;
  }

  container.innerHTML = activities
    .map((item) => `<li class="activity-item"><strong>${new Date(item.at).toLocaleTimeString('pt-BR')}</strong> · ${item.message}</li>`)
    .join('');
}

function setFeedback(id, message, success = false) {
  const el = document.getElementById(id);
  if (!el) return;

  el.textContent = message;
  el.classList.toggle('is-success', success);
  el.classList.toggle('is-error', !success);
}

function updateBioCounter(length) {
  const counter = document.getElementById('bioCounter');
  if (!counter) return;
  counter.textContent = `${length}/160`;
}

function getInputValue(id) {
  return (document.getElementById(id)?.value || '').trim();
}

function setInputValue(id, value) {
  const input = document.getElementById(id);
  if (input) input.value = value;
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

document.addEventListener('DOMContentLoaded', initQaLab);
