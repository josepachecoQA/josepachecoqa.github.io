# 🚀 Guia Rápido de Deploy

Escolha sua plataforma e siga o passo a passo para publicar sua landing page online.

## ⚡ OPÇÃO 1: GitHub Pages (Recomendado - Grátis)

### Pré-requisito:
- Conta no GitHub (grátis)
- Git instalado

### Passo a Passo:

#### 1. Criar repositório no GitHub

1. Vá para [github.com/new](https://github.com/new)
2. Nome do repositório: `seu-usuario.github.io`
   - (Substitua `seu-usuario` por seu nome de usuário GitHub)
3. Descrição: "Landing page - QA Engineer"
4. Selecione "Public"
5. Clique em "Create repository"

#### 2. Clone localmente

```bash
cd Documents/pagina_profissional
git init
git add .
git commit -m "Inicial: Landing page QA Engineer"
```

#### 3. Conectar com seu repositório

```bash
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/seu-usuario.github.io.git
git push -u origin main
```

#### 4. Pronto! 🎉

Seu site está em: `https://seu-usuario.github.io`

**Nota:** Pode levar 1-2 minutos para ficar online.

---

## ⚡ OPÇÃO 2: Vercel (Muito Rápido)

### Pré-requisito:
- Conta no Vercel (pode usar GitHub)

### Passo a Passo:

#### 1. Acesse Vercel

Vá para [vercel.com](https://vercel.com)

#### 2. Importar Projeto

1. Clique em "New Project"
2. Selecione "Import Git Repository"
3. Cole a URL do seu repositório GitHub
4. Clique em "Import"

#### 3. Configurar

- Framework Preset: "Other" (HTML/CSS/JS)
- Clique em "Deploy"

#### 4. Pronto! 🎉

Seu site está em: `https://seu-projeto.vercel.app`

**Alternativa (sem GitHub):**

1. Vá para [vercel.com/new](https://vercel.com/new)
2. Clique em "Deploy a template" → Procure por "Static HTML"
3. Faça upload dos arquivos (HTML, CSS, JS)

---

## ⚡ OPÇÃO 3: Netlify (Simples)

### Pré-requisito:
- Conta no Netlify (grátis)

### Passo a Passo:

#### 1. Acesse Netlify

Vá para [netlify.com](https://netlify.com)

#### 2. Drag & Drop

1. Clique em "Deploys"
2. Arraste a pasta `pagina_profissional` para a área de deploy
3. Espere o upload terminar

#### 3. Pronto! 🎉

Seu site está em: `https://seu-site-aleatorio.netlify.app`

**Para domínio customizado:**
1. Vá para "Site settings"
2. Clique em "Change site name"
3. Digite seu nome customizado

---

## 🔧 APÓS PUBLICAR - PRÓXIMOS PASSOS

### 1. Testar em Produção
```bash
# Acesse seu site e verifique:
- Todos os links funcionam
- Responsividade em mobile (F12)
- Animações funcionam
- Formulários (se houver)
```

### 2. Configurar Domínio Customizado (Opcional)

Se quer um domínio próprio (ex: seu-site.com):

#### Comprar domínio:
- Godaddy, Namecheap, HostGator, Registro.br

#### Configurar em GitHub Pages:
1. Vá ao repositório → Settings
2. Procure por "Pages"
3. Em "Custom domain", coloque seu domínio
4. No site de domínios, configure DNS para apontar para GitHub Pages

[Instruções detalhadas](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

#### Configurar em Vercel/Netlify:
- Ambos têm interface visual para configurar domínio
- Siga os passos na aba "Domains"

### 3. Google Analytics (Opcional)

Para rastrear visitas:

1. Vá para [google.com/analytics](https://google.com/analytics)
2. Crie uma propriedade para seu site
3. Copie o ID (GA-XXXXXXXX)
4. Adicione ao `index.html` antes de `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA-XXXXXXXX');
</script>
```

### 4. SEO Básico

Edite o `index.html` para melhorar busca no Google:

```html
<meta name="description" content="Seu headline aqui">
<meta name="keywords" content="QA, Testing, Quality Assurance">
<title>Seu Nome - QA Engineer</title>
```

---

## 📝 CHECKLIST DE DEPLOY

- [ ] Customizei todo o conteúdo (nome, LinkedIn, GitHub, email)
- [ ] Testei links em local (http://localhost:8000)
- [ ] Testei responsividade em mobile
- [ ] Git commit realizado
- [ ] Repositório criado no GitHub/Vercel/Netlify
- [ ] Código enviado (push/upload)
- [ ] Site está acessível online
- [ ] Verifiquei animações e funcionalidades

---

## 🐛 TROUBLESHOOTING

### Site não aparece

**GitHub Pages:**
```
- Aguarde 1-2 minutos
- Verifique se está em repositório público
- Vá para Settings → Pages → Confirme que está ativo
```

**Vercel/Netlify:**
```
- Verifique se o arquivo index.html está na raiz
- Cheque a aba "Deployments" para ver logs de erro
```

### Links quebrados

```
- Certifique-se de usar URLs absolutas (https://...)
- Verifique espaços em branco nas URLs
- Teste manualmente cada link
```

### Página lenta

```
- Comprima imagens (se adicionar)
- Minifique CSS/JS em produção
- Use cache do navegador
- Considere CDN
```

---

## 📊 MONITORAR TRÁFEGO

Após publicar, você pode rastrear:

1. **GitHub Pages:** Gráficos nativos em Settings → Pages
2. **Vercel:** Dashboard com analytics nativo
3. **Netlify:** Aba Analytics (plano pago) ou Google Analytics

---

## ✨ MELHORIAS FUTURAS

Após o primeiro deploy, considere:

- [ ] Adicionar imagem de perfil (seção Hero)
- [ ] Integrar formulário de contato (EmailJS, Formspree)
- [ ] Blog com artigos sobre QA
- [ ] Seção de certificações
- [ ] Video de apresentação
- [ ] Dark mode toggle
- [ ] Tradução (EN/PT)

---

## 🆘 SUPORTE

**GitHub Pages:** [docs.github.com/pages](https://docs.github.com/pages)

**Vercel:** [vercel.com/docs](https://vercel.com/docs)

**Netlify:** [netlify.com/resources](https://netlify.com/resources)

---

**Pronto para ir ao ar?** 🚀 Escolha uma opção acima e publique em menos de 5 minutos!
