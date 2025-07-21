# ExprEdu - Compilador Educacional de Expressões Matemáticas

## Integrantes

- Matheus Brant — Matrícula: [222037737] — Turma: [18h]

## Introdução

**ExprEdu** é um projeto educacional interativo desenvolvido com o objetivo de ensinar os conceitos fundamentais de compiladores. Ele simula, de maneira visual e acessível, as etapas da compilação de expressões matemáticas simples, incluindo análise léxica, sintática e avaliação.

O sistema aceita expressões como `2 * (3 + x)` ou `a * (b + 2)` e realiza:

- Tokenização da expressão
- Construção da árvore sintática (AST)
- Visualização da árvore
- Avaliação da expressão com ou sem substituição de variáveis
- Explicação passo a passo da ordem de execução

A linguagem aceita é simples, composta por números reais, variáveis alfabéticas, operadores aritméticos (`+`, `-`, `*`, `/`) e parênteses. A avaliação respeita a precedência usual dos operadores e a associatividade à esquerda.

Exemplos válidos:

- `2 + 3 * 4`
- `a * (b + 2)`
- `-x + 5`
- `(1 + 2) * (3 + 4)`

## Instalação

### Pré-requisitos

- Node.js versão 16 ou superior
- npm ou yarn

### Passos para execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/fcte-compiladores/trabalho-final-trabalho_compiladores_final.git
   cd expredu
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   ```
   http://localhost:5173
   ```

### Executar os testes

Para executar os testes unitários:
```bash
npm run test
```


## Exemplos

O projeto inclui exemplos variados com diferentes níveis de complexidade. Alguns exemplos básicos:

### Exemplo 1: Precedência de operadores

Entrada:
```
2 + 3 * 4
```
Resultado:
```
14
```
Explicação:
```
A multiplicação ocorre antes da adição.
```

### Exemplo 2: Uso de parênteses

Entrada:
```
(2 + 3) * 4
```
Resultado:
```
20
```

### Exemplo 3: Variáveis com substituição

Entrada:
```
a * (b + 2)
```
Variáveis:
```
a = 3, b = 1
```
Resultado:
```
9
```


## Referências

- **Crafting Interpreters** – Robert Nystrom  
  Utilizado como referência conceitual para estrutura de AST, parsing recursivo e etapas de execução.

- **Dragon Book** – Compilers: Principles, Techniques, and Tools  
  Utilizado como base teórica para a estrutura de compiladores.

- **Modern Compiler Implementation** – Andrew Appel  
  Apoio na organização modular das fases do compilador.

Todas as implementações foram feitas do zero. Não foi utilizado código de terceiros, apenas conceitos e algoritmos descritos nas referências acima e IA para o frontend.

## Estrutura do Código

O projeto está dividido em dois grandes blocos: **frontend** (interface) e **backend** (núcleo do compilador). O foco aqui é o backend.

### Módulos principais do compilador

- `lexer.ts`  
  Responsável pela análise léxica: transforma a string de entrada em uma lista de tokens.

- `parser.ts`  
  Implementa um parser recursivo que constrói a AST a partir dos tokens.

- `compiler.ts`  
  Define os tipos TypeScript para os nós da AST, tokens e erros.

- `evaluator.ts`  
  Avalia a AST com ou sem substituição de variáveis. Inclui versão step-by-step com descrição textual da ordem de execução.

- `visualizer.ts`  
  Percorre a AST e gera uma visualização em árvore ASCII.

### Componentes de interface (frontend)

- `ExpressionCompiler.tsx`  
  Componente principal que conecta o compilador ao input do usuário.

- `InputPanel.tsx`  
  Componente de entrada da expressão e definição de variáveis.

- `ResultsPanel.tsx`  
  Componente que exibe tokens, AST e resultado da avaliação.

### Tecnologias utilizadas

- React + TypeScript  
- Tailwind CSS  
- Vite (build)  
- Vitest + Testing Library (testes)  
- Lucide React (ícones)

## Bugs, Limitações e Possíveis Melhorias

- A linguagem ainda não suporta exponenciação (`^`), módulo (`%`), funções matemáticas ou operadores lógicos.
- A análise de erros pode ser melhorada com mensagens específicas por tipo de erro e uso de `CompilerError` com posição detalhada.
- A AST só é visualizada como texto (ASCII). Futuramente, poderia ser exibida como gráfico com `viz.js`.
- Não há análise semântica completa (ex: verificação de tipos).

