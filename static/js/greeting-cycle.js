(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reduceMotion.matches) return;

  document.querySelectorAll("[data-greetings]").forEach((element) => {
    let greetings;

    try {
      greetings = JSON.parse(element.dataset.greetings);
    } catch {
      return;
    }

    if (!Array.isArray(greetings) || greetings.length < 2) return;

    const shuffle = (items) => {
      const shuffled = [...items];

      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
      }

      return shuffled;
    };

    let currentGreeting = element.textContent;
    let queue = shuffle(greetings.filter((greeting) => greeting !== currentGreeting));

    window.setInterval(() => {
      if (!queue.length) {
        queue = shuffle(greetings.filter((greeting) => greeting !== currentGreeting));
      }

      element.classList.add("is-changing");

      window.setTimeout(() => {
        currentGreeting = queue.pop();
        element.textContent = currentGreeting;
        element.classList.remove("is-changing");
      }, 180);
    }, 3000);
  });
})();
