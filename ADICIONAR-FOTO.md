# 📸 Como Adicionar Sua Foto

Sua landing page agora está pronta para receber sua foto profissional!

## ✅ O Que Foi Configurado

- ✅ Pasta criada: `assets/images/`
- ✅ HTML atualizado para exibir a foto
- ✅ CSS com estilos profissionais (borda animada, sombra)
- ✅ Responsivo para mobile

## 📋 Passo a Passo

### 1. Prepare sua foto

Você precisa de uma foto:
- **Formato:** JPG ou PNG
- **Nome:** `profile.jpg` (ou renomear no código)
- **Dimensões ideais:** Quadrada (1000x1000px ou similar)
- **Tamanho:** Até 500KB (mais leve, melhor performance)
- **Estilo:** Profissional, close-up do rosto (como a que você enviou)

### 2. Coloque a foto na pasta correta

1. Vá para: `c:\Users\José Pacheco\Documents\pagina_profissional\assets\images\`
2. Coloque sua foto com o nome: `profile.jpg`

**Ou**, se quiser usar outro nome:
- Edite o `index.html`
- Procure por: `src="assets/images/profile.jpg"`
- Mude `profile.jpg` para o nome de sua foto

### 3. Teste localmente

```bash
cd Documents/pagina_profissional
python -m http.server 8000
```

Acesse: `http://localhost:8000`

Sua foto deve aparecer no lado direito do Hero (ou abaixo no mobile).

### 4. Pronto!

Publique normalmente no GitHub Pages/Vercel/Netlify.

---

## 🎨 Como a Foto Aparecerá

**Desktop:**
```
┌─────────────────────────────────────┐
│  Headline + Subtítulo + CTAs        │
│  (esquerda)                         │  [Sua Foto]
│                                      │  (direita)
│                                      │  - Quadrada
│                                      │  - Borda azul
│                                      │  - Sombra elegante
│                                      │  - Animação float
└─────────────────────────────────────┘
```

**Mobile:**
```
┌─────────────────────┐
│  Headline + Subtítulo│
│  + CTAs             │
│                      │
│  [Sua Foto]         │
│  (stack vertical)   │
└─────────────────────┘
```

---

## 🎯 Características da Foto no Site

- **Formato:** Quadrado, 320x320px (desktop)
- **Border:** Borda azul de 3px
- **Efeito:** Brilho animado ao redor
- **Animação:** Float suave (sobe e desce)
- **Sombra:** Sombra profunda elegante
- **Responsivo:** Reduz para 280x280px em tablet, ajusta em mobile

---

## 📐 Dicas para Melhor Resultado

✅ **Use uma foto de qualidade:** Profissional, bem iluminada
✅ **Fundo limpo:** Azul, cinza ou branco funcionam bem
✅ **Close-up:** Corte do ombro para cima (como foto de LinkedIn)
✅ **Resolução:** Mínimo 800x800px (será redimensionada para 320x320px)
✅ **Compresse:** Use ferramentas como TinyJPG para reduzir tamanho

---

## 🔧 Se Quiser Customizar

### Mudar tamanho da foto
Edite `styles.css`, procure por:
```css
.profile-image-container {
    width: 320px;        /* Mude este valor */
    height: 320px;       /* E este também */
}
```

### Mudar cor da borda
Edite `styles.css`:
```css
.profile-image-border {
    border: 3px solid var(--color-primary);  /* Mude para outra cor */
}
```

### Remover animação
Edite `styles.css`, encontre `borderGlow` e desative a animação.

### Mudar para foto circular
Edite `styles.css`:
```css
.profile-image-container {
    border-radius: 50%;  /* Mude de 16px para 50% */
}
```

---

## ❓ Problemas Comuns

**P: Foto não aparece**
R: Verifique se o arquivo está em `assets/images/profile.jpg` e o nome está correto (case-sensitive em Linux/Mac).

**P: Foto fica distorcida**
R: Use uma foto quadrada. Se for retangular, a foto será cortada (object-fit: cover).

**P: Foto muito grande/pequena**
R: Ajuste a largura e altura em `styles.css` (.profile-image-container).

**P: Foto pixelada**
R: Aumente a resolução da imagem (mínimo 800x800px).

---

## 🚀 Próximo Passo

1. Prepare sua foto
2. Coloque em `assets/images/profile.jpg`
3. Teste localmente
4. Publique normalmente!

**Dúvidas?** Consulte o arquivo `README.md` ou `TECNICO.md`.

---

**Pronto para adicionar sua foto? Você consegue!** 📸✨
