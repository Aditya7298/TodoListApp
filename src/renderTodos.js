import {
  createTodo,
  updateTodo,
  readAllTodos,
  deleteTodo,
  readSingleTodo,
  filterTodos,
  deleteMultitpleTodos,
  toggleMultipleTodosComplete,
} from "./database.js";
import { createNewTodo } from "./createTodos.js";
import { setProgress } from "./progressRing.js";
import { addEventToHistory } from "./undoEvents.js";
import { findFilterInfo } from "./filterForm.js";

const list = document.querySelector(".list");

export const renderAllTodosInDom = (todos) => {
  if (!todos) {
    const [filteredImp, filteredDate] = findFilterInfo();

    filterTodos(filteredImp, filteredDate)
      .then((todoList) => {
        list.innerHTML = "";
        todos = todoList;
        todos.forEach((todo) => {
          const todoInDom = createNewTodo(todo);
          list.append(todoInDom);
        });
        setProgress();
      })
      .catch((err) => {
        //Handle Error
      });
  } else {
    list.innerHTML = "";
    todos.forEach((todo) => {
      const todoInDom = createNewTodo(todo);
      list.append(todoInDom);
      setProgress();
    });
  }
};

export const toggleTodoCompleteInDom = (
  todoId,
  addInHistory,
  addInRedoHistory
) => {
  Array.from(list.children).forEach((todoInDom) => {
    if (Number(todoInDom.dataset.id) === todoId) {
      updateTodo(todoId, null, null, true)
        .then((updatedTodo) => {
          todoInDom.children[1].classList.toggle("todo-complete");
          if (addInHistory !== "no") {
            addEventToHistory("complete", [updatedTodo]);
          }

          if (addInRedoHistory) {
            addEventToHistory("complete", [updatedTodo], true);
          }
          setProgress();
        })
        .catch((err) => {
          //Handle Error
        });
    }
  });
};

export const addNewTodoInDom = (
  todoTitle,
  todoImportance,
  prevTodo,
  index,
  addInHistory,
  addInRedoHistory
) => {
  if (prevTodo) {
    createTodo(null, null, index, prevTodo)
      .then((newTodoObject) => {
        renderAllTodosInDom();
        setProgress();
      })
      .catch((err) => {
        //Handle Error
      });

    if (addInRedoHistory) {
      addEventToHistory("create", [prevTodo], true);
    }
  } else {
    createTodo(todoTitle, todoImportance)
      .then((newTodoObject) => {
        const newTodoInDom = createNewTodo(newTodoObject);
        list.append(newTodoInDom);
        if (addInHistory !== "no") {
          addEventToHistory("create", [newTodoObject]);
        }

        setProgress();
      })
      .catch((err) => {
        //Handle Error
      });
  }
};

export const deleteTodoFromDom = (todoId, addInHistory, addInRedoHistory) => {
  Array.from(list.children).forEach((todoInDom) => {
    if (todoId === Number(todoInDom.dataset.id)) {
      deleteTodo(todoId)
        .then(([deletedTodoObject, deletionIndex]) => {
          todoInDom.remove();
          if (addInHistory !== "no") {
            addEventToHistory("delete", [deletedTodoObject, deletionIndex]);
          }

          if (addInRedoHistory) {
            addEventToHistory(
              "delete",
              [deletedTodoObject, deletionIndex],
              true
            );
          }
          setProgress();
        })
        .catch((err) => {
          //Handle Error
        });
    }
  });
};

export const updateTodoInDom = (
  todoId,
  newTitle,
  newImportance,
  addInHistory,
  addInRedoHistory
) => {
  Array.from(list.children).forEach((todoInDom) => {
    if (Number(todoInDom.dataset.id) === todoId) {
      readSingleTodo(todoId)
        .then((prevTodo) => {
          updateTodo(todoId, newTitle, newImportance, false)
            .then((updatedTodo) => {
              if (newTitle) {
                todoInDom.children[1].textContent = newTitle;
              }

              if (newImportance) {
                todoInDom.children[0].className = "";
                todoInDom.children[0].classList.add("todo-imp", newImportance);
              }

              if (addInHistory !== "no") {
                addEventToHistory("update", [prevTodo]);
              }

              if (addInRedoHistory) {
                addEventToHistory("update", [prevTodo], true);
              }

              setProgress();
            })
            .catch((err) => {
              //Handle Error
            });
        })
        .catch((err) => {
          //Handle Error
        });
    }
  });
};

export const deleteSelectedTodosInDom = (
  todoIds,
  addInHistory,
  addInRedoHistory
) => {
  deleteMultitpleTodos(todoIds)
    .then((prevTodoList) => {
      renderAllTodosInDom();

      if (addInHistory !== "no") {
        addEventToHistory("multiple-delete", [prevTodoList]);
      }

      return true;
    })
    .catch((err) => {
      //Handle Error
      return false;
    });
};

export const toggleSelectedTodosCompleteInDom = (
  selectedTodoIds,
  addInUndoHistory = true
) => {
  toggleMultipleTodosComplete(selectedTodoIds)
    .then((updatedTodoIds) => {
      Array.from(list.children).forEach((todoInDom) => {
        const todoId = Number(todoInDom.dataset.id);
        if (updatedTodoIds.includes(todoId)) {
          todoInDom.children[1].classList.toggle("todo-complete");
        }
      });

      if (addInUndoHistory) {
        addEventToHistory("multiple-complete", [updatedTodoIds]);
      } else {
        addEventToHistory("multiple-complete", [updatedTodoIds], true);
      }

      renderAllTodosInDom();
      return true;
    })
    .catch((err) => {
      //Handle Error
      console.log(err);
      return false;
    });
};
