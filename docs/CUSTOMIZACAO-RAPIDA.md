# 🎯 Guia Rápido de Customização

Este arquivo contém os principais pontos que você **deve** editar para personalizar a landing page para seu perfil.

## 1️⃣ SEÇÃO HERO (Impacto Máximo)

**Arquivo:** `index.html` - Linhas 45-63

### O que mudar:
```html
<!-- ANTES -->
<h1 class="hero-title">QA focado em qualidade orientada ao negócio</h1>
<p class="hero-subtitle">Garanto previsibilidade nos seus produtos...</p>

<!-- DEPOIS - Customize com sua proposta de valor -->
<h1 class="hero-title">Meu Headline Único</h1>
<p class="hero-subtitle">Minha proposta de valor específica...</p>
```

**💡 Dica:** Mantenha a headlines concisas (máx 10-15 palavras)

---

## 2️⃣ SEÇÃO SOBRE (Quem Você É)

**Arquivo:** `index.html` - Linhas 71-96

### O que mudar:
```html
<p>Reescreva sua apresentação profissional aqui...</p>
<p>Foque em: Experiência, visão estratégica, diferenciais.</p>
```

### Números de Estatísticas (Linhas 97-108):
```html
<span class="stat-number">5+</span>    <!-- Mude para seus anos -->
<span class="stat-label">Anos em QA</span>

<span class="stat-number">15+</span>   <!-- Mude para seus projetos -->
<span class="stat-label">Projetos</span>

<span class="stat-number">3</span>     <!-- Suas linguagens/ferramentas -->
<span class="stat-label">Linguagens de Automação</span>
```

---

## 3️⃣ SEÇÃO O QUE FAÇO (Serviços)

**Arquivo:** `index.html` - Linhas 104-140

Customize os 4 cards com seus serviços:

```html
<div class="servico-card">
    <h3>Seu Serviço 1</h3>
    <p>Descrição do que você faz nesta área...</p>
</div>
```

**Sugestão:** Mantenha os 4 serviços principais:
- Testes Manuais/Exploratórios
- Automação de Testes
- Testes de APIs
- Qualidade Integrada

---

## 4️⃣ SEÇÃO DIFERENCIAIS (Por que você?)

**Arquivo:** `index.html` - Linhas 148-174

Customize os 6 diferenciais com seus pontos fortes:

```html
<div class="diferencial-item">
    <h3>🎯 Seu Diferencial</h3>
    <p>Descrição clara e concisa do seu diferencial...</p>
</div>
```

**Exemplos:**
- 🤖 IA e automação
- 🗣️ Comunicação
- 📊 Orientação ao negócio
- 🔄 Mentalidade ágil
- ⚡ Autonomia técnica
- 🧠 Pensamento crítico

---

## 5️⃣ SEÇÃO PORTFÓLIO (Seus Projetos)

**Arquivo:** `index.html` - Linhas 182-243

### Template para cada projeto:

```html
<div class="portfolio-card">
    <h3>Nome do Seu Projeto</h3>
    <p><strong>Contexto:</strong> Qual era a situação?</p>
    <p><strong>Desafio:</strong> Qual problema você resolveu?</p>
    <p><strong>Solução:</strong> Como você resolveu?</p>
    <div class="portfolio-tech">
        <span class="tech-tag">Ferramenta1</span>
        <span class="tech-tag">Ferramenta2</span>
    </div>
    <a href="https://github.com/seu-usuario/projeto" target="_blank" class="portfolio-link">Ver no GitHub →</a>
</div>
```

### Guia:
1. **Nome do Projeto**: Simples e descritivo
2. **Contexto**: O que era o projeto?
3. **Desafio**: Qual era o problema?
4. **Solução**: Como você resolveu?
5. **Tech Tags**: Tecnologias usadas (max 3-4)
6. **GitHub Link**: Link para seu repositório

**💡 Dica:** Use números para impacto: "Reduzi retrabalho em 70%"

---

## 6️⃣ SEÇÃO CONTATO (Call to Action)

**Arquivo:** `index.html` - Linhas 251-268

```html
<!-- Atualize seus links -->
<a href="https://www.linkedin.com/in/SEU-PERFIL" target="_blank">...</a>
<a href="https://github.com/SEU-USUARIO" target="_blank">...</a>
<a href="mailto:seu-email@exemplo.com">...</a>
```

**Para ativar links corretamente:**
1. Perfil LinkedIn: `linkedin.com/in/seu-usuario`
2. GitHub: `github.com/seu-usuario`
3. Email: `seu-email@exemplo.com`

---

## 🎨 CORES E ESTILO

**Arquivo:** `styles.css` - Linhas 1-14

Se quiser mudar as cores (GitHub Dark para outra paleta):

```css
:root {
    --color-dark: #0d1117;          /* Fundo principal */
    --color-primary: #58a6ff;       /* Azul principal */
    --color-accent: #79c0ff;        /* Azul claro */
    --color-text: #c9d1d9;          /* Texto branco */
}
```

### Paletas Prontas:

**Opção 1: Minimalista (Atual - Recomendado)**
```css
--color-dark: #0d1117;
--color-primary: #58a6ff;
--color-text: #c9d1d9;
```

**Opção 2: Elegante**
```css
--color-dark: #1a1a2e;
--color-primary: #16c784;
--color-text: #eaeaea;
```

**Opção 3: Profissional Clássico**
```css
--color-dark: #1e1e1e;
--color-primary: #0052a3;
--color-text: #f0f0f0;
```

---

## 📱 CHECKLIST DE CUSTOMIZAÇÃO

- [ ] Atualizei o headline do hero
- [ ] Reescrevi a seção "Sobre mim"
- [ ] Customize os números de estatísticas
- [ ] Personalizei os 4 serviços
- [ ] Customize os 6 diferenciais
- [ ] Adicionei meus 4 projetos do portfólio
- [ ] Atualizei links do LinkedIn e GitHub
- [ ] Coloquei meu email real
- [ ] Testei em mobile (F12 → Toggle device)
- [ ] Verifiquei todos os links
- [ ] Fiz um teste final no navegador

---

## 🚀 PRÓXIMOS PASSOS

1. **Publicar:**
   - GitHub Pages (grátis)
   - Vercel (muito rápido)
   - Netlify (simples)

2. **Integrar (opcional):**
   - Google Analytics
   - Form de contato (EmailJS)
   - Blog ou seção de artigos

3. **Otimizar (avançado):**
   - SEO (meta tags, schema.org)
   - Performance (minificação, cache)
   - A/B testing de CTAs

---

## 📞 SUPORTE RÁPIDO

**Problema:** Página não carrega

**Solução:**
```bash
# Verifique se está em um servidor local:
python -m http.server 8000
# Acesse: http://localhost:8000
```

**Problema:** Links não funcionam

**Solução:**
- Certifique-se de usar `https://` nas URLs
- Verifique espaços em branco nas URLs
- Teste os links em outro navegador

**Problema:** Design diferente no celular

**Solução:**
- Pressione F12 → Toggle device toolbar
- Teste em resolução 375px, 768px, 1920px
- Veja as media queries em `styles.css` linhas 615+

---

**Pronto?** Customize, teste, e publique! 🚀

---

*Última atualização: Janeiro 2026*
