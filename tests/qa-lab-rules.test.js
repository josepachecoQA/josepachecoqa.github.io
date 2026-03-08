const test = require('node:test');
const assert = require('node:assert/strict');
const rules = require('../qa-lab-rules');

const sampleScenarios = [
  { id: 1, name: 'Cadastro com e-mail válido', type: 'Funcional', risk: 'Alto', tags: ['cadastro', 'email'] },
  { id: 2, name: 'Busca por tag no catálogo', type: 'UI', risk: 'Médio', tags: ['busca', 'filtro'] },
  { id: 3, name: 'Mensagem de sessão não autenticada', type: 'UI', risk: 'Baixo', tags: ['sessão'] }
];

test('isValidEmail deve respeitar regra normal e de challenge', () => {
  assert.equal(rules.isValidEmail('ana@qa.com', false), true);
  assert.equal(rules.isValidEmail('ana@qa', false), false);
  assert.equal(rules.isValidEmail('ana@qa', true), true);
});

test('isValidPassword valida tamanho mínimo e dígito', () => {
  assert.equal(rules.isValidPassword('Senha123'), true);
  assert.equal(rules.isValidPassword('SemNumero'), false);
  assert.equal(rules.isValidPassword('1234567'), false);
});

test('getBioMaxLength alterna por modo desafio', () => {
  assert.equal(rules.getBioMaxLength(false), 160);
  assert.equal(rules.getBioMaxLength(true), 120);
});

test('filterScenarios filtra por tipo e busca', () => {
  const filteredByType = rules.filterScenarios(sampleScenarios, {
    search: '',
    type: 'UI'
  });

  assert.equal(filteredByType.length, 2);

  const filteredBySearch = rules.filterScenarios(sampleScenarios, {
    search: 'cadastro',
    type: 'all'
  });

  assert.equal(filteredBySearch.length, 1);
  assert.equal(filteredBySearch[0].id, 1);
});

test('sortScenarios ordena risco desc no modo normal e invertido no challenge', () => {
  const normal = rules.sortScenarios(sampleScenarios, 'risk-desc', false);
  assert.equal(normal[0].risk, 'Alto');

  const challenge = rules.sortScenarios(sampleScenarios, 'risk-desc', true);
  assert.equal(challenge[0].risk, 'Baixo');
});

test('sortScenarios ordena nome em ordem alfabética', () => {
  const sortedByName = rules.sortScenarios(sampleScenarios, 'name-asc', false);
  assert.equal(sortedByName[0].name, 'Busca por tag no catálogo');
});

test('paginate e getTotalPages devem calcular corretamente', () => {
  const items = Array.from({ length: 13 }, (_, index) => ({ id: index + 1 }));

  assert.equal(rules.getTotalPages(items.length, 6), 3);

  const pageTwo = rules.paginate(items, 2, 6);
  assert.equal(pageTwo.length, 6);
  assert.equal(pageTwo[0].id, 7);

  const pageThree = rules.paginate(items, 3, 6);
  assert.equal(pageThree.length, 1);
  assert.equal(pageThree[0].id, 13);
});

test('evaluateApiEvidence deve gerar checklist com score correto', () => {
  const result = {
    status: 500,
    message: 'Erro interno simulado no servidor.',
    latency: 900
  };

  const evidence = rules.evaluateApiEvidence(result, {
    expectedStatus: '500',
    expectedMessageContains: 'erro interno',
    maxLatency: 1000
  });

  assert.equal(evidence.totalChecks, 3);
  assert.equal(evidence.passedCount, 3);
  assert.equal(evidence.passRate, 100);
});
