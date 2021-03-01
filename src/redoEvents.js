import {
  updateTodoInDom,
  deleteTodoFromDom,
  addNewTodoInDom,
  toggleTodoCompleteInDom,
} from "./renderTodos.js";

let redoHistory = [];

export const addEventToRedoHistory = (evt, todoObj, index) => {
  const newHistoryObj = { type: evt, todo: todoObj };

  if (evt === "delete") {
    newHistoryObj[index] = index;
  }

  history.push(newHistoryObj);
};

export const undoLastEvent = () => {
  if (history.length === 0) {
    console.log("No event found in history !!");
    return;
  }

  const lastEvt = history[history.length - 1];
  history.pop();

  const lastEvtType = lastEvt.type;
  const todo = lastEvt.todo;
  const index = lastEvt.index;

  switch (lastEvtType) {
    case "edit":
      updateTodoInDom(todo.id, todo.title, todo.importance, "no");
      break;

    case "create":
      deleteTodoFromDom(todo.id, "no");
      break;

    case "delete":
      addNewTodoInDom(null, null, todo, index, "no");
      break;

    case "complete":
      toggleTodoCompleteInDom(todo.id, "no");
      break;
  }
};
