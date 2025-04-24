const navigations: NodeListOf<HTMLUListElement> | null =
  document.querySelectorAll(".navigation");

const navigationClickHandler = (
  event: MouseEvent,
  navigation: HTMLUListElement
) => {
  if (
    !event ||
    (!(event.target instanceof HTMLLIElement) &&
      !(event.target instanceof HTMLAnchorElement))
  )
    return;

  const previousActiveNavigationElement: HTMLLIElement | null =
    navigation.querySelector(".navigation__item--active");

  previousActiveNavigationElement?.classList.remove("navigation__item--active");
  event.target.classList.add("navigation__item--active");

  const hrefAttribute = event.target.getAttribute("href");

  if (
    hrefAttribute &&
    hrefAttribute.startsWith("#") &&
    hrefAttribute.length > 1
  ) {
    const sectionToScroll: HTMLElement | null = document.querySelector(
      `section${hrefAttribute}`
    );

    if (!sectionToScroll) return;

    setTimeout(() => {
      window.scrollTo({
        top: sectionToScroll.offsetTop - 130,
        behavior: "smooth",
      });
    }, 2);
  }
};

navigations?.forEach((navigation) => {
  navigation.addEventListener("click", (event: MouseEvent) =>
    navigationClickHandler(event, navigation)
  );
});
