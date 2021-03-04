export { USERACTION } from "./constants.js";

class History {
  constructor() {
    this.historyArray = [];
  }

  addEventToHistory = (eventInfo) => {
    this.historyArray.push({ ...eventInfo });
  };

  handleUndoRedo = () => {};
}
