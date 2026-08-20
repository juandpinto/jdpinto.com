(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const getHeaderOffset = () => {
    const header = [...document.querySelectorAll("#header-desktop, #header-mobile")]
      .find((element) => element.getBoundingClientRect().height > 0);
    return header ? header.getBoundingClientRect().height + 8 : 0;
  };

  const scrollToTarget = (target, hash) => {
    const startY = window.scrollY;
    const targetY = Math.max(0, target.getBoundingClientRect().top + startY - getHeaderOffset());
    const distance = targetY - startY;

    if (reduceMotion.matches) {
      window.scrollTo(0, targetY);
      window.history.pushState(null, "", hash);
      return;
    }

    const duration = Math.min(700, Math.max(450, Math.abs(distance) * 0.18));
    const startTime = performance.now();
    const easeInOutCubic = (progress) => progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - ((-2 * progress + 2) ** 3) / 2;

    const step = (timestamp) => {
      const progress = Math.min(1, (timestamp - startTime) / duration);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        window.history.pushState(null, "", hash);
      }
    };

    window.requestAnimationFrame(step);
  };

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest("a[href]");
    if (!link || link.target === "_blank") return;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    scrollToTarget(target, url.hash);
  });
})();
