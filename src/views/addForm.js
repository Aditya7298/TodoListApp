import { IMPORTANCE } from "./constants.js";

{
  /* <h3>Add a new Todo</h3>
<form id="addTodoForm">
  <input type="text" class="inputField" id="todoTitleInput" required name="todoText"
    placeholder="Enter new todo name">
  <label for="todoImpSelect">Select Todo Importance</label>
  <select name="todoImp" class="inputField" id="todoImpInput">
    <option value="high">Do now!!!</option>
    <option value="medium">Do tomorrow!!</option>
    <option value="low">Do soon!</option>
    <option value="none">Do when you have extra time.</option>
  </select>
  <button id="addTodoButton">Add Todo</button>
</form> */
}

const Init = () => {
  const sidebar = document.querySelector(".sidebar");

  const heading = document.createElement("h3");
  heading.innerHTML = "Add a new Todo";

  //Creating the form element
  const addForm = document.createElement("form");
  addForm.classList.add("sidebar-addtodoform");

  //Creating the todo title input
  const todoNameInput = document.createElement("input");
  todoNameInput.dataset.addForm = "title";
  todoNameInput.type = text;
  todoNameInput.classList.add("sidebar-addtodoform__title");
  todoNameInput.required = true;
  todoNameInput.name = "todotext";
  todoNameInput.placeholder = "Enter new todo name";

  //Creating the dropdown menu for todo importance selection
  const todoImportanceInputLabel = document.createElement("label");
  const todoImportanceInput = document.createElement("select");
  todoImportanceInput.dataset.addForm = "importance";
  todoImportanceInput.classList.add("sidebar-addtodoform__importance");
  Object.keys(IMPORTANCE).forEach((importanceValue) => {
    const optionInput = document.createElement("option");
    optionInput.value = IMPORTANCE[importanceValue];
    optionInput.innerHTML = IMPORTANCE[importanceValue];
    todoImportanceInput.appendChild(optionInput);
  });
  todoImportanceInputLabel.append(
    "Select Todo Importance",
    todoImportanceInput
  );

  addForm.append(todoNameInput, todoImportanceInputLabel);
  sidebar.append(heading, addForm);
};

const handleSubmit = (evt, callback) => {
  evt.preventDefault();
  const todoTitle = document.querySelector("[data-addForm='title']").value;
  const todoImportance = document.querySelectorAll(
    "[data-addForm='importance']"
  ).value;
};

export default {
  Init,
  handleSubmit,
};
