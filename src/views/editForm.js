import {} from "./utils.js";

{
  /* <form id="editTodoForm">
        <label for="editFormTitle">Edit todo title</label>
        <input type="text" name="title" class="inputField" id="editFormTitle">
        <label for="editFormImp">Edit todo priority</label>
        <select name="imp" class="inputField" id="editFormImp">
          <option value="all">All</option>
          <option value="high">Do now!!!</option>
          <option value="medium">Do tomorrow!!</option>
          <option value="low">Do soon!</option>
          <option value="none">Do when you have extra time.</option>
        </select>
        <button name="submitEditButton" type="submit" class="filterTodoButton">Submit</button>
        <button name="cancelEditButton" id = "cancelTodoEdit" type="reset" class="filterTodoButton">Cancel</button>
      </form> 
*/
}

const Init = () => {
  const modal = document.querySelector(".modal");
  //Creating the form element
  const editForm = document.createElement("form");
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
