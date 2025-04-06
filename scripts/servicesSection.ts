const servicesNavClickHandler = (event: MouseEvent) => {
  if (!event.target || !(event.target instanceof HTMLLIElement)) return;

  const navParent = event.target.closest(".services__nav");

  if (!navParent) return;

  const { children } = navParent;
  const navParentChildrenArray = Array.from(children);
  const selectedItemIndex = navParentChildrenArray.indexOf(event.target);

  const oldVisibleElement = document.querySelector(
    `.services__content--active`
  );
  const serviceContentItems = document.querySelectorAll(
    ".services__content-item"
  );

  if (!oldVisibleElement || !oldVisibleElement) return;

  oldVisibleElement.classList.remove("services__content--active");
  serviceContentItems.forEach((serviceItem, index) => {
    if (index === selectedItemIndex) {
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
