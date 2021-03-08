import { IMPORTANCE } from "../constants.js";
import { createDropDownList } from "./DOMutils.js";

const Init = () => {
  const sidebar = document.querySelector(".sidebar");

  const heading = document.createElement("h3");
  heading.innerHTML = "Filter Todos";

  //Creating the form element
  const addForm = document.createElement("form");
  addForm.classList.add("sidebar-filterform");

  //Creating the dropdown menu for todo importance selection
  const todoImportanceInputLabel = document.createElement("label");
  const todoImportanceInput = createDropDownList(
    ["All", ...Object.values(IMPORTANCE)],
    "todo-importance"
  );
  todoImportanceInput.dataset.filterform = "importance";
  todoImportanceInput.value = "All";
  todoImportanceInput.classList.add("sidebar-filterform__importance");
  todoImportanceInputLabel.append("Filter by Importance", todoImportanceInput);

  //Creating the date selector
  const todoDateInputLabel = document.createElement("label");
  const todoDateInput = document.createElement("input");
  todoDateInput.type = "date";
  todoDateInput.dataset.filterform = "date";
  todoDateInput.classList.add("sidebar-filterform__date");
  todoDateInputLabel.append("Filter by Date", todoDateInput);

  const submitButton = document.createElement("button");
  submitButton.classList = "filterform-submitbutton";
  submitButton.innerHTML = "Filter Todos";
  submitButton.dataset.filterform = "submit";

  const resetButton = document.createElement("button");
  resetButton.type = "reset";
  resetButton.classList = "filterform-resetbutton";
  resetButton.innerHTML = "Reset";
  resetButton.dataset.filterform = "reset";

  addForm.append(
    todoImportanceInputLabel,
    todoDateInputLabel,
    submitButton,
    resetButton
  );

  sidebar.append(heading, addForm);
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const date = document.querySelector('[data-filterform="date"]').value;
  const importance = document.querySelector('[data-filterform="importance"]')
    .value;
  return { date, importance };
};

export default {
  Init,
  handleSubmit,
};
