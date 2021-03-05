import { IMPORTANCE } from "../constants.js";
import { createDropDownList } from "./DOMutils.js";

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
  todoImportanceInput.classList.add("sidebar-addform__importance");
  todoImportanceInputLabel.append(
    "Select Todo Importance",
    todoImportanceInput
  );

  addForm.append(todoTitleInput, todoImportanceInputLabel);
  sidebar.append(heading, addForm);
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const title = document.querySelector("[data-addform=title]").value;
  const importance = document.querySelectorAll("[data-addform=importance]")
    .value;
  return { title, importance };
};

export default {
  Init,
  handleSubmit,
};
