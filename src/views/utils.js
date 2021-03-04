export const createDropDownList = (options) => {
  const selectInput = document.createElement("select");
  options.forEach((option) => {
    const optionInput = document.createElement("option");
    optionInput.value = option;
    optionInput.innerHTML = option;
    selectInput.append(optionInput);
  });

  return selectInput;
};
