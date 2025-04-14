const freeQuoteFormSubmitHandler = (
  event: SubmitEvent,
  isDirtyAfterSubmit: boolean
) => {
  event.preventDefault();

  if (!(event.target instanceof HTMLFormElement)) return;

  const freeQuoteModalSubmitButton: HTMLButtonElement | null =
    event.target.querySelector("button");

  const errorAlreadyOccurred: HTMLDivElement | null =
    event.target.querySelector(".form__error-text");

  const estimatePriceElement: HTMLDivElement | null =
    event.target.querySelector(".form__result-text");

  const estimatePriceAlreadyShown = Boolean(estimatePriceElement);

  if (!freeQuoteModalSubmitButton) return;

  const formData = new FormData(event.target);
  let fieldEmpty: boolean = false;

  for (const entry of formData.entries()) {
    const [entryName, entryValue] = entry;

    if (!entryValue) {
      fieldEmpty = true;
      break;
    }
  }

  if (fieldEmpty && !errorAlreadyOccurred) {
    const emptyFieldDiv = document.createElement("div");
    emptyFieldDiv.textContent = "Please fill every input";
    emptyFieldDiv.classList.add("form__error-text");
    event.target.insertBefore(emptyFieldDiv, freeQuoteModalSubmitButton);

    if (estimatePriceElement) {
      event.target.removeChild(estimatePriceElement);
    }
  } else if (
    !fieldEmpty &&
    (!estimatePriceAlreadyShown || isDirtyAfterSubmit)
  ) {
    const randomEstimatePrice = (
      (Math.trunc(Math.random() * 8000) + 2000) /
      100
    ).toFixed(2);
    const estimateMonthlyPrice = document.createElement("div");
    estimateMonthlyPrice.textContent = `Estimated monthly charge is: €${randomEstimatePrice}`;
    estimateMonthlyPrice.classList.add("form__result-text");
    event.target.insertBefore(estimateMonthlyPrice, freeQuoteModalSubmitButton);

    if (errorAlreadyOccurred) {
      event.target.removeChild(errorAlreadyOccurred);
    }

    if (isDirtyAfterSubmit && estimatePriceElement) {
      event.target.removeChild(estimatePriceElement);
    }
  }
};

const freeQuoteFormHandler = () => {
  const form: HTMLFormElement | null =
    document.querySelector("#free-quote-form");

  let didSubmit = false;
  let isDirtyAfterSubmit = false;

  if (!form) return;

  form.addEventListener("submit", (event: SubmitEvent) => {
    freeQuoteFormSubmitHandler(event, isDirtyAfterSubmit);
    didSubmit = true;
    isDirtyAfterSubmit = false;
  });
  form.addEventListener("input", (event) => {
    if (didSubmit && !isDirtyAfterSubmit) isDirtyAfterSubmit = true;
  });
};

freeQuoteFormHandler();
