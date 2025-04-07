const ctaNavigation: HTMLUListElement | null = document.querySelector(
  ".cta__nav-and-content > .navigation"
);

const ctaNavigationClickHander = (
  event: MouseEvent,
  ctaNavigation: HTMLUListElement
) => {
  if (!event || !(event.target instanceof HTMLLIElement)) return;

  const { children: ctaNavItems } = ctaNavigation;
  const navItemsArray = Array.from(ctaNavItems);
  const clickedNavItemIndex = navItemsArray.indexOf(event.target);
  const ctaItems: NodeListOf<HTMLDivElement> | null =
    document.querySelectorAll(".cta__item");
  const ctaActiveItem: HTMLDivElement | null =
    document.querySelector(".cta__item--active");

  if (!ctaItems || !ctaActiveItem || !ctaItems[clickedNavItemIndex]) return;

  ctaActiveItem.classList.remove("cta__item--active");
  ctaItems[clickedNavItemIndex].classList.add("cta__item--active");
};

if (ctaNavigation instanceof HTMLUListElement) {
  ctaNavigation.addEventListener("click", (event: MouseEvent) =>
    ctaNavigationClickHander(event, ctaNavigation)
  );
}
