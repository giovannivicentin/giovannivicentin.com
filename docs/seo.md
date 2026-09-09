# SEO e idiomas

O domínio canônico é `https://www.giovannivicentin.com`: o domínio sem `www`
responde com redirecionamento permanente para ele. Metadados, sitemap, robots e
JSON-LD usam a mesma origem, definida em `src/lib/site.ts`.

## URLs indexáveis

- `/pt`: português do Brasil.
- `/en`: inglês.
- `/es`: espanhol.
- `/`: entrada original, que negocia idioma por cookie/Accept-Language e declara
  como canônica a versão localizada correspondente. É o destino de `x-default`.

As três URLs localizadas servem HTML traduzido mesmo sem JavaScript, ignorando
preferências de idioma conflitantes. O proxy reusa a página existente, sem
duplicar o conteúdo-fonte. Todos os idiomas declaram links `hreflang` recíprocos,
uma canônica própria e links de navegação visíveis no rodapé. O sitemap contém
as três versões e suas alternativas. URLs inexistentes continuam respondendo 404.

Os controles de idioma mantêm cookie, query e hash. A atualização da URL pelo
History API é seguida de `router.refresh()` para atualizar também o layout
compartilhado, preservando a posição de leitura.

## Metadados e dados estruturados

Títulos e descrições destacam nome, especialidade em React/Next.js e experiência
profissional. Open Graph e Twitter mantêm imagens de compartilhamento; canônica,
idioma e texto correspondem ao conteúdo servido. A lista de meta keywords foi
removida: ela não contribui para o ranking do Google.

O JSON-LD descreve `Person`, `ProfilePage`, `WebSite` e os seis projetos como
`SoftwareSourceCode` em um `ItemList`. Usa apenas informações já presentes no
portfólio. Não declara avaliações, prêmios, números de seguidores ou datas de
atualização inventadas. Strings são escapadas antes de inserir o JSON no HTML.

## Publicação e acompanhamento

Após publicar, enviar `https://www.giovannivicentin.com/sitemap.xml` no Google
Search Console e inspecionar `/pt`, `/en` e `/es`. Validar também a versão
publicada no Rich Results Test e acompanhar impressões, consultas e Core Web
Vitals. Esta alteração prepara a indexação; não envia o site ao Search Console
nem garante posição nos resultados ou exibição de resultados enriquecidos.

Referências oficiais:

- [Sites multilíngues](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Versões localizadas e hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Meta tags aceitas pelo Google](https://developers.google.com/search/docs/crawling-indexing/special-tags)
