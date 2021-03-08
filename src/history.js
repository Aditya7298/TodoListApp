export { USERACTION } from "./constants.js";

export default class UndoRedoHistory {
  constructor() {
    this.historyStack = [];
  }

  push = (eventInfo) => {
    this.historyStack.push({ ...eventInfo });
  };

  pop = () => {
    this.historyStack.pop();
  };

  top = () => {
    if (this.historyStack.length) {
      return this.historyStack[this.historyStack.length - 1];
    }
  };
}
