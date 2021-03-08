import { IMPORTANCE, IMPORTANCEICONCLASSES } from "../constants.js";
import { createDropDownList } from "./DOMutils.js";

const Init = () => {
  const sidebar = document.querySelector(".sidebar");

  const heading = document.createElement("h3");
  heading.innerHTML = "Add a new Todo";

  //Creating the form element
  const addForm = document.createElement("form");
  addForm.classList.add("sidebar-addform");

  //Creating the todo title input
  const todoTitleInput = document.createElement("input");
  todoTitleInput.dataset.addform = "title";
  todoTitleInput.type = "text";
  todoTitleInput.classList.add("sidebar-addform__title");
  todoTitleInput.required = true;
  todoTitleInput.name = "todo-title";
  todoTitleInput.placeholder = "Enter new todo title";

  //Creating the dropdown menu for todo importance selection
  const todoImportanceInputLabel = document.createElement("label");
  const todoImportanceInput = createDropDownList(
    Object.values(IMPORTANCE),
    "todo-importance"
  );
  todoImportanceInput.dataset.addform = "importance";
  todoImportanceInput.value = IMPORTANCE.high;
  todoImportanceInput.classList.add("sidebar-addform__importance");
  todoImportanceInputLabel.append(
    "Select Todo Importance",
    todoImportanceInput
  );

  const submitButton = document.createElement("button");
  submitButton.classList = "addform-submitbutton";
  submitButton.innerHTML = "Add Todo";

  addForm.append(todoTitleInput, todoImportanceInputLabel, submitButton);
  sidebar.append(heading, addForm);
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const title = document.querySelector('[data-addform="title"]').value;
  const importance = document.querySelector('[data-addform="importance"]')
    .value;
  return { title, importance };
};

export default {
  Init,
  handleSubmit,
};
