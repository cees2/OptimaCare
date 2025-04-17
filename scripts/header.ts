enum HamburgerMenuAction {
  OPEN,
  CLOSE,
}

const toggleHamburgerMenu = (action: HamburgerMenuAction) => {
  const mainNavElement = document.querySelector(".header nav");

  if (!mainNavElement) return;

  if (action === HamburgerMenuAction.OPEN) {
    mainNavElement.classList.add("header__hamburger-menu-active");
  } else {
    mainNavElement.classList.remove("header__hamburger-menu-active");
  }
};

const hamburgerMenuHandler = () => {
  const header: HTMLElement | null = document.querySelector("header.header");
  const hamburgerIcon: HTMLImageElement | null | undefined =
    header?.querySelector(".header__hamburger-menu-icon");
  const leftArrowIcon: HTMLImageElement | null | undefined =
    header?.querySelector(".header__left-arrow");
  const headerList: HTMLUListElement | null | undefined =
    header?.querySelector(".header__nav-list");

  hamburgerIcon?.addEventListener("click", () =>
    toggleHamburgerMenu(HamburgerMenuAction.OPEN)
  );
  leftArrowIcon?.addEventListener("click", () =>
    toggleHamburgerMenu(HamburgerMenuAction.CLOSE)
  );
  headerList?.addEventListener("click", () =>
    toggleHamburgerMenu(HamburgerMenuAction.CLOSE)
  );
};

hamburgerMenuHandler();
