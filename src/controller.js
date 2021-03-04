import Model from "./Model.js";
import View from "./View.js";

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }
}
