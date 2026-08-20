(() => {
  const headers = document.querySelectorAll("#header-desktop, #header-mobile");
  const scrollThreshold = 8;
  let ticking = false;

  const updateHeaders = () => {
    const isScrolled = window.scrollY > scrollThreshold;
    headers.forEach((header) => header.classList.toggle("is-scrolled", isScrolled));
  };

  const requestUpdate = () => {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(() => {
      updateHeaders();
      ticking = false;
    });
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("load", requestUpdate);
  requestUpdate();
})();
