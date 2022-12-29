export function deleteHandler(
  elm,
  inputType,
  obj = null,
  cb_1 = null,
  cb_2 = null,
) {
  let deleteConfirmation = document.querySelector("#confirm-delete-btn");
  let cancelDelete = document.querySelector("#cancel-delete-btn");
  deleteConfirmation.addEventListener("click", deleteFunc);
  cancelDelete.addEventListener("click", removeDeleteBtnEvent)

  function deleteFunc() {
    if (inputType == "circle") {
      obj.title = "";
      obj.imgSrc = "";
      obj.link = "";
      cb_1(obj.index);
      cb_2(obj.elm, false);
    } else if (inputType == "form-link") {
      elm.remove();
    } else if (inputType == "background") {
      $(elm).attr("src", "");
      cb_1();
    }
    removeDeleteBtnEvent()
  }


  function removeDeleteBtnEvent() {
    deleteConfirmation.removeEventListener("click", deleteFunc);
    cancelDelete.removeEventListener("click", removeDeleteBtnEvent);
  }
}
