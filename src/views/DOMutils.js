import { USERACTION, BUTTONICONCLASSES } from "../constants.js";

export const createDropDownList = (options, inputName) => {
  const newSelectInput = document.createElement("select");
  newSelectInput.name = inputName;
  options.forEach((option) => {
    const newOptionInput = document.createElement("option");
    newOptionInput.value = option;
    newOptionInput.innerHTML = option;
    newSelectInput.append(newOptionInput);
  });

  return newSelectInput;
};

const createButton = (action) => {
  const newButton = document.createElement("button");
  newButton.name = action;
  newButton.classList.add(...BUTTONICONCLASSES[action], "todo-button");
  return newButton;
};

export const createTodoInDom = (todo) => {
  const newTodo = document.createElement("div");
  newTodo.dataset.id = todo.id;
  newTodo.dataset.title = todo.title;
  newTodo.dataset.importance = todo.importance;
  newTodo.dataset.completed = `${todo.completed ? "true" : "false"}`;

  newTodo.classList.add("todo");

  const todoTitle = document.createElement("span");
  todoTitle.textContent = todo.title;
  todoTitle.dataset.todo = `${todo.id}_title`;
  todoTitle.classList = `todo-title ${todo.completed ? "todo-completed" : ""}`;

  const todoImpIcon = document.createElement("i");
  todoImpIcon.dataset.todo = `${todo.id}_importance`;
  todoImpIcon.classList = `todo-importance todo-importance-${todo.importance}`;

  const todoDateSpan = document.createElement("span");
  todoDateSpan.textContent = todo.date;
  todoDateSpan.dataset.todo = `${todo.id}_date`;
  todoDateSpan.classList = "todo-date";

  const todoSelectButton = document.createElement("span");
  todoSelectButton.dataset.todo = `${todo.id}_${USERACTION.select}`;
  todoSelectButton.classList = `todo-${USERACTION.select}`;

  const todoToggleButton = createButton(USERACTION.toggle);
  todoToggleButton.dataset.todo = `${todo.id}_${USERACTION.toggle}`;

  const todoEditButton = createButton(USERACTION.edit);
  todoEditButton.dataset.todo = `${todo.id}_${USERACTION.edit}`;

  const todoDeleteButton = createButton(USERACTION.delete);
  todoDeleteButton.dataset.todo = `${todo.id}_${USERACTION.delete}`;

  newTodo.append(
    todoImpIcon,
    todoTitle,
    todoDateSpan,
    todoToggleButton,
    todoEditButton,
    todoDeleteButton
  );

  return newTodo;
};
