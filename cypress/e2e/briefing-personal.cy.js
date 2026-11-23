const DOWNLOADS = Cypress.config('downloadsFolder');
const BRIEFING_FILE = `${DOWNLOADS}/briefing-carlos-mendes-lima.json`;
const TYPE = { delay: 15 };

const visitBriefing = () => {
  cy.visit('/briefing-personal.html', {
    onBeforeLoad(win) {
      win.localStorage.clear();
    },
  });
};

const fillRequired = () => {
  cy.get('#nomeCompleto').type('Carlos Mendes Lima', TYPE);
  cy.get('#crefNumero').type('012345-g', TYPE);
  cy.get('#crefUf').type('pe', TYPE);
  cy.get('#cidade').type('Recife', TYPE);
  cy.get('#whatsapp').type('(81) 90000-0000', TYPE);
  cy.get('input[name="autorizacao"]').check();
  cy.get('#fotoPrincipal').selectFile('assets/images/profile-640.jpg');
  cy.get('[data-photo="foto-principal"] .photo-thumb').should('have.length', 1);
};

describe('Briefing - Landing page para personal trainer', () => {
  beforeEach(() => {
    cy.task('clearDownloads');
    visitBriefing();
  });

  it('deve carregar a estrutura com as 12 etapas e progresso zerado', () => {
    cy.contains('.logo-text', 'Personal Trainer').should('be.visible');
    cy.get('.step').should('have.length', 12);
    cy.get('.briefing-steps a').should('have.length', 12);
    cy.get('#progressText').should('have.text', '0% preenchido');
    cy.get('meta[name="robots"]').should('have.attr', 'content', 'noindex, nofollow');
  });

  it('deve bloquear o download e apontar os campos obrigatórios pendentes', () => {
    cy.get('#downloadJson').click();

    cy.get('#finishFeedback')
      .should('have.class', 'is-error')
      .and('contain', 'Número do CREF')
      .and('contain', 'WhatsApp de contato')
      .and('contain', 'Foto principal');
    cy.readFile(BRIEFING_FILE).should('not.exist');
  });

  it('deve gerar o arquivo com tipo, respostas fitness e fotos', () => {
    fillRequired();
    cy.get('#crefNumero').should('have.value', '012345-G');
    cy.get('#crefUf').should('have.value', 'PE');
    cy.get('input[name="publico"][value="Quem quer emagrecer"]').check();
    ['Consultoria online', 'Hipertrofia'].forEach((servico) => {
      cy.get(`input[name="servicos"][value="${servico}"]`).check();
    });
    cy.get('input[name="locais"][value="Studio próprio"]').check();
    cy.get('input[name="mostrarPrecos"]').eq(1).check();
    cy.get('#fotoTreinando').selectFile('assets/images/og-image.jpg');
    cy.get('#fotoAntesDepois').selectFile('assets/images/og-image.jpg');

    cy.get('#downloadJson').click();
    cy.get('#finishFeedback').should('contain', 'antes/depois ficaram de fora');

    cy.readFile(BRIEFING_FILE).then((briefing) => {
      expect(briefing.tipo).to.eq('personal-trainer');
      expect(briefing.profissional).to.eq('Carlos Mendes Lima');
      expect(briefing.cores.principal).to.eq('#ff5a1f');
      expect(briefing.dados).to.include({ crefNumero: '012345-G', crefUf: 'PE', mostrarPrecos: 'Só "a partir de"' });
      expect(briefing.dados.servicos).to.deep.eq(['Consultoria online', 'Hipertrofia']);
      expect(briefing.dados.locais).to.deep.eq(['Studio próprio']);
      expect(briefing.fotos.map((foto) => foto.arquivo)).to.deep.eq(['foto-principal-1.jpg', 'treinando-1.jpg']);
      expect(briefing.resumoMarkdown).to.contain('# Briefing - Landing page de personal trainer');
      expect(briefing.resumoMarkdown).to.contain('## Serviços e planos');
    });
  });

  it('deve salvar as respostas separado do briefing de dentista', () => {
    cy.get('#nomeCompleto').type('Carlos Mendes Lima', TYPE);
    cy.reload();
    cy.get('#nomeCompleto').should('have.value', 'Carlos Mendes Lima');
    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem('briefingPersonal:v1')).nomeCompleto).to.eq('Carlos Mendes Lima');
      expect(win.localStorage.getItem('briefingDentista:v1')).to.be.null;
    });
  });
});
