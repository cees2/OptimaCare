const sections: NodeListOf<HTMLElement> | null =
  document.querySelectorAll("section");
const footer: HTMLElement | null = document.querySelector("footer");
const sectionsArray = Array.from(sections);
const mainPageElementsExcludingFirstSection = [
  ...sectionsArray.slice(1),
  footer,
];
const mainNavList: HTMLUListElement | null =
  document.querySelector(".header__nav-list");

const elementObserverHandler = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => {
  const [entry] = entries;

  if (entry.isIntersecting && entry.intersectionRatio > 0.95) {
    const activeMainNavigationTab = entry.target.getAttribute("id");

    if (!activeMainNavigationTab) return;

    const headerLinkToBeActive: HTMLAnchorElement | null =
      document.querySelector(`a[href="#${activeMainNavigationTab}"]`);

    if (!headerLinkToBeActive) return;

    const { parentElement: mainNavListElement } = headerLinkToBeActive;
    const currentActiveNavListElement: HTMLLIElement | null | undefined =
      mainNavList?.querySelector(".navigation__item--active");

    currentActiveNavListElement?.classList.remove("navigation__item--active");
    mainNavListElement?.classList.add("navigation__item--active");
  } else if (entry.isIntersecting) {
    entry.target.classList.add("content--active");
  }
};

mainPageElementsExcludingFirstSection.map((element) => {
  if (!element) return;

  const observer = new IntersectionObserver(elementObserverHandler, {
    threshold: [0.4, 0.95],
  });

  observer.observe(element);
});
