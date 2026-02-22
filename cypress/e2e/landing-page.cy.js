const COVERAGE_QUERY = '?coverage=1';

describe('Landing Page - José Pacheco QA Engineer', () => {
  describe('Navegacao', () => {
    beforeEach(() => {
      cy.visit(`/${COVERAGE_QUERY}`);
    });

    it('Deve exibir a navbar corretamente', () => {
      cy.get('.navbar').should('be.visible');
      cy.get('.navbar-logo').should('contain', 'José Pacheco');
    });

    it('Deve ter todos os links de navegacao', () => {
      cy.get('.nav-menu').within(() => {
        cy.contains('a', 'Sobre').should('have.attr', 'href', '#sobre');
        cy.contains('a', 'Serviços').should('have.attr', 'href', '#servicos');
        cy.contains('a', 'Diferenciais').should('have.attr', 'href', '#diferenciais');
        cy.contains('a', 'Portfólio').should('have.attr', 'href', '#portfolio');
        cy.contains('a', 'Dashboard').should('have.attr', 'href', '#dashboard');
        cy.contains('a', 'Conversar').should('have.attr', 'href', '#contato');
      });
    });

    it('Deve navegar para secao ao clicar no link', () => {
      cy.contains('a', 'Sobre').click();
      cy.get('#sobre').should('be.visible');
      cy.get('.sobre-text').should('contain.text', 'Sou QA Engineer');
    });
  });

  describe('Hero', () => {
    beforeEach(() => {
      cy.visit(`/${COVERAGE_QUERY}`);
    });

    it('Deve exibir titulo e descricao', () => {
      cy.get('.hero').should('be.visible');
      cy.get('.hero-title').should('contain', 'QA focado em qualidade orientada ao negócio');
      cy.get('.hero-subtitle').should('be.visible');
    });

    it('Deve exibir imagem de perfil', () => {
      cy.get('.profile-image').should('have.attr', 'alt', 'José Pacheco - QA Engineer');
      cy.get('.profile-image').should('be.visible');
    });

    it('Deve exibir CTAs', () => {
      cy.get('.hero-cta').within(() => {
        cy.contains('a', 'Ver Portfólio').should('be.visible');
        cy.contains('a', 'Começar conversa').should('be.visible');
      });
    });
  });

  describe('Sobre', () => {
    beforeEach(() => {
      cy.visit(`/${COVERAGE_QUERY}`);
    });

    it('Deve exibir secao sobre', () => {
      cy.get('#sobre').should('be.visible');
      cy.get('#sobre .section-title').should('contain', 'Sobre mim');
    });

    it('Deve exibir estatisticas', () => {
      cy.get('#sobre .sobre-stats').within(() => {
        cy.contains('4+').should('be.visible');
        cy.contains('Anos em QA').should('be.visible');
        cy.contains('8+').should('be.visible');
        cy.contains('Projetos').should('be.visible');
      });
    });

    it('Deve ter paragrafos de descricao', () => {
      cy.get('#sobre .sobre-text').within(() => {
        cy.get('p').should('have.length.greaterThan', 0);
      });
    });
  });

  describe('Servicos e Diferenciais', () => {
    beforeEach(() => {
      cy.visit(`/${COVERAGE_QUERY}`);
    });

    it('Deve exibir cards de servicos', () => {
      cy.get('#servicos').should('be.visible');
      cy.get('.servicos-grid .servico-card').should('have.length', 4);
      cy.get('.servico-card .servico-icon').should('have.length', 4);
    });

    it('Deve exibir diferenciais', () => {
      cy.get('#diferenciais').should('be.visible');
      cy.get('.diferenciais-grid .diferencial-item').should('have.length', 6);
    });
  });

  describe('Portfolio', () => {
    beforeEach(() => {
      cy.visit(`/${COVERAGE_QUERY}`);
    });

    it('Deve exibir cards do portfolio', () => {
      cy.get('#portfolio').should('be.visible');
      cy.get('.portfolio-grid .portfolio-card').should('have.length.greaterThan', 3);
    });

    it('Deve ter links externos seguros', () => {
      cy.get('a[target="_blank"]').each(($link) => {
        cy.wrap($link)
          .should('have.attr', 'rel')
          .and('match', /noopener/)
          .and('match', /noreferrer/);
      });
    });
  });

  describe('Dashboard - sucesso', () => {
    beforeEach(() => {
      cy.intercept('GET', 'metrics/quality-metrics.json').as('metrics');
      cy.visit(`/${COVERAGE_QUERY}`);
      cy.wait('@metrics');
    });

    it('Deve exibir KPIs e metas', () => {
      cy.get('#kpiFailureRate').invoke('text').should('match', /\d+(\.\d)?%/);
      cy.get('#kpiExecuted').invoke('text').should('match', /\d/);
      cy.get('#kpiCoverage').invoke('text').should('match', /\d+%/);
      cy.get('#metricsTargets').should('contain', 'Metas');
    });

    it('Deve exibir status estavel', () => {
      cy.get('#qualityStatus').invoke('text').should('match', /Estavel|Atenção|Atencao|Risco alto|Sem dados/);
      cy.get('#qualitySummary').should('contain', 'metas: falhas <=');
    });
  });

  describe('Responsividade', () => {
    it('Deve ser responsivo em mobile', () => {
      cy.viewport('iphone-x');
      cy.visit(`/${COVERAGE_QUERY}`);
      cy.get('.navbar').should('be.visible');
      cy.get('.hero-title').should('be.visible');
    });

    it('Deve ser responsivo em tablet', () => {
      cy.viewport('ipad-2');
      cy.visit(`/${COVERAGE_QUERY}`);
      cy.get('.navbar').should('be.visible');
      cy.get('.hero').should('be.visible');
    });

    it('Deve ser responsivo em desktop', () => {
      cy.viewport(1920, 1080);
      cy.visit(`/${COVERAGE_QUERY}`);
      cy.get('.navbar').should('be.visible');
      cy.get('.hero').should('be.visible');
    });
  });

  describe('SEO e acessibilidade basica', () => {
    beforeEach(() => {
      cy.visit(`/${COVERAGE_QUERY}`);
    });

    it('Deve ter titulo e meta tags essenciais', () => {
      cy.title().should('contain', 'José Pacheco');
      cy.get('meta[name="description"]').should('have.attr', 'content');
      cy.get('meta[name="viewport"]').should('have.attr', 'content');
      cy.get('meta[name="robots"]').should('have.attr', 'content', 'index, follow');
      cy.get('link[rel="canonical"]').should('have.attr', 'href');
    });

    it('Deve ter Open Graph e Twitter cards', () => {
      cy.get('meta[property="og:title"]').should('have.attr', 'content');
      cy.get('meta[property="og:description"]').should('have.attr', 'content');
      cy.get('meta[property="og:image"]').should('have.attr', 'content');
      cy.get('meta[name="twitter:card"]').should('have.attr', 'content');
    });

    it('Deve ter JSON-LD', () => {
      cy.get('script[type="application/ld+json"]').should('exist');
    });

    it('Deve ter idioma definido', () => {
      cy.get('html').should('have.attr', 'lang', 'pt-BR');
    });
  });

  describe('Conteudo e contatos', () => {
    beforeEach(() => {
      cy.visit(`/${COVERAGE_QUERY}`);
    });

    it('Deve exibir secao de contato com links', () => {
      cy.get('#contato').should('be.visible');
      cy.get('.contato-links .contato-link').should('have.length.at.least', 3);
      cy.get('.contato-email').should('contain', '@');
    });

    it('Deve exibir footer', () => {
      cy.get('footer.footer').should('be.visible');
      cy.get('footer.footer').should('contain', 'José Pacheco');
    });
  });

  describe('Arquivos de SEO', () => {
    it('Deve disponibilizar robots.txt', () => {
      cy.request('/robots.txt').its('status').should('eq', 200);
    });

    it('Deve disponibilizar sitemap.xml', () => {
      cy.request('/sitemap.xml').its('status').should('eq', 200);
    });
  });
});
