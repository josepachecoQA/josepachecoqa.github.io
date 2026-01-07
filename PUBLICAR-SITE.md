# 🚀 GUIA COMPLETO - PUBLICAR SEU SITE

## 📋 ANTES DE COMEÇAR - CHECKLIST

- [ ] Sua foto está em `assets/images/profile.jpg`?
- [ ] Todos os links funcionam em `http://localhost:8000`?
- [ ] Testou em mobile (F12)?
- [ ] Escolheu uma plataforma abaixo?

---

## 🎯 QUAL PLATAFORMA ESCOLHER?

| Plataforma | Tempo | Facilidade | Domínio | Recomendação |
|-----------|-------|-----------|---------|--------------|
| **GitHub Pages** | 5 min | ⭐⭐⭐ | seu-usuario.github.io | ⭐ MELHOR |
| **Vercel** | 3 min | ⭐⭐⭐⭐ | seu-site.vercel.app | ⭐⭐ Muito Bom |
| **Netlify** | 2 min | ⭐⭐⭐⭐⭐ | seu-site.netlify.app | ⭐⭐ Muito Fácil |

**Recomendação:** GitHub Pages (mais popular para portfolios, integrado com GitHub)

---

## ✅ OPÇÃO 1: GITHUB PAGES (Recomendado)

### Pré-requisito:
- Conta GitHub (grátis em github.com)
- Git instalado (ou use GitHub Desktop)

### Passo 1: Criar Repositório

1. Acesse **https://github.com/new**
2. Nome do repositório: **`seu-usuario.github.io`**
   - Exemplo: `josepacheco.github.io`
3. Descrição: "Landing page - QA Engineer"
4. Selecione: **Public**
5. Clique em **"Create repository"**

### Passo 2: Enviar seu código

**Opção A: Usando Git (Recomendado)**

```bash
# 1. Abra terminal na pasta do projeto
cd "C:\Users\José Pacheco\Documents\pagina_profissional"

# 2. Inicialize Git
git init

# 3. Configure seu usuário (uma vez só)
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@gmail.com"

# 4. Adicione todos os arquivos
git add .

# 5. Crie primeiro commit
git commit -m "Landing page QA Engineer - v1.0"

# 6. Mude para branch main
git branch -M main

# 7. Adicione repositório remoto (COPIE do GitHub)
git remote add origin https://github.com/SEU-USUARIO/seu-usuario.github.io.git

# 8. Envie o código
git push -u origin main
```

**Opção B: Usando GitHub Desktop (Mais Fácil)**

1. Baixe GitHub Desktop em **desktop.github.com**
2. Abra GitHub Desktop
3. Clique em "Add" → "Add Local Repository"
4. Selecione a pasta `pagina_profissional`
5. Clique em "Publish repository"
6. Digite o nome: `seu-usuario.github.io`
7. Clique em "Publish"

### Passo 3: Pronto! 🎉

Seu site estará em: **https://seu-usuario.github.io**

**Exemplo:** Se seu GitHub é `josepacheco`, fica: **https://josepacheco.github.io**

⏱️ Pode levar **1-2 minutos** para ativar.

---

## 🚀 OPÇÃO 2: VERCEL (Muito Rápido)

### Pré-requisito:
- Conta Vercel (free em vercel.com)

### Passo 1: Conectar GitHub

1. Acesse **https://vercel.com**
2. Clique em "Sign up" → "Continue with GitHub"
3. Autorize Vercel

### Passo 2: Importar Projeto

1. Clique em **"New Project"**
2. Selecione **"Import Git Repository"**
3. Cole a URL do seu repositório GitHub:
   ```
   https://github.com/seu-usuario/seu-usuario.github.io
   ```
4. Clique em **"Import"**

### Passo 3: Deploy

1. Framework: **"Other"** (HTML/CSS/JS)
2. Clique em **"Deploy"**
3. Espere ~30 segundos ⏳

### Pronto! 🎉

Seu site estará em: **https://seu-site.vercel.app**

---

## 🎈 OPÇÃO 3: NETLIFY (Mais Fácil)

### Pré-requisito:
- Conta Netlify (free em netlify.com)

### Passo 1: Fazer Login

1. Acesse **https://app.netlify.com**
2. Clique em **"Sign up"**
3. Escolha **"GitHub"** para autorizar

