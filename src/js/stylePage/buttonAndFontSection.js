export function buttonSection() {
  var prevButtonSelected = null;
  $(".button-section .btn-style").click(function (e) {
    if (!prevButtonSelected) {
      prevButtonSelected = this;
    } else {
      prevButtonSelected.classList.remove("active");
      prevButtonSelected = this;
    }
    prevButtonSelected.classList.add("active");
    e.preventDefault();
  });
}

export function fontSection() {
  $("#select2-font").change(function (e) {
    $("#select2-select2-font-container").css("font-family", this.value);
    e.preventDefault();
  });

  function formatState(state) {
    if (!state.id) {
      return state.text;
    }

    return $(
      '<div style="' +
        $(state.element).data("style") +
        '"> ' +
        state.text +
        "</div>"
    );
  }

  $(document).ready(function () {
    $("#select2-font").select2({
      tags: true,
      templateResult: formatState,
    });
  });

  $(document).ready(function () {
    $("input:radio[name=font-weight]").change(function () {
      $("#select2-select2-font-container").css("font-weight", this.value);
    });
  });
}
