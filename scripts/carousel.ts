enum ToggleNavItemMode {
  MAKE_REGULAR,
  MAKE_ACTIVE,
}

let activeCarouselElement: number = 0;

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
  carouselNavContainer: HTMLDivElement,
  carouselItemsContainer: HTMLDivElement
) => {
  if (!event || !(event.target instanceof HTMLDivElement)) return;
  const clickedNavItem: HTMLDivElement | null = event.target.closest(
    ".carousel__navigation-item"
  );
  const activeNavElement: HTMLDivElement | null = document.querySelector(
    ".carousel__navigation-item--active"
  );
  const previousActiveCarouselItem: HTMLDivElement | null =
    document.querySelector(".carousel__item--active");

  if (!clickedNavItem || !activeNavElement || !previousActiveCarouselItem)
    return;

  const navContainerChildrenArray = Array.from(carouselNavContainer.children);
  activeCarouselElement = navContainerChildrenArray.indexOf(clickedNavItem);
  const currentActiveCarouselItem =
    carouselItemsContainer.children[activeCarouselElement];

  activeNavElement.classList.remove("carousel__navigation-item--active");
  clickedNavItem.classList.add("carousel__navigation-item--active");
  translateCarousel(
    carouselItemsContainer,
    previousActiveCarouselItem,
    currentActiveCarouselItem
  );
};

const carouselArrowClickHandler = (
  carousel: HTMLDivElement,
  activeCarouselElement: number
) => {
  const carouselItemsContainer: HTMLDivElement | null =
    carousel.querySelector(".carousel__items");
  const previousActiveCarouselItem: HTMLDivElement | undefined | null =
    carouselItemsContainer?.querySelector(".carousel__item--active");
  const currentActiveCarouselItem: Element | undefined =
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

  translateCarousel(
    carouselItemsContainer,
    previousActiveCarouselItem,
    currentActiveCarouselItem
  );

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
    const carouselItemContainer: HTMLDivElement | null =
      carousel.querySelector(".carousel__items");
    const carouselArrowLeft = carousel.querySelector(".carousel__arrow--left");
    const carouselArrowRight = carousel.querySelector(
      ".carousel__arrow--right"
    );
    const carouselNavigationContainer: HTMLDivElement | null =
      carousel.querySelector(".carousel__navigation");

    if (
      !carouselItemContainer ||
      !carouselArrowLeft ||
      !carouselArrowRight ||
      !carouselNavigationContainer
    )
      return;

    const {
      children: { length: numberOfItems },
    } = carouselItemContainer;
    const { children: navigationItems } = carouselNavigationContainer;
    const activeNavigationItem = navigationItems[activeCarouselElement];

    carouselItemContainer.style.width = `${numberOfItems * 100}%`;
    toggleNavigationItem(activeNavigationItem, ToggleNavItemMode.MAKE_ACTIVE);

    carouselArrowLeft.addEventListener("click", () => {
      activeCarouselElement--;
      if (activeCarouselElement < 0) activeCarouselElement = numberOfItems - 1;
      carouselArrowClickHandler(carousel, activeCarouselElement);
    });

    carouselArrowRight.addEventListener("click", () => {
      activeCarouselElement++;
      if (activeCarouselElement === numberOfItems) activeCarouselElement = 0;
      carouselArrowClickHandler(carousel, activeCarouselElement);
    });

    carouselNavigationContainer.addEventListener("click", (event: MouseEvent) =>
      carouselNavigationClickHandler(
        event,
        carouselNavigationContainer,
        carouselItemContainer
      )
    );
  });
};

carouselHandler();
