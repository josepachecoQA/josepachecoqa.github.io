describe('QA Lab Hub - Modo desafio', () => {
  beforeEach(() => {
    cy.visit('/qa-lab.html?challenge=1&key=QA-LAB-CHAVE-2026', {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });
  });

  it('deve iniciar com modo desafio ativado', () => {
    cy.get('#challengeStatus').should('contain', 'Ativado');
    cy.get('body').should('have.class', 'challenge-on');
  });

  it('deve aceitar e-mail sem TLD no cadastro (bug intencional)', () => {
    cy.get('#registerName').type('Tester Desafio');
    cy.get('#registerEmail').type('tester@qa');
    cy.get('#registerRole').select('pleno');
    cy.get('#registerPassword').type('Senha123');
    cy.get('#registerTerms').check();
    cy.get('#registerSubmit').click();

    cy.get('#registerFeedback').should('contain', 'Usuário cadastrado com sucesso');
  });

  it('deve bloquear bio acima de 120 caracteres (bug intencional)', () => {
    const longBio = 'A'.repeat(130);
    cy.get('#profileName').type('QA Mentor');
    cy.get('#profileBio').type(longBio);
    cy.get('#profileSubmit').click();

    cy.get('#profileFeedback').should('contain', 'no máximo 120 caracteres');
  });

  it('deve salvar severidade crítica como média (bug intencional)', () => {
    cy.get('#bugTitle').type('Falha crítica mascarada');
    cy.get('#bugSeverity').select('critica');
    cy.get('#bugSteps').type('1. Abrir app\n2. Executar ação');
    cy.get('#bugExpected').type('Registrar como crítica');
    cy.get('#bugActual').type('Registro sai diferente');
    cy.get('#bugSubmit').click();

    cy.get('#bugPreview').should('contain', 'Severidade: media');
  });
});
