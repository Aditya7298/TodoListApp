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
    const selectedTodo = this.TodoStore.filter((todo) => todo.id === todoId)[0];
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
        filteredImportance !== "All" &&
        todo.importance !== filteredImportance
      ) {
        return false;
      }

      return true;
    });

    const filteredTodosCopy = this.makeCopyOfAListOfObjects(filteredTodos);

    return filteredTodosCopy;
  };

  changeTodoStoreState = async (
    prevTodoStore,
    successCallback,
    faliureCallback
  ) => {
    try {
      const databaseResponse = await resolveDatabaseCall();
      this.TodoStore = this.makeCopyOfAListOfObjects(prevTodoStore);
      successCallback();
    } catch (err) {
      faliureCallback();
    }
  };

  createTodo = async (title, importance, successCallback, faliureCallback) => {
    try {
      const newTodo = {
        id: `${this.currId++}`,
        title,
        importance,
        completed: false,
        date: new Date().toDateString(),
      };

      const databaseResponse = await resolveDatabaseCall();
      this.TodoStore = [...this.TodoStore, newTodo];
      successCallback();
    } catch (err) {
      faliureCallback();
    }
  };

  editTodo = async (todoId, updatedTodo, successCallback, faliureCallback) => {
    try {
      const databaseResponse = await resolveDatabaseCall();
      this.TodoStore = this.TodoStore.map((todo) =>
        todo.id === todoId ? { ...updatedTodo } : todo
      );
      successCallback();
    } catch (err) {
      faliureCallback();
    }
  };

  toggleTodo = async (todoId, successCallback, faliureCallback) => {
    try {
      const databaseResponse = await resolveDatabaseCall();
      this.TodoStore = this.TodoStore.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
      successCallback();
    } catch (err) {
      faliureCallback();
    }
  };

  toggleBulkTodos = async (todoIds, successCallback, faliureCallback) => {
    try {
      this.TodoStore.forEach((todo) => {
        if (todoIds.includes(todo.id)) {
          todo.completed = !todo.completed;
        }
      });
      successCallback();
    } catch (err) {
      faliureCallback();
    }
  };

  deleteTodo = async (todoId, successCallback, faliureCallback) => {
    try {
      const databaseResponse = await resolveDatabaseCall();
      this.TodoStore = this.TodoStore.filter((todo) => todo.id !== todoId);
      successCallback();
    } catch (err) {
      faliureCallback();
    }
  };

  deleteBulkTodos = async (todoIds, successCallback, faliureCallback) => {
    try {
      const databaseResponse = resolveDatabaseCall();
      this.TodoStore = this.TodoStore.filter(
        (todo) => !todoIds.includes(todo.id)
      );
      successCallback();
    } catch (err) {
      faliureCallback();
    }
  };
}
