const DOWNLOADS = Cypress.config('downloadsFolder');
const BRIEFING_FILE = `${DOWNLOADS}/briefing-ana-souza-lima.json`;
const TYPE = { delay: 15 };

const visitBriefing = () => {
  cy.visit('/briefing-dentista.html', {
    onBeforeLoad(win) {
      win.localStorage.clear();
    },
  });
};

const fillRequired = () => {
  cy.get('#nomeCompleto').type('Ana Souza Lima', TYPE);
  cy.get('#croNumero').type('12345', TYPE);
  cy.get('#croUf').type('pe', TYPE);
  cy.get('#cidade').type('Recife', TYPE);
  cy.get('#whatsapp').type('(81) 90000-0000', TYPE);
  cy.get('input[name="autorizacao"]').check();
  cy.get('#fotoPrincipal').selectFile('assets/images/profile-640.jpg');
  cy.get('[data-photo="foto-principal"] .photo-thumb').should('have.length', 1);
};

describe('Briefing - Landing page para dentista', () => {
  beforeEach(() => {
    cy.task('clearDownloads');
    visitBriefing();
  });

  it('deve carregar a estrutura com as 12 etapas e progresso zerado', () => {
    cy.contains('h1', 'Vamos montar a sua página profissional').should('be.visible');
    cy.get('.step').should('have.length', 12);
    cy.get('.briefing-steps a').should('have.length', 12);
    cy.get('#progressText').should('have.text', '0% preenchido');
    cy.get('#finishFeedback').should('have.attr', 'aria-live', 'polite');
    cy.get('meta[name="robots"]').should('have.attr', 'content', 'noindex, nofollow');
  });

  it('deve bloquear o download e apontar os campos obrigatórios pendentes', () => {
    cy.get('#downloadJson').click();

    cy.get('#finishFeedback')
      .should('have.class', 'is-error')
      .and('contain', 'Nome completo')
      .and('contain', 'Número do CRO')
      .and('contain', 'WhatsApp de agendamento')
      .and('contain', 'Autorização de uso')
      .and('contain', 'Foto principal');
    cy.get('#nomeCompleto').should('be.focused').closest('.field').should('have.class', 'is-invalid');

    cy.get('#nomeCompleto').type('Ana', TYPE);
    cy.get('#nomeCompleto').closest('.field').should('not.have.class', 'is-invalid');
    cy.readFile(BRIEFING_FILE).should('not.exist');
  });

  it('deve completar a jornada inteira e gerar o arquivo com respostas e fotos', () => {
    // 1. Identificação
    cy.get('#nomeCompleto').type('Ana Souza Lima', TYPE);
    cy.get('#nomeExibicao').type('Dra. Ana Souza', TYPE);
    cy.get('#croNumero').type('12345', TYPE);
    cy.get('#croUf').type('pe', TYPE).should('have.value', 'PE');
    cy.get('#especialidades').type('Ortodontia (RQE 1234)', TYPE);
    cy.get('#cidade').type('Recife', TYPE);
    cy.get('#bairro').type('Boa Viagem', TYPE);
    cy.get('.briefing-steps a[href="#s-identificacao"]').should('have.class', 'is-done');

    // 2. Formação
    cy.get('#graduacao').type('UFPE', TYPE);
    cy.get('#anoFormatura').type('2015', TYPE);
    cy.get('#anosExperiencia').type('10', TYPE);
    cy.get('#historia').type('Escolhi a odontologia para devolver sorrisos.{enter}Atendo com calma e cuidado.', TYPE);

    // 3. Posicionamento
    cy.get('input[name="publico"][value="Adultos"]').check();
    cy.get('input[name="publico"][value="Pacientes com medo de dentista"]').check();
    cy.get('#frase').type('Odontologia sem medo, com cuidado de verdade', TYPE);
    cy.get('input[name="tom"][value="Acolhedora e humana"]').check();
    cy.get('input[name="objetivo"][value="Chamar no WhatsApp"]').check();

    // 4. Tratamentos
    ['Clareamento', 'Implantes', 'Alinhadores invisíveis'].forEach((servico) => {
      cy.get(`input[name="servicos"][value="${servico}"]`).check();
    });
    cy.get('#carroChefe').type('Alinhadores invisíveis, porque é o que mais transforma.', TYPE);

    // 5. Consultório
    cy.get('#nomeClinica').type('Clínica Sorriso Leve', TYPE);
    cy.get('#endereco').type('Av. Boa Viagem, 1000, sala 501', TYPE);
    cy.get('#horarios').type('Seg a Sex 8h-18h', TYPE);
    cy.get('input[name="comodidades"][value="Estacionamento"]').check();
    cy.get('input[name="tecnologias"][value="Scanner intraoral"]').check();
    cy.get('input[name="convenio"][value="Particular com reembolso"]').check();

    // 6 a 9. Diferenciais, depoimentos, FAQ e contato
    cy.get('#diferenciais').type('Explico cada etapa com fotos{enter}Atendimento pontual', TYPE);
    cy.get('#notaGoogle').type('4,9', TYPE);
    cy.get('#depoimentos').type('"Perdi o medo de dentista." - Maria', TYPE);
    cy.get('#faq').type('P: Clareamento dói?{enter}R: Pode dar sensibilidade leve.', TYPE);
    cy.get('#whatsapp').type('(81) 90000-0000', TYPE);
    cy.get('#instagram').type('@draanasouza', TYPE);

    // 10. Visual
    cy.get('input[name="tema"][value="Claro (branco, mais comum na saúde)"]').check();
    cy.get('#corPrincipal').invoke('val', '#1a9e8f').trigger('input');

    // 11. Fotos
    cy.get('#fotoPrincipal').selectFile('assets/images/profile-640.jpg');
    cy.get('#fotoConsultorio').selectFile(['assets/images/og-image.jpg', 'assets/images/profile-640.jpg']);
    cy.get('[data-photo="foto-principal"] .photo-thumb').should('have.length', 1);
    cy.get('[data-photo="consultorio"] .photo-thumb').should('have.length', 2);
    cy.get('#photoTotal').should('have.text', '3 foto(s) anexada(s).');

    // 12. Finalizar
    cy.get('input[name="autorizacao"]').check();
    cy.get('#progressText').invoke('text').then((text) => {
      expect(parseInt(text, 10)).to.be.greaterThan(50);
    });
    cy.get('#sendWhatsapp')
      .should('have.attr', 'href')
      .and('include', 'wa.me/5581991737145')
      .and('include', encodeURIComponent('Dra. Ana Souza'));

    cy.get('#downloadJson').click();
    cy.get('#finishFeedback')
      .should('not.have.class', 'is-error')
      .and('contain', 'Arquivo baixado')
      .and('contain', '3 foto(s)');

    cy.readFile(BRIEFING_FILE).then((briefing) => {
      expect(briefing.profissional).to.eq('Ana Souza Lima');
      expect(briefing.cores.principal).to.eq('#1a9e8f');

      const secoes = briefing.respostas.map((secao) => secao.secao);
      expect(secoes).to.include.members(['Identificação', 'Tratamentos', 'Consultório', 'Contato e redes']);

      const resposta = (pergunta) => briefing.respostas
        .flatMap((secao) => secao.campos)
        .find((campo) => campo.pergunta === pergunta).resposta;
      expect(resposta('UF do CRO')).to.eq('PE');
      expect(resposta('Tratamentos oferecidos')).to.eq('Clareamento, Implantes, Alinhadores invisíveis');
      expect(resposta('Sua história')).to.contain('\n');

      expect(briefing.fotos).to.have.length(3);
      expect(briefing.fotos.map((foto) => foto.arquivo)).to.deep.eq([
        'foto-principal-1.jpg',
        'consultorio-1.jpg',
        'consultorio-2.jpg',
      ]);
      briefing.fotos.forEach((foto) => {
        expect(foto.dataUrl).to.match(/^data:image\/jpeg;base64,/);
        expect(Math.max(foto.largura, foto.altura)).to.be.at.most(1920);
      });

      expect(briefing.resumoMarkdown).to.contain('## Identificação');
      expect(briefing.resumoMarkdown).to.contain('**Nome completo:** Ana Souza Lima');
    });
  });

  it('deve excluir fotos de antes/depois sem a autorização dos pacientes', () => {
    fillRequired();
    cy.get('#fotoAntesDepois').selectFile('assets/images/og-image.jpg');
    cy.get('[data-photo="antes-depois"] .photo-thumb').should('have.length', 1);

    cy.get('#downloadJson').click();
    cy.get('#finishFeedback').should('contain', 'antes/depois ficaram de fora');
    cy.readFile(BRIEFING_FILE).its('fotos').should('have.length', 1);

    cy.get('input[name="autorizacaoAntesDepois"]').check();
    cy.get('#downloadJson').click();
    cy.get('#finishFeedback').should('not.contain', 'ficaram de fora');
    cy.readFile(BRIEFING_FILE).its('fotos').should('have.length', 2);
  });

  it('deve permitir remover uma foto anexada', () => {
    cy.get('#fotoConsultorio').selectFile(['assets/images/og-image.jpg', 'assets/images/profile-640.jpg']);
    cy.get('[data-photo="consultorio"] .photo-thumb').should('have.length', 2);

    cy.get('[data-photo="consultorio"] .photo-thumb button').first().click();
    cy.get('[data-photo="consultorio"] .photo-thumb').should('have.length', 1);
    cy.get('#photoTotal').should('have.text', '1 foto(s) anexada(s).');
  });

  it('deve manter as respostas após recarregar e apagar tudo ao recomeçar', () => {
    cy.get('#nomeCompleto').type('Ana Souza Lima', TYPE);
    cy.get('input[name="servicos"][value="Implantes"]').check();
    cy.get('input[name="tom"][value="Moderna e tecnológica"]').check();

    cy.reload();
    cy.get('#nomeCompleto').should('have.value', 'Ana Souza Lima');
    cy.get('input[name="servicos"][value="Implantes"]').should('be.checked');
    cy.get('input[name="tom"][value="Moderna e tecnológica"]').should('be.checked');

    cy.on('window:confirm', () => true);
    cy.get('#resetForm').click();
    cy.get('#nomeCompleto').should('have.value', '');
    cy.get('#progressText').should('have.text', '0% preenchido');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('briefingDentista:v1')).to.be.null;
    });
  });

  it('deve copiar as respostas em texto', () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, 'writeText').resolves().as('clipboard');
    });
    cy.get('#nomeCompleto').type('Ana Souza Lima', TYPE);
    cy.get('#copyText').click();

    cy.get('@clipboard').should('have.been.calledOnce')
      .its('firstCall.args.0')
      .should('contain', '**Nome completo:** Ana Souza Lima');
    cy.get('#finishFeedback').should('contain', 'Respostas copiadas');
  });
});

