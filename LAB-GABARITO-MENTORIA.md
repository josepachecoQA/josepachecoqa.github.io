# Gabarito de Mentoria — QA Mini Lab (Modo Desafio)

Este documento descreve os bugs pedagógicos ativados quando o laboratório está em modo desafio.

## Como ativar

- URL: `qa-lab.html?challenge=1&key=QA-LAB-CHAVE-2026`
- Ou usar a seção **Modo desafio** dentro do próprio lab.

## Bugs intencionais ativos

### 1) Validação de e-mail permissiva no cadastro
- **Comportamento esperado:** exigir e-mail completo com domínio (ex.: `ana@qa.com`).
- **Comportamento em desafio:** aceita e-mail sem TLD (ex.: `ana@qa`).
- **Tipo:** validação funcional.

### 2) Limite de bio inconsistente no perfil
- **Comportamento esperado:** permitir até 160 caracteres.
- **Comportamento em desafio:** bloqueia acima de 120 caracteres.
- **Tipo:** regra de negócio / UX inconsistente.

### 3) Severidade crítica rebaixada no bug report
- **Comportamento esperado:** manter severidade escolhida no formulário.
- **Comportamento em desafio:** ao selecionar `critica`, o dado salvo vira `media`.
- **Tipo:** integridade de dados.

### 4) Ordenação por risco (alto → baixo) invertida
- **Comportamento esperado:** cenários de risco alto aparecem primeiro.
- **Comportamento em desafio:** a ordenação é invertida (baixo → alto).
- **Tipo:** lógica de ordenação.

## Sugestão de avaliação em mentoria

- **Detecção:** quantos bugs foram encontrados e reproduzidos.
- **Clareza:** qualidade do bug report (passos, esperado, atual, evidência).
- **Priorização:** coerência na severidade/impacto.
- **Automação:** capacidade de transformar achados em testes E2E.

## Dica para sessão ao vivo

1. Primeiro executar testes exploratórios manuais.
2. Depois formalizar cenários em checklist.
3. Em seguida automatizar ao menos 2 bugs com Cypress.
4. Fechar com discussão de causa-raiz e prevenção.
