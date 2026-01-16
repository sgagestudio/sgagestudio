(() => {
  const data = window.SgageNews;
  if (!data || !Array.isArray(data.items)) return;

  const list = document.getElementById("most-viewed-list");
  const title = document.getElementById("current-news-title");
  const summary = document.getElementById("current-news-summary");
  const meta = document.getElementById("current-news-meta");
  const badge = document.getElementById("current-news-badge");

  const currentId = "digitalizacion_pymes_europa_2026";
  const currentItem = data.findNewsById(currentId) || data.items[0];

  if (list) {
    list.innerHTML = data.items
      .map(
        (item) => `
          <li class="news-list__item">
            <button class="news-list__button" type="button" data-news-id="${item.id}">
              <span class="news-list__title">${item.title}</span>
              <span class="news-list__meta">${item.category} · ${item.date}</span>
            </button>
          </li>
        `,
      )
      .join("");
  }

  const setCurrent = (item) => {
    if (!item) return;
    if (title) title.textContent = item.title;
    if (summary) summary.textContent = item.summary;
    if (meta) meta.textContent = `${item.date} · ${item.category}`;
    if (badge) badge.textContent = item.category;
  };

  setCurrent(currentItem);

  if (list) {
    list.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-news-id]");
      if (!button) return;
      const item = data.findNewsById(button.dataset.newsId);
      setCurrent(item);
    });
  }
})();
