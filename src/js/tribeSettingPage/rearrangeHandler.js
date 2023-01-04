export function rearrangeHandler() {
  //for input form
  let inputFormContainer = document.querySelector(".form-wrapper");
  new Sortable(inputFormContainer, {
    animation: 150,
    handle: ".drag-btn",
    ghostClass: "ghost",
    forceFallback: true,
    onStart: function (evt) {
      document.documentElement.classList.add("draggable-cursor");
      $("[data-toggle=tooltip]").tooltip("hide");
      $("[data-toggle=tooltip]").tooltip("disable");
    },
    // Restores default page cursor
    onEnd: function (evt) {
      document.documentElement.classList.remove("draggable-cursor");
      $("[data-toggle=tooltip]").tooltip("enable");
    },
  });

  //for circle link
  let circleLinkContainer = document.querySelector(".rounded-link-wrapper");
  new Sortable(circleLinkContainer, {
    animation: 150,
    handle: ".arrange-btn",
    ghostClass: "ghost",
    forceFallback: true,
    onStart: function (evt) {
      document.documentElement.classList.add("draggable-cursor");
      $("[data-toggle=tooltip]").tooltip("hide");
      $("[data-toggle=tooltip]").tooltip("disable");
    },
    // Restores default page cursor
    onEnd: function (evt) {
      document.documentElement.classList.remove("draggable-cursor");
      $("[data-toggle=tooltip]").tooltip("enable");
    },
  });
}
