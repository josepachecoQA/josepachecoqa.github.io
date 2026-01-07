# ⚡ Quick Start - Primeiros 10 Minutos

Seu site está 95% pronto. Basta seguir este checklist para ativá-lo em minutos.

## 🎯 Seu Checklist de Ativação

### 1️⃣ Abra o arquivo index.html (2 min)

Faça estas 5 edições rápidas:

**Edição 1: Seu nome na Navbar**
```html
<!-- Procure por linha ~27 -->
<span class="logo-text">JP</span>  <!-- Mude para suas iniciais -->
```

**Edição 2: Hero - Seu Headline**
```html
<!-- Procure por linha ~48 -->
<h1 class="hero-title">
    QA focado em qualidade orientada ao negócio
</h1>

<!-- MUDE PARA (exemplo): -->
<h1 class="hero-title">
    QA que reduz risco e acelera seu produto ao mercado
</h1>
```

**Edição 3: Hero - Seu Subheadline**
```html
<!-- Procure por linha ~49 -->
<p class="hero-subtitle">
    Garanto previsibilidade nos seus produtos...
</p>

<!-- MUDE PARA (exemplo): -->
<p class="hero-subtitle">
    Testes inteligentes que falam a linguagem do negócio. 
    Previno falhas, elimino retrabalho e apoio decisões estratégicas.
</p>
```

**Edição 4: Seção Contato - Seus Links**
```html
<!-- Procure por linhas ~256-265 -->
<a href="https://www.linkedin.com/in/josepacheco" target="_blank">
    <!-- MUDE josepacheco PARA SEU PERFIL -->
</a>

<a href="https://github.com/josepacheco" target="_blank">
    <!-- MUDE josepacheco PARA SEU USUÁRIO -->
</a>

<a href="mailto:seu-email@exemplo.com">
    <!-- MUDE PARA SEU EMAIL REAL -->
</a>
```

**Edição 5: Footer - Seus dados**
```html
<!-- Procure por linha ~274 -->
<p>&copy; 2026 José Pacheco - QA Engineer. Todos os direitos reservados.</p>

<!-- MUDE PARA -->
<p>&copy; 2026 Seu Nome - QA Engineer. Todos os direitos reservados.</p>
```

### 2️⃣ Teste Localmente (3 min)

```bash
# Abra o terminal na pasta do projeto
cd Documents/pagina_profissional

# Inicie um servidor local
python -m http.server 8000

# Abra no navegador
# http://localhost:8000

# Verifique:
✅ Página carrega sem erros
✅ Links funcionam
✅ Responsividade em mobile (F12)
✅ Animações funcionam
```

### 3️⃣ Publique Online (5 min)

**Opção A: GitHub Pages (Mais comum)**

```bash
# Configure Git
git init
git add .
git commit -m "Landing page QA - v1"

# Crie repositório em github.com
# Chame de: seu-usuario.github.io

# Execute esses comandos
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/seu-usuario.github.io.git
git push -u origin main

# Seu site está em: https://seu-usuario.github.io
# (Aguarde 1-2 minutos para ativar)
```

**Opção B: Netlify (Mais rápido)**

```bash
# Simples: Acesse netlify.com
# Arraste e solte a pasta
# Seu site estará pronto em segundos!
```

---

## 📋 Customizações Recomendadas (Próximos 30 min)

Se tiver mais tempo, customize também:

### Portfólio (2-3 projetos seus)
```html
<!-- Procure por linha ~182 -->
<!-- Mude os 4 cards com seus projetos reais -->
```

**Template rápido:**
```html
<div class="portfolio-card">
    <h3>Seu Projeto</h3>
    <p><strong>Contexto:</strong> Breve descrição</p>
    <p><strong>Desafio:</strong> Problema que resolveu</p>
    <p><strong>Solução:</strong> Como resolveu</p>
    <div class="portfolio-tech">
        <span class="tech-tag">Ferramenta1</span>
        <span class="tech-tag">Ferramenta2</span>
    </div>
    <a href="https://github.com/seu-usuario/projeto" target="_blank">
        Ver no GitHub →
    </a>
</div>
```

