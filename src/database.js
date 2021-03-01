let currId = 4;

let todoList = [
  {
    id: 1,
    title: "Water the plants",
    importance: "high",
    completed: true,
    date: new Date("02/10/2021").toDateString(),
  },
  {
    id: 2,
    title: "Learn Javascript",
    importance: "medium",
    completed: true,
    date: new Date("02/11/2021").toDateString(),
  },
  {
    id: 3,
    title: "Sleep",
    importance: "low",
    completed: false,
    date: new Date("02/12/2021").toDateString(),
  },
];

const faliureProbability = () => Math.random() * 10;

const copyArrayOfObjects = (array) => {
  const newArray = [];
  array.forEach((obj) => {
    const newObj = { ...obj };
    newArray.push(newObj);
  });

  return newArray;
};

export const readAllTodos = () =>
  new Promise((resolve, reject) => {
    if (faliureProbability() > 0.1) {
      resolve(copyArrayOfObjects(todoList));
    } else {
      reject("[ERROR] Unable to fetch todo");
    }
  });

export const readSingleTodo = (todoId) =>
  new Promise((resolve, reject) => {
    if (faliureProbability() > 0.1) {
      resolve({ ...todoList.filter((todo) => todo.id === todoId)[0] });
    } else {
      reject("[ERROR] Unable to fetch todos");
    }
  });

export const createTodo = (newTitle, newImportance, index, prevTodo) => {
  return new Promise((resolve, reject) => {
    if (faliureProbability() > 0.1) {
      if (prevTodo) {
        console.log(index);
        todoList.splice(index, 0, prevTodo);
        resolve({ ...prevTodo });
      } else {
        const newTodo = {
          title: newTitle,
          importance: newImportance,
          completed: false,
          date: new Date().toDateString(),
        };

        newTodo.id = currId++;
        todoList.push(newTodo);

        resolve({ ...newTodo });
      }
    } else {
      reject("[ERROR] Could not create todo");
    }
  });
};

export const deleteTodo = (todoId) =>
  new Promise((resolve, reject) => {
    if (faliureProbability() < 0.1) {
      reject("[ERROR] Unable to delete todo");
    } else {
      let deletedTodo;
      let deletedTodoIndex;

      todoList = todoList.filter((todo, ind) => {
        if (todo.id === todoId) {
          deletedTodo = { ...todo };
          deletedTodoIndex = ind;
          return false;
        } else {
          return true;
        }
      });

      if (deletedTodoIndex || deletedTodoIndex === 0) {
        resolve([deletedTodo, deletedTodoIndex]);
      } else {
        reject("[ERROR] Unable to detect todo - Todo not found");
      }
    }
  });

export const updateTodo = (todoId, newTitle, newImportance, isCompleted) =>
  new Promise((resolve, reject) => {
    if (faliureProbability() < 0.1) {
      reject("[ERROR] Unable to edit todo");
    } else {
      let todoFound = false;
      let updatedTodo, prevTodo;
      todoList.forEach((todo) => {
        if (todo.id === todoId) {
          todoFound = true;
          prevTodo = { ...todo };
          if (newTitle) {
            todo.title = newTitle;
          }

          if (newImportance) {
            todo.importance = newImportance;
          }

          if (isCompleted) {
            todo.completed = !todo.completed;
          }

          updatedTodo = { ...todo };
        }
      });

      if (todoFound) {
        resolve(updatedTodo);
      } else {
        reject("[ERROR] Unable to update todo - Todo not found");
      }
    }
  });

export const filterTodos = (filteredImp, filteredDate) =>
  new Promise((resolve, reject) => {
    if (faliureProbability() < 0.1) {
      reject("[ERROR] Unable to filter todos");
    } else {
      resolve(
        copyArrayOfObjects(
          todoList.filter((todo) => {
            if (
              (filteredDate !== "" && todo.date !== filteredDate) ||
              (filteredImp !== "all" && todo.importance !== filteredImp)
            ) {
              return false;
            }

            return true;
          })
        )
      );
    }
  });

export const deleteMultitpleTodos = (todoIds) =>
  new Promise((resolve, reject) => {
    if (faliureProbability() < 0.1) {
      reject("[ERROR] Unable to delete multiple todos");
    } else {
      const prevTodoList = copyArrayOfObjects(todoList);
      todoList = todoList.filter((todo) => !todoIds.includes(todo.id));
      resolve(prevTodoList);
    }
  });

export const toggleMultipleTodosComplete = (todoIds) =>
  new Promise((resolve, reject) => {
    if (faliureProbability() < 0.1) {
      reject("[ERROR] Unable to edit the selected todos");
    } else {
      const updatedTodoIds = [];
      todoList.forEach((todo) => {
        if (todoIds.includes(todo.id)) {
          todo.completed = !todo.completed;
          updatedTodoIds.push(todo.id);
        }
      });

      resolve(updatedTodoIds);
    }
  });

export const addMultipleTodos = (prevTodoList) =>
  new Promise((resolve, reject) => {
    if (faliureProbability() < 0.1) {
      reject("[ERROR] Unable to add the selected todos");
    } else {
      todoList = copyArrayOfObjects(prevTodoList);
      resolve(copyArrayOfObjects(todoList));
    }
  });
