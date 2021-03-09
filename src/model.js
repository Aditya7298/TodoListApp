import { resolveDatabaseCall } from "./database.js";

export default class Model {
  constructor(Todos) {
    this.TodoStore = Todos ? [...Todos] : [];
    this.currId = Todos ? Todos.length + 1 : 0;
  }

  readAllTodos = () => {
    return this.TodoStore;
  };

  readSingleTodo = (todoId) => {
    const selectedTodo = this.TodoStore.find((todo) => todo.id === todoId);
    return selectedTodo;
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

    return filteredTodos;
  };

  changeTodoStoreState = async (prevTodoStore) => {
    try {
      const databaseResponse = await resolveDatabaseCall();
      this.TodoStore = prevTodoStore;
      return true;
    } catch (err) {
      return false;
    }
  };

  createTodo = async (title, importance) => {
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
      return true;
    } catch (err) {
      return false;
    }
  };

  editTodo = async (todoId, updatedTodo) => {
    try {
      const databaseResponse = await resolveDatabaseCall();
      this.TodoStore = this.TodoStore.map((todo) =>
        todo.id === todoId ? { ...todo, ...updatedTodo } : todo
      );
      return true;
    } catch (err) {
      return false;
    }
  };

  toggleTodo = async (todoId) => {
    try {
      const databaseResponse = await resolveDatabaseCall();
      this.TodoStore = this.TodoStore.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
      return true;
    } catch (err) {
      return false;
    }
  };

  toggleBulkTodos = async (todoIds) => {
    try {
      const databaseResponse = await resolveDatabaseCall();
      this.TodoStore.forEach((todo) => {
        if (todoIds.includes(todo.id)) {
          todo.completed = !todo.completed;
        }
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  deleteTodo = async (todoId) => {
    try {
      const databaseResponse = await resolveDatabaseCall();
      this.TodoStore = this.TodoStore.filter((todo) => todo.id !== todoId);
      return true;
    } catch (err) {
      return false;
    }
  };

  deleteBulkTodos = async (todoIds) => {
    try {
      const databaseResponse = resolveDatabaseCall();
      this.TodoStore = this.TodoStore.filter(
        (todo) => !todoIds.includes(todo.id)
      );
      return true;
    } catch (err) {
      return false;
    }
  };
}
