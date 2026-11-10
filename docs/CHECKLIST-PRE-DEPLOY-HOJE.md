# ✅ Checklist Pré-Deploy (Executado)

Data: **2026-03-08**
Projeto: **Landing + QA Mini Lab**

## 1) Validações Técnicas (automáticas)

- [x] Testes unitários executados
  - Comando: `npm run test:unit`
  - Resultado: **8/8 passing**

- [x] Testes E2E completos executados
  - Comando: `npx cypress run`
  - Resultado: **42/42 passing**
    - landing-page: 31
    - qa-lab: 7
    - qa-lab-challenge: 4

- [x] Build de entrega executado
  - Comando: `npm run build`
  - Resultado: **Build completo. Pronto para publicação.**

- [x] Smoke pós-ajuste executado
  - Comando: `npx cypress run --spec cypress/e2e/landing-page.cy.js`
  - Resultado: **31/31 passing**

## 2) Conteúdo e UX

- [x] Landing original preservada
- [x] Card do QA Lab adicionado no portfólio
- [x] Botão lateral para QA Lab com tooltip explicativo
- [x] QA Lab com trilha didática profissional (objetivo, critérios, dicas)
- [x] Simulador de API com cenários 200/401/500/timeout
- [x] Checklist de evidências esperado vs atual com score

## 3) Documentação

- [x] Snapshot técnico completo criado: `README-ESTADO-ATUAL.md`
- [x] README principal atualizado para refletir escopo atual
- [x] Gabarito de mentoria do modo desafio criado

## 4) Pendência técnica controlada (não bloqueia deploy)

- [ ] Warning do Cypress sobre `allowCypressEnv`
  - Motivo: plugin `@cypress/code-coverage` usa `Cypress.env()` no browser.
  - Status atual: **mantido compatível para não quebrar a suite**.
  - Ação futura recomendada: migrar suporte de coverage para fluxo compatível com `cy.env()/Cypress.expose()` e então desabilitar `allowCypressEnv`.

## 5) Passos finais para publicar (manuais)

### Opção A — GitHub Pages

1. Garantir branch e remoto:
   - `git add .`
   - `git commit -m "release: landing + qa lab pronto para deploy"`
   - `git push origin main`
2. No GitHub: **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / folder: **/**

### Opção B — Vercel/Netlify

1. `git add .`
2. `git commit -m "release: pronto para produção"`
3. `git push origin main`
4. Importar repositório na plataforma e publicar

## 6) Critério de saída de hoje

✅ Projeto está tecnicamente pronto para subir com regressão verde e documentação de continuidade.
