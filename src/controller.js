import Model from "./Model.js";
import View from "./View.js";

export default class Controller {
  constructor(storedTodos) {
    console.log(storedTodos);
    this.model = new Model();
    this.view = new View();
    this.view.renderTodosInDom(storedTodos);
    //Some changes
  }
}
