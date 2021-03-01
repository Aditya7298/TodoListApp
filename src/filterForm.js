import { filterTodos } from "./database.js";
import { renderAllTodosInDom } from "./renderTodos.js";
import { setProgress } from "./progressRing.js";

export const findFilterInfo = () => {
  const filterForm = document.querySelector("#filterTodoForm");
  const filteredImp = filterForm.todoImp.value;
  const filteredDate =
    filterForm.date.value === ""
      ? ""
      : new Date(filterForm.date.value).toDateString();

  return [filteredImp, filteredDate];
};

export const filterTodosInDom = (evt) => {
  const filteredImp = evt.target.todoImp.value;
  const filteredDate =
    evt.target.date.value === ""
      ? ""
      : new Date(evt.target.date.value).toDateString();

  filterTodos(filteredImp, filteredDate)
    .then((filteredTodoList) => {
      renderAllTodosInDom(filteredTodoList);
      setProgress();
    })
    .catch((err) => {
      //Handle Error
    });
};
