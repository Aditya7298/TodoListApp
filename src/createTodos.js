const createButton = (name) => {
  const iconClasses = {
    delete: "fa-trash",
    complete: "fa-check-square",
    edit: "fa-edit",
  };

  const newButton = document.createElement("button");
  newButton.name = name;
  newButton.id = `${name}btn`;
  newButton.classList.add("fas", iconClasses[name]);
  return newButton;
};

export const createNewTodo = (todo) => {
  const newTodo = document.createElement("div");
  newTodo.dataset.id = todo.id;
  newTodo.classList.add("todo");
  const todoTitle = document.createElement("span");
  const impIcon = document.createElement("i");
  const dateSpan = document.createElement("span");
  const selectButton = document.createElement("span");

  impIcon.classList.add("todo-imp", todo.importance);
  todoTitle.append(todo.title);
  todoTitle.classList.add("todo-title");
  dateSpan.innerHTML = todo.date;
  dateSpan.classList.add("dateSpan");
  selectButton.classList.toggle("todo-selectbutton");
  selectButton.dataset.evtType = "select";

  newTodo.appendChild(impIcon);
  newTodo.appendChild(todoTitle);
  newTodo.appendChild(dateSpan);
  newTodo.appendChild(createButton("complete"));
  newTodo.appendChild(createButton("edit"));
  newTodo.appendChild(createButton("delete"));
  newTodo.appendChild(selectButton);

  if (todo.completed) {
    newTodo.children[1].classList.toggle("todo-complete");
  }

  return newTodo;
};
