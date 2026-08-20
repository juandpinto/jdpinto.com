(() => {
  const getHeaderOffset = () => {
    const header = [...document.querySelectorAll("#header-desktop, #header-mobile")]
      .find((element) => element.getBoundingClientRect().height > 0);
    return header ? header.getBoundingClientRect().height : 0;
  };

  const links = [...document.querySelectorAll(".menu-item[href]")]
    .map((link) => {
      const url = new URL(link.href, window.location.href);

      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
        return null;
      }

      const section = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!links.length) return;

  const sections = [...new Map(links.map(({ section }) => [section.id, section])).values()]
    .sort((firstSection, secondSection) => firstSection.offsetTop - secondSection.offsetTop);
  let activeSectionId;
  let ticking = false;

  const setActiveSection = (sectionId) => {
    if (sectionId === activeSectionId) return;

    activeSectionId = sectionId;
    links.forEach(({ link, section }) => {
      const isActive = section.id === activeSectionId;
      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateActiveLink = () => {
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const isAtPageBottom = window.innerHeight + window.scrollY >= documentHeight - 2;
    const activationLine = getHeaderOffset() + Math.min(160, window.innerHeight * 0.2);
    let nextActiveSectionId = null;

    if (isAtPageBottom) {
      nextActiveSectionId = sections[sections.length - 1].id;
    } else {
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          nextActiveSectionId = section.id;
        }
      });
    }

    setActiveSection(nextActiveSectionId);
  };

  const requestUpdate = () => {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(() => {
      updateActiveLink();
      ticking = false;
    });
  };

  document.addEventListener("click", (event) => {
    const clickedLink = event.target.closest(".menu-item[href]");
    const target = links.find(({ link }) => link === clickedLink);

    if (target) setActiveSection(target.section.id);
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", requestUpdate);
  window.addEventListener("load", requestUpdate);
  requestUpdate();
})();