### Passo 2: Fazer Deploy

1. **Opção A (Recomendada):**
   - Clique em **"New site from Git"**
   - Selecione **GitHub**
   - Escolha o repositório `seu-usuario.github.io`
   - Clique em **"Deploy"**

2. **Opção B (Mais Fácil):**
   - Arraste a pasta `pagina_profissional` para a área de deploy
   - Pronto! Site está online em 10 segundos

### Pronto! 🎉

Seu site estará em: **https://seu-site-aleatorio.netlify.app**

---

## 📝 COMPARATIVO FINAL

| Recurso | GitHub Pages | Vercel | Netlify |
|---------|------------|--------|---------|
| Custo | Grátis | Grátis | Grátis |
| Setup | 5 min | 3 min | 2 min |
| Velocidade | Ótima | Excelente | Excelente |
| Domínio Customizado | ✅ Sim | ✅ Sim | ✅ Sim |
| CI/CD | ✅ Automático | ✅ Automático | ✅ Automático |
| Suporte | GitHub Docs | Vercel Docs | Netlify Docs |

---

## 🎯 PRÓXIMOS PASSOS APÓS PUBLICAR

### 1. Testar Online
- [ ] Acesse seu site público
- [ ] Teste todos os links
- [ ] Verifique responsividade em mobile

### 2. Adicionar ao LinkedIn
```
1. Abra seu LinkedIn
2. Vá para "Sobre"
3. Em "Sites pessoais", clique em "+"
4. Cole: https://seu-usuario.github.io
5. Marque como "Portfolio"
```

### 3. Compartilhar
- [ ] LinkedIn
- [ ] WhatsApp Status
- [ ] Email para recrutadores
- [ ] GitHub Profile

### 4. Configurar Domínio Customizado (Opcional)

Se quiser um domínio próprio (ex: josepacheco.com):

**Comprar domínio:**
- Godaddy, Namecheap, Registro.br (Brasil)
- ~R$ 30-50 por ano

**Configurar:**

**GitHub Pages:**
1. Vá a: `seu-repositorio` → Settings → Pages
2. Em "Custom domain", coloque: `seu-dominio.com`
3. No site de domínio, configure DNS apontando para GitHub Pages

**Vercel/Netlify:**
- Interface visual para conectar domínio
- Siga os passos automáticos

---

## ✅ CHECKLIST FINAL

- [ ] Escolheu plataforma (GitHub Pages recomendado)
- [ ] Criou repositório/conta
- [ ] Enviou código
- [ ] Testou site público
- [ ] Verificou todos os links
- [ ] Testou em mobile
- [ ] Compartilhou no LinkedIn
- [ ] Enviou para recrutadores

---

## 🆘 TROUBLESHOOTING

### Site não aparece após publicar

**GitHub Pages:**
```
1. Aguarde 1-2 minutos
2. Vá a: seu-repo → Settings → Pages
3. Confirme que está em: "Deploy from branch: main"
4. Limpe cache: Ctrl+Shift+Delete
```

**Vercel/Netlify:**
```
1. Verifique se houve erro no deploy
2. Clique em "Redeploy"
3. Limpe cache do navegador
```

### Links quebrados

```
1. Verifique se caminhos relativos estão corretos
2. Certifique-se de que arquivos CSS/JS foram enviados
3. Teste em http://localhost:8000 antes
```

### Foto não aparece

```
1. Confirme que está em: assets/images/profile.jpg
2. Verifique se foi enviada ao repositório
3. Limpe cache do navegador (Ctrl+F5)
```

---

## 📊 MÉTRICAS PÓS-PUBLICAÇÃO

Após publicar, você pode:

**GitHub Pages:**
- Ver insights: `seu-repo` → "Insights"

**Vercel:**
- Analytics nativo no dashboard

**Netlify:**
- Aba "Analytics" (plano premium)

**Google Analytics (Todos):**
```html
<!-- Adicione no <head> para rastrear visitas -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
```

---

## 🎉 VOCÊ CONSEGUE!

**Tempo total:** 5-10 minutos
**Resultado:** Site profissional online para impressionar recrutadores

Qual plataforma você vai escolher?

- [ ] GitHub Pages (Recomendado)
- [ ] Vercel (Muito rápido)
- [ ] Netlify (Mais fácil)

Depois que decidir, posso ajudar no passo a passo! 🚀
