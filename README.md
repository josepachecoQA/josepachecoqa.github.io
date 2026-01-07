# Landing Page - QA Engineer Pleno

Uma landing page profissional, moderna e responsiva desenvolvida com **HTML, CSS e JavaScript puro**.

## 🎯 Objetivo

Apresentar seu perfil de QA Engineer Pleno com foco em qualidade orientada ao negócio, prevenção de riscos e valor entregue. Otimizada para recrutadores e líderes técnicos.

## ✨ Características

- ✅ **Responsivo**: Desktop, tablet e mobile
- ✅ **Sem frameworks**: HTML, CSS e JavaScript puro
- ✅ **Animações sutis**: Efeitos fade-in, hover, float
- ✅ **Paleta profissional**: GitHub Dark com acentos azuis
- ✅ **Performance**: Código otimizado, lazy loading preparado
- ✅ **Acessibilidade**: Semântica HTML, contraste adequado
- ✅ **Pronto para publicar**: GitHub Pages, Vercel, Netlify

## 📁 Estrutura de Arquivos

```
pagina_profissional/
├── index.html          # Estrutura HTML
├── styles.css          # Estilos e responsividade
├── script.js           # Interações e animações
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. Clonar ou Baixar

```bash
git clone https://github.com/seu-usuario/pagina-profissional
cd pagina-profissional
```

### 2. Abrir Localmente

Simplesmente abra o arquivo `index.html` em seu navegador:

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Ou use um servidor local (recomendado):

```bash
# Python 3
python -m http.server 8000

# Node.js (com http-server)
npx http-server
```

Então acesse: `http://localhost:8000`

### 3. Customizar para seu Perfil

#### Seção Hero (index.html - linhas 45-63)
- Atualize a **headline** e **subheadline**
- Modifique os textos dos botões CTA

#### Seção Sobre (index.html - linhas 71-96)
- Reescreva sua apresentação profissional
- Ajuste os números de estatísticas (anos, projetos, linguagens)

#### Seção Serviços (index.html - linhas 104-140)
- Descreva suas principais áreas de atuação
- Mantenha ou modifique os 4 cards

#### Seção Diferenciais (index.html - linhas 148-174)
- Customize os 6 diferenciais
- Adicione ou remova conforme sua especialidade

#### Seção Portfólio (index.html - linhas 182-243)
- Adicione seus 4 principais projetos
- Links reais para seu GitHub
- Descrição clara do contexto, desafio e solução
- Tags com tecnologias utilizadas

#### Seção Contato (index.html - linhas 251-268)
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
- Fonte principal: System fonts (Apple, Segoe, Roboto)
- Fonte monospace: Courier New (para código)

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

Em `styles.css`, procure por:

```css
--font-family: 'Sua Fonte', sans-serif;
```

Ou importe de Google Fonts adicionando no `<head>` do HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

## 🚀 Publicar Online

### GitHub Pages

1. Crie um repositório no GitHub: `seu-usuario.github.io`
2. Push dos arquivos:
```bash
git init
git add .
git commit -m "Landing page QA"
git branch -M main
git remote add origin https://github.com/seu-usuario/seu-usuario.github.io
git push -u origin main
```
3. Acesse: `https://seu-usuario.github.io`

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
- ✅ Links para GitHub e LinkedIn
- ✅ Responsividade total
- ✅ Código comentado e organizado

## 🚀 Funcionalidades Prontas para Expandir

O JavaScript está preparado para:
- Integração com formulário de contato (EmailJS, Formspree, etc.)
- Animação de imagens (lazy loading)
- Dark mode toggle (sistema detecta preferência do usuário)
- Analytics e rastreamento de seções
- Integração com APIs para dados dinâmicos

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

Última atualização: Janeiro de 2026
