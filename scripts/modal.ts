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

const addEventListenersToModalTriggers = () => {
  const modalTriggers: NodeListOf<HTMLElement> | null =
    document.querySelectorAll("[data-dropdown-trigger-id]");

  const modalTriggerHandler = (event: MouseEvent) => {
    if (
      !(event.target instanceof HTMLElement) ||
      !event.target.dataset.dropdownTriggerId
    )
      return;

    const modalID = event.target.dataset.dropdownTriggerId;
    const modalElement = document.getElementById(modalID);
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
  };

  modalTriggers?.forEach((modalTrigger) => {
    modalTrigger.addEventListener("click", modalTriggerHandler);
  });
};

addEventListenersToModalTriggers();
