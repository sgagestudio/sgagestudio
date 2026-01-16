(() => {
  const data = window.SgageNews;
  if (!data || !Array.isArray(data.items)) return;

  const list = document.getElementById("most-viewed-list");
  const title = document.getElementById("current-news-title");
  const summary = document.getElementById("current-news-summary");
  const meta = document.getElementById("current-news-meta");
  const badge = document.getElementById("current-news-badge");
  const dailyDetails = document.getElementById("daily-news");
  const dailySummary = dailyDetails?.querySelector(".news-spotlight__summary-toggle");
  const selectedPanel = document.getElementById("selected-news-panel");

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
    selectedPanel.innerHTML = item.html || "";
    selectedPanel.hidden = false;
  };

  setCurrent(currentItem);
  setSelected(currentItem);
  if (dailyDetails) dailyDetails.open = true;

  if (dailySummary && dailyDetails) {
    const stopToggle = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    dailySummary.addEventListener("click", stopToggle);
    dailySummary.addEventListener("keydown", (event) => {
      if (event.key === " " || event.key === "Enter") {
        stopToggle(event);
      }
    });
  }

  if (list) {
    list.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-news-id]");
      if (!button) return;
      const item = data.findNewsById(button.dataset.newsId);
      if (!item) return;
      if (item.id === currentItem.id) {
        setCurrent(item);
        setSelected(item);
        if (dailyDetails) dailyDetails.open = true;
        return;
      }
      setSelected(item);
      if (dailyDetails) dailyDetails.open = false;
    });
  }
})();
