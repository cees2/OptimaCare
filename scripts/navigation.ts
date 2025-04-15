const navigations: NodeListOf<HTMLUListElement> | null =
  document.querySelectorAll(".navigation");

const navigationClickHandler = (
  event: MouseEvent,
  navigation: HTMLUListElement
) => {
  if (!event || !(event.target instanceof HTMLLIElement)) return;

  const previousActiveNavigationElement: HTMLLIElement | null =
    navigation.querySelector(".navigation__item--active");

  if (!previousActiveNavigationElement) return;

  previousActiveNavigationElement.classList.remove("navigation__item--active");
  event.target.classList.add("navigation__item--active");

  const hrefAttribute = event.target.getAttribute("href");
  console.log(hrefAttribute);
};

navigations?.forEach((navigation) => {
  navigation.addEventListener("click", (event: MouseEvent) =>
    navigationClickHandler(event, navigation)
  );
});
