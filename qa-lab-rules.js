(function (globalScope, factory) {
  const api = factory();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  globalScope.QaLabRules = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const RISK_SCORE = { Alto: 3, Médio: 2, Baixo: 1 };

  function isValidEmail(email, challengeEnabled) {
    const emailRegex = challengeEnabled ? /^[^\s@]+@[^\s@]+$/ : /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test((email || '').trim().toLowerCase());
  }

  function isValidPassword(password) {
    const passwordValue = (password || '').trim();
    return passwordValue.length >= 8 && /\d/.test(passwordValue);
  }

  function getBioMaxLength(challengeEnabled) {
    return challengeEnabled ? 120 : 160;
  }

  function filterScenarios(scenarios, state) {
    const search = (state.search || '').trim().toLowerCase();

    return scenarios.filter((scenario) => {
      const byType = state.type === 'all' || scenario.type === state.type;
      const bySearch = !search
        || scenario.name.toLowerCase().includes(search)
        || scenario.tags.join(' ').toLowerCase().includes(search);

      return byType && bySearch;
    });
  }

  function sortScenarios(items, sortMode, challengeEnabled) {
    const clone = [...items];

    if (sortMode === 'risk-desc') {
      if (challengeEnabled) {
        clone.sort((first, second) => RISK_SCORE[first.risk] - RISK_SCORE[second.risk]);
      } else {
        clone.sort((first, second) => RISK_SCORE[second.risk] - RISK_SCORE[first.risk]);
      }
    } else if (sortMode === 'risk-asc') {
      clone.sort((first, second) => RISK_SCORE[first.risk] - RISK_SCORE[second.risk]);
    } else {
      clone.sort((first, second) => first.name.localeCompare(second.name, 'pt-BR'));
    }

    return clone;
  }

  function paginate(items, page, pageSize) {
    const safePage = Math.max(1, page);
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }

  function getTotalPages(totalItems, pageSize) {
    return Math.max(1, Math.ceil(totalItems / pageSize));
  }

  function evaluateApiEvidence(result, expectation) {
    const expectedStatus = String(expectation.expectedStatus || '').trim();
    const expectedMessageContains = String(expectation.expectedMessageContains || '').trim().toLowerCase();
    const maxLatency = Number(expectation.maxLatency || 0);

    const actualStatus = String(result.status);
    const actualMessage = String(result.message || '').toLowerCase();
    const actualLatency = Number(result.latency || 0);

    const checks = [
      {
        id: 'status-match',
        label: 'Status retornado confere com o esperado',
        expected: expectedStatus,
        actual: actualStatus,
        pass: expectedStatus === actualStatus
      },
      {
        id: 'message-match',
        label: 'Mensagem contém o trecho esperado',
        expected: expectedMessageContains || '(não informado)',
        actual: result.message || '',
        pass: expectedMessageContains ? actualMessage.includes(expectedMessageContains) : false
      },
      {
        id: 'latency-sla',
        label: 'Latência respeita o SLA configurado',
        expected: `${maxLatency}ms`,
        actual: `${actualLatency}ms`,
        pass: maxLatency > 0 ? actualLatency <= maxLatency : false
      }
    ];

    const passedCount = checks.filter((check) => check.pass).length;

    return {
      checks,
      passedCount,
      totalChecks: checks.length,
      passRate: Math.round((passedCount / checks.length) * 100)
    };
  }

  return {
    isValidEmail,
    isValidPassword,
    getBioMaxLength,
    filterScenarios,
    sortScenarios,
    paginate,
    getTotalPages,
    evaluateApiEvidence
  };
});