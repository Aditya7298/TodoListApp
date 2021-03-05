import Controller from "./controller.js";
import { IMPORTANCE } from "./constants.js";

const sampleTodoList = [
  {
    id: 1,
    title: "Water the plants",
    importance: IMPORTANCE.high,
    completed: true,
    date: new Date("02/10/2021").toDateString(),
  },
  {
    id: 2,
    title: "Learn Javascript",
    importance: IMPORTANCE.medium,
    completed: true,
    date: new Date("02/11/2021").toDateString(),
  },
  {
    id: 3,
    title: "Sleep",
    importance: IMPORTANCE.low,
    completed: false,
    date: new Date("02/12/2021").toDateString(),
  },
];

const controller = new Controller(sampleTodoList);
