const handleStickyNavOnAboutUsSecitonScroll = (): void => {
  const heroSection: HTMLElement | null =
    document.querySelector("section.hero");
  const header: HTMLElement | null = document.querySelector("header.header");

  console.log(heroSection);

  if (!heroSection || !header) return;

  const intersectionHandler = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    const [entry] = entries;

    console.log(entry);

    if (!entry.isIntersecting) {
      header.classList.add("header--sticky");
    } else if (entry.isIntersecting && entry.intersectionRatio < 1) {
      header.classList.remove("header--sticky");
    }
  };

  const observer = new IntersectionObserver(intersectionHandler);

  observer.observe(heroSection);
};

handleStickyNavOnAboutUsSecitonScroll();
