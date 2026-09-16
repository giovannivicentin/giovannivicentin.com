# Carregamento inicial — 14 de setembro de 2026

O relatório publicado apontou a `.hero-intro` como LCP, com 2.540 ms de atraso
na renderização. O parágrafo agora permanece visível desde o HTML inicial:
não participa da sequência de opacidade iniciada após hidratação. O título e
os demais efeitos de entrada continuam animados.

A paleta mantém o botão e o atalho no bundle inicial. Seu diálogo, busca e
comandos são carregados por `next/dynamic` na primeira abertura. Depois disso,
o componente permanece montado para preservar o fechamento do Radix e a
restauração de foco. O status de cópia é limpo ao abrir o diálogo.

O Tailwind agora detecta classes apenas em `src/`, evitando gerar utilitários
citados em documentação, testes e instruções locais.

## Comparação local

Builds de produção com Turbopack, Chromium headless, CPU 4×, três contextos
novos por dispositivo, sem limitação de rede. Profiler existente:
`npm run profile:motion`, com o servidor na porta 3100. As medições ocorreram
sem testes simultâneos. Dados brutos em
[profiling/performance-2026-09-14.json](profiling/performance-2026-09-14.json).

| Métrica                                |     Antes |    Depois |
| -------------------------------------- | --------: | --------: |
| CSS bruto                              |  62.829 B |  54.448 B |
| CSS gzip local                         |  13.185 B |  11.677 B |
| JavaScript inicial desktop, comprimido | 250.564 B | 243.948 B |
| JavaScript inicial mobile, comprimido  | 245.113 B | 238.497 B |
| LCP desktop, mediana                   |     92 ms |     92 ms |
| LCP mobile, mediana                    |     88 ms |    100 ms |
| CLS, todos os contextos                |         0 |         0 |

A redução de transferência foi de 11,4% no CSS gzip e 6.616 B no JavaScript
inicial. Não foi demonstrada melhoria de LCP nesta amostra local; os tempos não
são comparáveis diretamente ao PageSpeed publicado. Repetir o PageSpeed após
deploy, nas mesmas condições, e acompanhar os dados de campo.

## Validação e limites

Build e lint passaram. Na suíte de 42 testes, 40 passaram de primeira. Duas
expectativas antigas dos logos foram atualizadas para o CSS já existente:
`brightness(0) invert(0.6)` na apresentação e logos com texto alternativo no
celular, onde os nomes visuais são ocultos. Os dois testes passaram na repetição.
A suíte inclui teclado, foco, idiomas, acessibilidade, layouts responsivos,
conteúdo sem JavaScript e amostragem da opacidade do parágrafo durante hidratação.

O CSS continua bloqueando a pintura para entregar o layout correto. A opção
[`inlineCss`](https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss)
é experimental e não foi habilitada. Os polyfills apontados no relatório são
importados pelo runtime do Next.js (`next/dist/client/app-globals.js`); não foram
removidos nem substituídos por aliases de módulos internos. Parte do JavaScript
não usado na primeira tela é necessária às interações posteriores.

Referências: [detecção de classes do Tailwind](https://tailwindcss.com/docs/detecting-classes-in-source-files)
e [carregamento sob demanda no Next.js](https://nextjs.org/docs/app/guides/lazy-loading).
