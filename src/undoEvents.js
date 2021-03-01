import { handleAddForm } from "./addForm.js";
import { addMultipleTodos } from "./database.js";
import {
  updateTodoInDom,
  deleteTodoFromDom,
  addNewTodoInDom,
  toggleTodoCompleteInDom,
  toggleSelectedTodosCompleteInDom,
  addBulkTodosInDom,
  deleteSelectedTodosInDom,
} from "./renderTodos.js";

const history = [];
const redoHistory = [];

const getDeletedTodoIds = (currList, prevList) => {
  const currTodoIds = currList.map((todo) => todo.id);
  const prevTodoIds = prevList.map((todo) => todo.id);

  const deletedTodoIds = prevTodoIds.filter(
    (prevTodoId) => !currTodoIds.includes(prevTodoId)
  );

  return deletedTodoIds;
};

export const addEventToHistory = (evt, evtInfo, addToRedoHistory = false) => {
  let newHistoryObj, todo, index, todoIds, prevTodoList, currTodoList;

  switch (evt) {
    case "delete":
      [todo, index] = evtInfo;
      newHistoryObj = { lastEvtType: evt, todo, index };
      break;

    case "multiple-complete":
      [todoIds] = evtInfo;
      newHistoryObj = { lastEvtType: evt, todoIds };
      break;

    case "multiple-delete":
      [prevTodoList] = evtInfo;
      newHistoryObj = { lastEvtType: evt, prevTodoList };
      break;

    case "multiple-addition":
      [prevTodoList, currTodoList] = evtInfo;
      newHistoryObj = { lastEvtType: evt, prevTodoList, currTodoList };
      break;

    default:
      [todo] = evtInfo;
      console.log(todo);
      newHistoryObj = { lastEvtType: evt, todo };
  }

  if (addToRedoHistory) {
    redoHistory.push(newHistoryObj);
  } else {
    history.push(newHistoryObj);
  }
};

export const redoLastEvent = (evt, todoObj) => {
  if (redoHistory.length === 0) {
    console.log("No event found in redo history !!");
    return;
  }

  const lastEvt = redoHistory[redoHistory.length - 1];
  redoHistory.pop();

  const { lastEvtType, todo, index, todoIds, prevTodoList, currTodoList } = {
    ...lastEvt,
  };

  switch (lastEvtType) {
    case "update":
      updateTodoInDom(todo.id, todo.title, todo.importance);
      break;

    case "create":
      deleteTodoFromDom(todo.id);
      break;

    case "delete":
      addNewTodoInDom(null, null, todo, index);
      break;

    case "complete":
      toggleTodoCompleteInDom(todo.id);
      break;

    case "multiple-complete":
      toggleSelectedTodosCompleteInDom(todoIds);
      break;

    case "multiple-addition":
      const deletedTodoIds = getDeletedTodoIds(prevTodoList, currTodoList);
      deleteSelectedTodosInDom(deletedTodoIds);
      break;
  }
};

export const undoLastEvent = (handlingRedoEvent) => {
  if (history.length === 0) {
    console.log("No event found in history !!");
    return;
  }

  const lastEvt = history[history.length - 1];
  history.pop();

  const { lastEvtType, todo, index, todoIds, prevTodoList } = { ...lastEvt };

  switch (lastEvtType) {
    case "update":
      updateTodoInDom(todo.id, todo.title, todo.importance, "no", true);
      break;

    case "create":
      deleteTodoFromDom(todo.id, "no", true);
      break;

    case "delete":
      addNewTodoInDom(null, null, todo, index, "no", true);
      break;

    case "complete":
      toggleTodoCompleteInDom(todo.id, "no", true);
      break;

    case "multiple-complete":
      toggleSelectedTodosCompleteInDom(todoIds, false);
      break;

    case "multiple-delete":
      addBulkTodosInDom(prevTodoList, false);
      break;
  }
};
