const closeModalHandler = (modalElement: HTMLElement) => {
  modalElement.removeEventListener("click", modalClickHandler);
  modalElement.classList.remove("active");
};

const modalClickHandler = (event: MouseEvent) => {
  if (!(event.target instanceof HTMLElement)) return;

  const modalBackdropClicked = event.target === event.currentTarget;

  if (modalBackdropClicked) {
    closeModalHandler(event.target);
  }
};

const modalTriggerHandler = (event: MouseEvent) => {
  if (
    !(event.target instanceof HTMLElement) ||
    !event.target.dataset.dropdownTriggerId
  )
    return;

  const {
    target: {
      dataset: { dropdownTriggerId, modalTitle },
    },
  } = event;
  const modalElement = document.getElementById(dropdownTriggerId);
  const modalCloseIcon: HTMLDivElement | undefined | null =
    modalElement?.querySelector(".modal__close-icon");

  if (!modalElement || !modalCloseIcon) return;

  modalElement.classList.add("active");
  modalElement.addEventListener("click", modalClickHandler);
  modalCloseIcon.addEventListener(
    "click",
    () => closeModalHandler(modalElement),
    { once: true }
  );

  const modalTitleElement: HTMLHeadingElement | null =
    modalElement.querySelector(".modal__title");

  if (modalTitleElement && modalTitle) {
    modalTitleElement.textContent = modalTitle;
  }
};

const addEventListenersToModalTriggers = () => {
  const modalTriggers: NodeListOf<HTMLElement> | null =
    document.querySelectorAll("[data-dropdown-trigger-id]");

  modalTriggers?.forEach((modalTrigger) => {
    modalTrigger.addEventListener("click", modalTriggerHandler);
  });
};

const addEventListenersToDisclaimerModal = () => {
  const disclaimerModal: HTMLDivElement | null =
    document.querySelector("#disclaimer-modal");
  const modalCloseIcon: HTMLDivElement | undefined | null =
    disclaimerModal?.querySelector(".modal__close-icon");

  if (!disclaimerModal || !modalCloseIcon) return;

  disclaimerModal?.addEventListener("click", modalClickHandler);
  modalCloseIcon?.addEventListener(
    "click",
    () => closeModalHandler(disclaimerModal),
    { once: true }
  );
};

addEventListenersToModalTriggers();
addEventListenersToDisclaimerModal();
