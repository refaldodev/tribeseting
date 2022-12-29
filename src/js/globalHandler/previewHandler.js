let previewBtn = document.querySelector(".preview-btn");
let phoneWrapper = document.querySelector(".phone-wrapper");
let closePreviewBtn = document.querySelector(".close-preview-btn");
let mainContentWrapper = document.querySelector(".content-wrapper");
let header = document.querySelector("header");
let footer = document.querySelector("footer");
function previewHandler() {
  function togglePreview() {
    phoneWrapper.classList.toggle("show");
    mainContentWrapper.classList.toggle("hide");
    header.classList.toggle("hide");
    footer.classList.toggle("hide");
  }

  phoneWrapper.addEventListener("click", function (element) {
    if (element.target == this) togglePreview();
  });

  previewBtn.addEventListener("click", function () {
    togglePreview();
    console.log("oke");
  });
  closePreviewBtn.addEventListener("click", togglePreview);
}
