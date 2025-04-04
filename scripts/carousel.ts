enum ToggleNavItemMode {
  MAKE_REGULAR,
  MAKE_ACTIVE,
}

interface CarouselElements {
  carouselBox: HTMLDivElement;
  carouselLeftArrow: HTMLElement | null;
  carouselRightArrow: HTMLElement | null;
  carouselItemsContainer: HTMLDivElement | null;
  carouselNavigationContainer: HTMLDivElement | null;
  carouselActiveItem: HTMLDivElement | null;
  carouselActiveNavItem: HTMLDivElement | null;
  navigationItems?: NodeListOf<HTMLDivElement>;
}

let activeCarouselElement: number = 0;

const getCarouselParts = (carouselBox: HTMLDivElement): CarouselElements => {
  const carouselLeftArrow: HTMLElement | null = carouselBox.querySelector(
    ".carousel__arrow--left"
  );
  const carouselRightArrow: HTMLElement | null = carouselBox.querySelector(
    ".carousel__arrow--right"
  );
  const carouselItemsContainer: HTMLDivElement | null =
    carouselBox.querySelector(".carousel__items");
  const carouselNavigationContainer: HTMLDivElement | null =
    carouselBox.querySelector(".carousel__navigation");
  const carouselActiveItem: HTMLDivElement | null = document.querySelector(
    ".carousel__item--active"
  );
  const carouselActiveNavItem: HTMLDivElement | null = document.querySelector(
    ".carousel__navigation-item--active"
  );
  const navigationItems: NodeListOf<HTMLDivElement> | undefined =
    document.querySelectorAll(".carousel__navigation-item");

  return {
    carouselBox,
    carouselLeftArrow,
    carouselRightArrow,
    carouselItemsContainer,
    carouselNavigationContainer,
    carouselActiveNavItem,
    carouselActiveItem,
    navigationItems,
  };
};

const translateCarousel = (
  carouselItemsContainer: HTMLDivElement,
  previousActiveCarouselItem: HTMLDivElement,
  currentActiveCarouselItem: Element
) => {
  carouselItemsContainer.style.transform = `translateX(-${
    activeCarouselElement * 100
  }%)`;
  previousActiveCarouselItem.classList.remove("carousel__item--active");
  currentActiveCarouselItem.classList.add("carousel__item--active");
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

const carouselNavigationClickHandler = (
  event: MouseEvent,
  carousel: HTMLDivElement
) => {
  if (!event || !(event.target instanceof HTMLDivElement)) return;

  const clickedNavItem: HTMLDivElement | null = event.target.closest(
    ".carousel__navigation-item"
  );
  const {
    carouselActiveNavItem,
    carouselNavigationContainer,
    carouselItemsContainer,
  } = getCarouselParts(carousel);
  const previousActiveCarouselItem: HTMLDivElement | null =
    document.querySelector(".carousel__item--active");

  if (
    !clickedNavItem ||
    !carouselActiveNavItem ||
    !previousActiveCarouselItem ||
    !carouselNavigationContainer ||
    !carouselItemsContainer
  )
    return;

  const navContainerChildrenArray = Array.from(
    carouselNavigationContainer.children
  );
  activeCarouselElement = navContainerChildrenArray.indexOf(clickedNavItem);
  const currentActiveCarouselItem =
    carouselItemsContainer.children[activeCarouselElement];

  carouselActiveNavItem.classList.remove("carousel__navigation-item--active");
  clickedNavItem.classList.add("carousel__navigation-item--active");
  translateCarousel(
    carouselItemsContainer,
    previousActiveCarouselItem,
    currentActiveCarouselItem
  );
};

const carouselArrowClickHandler = (carousel: HTMLDivElement) => {
  const {
    carouselItemsContainer,
    carouselActiveNavItem: previousCarouselActiveNavItem,
    navigationItems,
  } = getCarouselParts(carousel);
  const currentActiveCarouselItem: Element | undefined =
    carouselItemsContainer?.children[activeCarouselElement];

  if (!navigationItems) return;

  const currentActiveNavigationItem = navigationItems[activeCarouselElement];

  if (
    !carouselItemsContainer ||
    !previousCarouselActiveNavItem ||
    !currentActiveCarouselItem
  )
    return;

  translateCarousel(
    carouselItemsContainer,
    previousCarouselActiveNavItem,
    currentActiveCarouselItem
  );

  toggleNavigationItem(
    previousCarouselActiveNavItem,
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
    const {
      carouselItemsContainer,
      carouselLeftArrow,
      carouselRightArrow,
      carouselNavigationContainer,
    } = getCarouselParts(carousel);

    if (
      !carouselItemsContainer ||
      !carouselLeftArrow ||
      !carouselRightArrow ||
      !carouselNavigationContainer
    )
      return;

    const {
      children: { length: numberOfItems },
    } = carouselItemsContainer;
    const { children: navigationItems } = carouselNavigationContainer;
    const activeNavigationItem = navigationItems[activeCarouselElement];

    carouselItemsContainer.style.width = `${numberOfItems * 100}%`;
    toggleNavigationItem(activeNavigationItem, ToggleNavItemMode.MAKE_ACTIVE);

    carouselLeftArrow.addEventListener("click", () => {
      activeCarouselElement--;
      if (activeCarouselElement < 0) activeCarouselElement = numberOfItems - 1;
      carouselArrowClickHandler(carousel);
    });

    carouselRightArrow.addEventListener("click", () => {
      activeCarouselElement++;
      if (activeCarouselElement === numberOfItems) activeCarouselElement = 0;
      carouselArrowClickHandler(carousel);
    });

    carouselNavigationContainer.addEventListener("click", (event: MouseEvent) =>
      carouselNavigationClickHandler(event, carousel)
    );
  });
};

carouselHandler();
