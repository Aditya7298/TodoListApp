import { resolveDatabaseCall } from "./database.js";

export default class Model {
  constructor(Todos) {
    this.TodoStore = Todos ? [...Todos] : [];
    this.currId = Todos ? Todos.length + 1 : 0;
  }

  makeCopyOfAListOfObjects = (listOfObjects) =>
    listOfObjects.map((object) => ({ ...object }));

  readAllTodos = () => {
    const TodoStoreCopy = this.makeCopyOfAListOfObjects(this.TodoStore);
    return TodoStoreCopy;
  };

  readSingleTodo = (todoId) => {
    const selectedTodo = this.TodoStore.filter((todo) => todo.id === todoId);
    return { ...selectedTodo };
  };

  readFilteredTodos = (filteredDate, filteredImportance) => {
    const filteredTodos = this.TodoStore.filter((todo) => {
      filteredDate =
        filteredDate === "" ? "" : new Date(filteredDate).toDateString();
      if (filteredDate !== "" && todo.date !== filteredDate) {
        return false;
      }

      if (
        filteredImportance !== "all" &&
        todo.importance !== filteredImportance
      ) {
        return false;
      }

      return true;
    });

    const filteredTodosCopy = this.makeCopyOfAListOfObjects(filteredTodos);

    return filteredTodosCopy;
  };

  createTodo = (title, importance) => {
    const newTodo = {
      id: this.currId + 1,
      title,
      importance,
      completed: false,
      date: new Date().toDateString(),
    };

    resolveDatabaseCall()
      .then(() => {
        this.TodoStore = [...this.TodoStore, newTodo];
        return { ...newTodo };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Function to add previously deleted todo back in the list

  insertTodo = (prevTodo, todoIndex) => {
    resolveDatabaseCall()
      .then(() => {
        this.TodoStore = this.TodoStore.slice(0, todoIndex).concat(
          { ...prevTodo },
          this.TodoStore.slice(todoIndex)
        );

        return prevTodo;
      })
      .catch((err) => {
        throw err;
      });
  };

  updateTodo = (todoId, updatedTodo) => {
    resolveDatabaseCall()
      .then(() => {
        this.TodoStore = this.TodoStore.map((todo) => {
          todo.id === todoId ? { ...updatedTodo } : todo;
        });

        return updatedTodo;
      })
      .catch((err) => {
        throw err;
      });
  };

  toggleTodoComplete = (todoId) => {
    resolveDatabaseCall()
      .then(() => {
        this.TodoStore = this.TodoStore.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );

        return todoId;
      })
      .catch((err) => {
        throw err;
      });
  };

  toggleMultipleTodosComplete = (todoIds) => {
    resolveDatabaseCall()
      .then(() => {
        this.TodoStore = this.TodoStore.map((todo) =>
          todoIds.includes(todo.id)
            ? { ...todo, completed: !todo.completed }
            : todo
        );

        return todoIds;
      })
      .catch((err) => {
        throw err;
      });
  };

  deleteTodo = (todoId) => {
    resolveDatabaseCall()
      .then(() => {
        this.TodoStore = this.TodoStore.filter((todo, index) => {
          if (todo.id === todoId) {
            const deletedTodo = todo, //should I send a copy ?
              deletedTodoIndex = index;
            return false;
          }

          return true;
        });

        return { deletedTodo, deletedTodoIndex };
      })
      .catch((err) => {
        throw err;
      });
  };

  deleteMultipleTodos = (todoIds) => {
    resolveDatabaseCall()
      .then(() => {
        const prevTodoStore = this.makeCopyOfAListOfObjects(this.TodoStore);
        this.TodoStore = this.TodoStore.filter((todo) =>
          todoIds.includes(todo)
        );
        return prevTodoStore;
      })
      .catch((err) => {
        throw err;
      });
  };
}
