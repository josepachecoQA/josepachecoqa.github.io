const DOWNLOADS = Cypress.config('downloadsFolder');
const BRIEFING_FILE = `${DOWNLOADS}/briefing-camila-ferreira-santos.json`;
const TYPE = { delay: 15 };

const visitBriefing = () => {
  cy.visit('/briefing-fisioterapeuta.html', {
    onBeforeLoad(win) {
      win.localStorage.clear();
    },
  });
};

const fillRequired = () => {
  cy.get('#nomeCompleto').type('Camila Ferreira Santos', TYPE);
  cy.get('#crefitoNumero').type('123456', TYPE);
  cy.get('#crefitoUf').type('pe', TYPE);
  cy.get('#cidade').type('Recife', TYPE);
  cy.get('#whatsapp').type('(81) 90000-0000', TYPE);
  cy.get('input[name="autorizacao"]').check();
  cy.get('#fotoPrincipal').selectFile('assets/images/profile-640.jpg');
  cy.get('[data-photo="foto-principal"] .photo-thumb').should('have.length', 1);
};

describe('Briefing - Landing page para fisioterapeuta', () => {
  beforeEach(() => {
    cy.task('clearDownloads');
    visitBriefing();
  });

  it('deve carregar a estrutura com as 12 etapas e progresso zerado', () => {
    cy.contains('.logo-text', 'Fisioterapia').should('be.visible');
    cy.contains('h1', 'Vamos montar a sua página profissional').should('be.visible');
    cy.get('.step').should('have.length', 12);
    cy.get('.briefing-steps a').should('have.length', 12);
    cy.get('#progressText').should('have.text', '0% preenchido');
    cy.get('#finishFeedback').should('have.attr', 'aria-live', 'polite');
    cy.get('meta[name="robots"]').should('have.attr', 'content', 'noindex, nofollow');
    cy.get('#briefingForm').should('have.attr', 'data-tipo', 'fisioterapeuta');
  });

  it('deve bloquear o download e apontar os campos obrigatórios pendentes', () => {
    cy.get('#downloadJson').click();

    cy.get('#finishFeedback')
      .should('have.class', 'is-error')
      .and('contain', 'Nome completo')
      .and('contain', 'Número do CREFITO')
      .and('contain', 'WhatsApp de agendamento')
      .and('contain', 'Autorização de uso')
      .and('contain', 'Foto principal');
    cy.get('#nomeCompleto').should('be.focused').closest('.field').should('have.class', 'is-invalid');

    cy.get('#nomeCompleto').type('Camila', TYPE);
    cy.get('#nomeCompleto').closest('.field').should('not.have.class', 'is-invalid');
    cy.readFile(BRIEFING_FILE).should('not.exist');
  });

  it('deve completar a jornada inteira e gerar o arquivo com respostas e fotos', () => {
    cy.get('#nomeCompleto').type('Camila Ferreira Santos', TYPE);
    cy.get('#nomeExibicao').type('Ft. Camila Ferreira', TYPE);
    cy.get('#crefitoNumero').type('123456', TYPE);
    cy.get('#crefitoUf').type('pe', TYPE).should('have.value', 'PE');
    cy.get('#especialidades').type('Ortopedia, RPG e pilates clínico', TYPE);
    cy.get('#cidade').type('Recife', TYPE);
    cy.get('#bairro').type('Boa Viagem', TYPE);
    cy.get('.briefing-steps a[href="#s-identificacao"]').should('have.class', 'is-done');

    cy.get('#graduacao').type('UNICAP', TYPE);
    cy.get('#anoFormatura').type('2018', TYPE);
    cy.get('#anosExperiencia').type('7', TYPE);
    cy.get('#historia').type('Escolhi a fisioterapia porque movimento é qualidade de vida.{enter}Atendo com plano individualizado.', TYPE);

    cy.get('input[name="publico"][value="Adultos"]').check();
    cy.get('input[name="publico"][value="Pacientes pós-operatórios"]').check();
    cy.get('#frase').type('Movimento com propósito. Sua recuperação começa aqui.', TYPE);
    cy.get('input[name="tom"][value="Acolhedora e humana"]').check();
    cy.get('input[name="objetivo"][value="Chamar no WhatsApp"]').check();

    ['Fisioterapia ortopédica', 'RPG - Reeducação Postural Global', 'Pilates clínico'].forEach((servico) => {
      cy.get(`input[name="servicos"][value="${servico}"]`).check();
    });
    cy.get('#carroChefe').type('Reabilitação pós-operatória, porque devolve autonomia.', TYPE);

    cy.get('#nomeClinica').type('Studio Movimento Fisioterapia', TYPE);
    cy.get('#endereco').type('Rua Padre Carapuceiro, 858, sala 402', TYPE);
    cy.get('#horarios').type('Seg a Sex 7h-19h', TYPE);
    cy.get('input[name="comodidades"][value="Estacionamento"]').check();
    cy.get('input[name="tecnologias"][value="Aparelhos de pilates clínico"]').check();
    cy.get('input[name="convenio"][value="Particular e alguns convênios"]').check();

    cy.get('#diferenciais').type('Avaliação detalhada{enter}Plano personalizado', TYPE);
    cy.get('#notaGoogle').type('4,9', TYPE);
    cy.get('#depoimentos').type('"Voltei a caminhar sem dor." - Marina', TYPE);
    cy.get('#faq').type('P: Fisioterapia dói?{enter}R: Pode haver desconforto leve e controlado.', TYPE);
    cy.get('#whatsapp').type('(81) 90000-0000', TYPE);
    cy.get('#instagram').type('@ft.camilaferreira', TYPE);

    cy.get('input[name="tema"][value="Claro (branco, mais comum na saúde)"]').check();
    cy.get('input[name="autorizacao"]').check();
    cy.get('#fotoPrincipal').selectFile('assets/images/profile-640.jpg');
    cy.get('#fotoAtendendo').selectFile('assets/images/og-image.jpg');
    cy.get('[data-photo="foto-principal"] .photo-thumb').should('have.length', 1);
    cy.get('[data-photo="atendendo"] .photo-thumb').should('have.length', 1);

    cy.get('#downloadJson').click();
    cy.get('#finishFeedback').should('not.have.class', 'is-error').and('contain', 'Arquivo baixado');

    cy.readFile(BRIEFING_FILE).then((briefing) => {
      expect(briefing.tipo).to.eq('fisioterapeuta');
      expect(briefing.profissional).to.eq('Camila Ferreira Santos');
      expect(briefing.cores).to.include({
        principal: '#2a9d8f',
        secundaria: '#264653',
        destaque: '#e9c46a',
      });
      expect(briefing.dados).to.include({
        crefitoNumero: '123456',
        crefitoUf: 'PE',
        nomeExibicao: 'Ft. Camila Ferreira',
        cidade: 'Recife',
      });
      expect(briefing.dados.servicos).to.deep.eq([
        'Fisioterapia ortopédica',
        'RPG - Reeducação Postural Global',
        'Pilates clínico',
      ]);
      expect(briefing.dados.publico).to.include.members(['Adultos', 'Pacientes pós-operatórios']);
      expect(briefing.fotos.map((foto) => foto.arquivo)).to.deep.eq([
        'foto-principal-1.jpg',
        'atendendo-1.jpg',
      ]);
      expect(briefing.resumoMarkdown).to.contain('# Briefing - Landing page de fisioterapia');
      expect(briefing.resumoMarkdown).to.contain('## Tratamentos');
      expect(briefing.resumoMarkdown).to.contain('CREFITO');
    });
  });

  it('deve exigir autorização para incluir fotos de antes/depois', () => {
    fillRequired();
    cy.get('#fotoAntesDepois').selectFile('assets/images/og-image.jpg');
    cy.get('[data-photo="antes-depois"] .photo-thumb').should('have.length', 1);

    cy.get('#downloadJson').click();
    cy.get('#finishFeedback').should('contain', 'antes/depois ficaram de fora');

    cy.readFile(BRIEFING_FILE).its('fotos').should('have.length', 1);

    cy.get('input[name="autorizacaoAntesDepois"]').check();
    cy.get('#downloadJson').click();
    cy.get('#finishFeedback').should('contain', 'Arquivo baixado').and('not.contain', 'antes/depois ficaram de fora');
    cy.readFile(BRIEFING_FILE).its('fotos').should('have.length', 2);
  });

  it('deve salvar as respostas separado dos outros briefings', () => {
    cy.get('#nomeCompleto').type('Camila Ferreira Santos', TYPE);
    cy.reload();
    cy.get('#nomeCompleto').should('have.value', 'Camila Ferreira Santos');
    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem('briefingFisioterapeuta:v1')).nomeCompleto)
        .to.eq('Camila Ferreira Santos');
      expect(win.localStorage.getItem('briefingDentista:v1')).to.be.null;
      expect(win.localStorage.getItem('briefingPersonal:v1')).to.be.null;
    });
  });

  it('deve resetar o formulário e limpar o progresso', () => {
    fillRequired();
    cy.get('.briefing-steps a[href="#s-identificacao"]').should('have.class', 'is-done');
    cy.get('#progressText').invoke('text').should('not.eq', '0% preenchido');

    cy.on('window:confirm', () => true);
    cy.get('#resetForm').click();

    cy.get('#nomeCompleto').should('have.value', '');
    cy.get('#crefitoNumero').should('have.value', '');
    cy.get('#progressText').should('have.text', '0% preenchido');
    cy.get('[data-photo="foto-principal"] .photo-thumb').should('have.length', 0);
    cy.window().then((win) => {
      expect(win.localStorage.getItem('briefingFisioterapeuta:v1')).to.be.null;
    });
  });
});
