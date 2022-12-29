$("#meta-title-input").keyup(function (e) {
  $("#meta-title-input-help").html(this.value.length + " / " + 60);
});
$("#meta-description-input").keyup(function (e) {
  $("#meta-description-input-help").html(this.value.length + " / " + 160);
});
