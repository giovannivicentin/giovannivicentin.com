# Movimento do portfólio

## Arquitetura

- `src/components/motion/experience-provider.tsx`: política de movimento compartilhada, `LazyMotion` com `domAnimation`, navegação por âncoras e ciclo de vida do Lenis. O layout e o conteúdo permanecem Server Components.
- `src/lib/motion.ts`: duração, stagger, curvas e springs. Os tokens CSS equivalentes ficam em `src/app/[locale]/globals.css`.
- `HeroEntrance`: entradas curtas com sobreposição. Eyebrow de 0 a 220 ms; partes do título começam em 80 e 135 ms, com duração de 560 ms, fade, blur de 6 px e subida de 8 px; descrição, ações e rodapé começam em 200, 260 e 320 ms, com duração de 320 ms. Tudo termina em até 695 ms após o início do efeito. Usa `revealEase`, que torna o conteúdo legível cedo e desacelera o final. O texto permanece nítido no HTML inicial; a entrada acontece uma vez por montagem elegível e é ignorada após 1,5 s de carregamento, em restauração de scroll ou quando há hash. Não há tela de carregamento.
- `Reveal`: entradas de 20 px por viewport, uma vez por montagem. HTML visível sem JavaScript; foco exibe imediatamente o conteúdo.
- `Magnetic`: deslocamento limitado a 6 px, medido em um wrapper estável; no máximo uma leitura por frame. Clique, foco, cancelamento de ponteiro e movimento reduzido restauram a posição.
- `ScrollPreview`: escala de 0,97 a 1 ligada ao progresso local do scroll; o hover da imagem usa uma camada separada.
- `Glow`: gradiente de tamanho fixo movido com transform. Coordenadas são escritas diretamente na camada decorativa, sem estado React por movimento. O recorte não corta o outline dos links.

## Scroll e acessibilidade

Lenis 1.3.26 é importado dinamicamente somente com movimento permitido e ponteiro preciso com hover. Usa `lerp: 0.12`, um único `autoRaf` e toque nativo. Motion 13.2.0 usa os componentes leves `m`; não adicionar `motion.div` sob o provider estrito. `layout` exigiria avaliar e carregar `domMax`.

Âncoras mantêm URL e histórico. A navegação foca o título sem iniciar um segundo scroll; o Lenis respeita o `scroll-margin-top` existente. Skip links são instantâneos. Teclas de navegação cancelam a inércia sem impedir o comportamento do navegador. Idiomas preservam hash e posição, sem reset automático para o topo.

A paleta usa o mesmo serviço de navegação, bloqueia o Lenis enquanto está aberta e permite scroll nativo interno. O bloqueio de foco e de scroll do Radix permanece ativo mesmo quando a preferência de movimento muda com o diálogo aberto.

`prefers-reduced-motion` é observado em tempo real: destrói o Lenis, encerra a entrada da hero, neutraliza transformações e desliga a luz móvel. Foco permanece visível. O header usa blur fixo de 10 px, restrito à sua área, com fundo opaco como fallback.

## Verificação anterior — Fase 2, 7 de setembro de 2026

Build de produção, TypeScript, ESLint, formatação dos arquivos alterados e 14 testes Playwright passaram com o Chrome instalado. Os testes cobrem os três idiomas, layouts de 320–1440 px, teclado, histórico, foco, paleta, toque, mudança de preferência e conteúdo sem JavaScript. O contraste é auditado após a entrada da hero terminar.

Medições em localhost, Chrome headless, CPU throttling 4×, três contextos novos por perfil. Desktop: 1440×900; mobile: emulação Pixel 7. Sem throttling de rede. LCP abaixo é a mediana; bytes correspondem aos recursos de script carregados, com compressão de transporte.

| Métrica                                    |     Antes |    Depois |
| ------------------------------------------ | --------: | --------: |
| LCP desktop                                |    116 ms |    116 ms |
| LCP mobile                                 |    116 ms |    116 ms |
| CLS desktop                                |  0,000231 |  0,000231 |
| CLS mobile                                 |         0 |         0 |
| JavaScript desktop                         | 182.765 B | 229.044 B |
| JavaScript mobile                          | 182.765 B | 223.593 B |
| Frames acima de 34 ms na amostra de scroll |         0 |         0 |

O incremento foi de 45,2 KiB no desktop e 39,9 KiB no mobile. O chunk do Lenis não é solicitado no perfil mobile. O cenário de fluidez aplica um wheel de 1.200 px e amostra requestAnimationFrame por dois segundos; o maior intervalo observado foi de 17 ms. Isso não prova ausência de jank em outros aparelhos ou em todos os efeitos. A emulação mobile não substitui teste de gesto de toque em aparelho físico.

Esses resultados não são Core Web Vitals de campo nem medem INP real. Após deploy, acompanhar LCP, INP e CLS no Vercel Speed Insights já instalado, separados por dispositivo e no percentil 75. Validar também Safari/iOS e condições reais de rede.

Para repetir, iniciar um build de produção na porta 3100:

```sh
npm run build
npm run start -- --port 3100
```

Em outro terminal:

```sh
PLAYWRIGHT_CHANNEL=chrome npm run test:e2e
PLAYWRIGHT_CHANNEL=chrome npm run profile:motion
```

Omitir `PLAYWRIGHT_CHANNEL` para usar o Chromium do Playwright, quando instalado. `PROFILE_URL` permite selecionar outra prévia local. O profiler escreve JSON no terminal; as capturas da suíte ficam em `test-results/`.

