const sections: NodeListOf<HTMLElement> | null =
  document.querySelectorAll("section");
const footer: HTMLElement | null = document.querySelector("footer");
const sectionsArray = Array.from(sections);
const mainPageElementsExcludingFirstSection = [
  ...sectionsArray.slice(1),
  footer,
];

const elementObserverHandler = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.add("content--active");
    observer.unobserve(entry.target);
  }
};

mainPageElementsExcludingFirstSection.map((element) => {
  if (!element) return;

  const observer = new IntersectionObserver(elementObserverHandler, {
    threshold: 0.4,
  });

  observer.observe(element);
});
