enum ToggleNavItemMode {
  MAKE_REGULAR,
  MAKE_ACTIVE,
}

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

const toggleNavigationItem = (
  navItem: Element | null,
  toggleMode: ToggleNavItemMode
) => {
  if (toggleMode === ToggleNavItemMode.MAKE_ACTIVE) {
    navItem?.classList.add("carousel__navigation-item--active");
  } else {
    navItem?.classList.remove("carousel__navigation-item--active");
  }
};

const carouselArrowClickHandler = (
  carousel: HTMLDivElement,
  activeCarouselElement: number
) => {
  const carouselItemsContainer: HTMLDivElement | null =
    carousel.querySelector(".carousel__items");
  const previousActiveCarouselItem: HTMLDivElement | undefined | null =
    carouselItemsContainer?.querySelector(".carousel__item--active");
  const currentActiveCarouselItem =
    carouselItemsContainer?.children[activeCarouselElement];
  const navigationItems: NodeListOf<HTMLDivElement> | null =
    carousel.querySelectorAll(".carousel__navigation-item");
  const currentActiveNavigationItem = navigationItems[activeCarouselElement];
  const previousActiveNavigationItem = carousel.querySelector(
    ".carousel__navigation-item--active"
  );

  if (
    !carouselItemsContainer ||
    !previousActiveCarouselItem ||
    !currentActiveCarouselItem
  )
    return;

  carouselItemsContainer.style.transform = `translateX(-${
    activeCarouselElement * 100
  }%)`;

  previousActiveCarouselItem.classList.remove("carousel__item--active");
  currentActiveCarouselItem.classList.add("carousel__item--active");

  toggleNavigationItem(
    previousActiveNavigationItem,
    ToggleNavItemMode.MAKE_REGULAR
  );

  toggleNavigationItem(
    currentActiveNavigationItem,
    ToggleNavItemMode.MAKE_ACTIVE
  );
};

const carouselHandler = () => {
  const carousels: NodeListOf<HTMLDivElement> | null =
    document.querySelectorAll(".carousel");

  if (!carousels) return;

  carousels.forEach((carousel) => {
    const currentCarouselItemContainer: HTMLDivElement | null =
      carousel.querySelector(".carousel__items");
    const currentCarouselArrowLeft = carousel.querySelector(
      ".carousel__arrow--left"
    );
    const currentCarouselArrowRight = carousel.querySelector(
      ".carousel__arrow--right"
    );
    const currentCarouselNavigationContainer: HTMLDivElement | null =
      carousel.querySelector(".carousel__navigation");

    if (
      !currentCarouselItemContainer ||
      !currentCarouselArrowLeft ||
      !currentCarouselArrowRight ||
      !currentCarouselNavigationContainer
    )
      return;

    let activeCarouselElement: number = 0;
    const {
      children: { length: numberOfItems },
    } = currentCarouselItemContainer;
    const { children: navigationItems } = currentCarouselNavigationContainer;
    const activeNavigationItem = navigationItems[activeCarouselElement];

    currentCarouselItemContainer.style.width = `${numberOfItems * 100}%`;
    toggleNavigationItem(activeNavigationItem, ToggleNavItemMode.MAKE_ACTIVE);

    currentCarouselArrowLeft.addEventListener("click", () => {
      activeCarouselElement--;
      if (activeCarouselElement < 0) activeCarouselElement = numberOfItems - 1;
      carouselArrowClickHandler(carousel, activeCarouselElement);
    });

    currentCarouselArrowRight.addEventListener("click", () => {
      activeCarouselElement++;
      if (activeCarouselElement === numberOfItems) activeCarouselElement = 0;
      carouselArrowClickHandler(carousel, activeCarouselElement);
    });
  });
};

servicesSectionHandler();
carouselHandler();
