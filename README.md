# Landing Page - QA Engineer Pleno

Landing page profissional, moderna e responsiva feita com HTML, CSS e JavaScript puro.

> Estado completo da entrega atual: **README-ESTADO-ATUAL.md**

## 🎯 Objetivo

Apresentar seu perfil de QA Engineer Pleno com foco em qualidade orientada ao negócio, prevenção de riscos e valor entregue. Otimizada para recrutadores e líderes técnicos.

## ✨ Características

- ✅ **Responsivo**: desktop, tablet e mobile
- ✅ **Sem frameworks**: HTML, CSS e JavaScript puro
- ✅ **Dashboard de qualidade**: KPIs + tendencia via JSON local
- ✅ **QA Mini Lab separado**: missões, workspace, bug report e modo desafio
- ✅ **SEO completo**: OG/Twitter, JSON-LD, canonical e robots
- ✅ **Animações sutis**: fade-in, hover, contadores animados
- ✅ **Pronto para publicar**: GitHub Pages, Vercel, Netlify

## 📁 Estrutura de Arquivos

```
.
├── index.html
├── styles.css
├── script.js
├── qa-lab.html
├── qa-lab.css
├── qa-lab.js
├── README-ESTADO-ATUAL.md
├── metrics/
│   └── quality-metrics.json
├── assets/
│   └── images/
│       └── profile.jpg
├── cypress/
│   └── e2e/
│       ├── landing-page.cy.js
│       ├── qa-lab.cy.js
│       └── qa-lab-challenge.cy.js
└── README.md
```

## 🚀 Como Usar

### 1. Clonar ou Baixar

```bash
git clone https://github.com/josepachecoQA/josepachecoqa.github.io
cd josepachecoqa.github.io
```

### 2. Rodar Localmente

Servidor local recomendado:

```bash
npm start
```

Abra: `http://localhost:8000`

### 3. Customizar para seu Perfil

#### Seção Hero
- Atualize a **headline** e **subheadline**
- Modifique os textos dos botões CTA

#### Seção Sobre
- Reescreva sua apresentação profissional
- Ajuste os números de estatísticas (anos, projetos, linguagens)

#### Seção Serviços
- Descreva suas principais áreas de atuação
- Mantenha ou modifique os 4 cards

#### Seção Diferenciais
- Customize os 6 diferenciais
- Adicione ou remova conforme sua especialidade

#### Seção Portfólio
- Adicione seus 4 principais projetos
- Links reais para seu GitHub
- Descrição clara do contexto, desafio e solução
- Tags com tecnologias utilizadas

#### Seção Contato
- Atualize links de LinkedIn e GitHub
- Coloque seu email real
- Customize a mensagem de chamada à ação

### 4. Cores e Tipografia

As cores estão definidas como **CSS Custom Properties** no arquivo `styles.css` (linhas 1-14):

```css
--color-dark: #0d1117;              /* Fundo principal */
--color-primary: #58a6ff;           /* Cor principal (azul) */
--color-text: #c9d1d9;              /* Texto principal */
--color-text-secondary: #8b949e;    /* Texto secundário */
```

**Para alterar a paleta:**
- Modifique as variáveis em `:root`
- Ou edite diretamente as referências de cor no CSS

**Tipografia:**
- Fonte principal: Sora
- Fonte secundária: Source Sans 3

### 5. Adicionar Seções Extras

Para adicionar uma nova seção, siga este padrão:

```html
<section id="nova-secao" class="nova-secao">
    <div class="container">
        <h2 class="section-title">Título da Seção</h2>
        <!-- Seu conteúdo aqui -->
    </div>
</section>
```

E adicione o CSS correspondente em `styles.css`.

## 📱 Responsividade

A página é responsiva para:
- **Desktop**: 1200px+ (layout completo)
- **Tablet**: 768px - 1199px (grid ajustado)
- **Mobile**: < 768px (stack vertical)
- **Pequenos celulares**: < 480px (UI otimizada)

