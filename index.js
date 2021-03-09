import Controller from "./src/controller.js";
import { IMPORTANCE } from "./src/constants.js";

const sampleTodoList = [
  {
    id: "1",
    title: "Water the plants",
    importance: IMPORTANCE.HIGH,
    completed: true,
    date: new Date("02/10/2021").toDateString(),
  },
  {
    id: "2",
    title: "Learn Javascript",
    importance: IMPORTANCE.MEDIUM,
    completed: true,
    date: new Date("02/11/2021").toDateString(),
  },
  {
    id: "3",
    title: "Sleep",
    importance: IMPORTANCE.LOW,
    completed: false,
    date: new Date("02/12/2021").toDateString(),
  },
];

const controller = new Controller(sampleTodoList);
