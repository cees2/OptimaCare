const freeQuoteFormSubmitHandler = (event: SubmitEvent) => {
  event.preventDefault();

  if (!(event.target instanceof HTMLFormElement)) return;

  const freeQuoteModalSubmitButton: HTMLButtonElement | null =
    event.target.querySelector("button");

  const errorAlreadyOccurred: HTMLDivElement | null =
    event.target.querySelector(".form__error-text");

  const estimatePriceAlreadyShown: HTMLDivElement | null =
    event.target.querySelector(".form__result-text");

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
  } else if (!fieldEmpty && !estimatePriceAlreadyShown) {
    const randomEstimatePrice = (Math.trunc(Math.random() * 10000) + 20) / 100;
    const estimateMonthlyPrice = document.createElement("div");
    estimateMonthlyPrice.textContent = `Estimated monthly charge is: €${randomEstimatePrice}`;
    estimateMonthlyPrice.classList.add("form__result-text");
    event.target.insertBefore(estimateMonthlyPrice, freeQuoteModalSubmitButton);

    if (errorAlreadyOccurred) {
      event.target.removeChild(errorAlreadyOccurred);
    }
  }
};

const freeQuoteFormHandler = () => {
  const form: HTMLFormElement | null =
    document.querySelector("#free-quote-form");

  if (!form) return;

  form.addEventListener("submit", freeQuoteFormSubmitHandler);
};

freeQuoteFormHandler();
