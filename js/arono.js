document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tabs button");
  const tabs = document.querySelectorAll(".tab");
  const indicator = document.querySelector(".tab-indicator");

  function activateTab(name) {
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.id === name);
    });

    buttons.forEach((btn, index) => {
      const isActive = btn.dataset.tab === name;
      btn.classList.toggle("active", isActive);

      if (isActive) {
        indicator.style.transform = `translateX(${index * 100}%)`;
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.tab;
      location.hash = name;
      activateTab(name);
    });
  });

  const startTab =
    location.hash.replace("#", "") || buttons[0].dataset.tab;

  activateTab(startTab);

  window.addEventListener("hashchange", () => {
    const name = location.hash.replace("#", "");
    if (name) activateTab(name);
  });

/* idk how this work but ok*/
  document.querySelectorAll(".version").forEach(version => {
    version.addEventListener("click", () => {
      version.classList.toggle("active");
    });
  });
});
