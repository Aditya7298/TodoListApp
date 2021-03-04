import USERACTION from "./constants.js";
import addForm from "./addForm.js";

// edit: "edit",
// toggle: "toggle",
// create: "create",
// delete: "delete",
// bulkdelete: "bulk-delete",
// bulktoggle: "bulk-toggle",
// bulkadd: "bulk-add",

addForm.Init();

const bindCallbackToEvent = (event, callback) => {
  switch (event) {
    case USERACTION.create:
      document
        .querySelector(".sidebar-addtodoform")
        .addEventListener("submit", (evt) => {
          const newTodoInfo = addForm.handleForm(evt);
          callback(newTodoInfo);
        });
      break;
  }
};
