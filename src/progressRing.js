import { filterTodos } from "./database.js";
import { findFilterInfo } from "./filterForm.js";

const editText = (text) => {
  const circleText = document.querySelector(".sidebar-progress-ring__text");
  circleText.innerHTML = text;
};

const editCircle = (completedCount, totalCount) => {
  const circle = document.querySelector(".sidebar-progress-ring__circle");
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  const percent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  editText(`${completedCount} out of ${totalCount}`);
};

export const setProgress = () => {
  let filteredDate, filteredImp;
  [filteredImp, filteredDate] = findFilterInfo();
  let totalCount = 0,
    completedCount = 0;

  filterTodos(filteredImp, filteredDate)
    .then((filteredTodos) => {
      totalCount = filteredTodos.length;
      filteredTodos.forEach((todo) => {
        if (todo.completed) {
          completedCount += 1;
        }
      });
      editCircle(completedCount, totalCount);
    })
    .catch((err) => {
      //Handle Error;
    });
};
