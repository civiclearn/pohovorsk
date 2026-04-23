/* related-articles.js — populates related/featured article grids
   Reads /clanky/articles.json and renders cards into:
     - .related-grid[data-article-slug][data-article-lang]  → on article pages
       (excludes current article; prefers same-lang siblings, fills with cross-lang if needed)
     - .related-grid (without data-article-slug)  → on homepage / other pages
       (picks N random articles across all languages)

   Flag emoji is shown on cards when language differs from the page's own language
   (either data-article-lang on the grid, or <html lang="…">). */

(function () {
  const grids = document.querySelectorAll('.related-grid');
  if (!grids.length) return;

  const FLAGS = {
    sk: '🇸🇰',
    en: '🇬🇧',
    ru: '🇷🇺',
    uk: '🇺🇦',
    hu: '🇭🇺'
  };

  const HOW_MANY = 3;

  fetch('/clanky/articles.json')
    .then(r => r.json())
    .then(articles => {
      grids.forEach(grid => renderGrid(grid, articles));
    })
    .catch(() => {
      grids.forEach(grid => {
        grid.closest('.related-articles')?.remove();
      });
    });

  function renderGrid(grid, all) {
    const currentSlug = grid.dataset.articleSlug || '';
    const pageLang = grid.dataset.articleLang || document.documentElement.lang || 'sk';

    const candidates = all.filter(a => {
      const slug = a.url.replace(/^\/|\/$/g, '').split('/').pop();
      return slug !== currentSlug;
    });

    /* Prefer same-lang, fall back to cross-lang */
    const sameLang = candidates.filter(a => (a.lang || 'sk') === pageLang);
    const otherLang = candidates.filter(a => (a.lang || 'sk') !== pageLang);

    const picked = [
      ...shuffle(sameLang).slice(0, HOW_MANY),
      ...shuffle(otherLang)
    ].slice(0, HOW_MANY);

    if (picked.length === 0) {
      grid.closest('.related-articles')?.remove();
      return;
    }

    grid.innerHTML = picked.map(a => {
      const lang = a.lang || 'sk';
      const showFlag = lang !== pageLang;
      const flagHtml = showFlag
        ? `<span class="related-flag" aria-label="${lang}">${FLAGS[lang] || ''}</span>`
        : '';
      return `
        <a href="${a.url}" class="related-card">
          ${flagHtml}
          <img src="${a.image}" alt="${escape(a.title)}" loading="lazy">
          <div class="related-card-body">
            <h3>${escape(a.title)}</h3>
            <p>${escape(a.desc)}</p>
          </div>
        </a>
      `;
    }).join('');
  }

  function shuffle(arr) {
    return arr.slice().sort(() => Math.random() - 0.5);
  }

  function escape(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }
})();
