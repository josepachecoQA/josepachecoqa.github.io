describe('QA Lab Hub - Mini Lab', () => {
  beforeEach(() => {
    cy.visit('/qa-lab.html', {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });
  });

  it('deve carregar estrutura principal do laboratório', () => {
    cy.contains('h1', 'QA Mini Lab para prática real').should('be.visible');
    cy.get('#missionSummary').should('contain', '0 de 6 missões concluídas');
    cy.get('#scenarioList .scenario-card').should('have.length', 6);
    cy.get('.mission-rubric').should('be.visible');
    cy.get('.mission-card .mission-goal').should('have.length', 6);
    cy.get('.mission-card .mission-criteria').should('have.length', 6);
    cy.get('.mission-card .mission-hint').should('have.length', 6);
  });

  it('deve expor feedbacks com aria-live para acessibilidade', () => {
    cy.get('#missionSummary').should('have.attr', 'aria-live', 'polite');
    cy.get('#registerFeedback').should('have.attr', 'aria-live', 'polite');
    cy.get('#loginFeedback').should('have.attr', 'aria-live', 'polite');
    cy.get('#profileFeedback').should('have.attr', 'aria-live', 'polite');
    cy.get('#bugFeedback').should('have.attr', 'aria-live', 'polite');
    cy.get('#challengeFeedback').should('have.attr', 'aria-live', 'polite');
    cy.get('#sessionStatus').should('have.attr', 'aria-live', 'polite');
  });

  it('deve cadastrar usuário com sucesso', () => {
    cy.get('#registerName').type('Ana QA');
    cy.get('#registerEmail').type('ana@qa.com');
    cy.get('#registerRole').select('pleno');
    cy.get('#registerPassword').type('Senha123');
    cy.get('#registerTerms').check();
    cy.get('#registerSubmit').click();

    cy.get('#registerFeedback').should('contain', 'Usuário cadastrado com sucesso');
    cy.get('#missionSummary').should('contain', '1 de 6 missões concluídas');
  });

  it('deve validar login inválido e depois login válido', () => {
    cy.get('#loginEmail').type('invalido@qa.com');
    cy.get('#loginPassword').type('123');
    cy.get('#loginSubmit').click();
    cy.get('#loginFeedback').should('contain', 'Credenciais inválidas');

    cy.get('#registerName').type('Bruno QA');
    cy.get('#registerEmail').type('bruno@qa.com');
    cy.get('#registerRole').select('senior');
    cy.get('#registerPassword').type('Senha123');
    cy.get('#registerTerms').check();
    cy.get('#registerSubmit').click();

    cy.get('#loginEmail').clear().type('bruno@qa.com');
    cy.get('#loginPassword').clear().type('Senha123');
    cy.get('#loginSubmit').click();

    cy.get('#loginFeedback').should('contain', 'Login realizado com sucesso');
    cy.get('#sessionStatus').should('contain', 'Autenticado como bruno@qa.com');
  });

  it('deve atualizar perfil e gerar bug report', () => {
    cy.get('#profileName').type('Perfil QA');
    cy.get('#profileBio').type('Especialista em testes funcionais e automação com foco em risco.');
    cy.get('#profileSubmit').click();
    cy.get('#profileFeedback').should('contain', 'Perfil atualizado');

    cy.get('#bugTitle').type('Erro no botão de login');
    cy.get('#bugSeverity').select('alta');
    cy.get('#bugSteps').type('1. Acessar tela de login\n2. Clicar em entrar');
    cy.get('#bugExpected').type('Sistema autenticar com sucesso');
    cy.get('#bugActual').type('Sistema não responde ao clique');
    cy.get('#bugSubmit').click();

    cy.get('#bugFeedback').should('contain', 'Bug report salvo');
    cy.get('#bugPreview').should('contain', 'Erro no botão de login');
  });

  it('deve permitir busca e filtro no catálogo', () => {
    cy.get('#scenarioType').select('API');
    cy.get('#scenarioList .scenario-card').its('length').should('be.greaterThan', 0);

    cy.get('#scenarioSearch').type('payload');
    cy.get('#scenarioList .scenario-card').should('contain', 'Payload de bug report completo');

    cy.get('#nextPage').click();
    cy.get('#pageInfo').should('contain', 'Página');
  });

  it('deve simular respostas de API para sucesso e falha', () => {
    cy.get('#apiEndpoint').select('/auth/login');
    cy.get('#apiMode').select('success');
    cy.get('#apiLatency').clear().type('100');
    cy.get('#apiExpectedStatus').select('200');
    cy.get('#apiExpectedMessage').clear().type('sucesso');
    cy.get('#apiSla').clear().type('500');
    cy.get('#apiSimSubmit').click();

    cy.get('#apiSimFeedback').should('contain', 'sucesso');
    cy.get('#apiSimResult').should('contain', 'Status: 200');
    cy.get('#apiEvidenceSummary').should('contain', '3/3');
    cy.get('#apiEvidenceList .evidence-item.is-pass').should('have.length', 3);

    cy.get('#apiMode').select('server-error');
    cy.get('#apiExpectedStatus').select('500');
    cy.get('#apiExpectedMessage').clear().type('erro interno');
    cy.get('#apiSimSubmit').click();

    cy.get('#apiSimFeedback').should('contain', 'Falha simulada');
    cy.get('#apiSimResult').should('contain', 'Status: 500');
    cy.get('#apiEvidenceSummary').should('contain', '3/3');
  });
});