Teste com `F12` (DevTools) → Toggle device toolbar

## 🎨 Customizações Visuais

### Alterar Cores Globalmente

Edite `styles.css` linhas 1-14:

```css
:root {
    --color-primary: #seu-azul;        /* Mude para sua cor */
    --color-accent: #seu-claro;
    /* ... etc */
}
```

### Animar Mais ou Menos

Ajuste as durações em `styles.css`:

```css
--transition-fast: 150ms ease-in-out;    /* Reduza para mais rápido */
--transition-normal: 300ms ease-in-out;
--transition-slow: 500ms ease-in-out;
```

### Modificar Fonte

Troque as fontes no `<head>` do HTML e ajuste as variaveis em `styles.css`.

## 📊 Dashboard de Qualidade

Os dados sao carregados do branch `metrics-data` (arquivo `metrics/quality-metrics.json`). Assim o CI atualiza as metricas sem alterar o `main`.

Campos usados na analise:
- `totals.executedTests`, `totals.failedTests`, `totals.durationSeconds`
- `totals.flakinessPercent`, `totals.coveragePercent`, `totals.bugsPrevented`
- `targets` define metas para status e destaque
- `history` alimenta a tendencia

Parametros de URL (opcional):
- `?metricsUrl=` para apontar para outro JSON
- `?repo=usuario/repositorio&branch=main&path=metrics/quality-metrics.json`

Multiplos projetos (repita o parametro `repo`):

```
?repo=usuario/projeto-a@main:metrics/quality-metrics.json&repo=usuario/projeto-b@main:metrics/quality-metrics.json
```

Formato aceito:
- `repo=owner/repo@branch:path`
- `repo=owner/repo` (usa branch/path padrao)

### Cobertura de cenarios
Atualmente e um numero informado no JSON. Para automatizar, integre resultados do CI e atualize o arquivo via workflow.

## 🚀 Publicar Online

### GitHub Pages

1. Garanta que tudo esta commitado e enviado para o GitHub.
2. No GitHub: Settings → Pages.
3. Em Source, selecione Deploy from a branch.
4. Branch: `main` e pasta `/` (root).
5. Aguarde a URL de publicacao.

### Vercel

1. Instale Vercel CLI: `npm i -g vercel`
2. Execute: `vercel`
3. Siga as instruções
4. Seu site estará em: `seu-site.vercel.app`

### Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Drag & drop a pasta do projeto
3. Seu site estará pronto em minutos

## 📊 Analytics (Opcional)

Para adicionar Google Analytics:

Adicione antes de `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU-ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-SEU-ID');
</script>
```

## 🔧 Funcionalidades Implementadas

- ✅ Scroll suave entre seções
- ✅ Animações de entrada (fade-in)
- ✅ Efeitos hover nos cards
- ✅ Contadores animados de estatísticas
- ✅ Barra de navegação fixa com blur
- ✅ Dashboard de qualidade com KPIs
- ✅ Links para GitHub e LinkedIn
- ✅ Responsividade total
- ✅ Código comentado e organizado

## 🚀 Funcionalidades Prontas para Expandir

O JavaScript está preparado para:
- Integração com formulário de contato (EmailJS, Formspree, etc.)
- Animação de imagens (lazy loading)
- Dark mode toggle (sistema detecta preferência do usuário)
- Analytics e rastreamento de seções
- Integração com CI para atualizar metricas automaticamente

## 📧 Contato e Suporte

Se precisar customizar, adicionar seções ou otimizar, você pode:

1. **Editar os arquivos HTML/CSS/JS** conforme descrito acima
2. **Consultar documentação**:
   - [MDN Web Docs](https://developer.mozilla.org/)
   - [CSS-Tricks](https://css-tricks.com/)
   - [Web.dev](https://web.dev/)

## 📄 Licença

Código livre para uso pessoal e profissional.

---

**Desenvolvido com ❤️ e JavaScript puro**

Última atualização: Fevereiro de 2026
