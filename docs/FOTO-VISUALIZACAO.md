# 📸 Sua Foto na Landing Page - Visualização

## 🎯 Onde Sua Foto Aparecerá

### Desktop (1200px+)

```
┌─────────────────────────────────────────────────────────────────┐
│                      NAVEGAÇÃO FIXA                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  QA focado em qualidade     ┌──────────────────────────┐        │
│  orientado ao negócio       │                          │        │
│                             │    [SUA FOTO]           │        │
│  Garanto previsibilidade... │    Quadrada              │        │
│                             │    Com borda azul        │        │
│  [Ver Portfólio]            │    Brilho animado        │        │
│  [Começar conversa]         │                          │        │
│                             └──────────────────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tablet (768-1199px)

```
┌─────────────────────────────────────┐
│      NAVEGAÇÃO FIXA                 │
├─────────────────────────────────────┤
│                                     │
│  QA focado em qualidade             │
│  orientado ao negócio               │
│                                     │
│  Garanto previsibilidade...         │
│                                     │
│  [Ver Portfólio]                    │
│  [Começar conversa]                 │
│                                     │
│  ┌──────────────────────────────┐   │
│  │                              │   │
│  │    [SUA FOTO]               │   │
│  │    Reduzida para mobile     │   │
│  │                              │   │
│  └──────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Mobile (<768px)

```
┌──────────────────────┐
│  NAVEGAÇÃO           │
├──────────────────────┤
│                      │
│ QA focado em        │
│ qualidade orientada │
│ ao negócio          │
│                      │
│ Garanto            │
│ previsibilidade... │
│                      │
│ [Ver Portfólio]     │
│ [Começar conversa]  │
│                      │
│  ┌────────────────┐  │
│  │                │  │
│  │ [SUA FOTO]    │  │
│  │ Menor         │  │
│  │                │  │
│  └────────────────┘  │
│                      │
└──────────────────────┘
```

---

## 🎨 Estilos da Foto

### Aparência Visual

```
┌─ Borda Azul (#58a6ff) -─┐
│                          │
│   ┌──────────────────┐   │
│   │   [SUA FOTO]     │   │
│   │   (quadrada)     │   │
│   │                  │   │
│   │   Brilho azul    │   │
│   │   animado        │   │
│   └──────────────────┘   │
│                          │
│   Sombra elegante        │
└──────────────────────────┘
```

### Animações

- **Float:** Sobe e desce levemente (3s infinito)
- **Brilho:** Borda pisca com glow azul (2s infinito)
- **Fade-in:** Entra na tela ao carregar (0.8s)

---

## 📐 Dimensões

| Dispositivo | Tamanho |
|-------------|---------|
| Desktop | 320x320px |
| Tablet | 280x280px |
| Mobile | Responsivo |

---

## 🔧 Alterações Feitas

### HTML (`index.html`)

```html
<!-- ANTES -->
<div class="hero-visual">
    <div class="hero-icon">
        <svg>...</svg>
    </div>
</div>

<!-- DEPOIS -->
<div class="hero-visual">
    <div class="profile-image-container">
        <img src="assets/images/profile.jpg" alt="José Pacheco - QA Engineer">
        <div class="profile-image-border"></div>
    </div>
</div>
```

### CSS (`styles.css`)

Adicionado:
- `.profile-image-container` - Container com border-radius
- `.profile-image` - Imagem com object-fit: cover
- `.profile-image-border` - Borda animada
- `@keyframes borderGlow` - Animação do brilho
- Media queries para responsividade

---

## 📋 Próximas Ações

1. **Prepare sua foto**
   - Salve como: `profile.jpg`
   - Tamanho: 800x800px ou maior (quadrada)
   - Qualidade: Profissional, bem iluminada

2. **Coloque na pasta correta**
   ```
   pagina_profissional/
   └─ assets/
      └─ images/
         └─ profile.jpg  ← Sua foto aqui
   ```

3. **Teste localmente**
   ```bash
   python -m http.server 8000
   # Acesse http://localhost:8000
   ```

4. **Publique**
   - Git push (se usar GitHub)
   - Upload (se usar Vercel/Netlify)

---

## ✅ Checklist

- [ ] Foto preparada (quadrada, 800x800px+, até 500KB)
- [ ] Foto salva em: `assets/images/profile.jpg`
- [ ] Testei localmente e a foto aparece
- [ ] Foto se ajusta bem em mobile (F12 → Toggle device)
- [ ] Cores e brilho estão legais
- [ ] Publicado online
- [ ] Compartilhado com recrutadores!

---

**Sua foto profissional agora é destaque na sua landing page! 📸✨**
