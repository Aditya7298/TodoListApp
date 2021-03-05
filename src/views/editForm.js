import { createDropDownList } from "./DOMutils.js";
import { IMPORTANCE } from "../constants.js";

const Init = (todoInDom) => {
  const modal = document.querySelector(".modal");
  const modalBackground = document.querySelector(".modal-bg");
  modalBackground.style.visibility = "visible";

  const todoTitle = todoInDom.dataset.title;
  const todoImportance = todoInDom.dataset.importance;

  //Creating the form element
  const editForm = document.createElement("form");
  editForm.classList.add("modal-editform");

  //Creating the todo title input
  const todoTitleInputLabel = document.createElement("label");
  const todoTitleInput = document.createElement("input");
  todoTitleInput.dataset.editForm = "title";
  todoTitleInput.value = todoTitle;
  todoTitleInput.type = "text";
  todoTitleInput.classList.add("modal-editform__title");
  todoTitleInput.required = true;
  todoTitleInput.name = "todo-title";
  todoTitleInputLabel.append("Change todo title", todoTitleInput);

  //Creating the dropdown menu for todo importance selection
  const todoImportanceInputLabel = document.createElement("label");
  const todoImportanceInput = createDropDownList(Object.values(IMPORTANCE));
  todoImportanceInput.name = "todo-importance";
  todoImportanceInput.value = todoImportance;
  todoImportanceInput.dataset.editForm = "importance";
  todoImportanceInput.classList.add("model-editform__importance");
  todoImportanceInputLabel.append(
    "Change Todo Importance",
    todoImportanceInput
  );

  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.innerHTML = "Submit";

  const cancelButton = document.createElement("button");
  cancelButton.innerHTML = "Cancel";

  editForm.append(
    todoTitleInputLabel,
    todoImportanceInputLabel,
    submitButton,
    cancelButton
  );
  modal.append(editForm);
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const title = document.querySelector("[data-editForm=title]").value;
  const importance = document.querySelectorAll("[data-editForm=importance]")
    .value;

  const modalBackground = document.querySelector(".modal-bg");
  modalBackground.style.visibility = "visible";

  return { title, importance };
};

export default {
  Init,
  handleSubmit,
};
