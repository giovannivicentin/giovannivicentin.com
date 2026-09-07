# Motion — Fase 2

## Arquitetura

- `src/components/motion/experience-provider.tsx`: política de movimento compartilhada, `LazyMotion` com `domAnimation`, navegação por âncoras e ciclo de vida do Lenis. O layout e o conteúdo permanecem Server Components.
- `src/lib/motion.ts`: duração, stagger, curvas e springs. Os tokens CSS equivalentes ficam em `src/app/[locale]/globals.css`.
- `HeroEntrance`: spring de 14 px e fade em cascata nos textos de apoio e ações. O h1 permanece visível no HTML inicial. A entrada é ignorada após 1,5 s de carregamento, em restauração de scroll ou quando há hash.
- `Reveal`: entradas de 20 px por viewport, uma vez por montagem. HTML visível sem JavaScript; foco exibe imediatamente o conteúdo.
- `Magnetic`: deslocamento limitado a 6 px, medido em um wrapper estável; no máximo uma leitura por frame. Clique, foco, cancelamento de ponteiro e movimento reduzido restauram a posição.
- `ScrollPreview`: escala de 0,97 a 1 ligada ao progresso local do scroll; o hover da imagem usa uma camada separada.
- `Glow`: gradiente de tamanho fixo movido com transform. Coordenadas são escritas diretamente na camada decorativa, sem estado React por movimento. O recorte não corta o outline dos links.

## Scroll e acessibilidade

Lenis 1.3.26 é importado dinamicamente somente com movimento permitido e ponteiro preciso com hover. Usa `lerp: 0.12`, um único `autoRaf` e toque nativo. Motion 13.2.0 usa os componentes leves `m`; não adicionar `motion.div` sob o provider estrito. `layout` exigiria avaliar e carregar `domMax`.

Âncoras mantêm URL e histórico. A navegação foca o título sem iniciar um segundo scroll; o Lenis respeita o `scroll-margin-top` existente. Skip links são instantâneos. Teclas de navegação cancelam a inércia sem impedir o comportamento do navegador. Idiomas preservam hash e posição, sem reset automático para o topo.

A paleta usa o mesmo serviço de navegação, bloqueia o Lenis enquanto está aberta e permite scroll nativo interno. O bloqueio de foco e de scroll do Radix permanece ativo mesmo quando a preferência de movimento muda com o diálogo aberto.

`prefers-reduced-motion` é observado em tempo real: destrói o Lenis, encerra a entrada da hero, neutraliza transformações e desliga a luz móvel. Foco permanece visível. O header usa blur fixo de 10 px, restrito à sua área, com fundo opaco como fallback.

## Verificação local — 7 de setembro de 2026

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