## Refinamento visual e editorial — 7 de setembro de 2026

O nome de apresentação vem de `displayName` em `src/lib/portfolio.ts`, inclusive na interpolação da abertura, na legenda e no texto alternativo da foto, na autoria SEO e na imagem de compartilhamento. As descrições dos projetos agora vêm de `ProjectSection`, junto da abordagem técnica, eliminando as duas versões de copy para o mesmo card. As três traduções mantêm os mesmos fatos. A página 404 usa o idioma informado pelo middleware, com português como fallback e link de retorno ao portfólio.

A segunda parte do h1 usa gradiente estático de `#fafafa` a `#b8b8b8` sobre `#0a0a0a`. Conferência visual em desktop e celular, acompanhada de cálculo de luminância sRGB: contraste de 18,97:1 na ponta clara e 9,98:1 na ponta cinza; toda a interpolação neutra permanece acima de 9,98:1. O cálculo considera o estado nítido. Sem suporte a `background-clip: text`, o texto usa `#d4d4d4`; em cores forçadas, usa `CanvasText`.

Sem JavaScript ou com movimento reduzido, o título aparece imediatamente nítido. Ao mudar a preferência durante a entrada ou focar a hero, `complete()` conclui os controles do Motion. Usar `stop()` seguido de estilos escritos diretamente no DOM podia congelar um blur intermediário, pois o render seguinte do Motion reaplicava esse valor. O teste alterna a preferência de volta para confirmar que o título continua nítido e não reinicia.

Build de produção, TypeScript, ESLint, formatação dos arquivos alterados e **23 testes Playwright passaram**. A suíte cobre a entrada e sua conclusão, mudança de preferência durante o blur, carregamento de scripts atrasado, scroll restaurado sem hash, acesso por âncora, movimento reduzido inicial, teclado, paleta, cópia, conteúdo sem JavaScript, 404 traduzida e layouts dos três idiomas em 320, 390, 768, 1024 e 1440 px. O nome completo do cabeçalho é verificado contra os limites dos controles e a altura de 64 px. Axe não encontrou violações WCAG A/AA nas três páginas nem na paleta.

### Comparação com a versão imediatamente anterior

Mesmo profiler existente, builds de produção, Chrome headless, CPU 4×, três contextos novos por dispositivo, sem throttling de rede. Nenhum teste ou outro profiler rodava simultaneamente. Valores de LCP são medianas; estes números locais não representam métricas de campo.

| Métrica                         | Antes do refinamento | Depois do refinamento |
| ------------------------------- | -------------------: | --------------------: |
| LCP desktop                     |               148 ms |                144 ms |
| LCP mobile                      |               144 ms |                144 ms |
| CLS desktop                     |             0,000231 |              0,000231 |
| CLS mobile                      |                    0 |                     0 |
| JavaScript desktop              |            229.044 B |             228.739 B |
| JavaScript mobile               |            223.593 B |             223.288 B |
| Frames de scroll acima de 34 ms |                    0 |                     0 |

Não foi observada regressão de LCP ou CLS nessa amostra. A diferença de 4 ms no desktop é pequena e não deve ser tratada como ganho comprovado. Nenhuma dependência foi adicionada. Resultados brutos desta execução: `docs/profiling/refinement-2026-09-07.json`.

### Capturas

As capturas ficam em `test-results/` e podem ser geradas novamente pela suíte. `br`, `en` e `es` têm imagens `*-hero-320.png`, `*-hero-1440.png`, `*-desktop.png`, `*-mobile.png`, além de `*-experience.png`, `*-projects.png`, `*-about.png` e `*-contact.png`. As capturas das seções usam movimento reduzido para registrar todo o conteúdo no estado final e ocultam apenas o cabeçalho e o skip link durante a captura, evitando sobreposição do elemento fixo. A entrada com movimento permitido é verificada em testes separados. A imagem de compartilhamento em 1200×630 foi conferida em `test-results/opengraph-image.png`, sem cortes ou sobreposição do nome completo.

## Entrada rápida com ordem visual

A inspiração visual da Linear permanece no fade, blur e subida do título, com tempos ajustados ao portfólio. As etapas se sobrepõem: o título começa 80 ms após o eyebrow; a descrição começa em 200 ms e os botões em 260 ms, enquanto o título ainda finaliza. O efeito inteiro termina em 695 ms. Os deslocamentos são de 6–8 px e o blur é de 6 px, com a curva `cubic-bezier(0.16, 1, 0.3, 1)`. Os tempos ficam em `motionTiming.heroBefore`, `heroTitle` e `heroAfter`.

Todos os controles são agendados na montagem. Foco por teclado ou movimento reduzido concluem as três etapas imediatamente. As seções seguintes continuam usando `Reveal` conforme o scroll. Conteúdo sem JavaScript, carregamento lento, restauração de scroll e âncoras mantêm as proteções anteriores.

A suíte verifica os keyframes, a sobreposição real entre título e apoio, o início das ações dentro do primeiro segundo, a conclusão e a ausência de repetição. A tabela de desempenho acima documenta a revisão editorial anterior; não mede esta versão da entrada.

## Verificação final — 8 de setembro de 2026

Os testes de portfólio verificam a ordem dos cards (Analisador Big O, Ebook em Áudio e Mindful Minutes) nos três idiomas, com Sorteia FC na lista complementar. A imagem `public/images/projects/mindful-minutes.png` é uma captura real de `https://mindful-minutes-zeta.vercel.app/en/practices`, em tema escuro, viewport de 1440×960 px, feita em 8 de setembro de 2026.