### Sobre Mim (Sua história)
```html
<!-- Procure por linha ~72 -->
<!-- Reescreva os 3 parágrafos com sua história -->
```

### Números de Experiência
```html
<!-- Procure por linhas ~97-108 -->
<!-- Atualize: Anos em QA, Projetos, Linguagens -->
```

---

## 🎨 Cores (Opcional - 5 min)

Se quiser mudar as cores:

1. Abra `styles.css`
2. Procure por `:root {` (linha ~1)
3. Mude as variáveis:

```css
:root {
    --color-primary: #58a6ff;  /* Azul padrão */
    /* Mude para sua cor favorita (hex code) */
}
```

**Cores prontas:**
- Azul (atual): `#58a6ff` ✅
- Verde: `#3fb950`
- Vermelho: `#da3633`
- Roxo: `#bc8ef1`
- Laranja: `#fb8500`

---

## ✅ Checklist Final

- [ ] Abri o arquivo no editor (VS Code, Sublime, etc)
- [ ] Atualizei Hero headline e subheadline
- [ ] Atualizei links de contato (LinkedIn, GitHub, Email)
- [ ] Atualizei nome no footer
- [ ] Testei localmente (F12 → responsividade)
- [ ] Criei repositório no GitHub
- [ ] Fiz push do código (git push)
- [ ] Meu site está online em: https://seu-usuario.github.io
- [ ] Verifiquei todos os links em produção
- [ ] Compartilhei com recrutadores! 🎉

---

## 🚀 Próximas Etapas Recomendadas

**Curto Prazo (Esta semana):**
- [ ] Customize portfólio com projetos reais
- [ ] Reescreva seção "Sobre" com sua história
- [ ] Adicione links para seus repositórios GitHub
- [ ] Compartilhe em LinkedIn e comunidades

**Médio Prazo (Este mês):**
- [ ] Configure Google Analytics
- [ ] Adicione certificações (se houver)
- [ ] Escreva artigo sobre QA no LinkedIn
- [ ] Peça feedback para mentores

**Longo Prazo (Este ano):**
- [ ] Adicione seção de blog
- [ ] Crie vídeo de apresentação
- [ ] Integre formulário de contato
- [ ] Mude para domínio customizado (seu-nome.com)

---

## 🆘 Dúvidas Rápidas

**P: Meu site não aparece online**
R: Aguarde 1-2 minutos. Verifique se está em repositório público.

**P: Como faço para testar localmente?**
R: Use `python -m http.server 8000` no terminal, depois acesse `http://localhost:8000`

**P: Posso mudar as cores?**
R: Sim! Edite `styles.css` linhas 1-14 (variáveis CSS)

**P: Como adiciono meus projetos?**
R: Procure por "portfolio-card" em `index.html` e customize os 4 cards

**P: Preciso saber HTML/CSS/JS?**
R: Não! Os arquivos estão prontos. Basta fazer replace de textos.

---

## 📞 Recursos Úteis

- [HTML Cheat Sheet](https://www.w3schools.com/whatis/whatis_frontend.asp)
- [Git Commands](https://git-scm.com/book/en/v2)
- [GitHub Pages Setup](https://pages.github.com/)
- [Netlify Drag & Drop](https://app.netlify.com/drop)

---

## 🎓 Dica do Especialista

> "Seu site não precisa ser perfeito para publicar. Publique com 80% de qualidade, 
> depois melhora iterativamente baseado em feedback de recrutadores."

**Comece agora, melhore depois! ⚡**

---

**Tempo estimado:** 10 minutos
**Dificuldade:** ⭐ (Muito fácil)
**Resultado:** Site profissional online 🚀

Boa sorte! Você consegue! 💪
