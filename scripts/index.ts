const servicesNavClickHandler = (event: MouseEvent) => {
  if (!event.target || !(event.target instanceof HTMLLIElement)) return;

  const navItemAlreadySelected = event.target.classList.contains(
    "services__nav-item--active"
  );

  if (navItemAlreadySelected) return;

  const selectedItemIndex = event.target.dataset.navItem;
  const previousSelectedNavElement: HTMLLIElement | null =
    document.querySelector(".services__nav-item--active");
  const oldVisibleElement = document.querySelector(
    `.services__content--active`
  );
  const serviceContentItems = document.querySelectorAll(
    ".services__content-item"
  );

  if (!previousSelectedNavElement || !oldVisibleElement || !oldVisibleElement)
    return;

  previousSelectedNavElement.classList.remove("services__nav-item--active");
  oldVisibleElement.classList.remove("services__content--active");
  event.target.classList.add("services__nav-item--active");
  serviceContentItems.forEach((serviceItem, index) => {
    if (index === Number(selectedItemIndex)) {
      serviceItem.classList.add("services__content--active");
    }
  });
};

const servicesSectionHandler = () => {
  const servicesNav: HTMLUListElement | null =
    document.querySelector(".services__nav");

  servicesNav?.addEventListener("click", servicesNavClickHandler);
};

servicesSectionHandler();
