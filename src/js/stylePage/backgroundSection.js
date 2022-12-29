import { deleteHandler } from "../globalHandler/deleteHandler.js";

export function backgroundSection() {
  var prevCardSelected = null;
  $(".background-section .card").click(function (e) {
    if (!prevCardSelected) {
      prevCardSelected = e.currentTarget;
    } else {
      prevCardSelected.classList.remove("active");
      prevCardSelected = e.currentTarget;
    }
    e.currentTarget.classList.add("active");
  });

  $("#colorPicker-background-flat").change(function (e) {
    $("#flat-background").css(
      "background-color",
      $("#colorPicker-background-flat").spectrum("get")
    );
    e.preventDefault();
  });

  var colorPickGradient1 = $("#colorPicker-background-grad1");
  var colorPickGradient2 = $("#colorPicker-background-grad2");
  var rotateGradientBtn = $("#rotate-gradient-btn");
  var gradientRotationAngle = 0;
  $(colorPickGradient1).change(changeGradientBackground);
  $(colorPickGradient2).change(changeGradientBackground);

  function changeGradientBackground() {
    $("#gradient-background").css(
      "background",
      "linear-gradient(" +
        gradientRotationAngle +
        "deg," +
        $(colorPickGradient2).spectrum("get") +
        ", " +
        $(colorPickGradient1).spectrum("get") +
        ")"
    );
  }

  $(rotateGradientBtn).click(function (e) {
    if (gradientRotationAngle == 360) {
      gradientRotationAngle = 0;
    }
    gradientRotationAngle += 45;
    changeGradientBackground();
    e.preventDefault();
  });

  var backgroundImageInput = $("#background-image-input");
  var backgroundVideoInput = $("#background-video-input");
  var backgroundImage = $(".card.image-background .content img");
  var backgroundVideo = $(".card.video-background .content video");
  var backgroundImageDelBtn = $("#delete-image-background");
  var backgroundVideoDelBtn = $("#delete-video-background");

  $("#edit-image-background").click(function (e) {
    backgroundImageInput.click();
    e.preventDefault();
  });

  $("#edit-video-background").click(function (e) {
    backgroundVideoInput.click();
    e.preventDefault();
  });

  $(backgroundVideoInput).change(changeBackgroundVideo);

  $(backgroundImageInput).change(changeBackgroundImage);

  function changeBackgroundImage() {
    if (this.files) {
      let imgSrc = URL.createObjectURL(this.files[0]);
      $(backgroundImage).attr("src", imgSrc);
      URL.revokeObjectURL(this.files[0]);
    }
    toggleEmptyClassFromMediaBg(".card-container-img", backgroundImage);
  }

  function changeBackgroundVideo() {
    if (this.files) {
      let vidSrc = URL.createObjectURL(this.files[0]);
      $(backgroundVideo).attr("src", vidSrc);
      URL.revokeObjectURL(this.files[0]);
    }
    toggleEmptyClassFromMediaBg(".card-container-vid", backgroundVideo);
  }

  $(backgroundImageDelBtn).click(function (e) {
    backgroundImageInput.prop("value", "");
    deleteHandler(
      backgroundImage,
      "background",
      null,
      addEmptyClassFromMediaBg.bind(null, ".card-container-img"),
      null
    );
    e.preventDefault();
  });

  $(backgroundVideoDelBtn).click(function (e) {
    backgroundVideoInput.prop("value", "");
    deleteHandler(
      backgroundVideo,
      "background",
      null,
      addEmptyClassFromMediaBg.bind(null, ".card-container-vid"),
      null
    );
    e.preventDefault();
  });
}

function addEmptyClassFromMediaBg(selector) {
  $(selector).addClass("empty");
}

function toggleEmptyClassFromMediaBg(selector, mediaCard) {
  if ($(mediaCard).attr("src") != "") {
    $(selector).removeClass("empty");
  } else {
    $(selector).addClass("empty");
  }
}
