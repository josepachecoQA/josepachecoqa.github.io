# README — Estado Atual do Projeto

## Objetivo deste documento
Registrar com precisão o estado atual do projeto (landing + QA Lab) para continuidade de evolução sem perda de contexto.

Data de referência: **2026-03-08**

---

## Visão Geral
Este repositório contém:

1. **Landing page profissional** de QA Engineer (site principal)
2. **QA Mini Lab** (projeto separado, acessível por botão lateral e por card no portfólio)
3. **Suite de testes E2E com Cypress** para landing e laboratório
4. **Métricas de qualidade** consumidas por dashboard na landing

---

## Estado Funcional Confirmado

### Landing (`index.html`)
- Mantida com identidade original da página pessoal/profissional
- Possui card de projeto no portfólio para o QA Lab
- Possui botão lateral fixo (`side-lab`) direcionando para `qa-lab.html`
- Tooltip explicativo no hover/focus do botão lateral
- Dashboard de métricas funcionando via `metrics/quality-metrics.json`

### QA Lab (`qa-lab.html` + `qa-lab.js` + `qa-lab.css`)
- Missões práticas de QA (6 missões)
- Fluxos simulados: cadastro, login, perfil, bug report, catálogo de cenários
- Persistência local via `localStorage`
- Exportação de bug report em Markdown (clipboard)
- Modo desafio com bugs pedagógicos intencionais (chave)
- Log de atividades para rastreabilidade
- Simulador de API com latência e falhas (200, 401, 500, timeout)
- Checklist de evidências por chamada (status, mensagem e SLA) com score esperado x atual

### Testes (`cypress/e2e`)
- `landing-page.cy.js` cobre navegação, conteúdo, portfolio, dashboard, SEO, responsividade e botão lateral QA Lab
- `qa-lab.cy.js` cobre fluxos principais do laboratório
- `qa-lab-challenge.cy.js` cobre comportamento do modo desafio

Status recente validado: **suite da landing passando (31/31)**.

---

## Estrutura Principal de Arquivos

- `index.html` — landing principal
- `styles.css` — estilos globais (inclui sidebar QA Lab)
- `script.js` — lógica da landing/dashboard
- `qa-lab.html` — interface do laboratório
- `qa-lab.css` — estilos dedicados do laboratório
- `qa-lab.js` — regras e interações do laboratório
- `qa-lab-rules.js` — regras puras compartilhadas (browser + testes unitários)
- `tests/qa-lab-rules.test.js` — testes unitários de validação/filtro/ordenação/paginação
- `cypress/e2e/landing-page.cy.js` — e2e da landing
- `cypress/e2e/qa-lab.cy.js` — e2e do lab
- `cypress/e2e/qa-lab-challenge.cy.js` — e2e modo desafio
- `metrics/quality-metrics.json` — fonte das métricas

---

## Decisões de Produto já tomadas

1. **QA Lab é projeto separado**, não substituição da landing
2. **Acesso ao QA Lab** por:
   - card no portfólio
   - botão lateral persistente
3. **Didática por prática**: o lab prioriza execução de fluxos reais de teste
4. **Modo desafio** ativo por chave para mentoria e avaliação

---

## Limitações atuais (conhecidas)

1. Lógica do lab é 100% client-side (sem backend real)
2. Chave de desafio visível no front-end (adequado apenas para fim educacional)
3. Cobertura ainda concentrada em E2E (falta camada de testes unitários para regras puras)
4. README principal ainda estava focado na landing (em atualização)

---

## Próximos passos profissionais recomendados

### Prioridade alta
- Estruturar trilha didática por missão com:
  - objetivo de aprendizado
  - critérios de conclusão
  - dicas progressivas
- Melhorar acessibilidade dos feedbacks (`aria-live`, foco e semântica)
- Cobrir casos de borda dos fluxos com Cypress

### Prioridade média
- Extrair funções puras de validação/ordenação/paginação para permitir testes unitários
- Incluir simulação de falhas de integração (latência/erro/timeout)
- Criar rubric de avaliação para mentoria (iniciante/pleno/sênior)

---

## Como rodar localmente

```bash
npm install
npm start
```

Acessos:
- Landing: `http://localhost:8000`
- QA Lab: `http://localhost:8000/qa-lab.html`

---

## Como testar

```bash
npx cypress run --spec cypress/e2e/landing-page.cy.js
npx cypress run --spec cypress/e2e/qa-lab.cy.js
npx cypress run --spec cypress/e2e/qa-lab-challenge.cy.js
npm run test:unit
npm run test:qa
```

---

## Nota de continuidade
Este documento deve ser atualizado a cada marco de mudança estrutural (UX, arquitetura, testes, ou didática), mantendo histórico claro para evolução colaborativa.