describe('Briefing - envio para a API', () => {
  const API = 'http://localhost:3999';

  const visitWithApi = () => {
    cy.visit(`/briefing-dentista.html?api=${encodeURIComponent(API)}`, {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });
  };

  it('deve avisar que o envio online está indisponível quando a API não está configurada', () => {
    visitBriefing();
    fillRequired();
    cy.get('#submitBriefing').click();
    cy.get('#finishFeedback')
      .should('have.class', 'is-error')
      .and('contain', 'Baixar cópia do arquivo');
  });

  it('deve enviar respostas e fotos para a API e mostrar o protocolo', () => {
    cy.intercept('POST', `${API}/api/briefings`, (req) => {
      req.reply({ delay: 400, statusCode: 201, body: { id: 'a1b2c3d4-0000-4000-8000-000000000000', totalFotos: 1 } });
    }).as('submit');

    visitWithApi();
    fillRequired();
    cy.get('input[name="servicos"][value="Implantes"]').check();
    cy.get('#submitBriefing').click();
    cy.get('#submitBriefing').should('be.disabled').and('have.text', 'Enviando...');

    cy.wait('@submit').its('request.body').then((body) => {
      expect(body.dados).to.include({ nomeCompleto: 'Ana Souza Lima', croUf: 'PE', cidade: 'Recife' });
      expect(body.dados.servicos).to.deep.eq(['Implantes']);
      expect(body.dados).not.to.have.property('website');
      expect(body.website).to.eq('');
      expect(body.fotos).to.have.length(1);
      expect(body.fotos[0].categoria).to.eq('foto-principal');
      expect(body.fotos[0].dataUrl).to.match(/^data:image\/jpeg;base64,/);
    });

    cy.get('#finishFeedback')
      .should('not.have.class', 'is-error')
      .and('contain', 'Protocolo A1B2C3D4');
    cy.get('#submitBriefing').should('be.disabled').and('have.text', 'Briefing enviado');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('briefingDentista:v1')).to.be.null;
    });
  });

  it('deve mostrar o erro da API e permitir tentar de novo', () => {
    cy.intercept('POST', `${API}/api/briefings`, {
      statusCode: 422,
      body: { erro: 'Foto 1: o conteúdo não é uma imagem JPG válida.' },
    }).as('submit');

    visitWithApi();
    fillRequired();
    cy.get('#submitBriefing').click();
    cy.wait('@submit');

    cy.get('#finishFeedback').should('have.class', 'is-error').and('contain', 'não é uma imagem JPG válida');
    cy.get('#submitBriefing').should('not.be.disabled').and('have.text', 'Enviar briefing');
  });

  it('deve orientar o download quando o servidor está fora do ar', () => {
    cy.intercept('POST', `${API}/api/briefings`, { forceNetworkError: true }).as('submit');

    visitWithApi();
    fillRequired();
    cy.get('#submitBriefing').click();
    cy.wait('@submit');

    cy.get('#finishFeedback').should('contain', 'Sem conexão com o servidor');
    cy.get('#submitBriefing').should('not.be.disabled');
  });
});
