(() => {
  const data = window.SgageNews;
  if (!data || !Array.isArray(data.items)) return;

  const list = document.getElementById("most-viewed-list");
  const title = document.getElementById("current-news-title");
  const summary = document.getElementById("current-news-summary");
  const meta = document.getElementById("current-news-meta");
  const badge = document.getElementById("current-news-badge");
  const dailyDetails = document.getElementById("daily-news");
  const selectedPanel = document.getElementById("selected-news-panel");
  const selectedTitle = document.getElementById("selected-news-title");
  const selectedSummary = document.getElementById("selected-news-summary");
  const selectedMeta = document.getElementById("selected-news-meta");

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

  const setSelected = (item) => {
    if (!selectedPanel || !item) return;
    if (selectedTitle) selectedTitle.textContent = item.title;
    if (selectedSummary) selectedSummary.textContent = item.summary;
    if (selectedMeta) {
      selectedMeta.innerHTML = `
        <span class="news-pill">${item.date}</span>
        <span class="news-pill">${item.category}</span>
      `;
    }
    selectedPanel.hidden = false;
  };

  const hideSelected = () => {
    if (!selectedPanel) return;
    selectedPanel.hidden = true;
  };

  setCurrent(currentItem);
  hideSelected();

  if (list) {
    list.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-news-id]");
      if (!button) return;
      const item = data.findNewsById(button.dataset.newsId);
      if (!item) return;
      if (item.id === currentItem.id) {
        setCurrent(item);
        hideSelected();
        if (dailyDetails) dailyDetails.open = true;
        return;
      }
      setSelected(item);
      if (dailyDetails) dailyDetails.open = false;
    });
  }
})();
