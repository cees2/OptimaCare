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

const addEventListenersToModalTriggers = () => {
  const modalTriggers: NodeListOf<HTMLElement> | null =
    document.querySelectorAll("[data-dropdown-trigger-id]");

  modalTriggers?.forEach((modalTrigger) => {
    modalTrigger.addEventListener("click", modalTriggerHandler);
  });
};

const addEventListenersToDisclaimerModal = () => {
  const displaimerModal: HTMLDivElement | null =
    document.querySelector("#disclaimer-modal");
  const modalCloseIcon: HTMLDivElement | undefined | null =
    displaimerModal?.querySelector(".modal__close-icon");

  if (!displaimerModal || !modalCloseIcon) return;

  displaimerModal?.addEventListener("click", modalClickHandler);
  modalCloseIcon?.addEventListener(
    "click",
    () => closeModalHandler(displaimerModal),
    { once: true }
  );
};

addEventListenersToModalTriggers();
addEventListenersToDisclaimerModal();
