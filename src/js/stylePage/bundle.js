
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];

        function localRequire(name) {
          return require(mapping[name]);
        }

        const module = { exports : {} };

        fn(localRequire, module, module.exports);

        return module.exports;
      }

      require(0);
    })({0: [
      function (require, module, exports) {
        "use strict";

var _profileSection = require("./profileSection.js");

var _extraPageAndThemeSection = require("./extraPageAndThemeSection.js");

var _backgroundSection = require("./backgroundSection.js");

var _buttonAndFontSection = require("./buttonAndFontSection.js");

var _previewHandler = require("../globalHandler/previewHandler.js");

//color input lib
$(".colorPicker").spectrum({
  showPalette: true,
  showInput: true,
  showAlpha: true,
  allowEmpty: true,
  preferredFormat: "hex",
  palette: [["#000", "#444", "#666", "#999", "#ccc", "#fff"], ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f"], ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3"], ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8"], ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc"], ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6"], ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394"], ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763"]]
});

(0, _extraPageAndThemeSection.extraPageSection)();
(0, _profileSection.profileSection)();
(0, _extraPageAndThemeSection.themeSection)();
(0, _backgroundSection.backgroundSection)();
(0, _buttonAndFontSection.buttonSection)();
(0, _buttonAndFontSection.fontSection)();
(0, _previewHandler.previewHandler)();

function isTouchDevice() {
  return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}

if (isTouchDevice() === false) {
  $('[data-tooltip="tooltip"]').tooltip({ trigger: "hover" });
}

var inputs = document.querySelectorAll("[placeholder]");
inputs.forEach(function (e) {
  e.addEventListener("focus", function () {
    return checkInput(e);
  });

  e.addEventListener("outfocus", function () {
    return checkInput(e);
  });

  e.addEventListener("input", function () {
    return checkInput(e);
  });
});

function checkInput(e) {
  if (e.value != "") {
    e.style.fontSize = "1rem";
  } else {
    e.style.fontSize = "0.833rem";
  }
}
      },
      {"./profileSection.js":1,"./extraPageAndThemeSection.js":3,"./backgroundSection.js":4,"./buttonAndFontSection.js":5,"../globalHandler/previewHandler.js":6},
    ],1: [
      function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileSection = profileSection;
function profileSection() {
  //input counter number
  $("#nama-profil-input").keyup(function (e) {
    $("#nama-profil-input-help").html(this.value.length + " / " + 60);
  });
  $("#deskripsi-input").keyup(function (e) {
    $("#deskripsi-input-help").html(this.value.length + " / " + 160);
  });

  //input profile image
  var $uploadCrop = void 0;
  function uploadProfileImg() {
    var isValidSize = true;
    function readFile(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        if (input.files[0].size > 1048576) {
          isValidSize = false;
          $(".modal .image-error-msg").html("Max 1MB");
          return;
        }
        isValidSize = true;
        reader.onload = function (e) {
          $(".upload-profile-img").addClass("ready");
          $uploadCrop.croppie("bind", {
            url: e.target.result
          }).then(function () {
            console.log("jQuery bind complete");
          });
        };
        reader.readAsDataURL(input.files[0]);
      } else {
        return false;
      }
    }

    $uploadCrop = $("#upload-profile-img").croppie({
      viewport: {
        width: 250,
        height: 250,
        type: "circle"
      },
      enableExif: true
    });

    $("#upload").on("change", function (e) {
      var _this = this;
      if (this.files) {
        var file, img;
        img = new Image();
        var objectUrl = URL.createObjectURL(this.files[0]);
        img.onload = function () {
          if (this.height > 300 && this.width > 300) {
            readFile(_this);
            URL.revokeObjectURL(objectUrl);
            if (isValidSize && this.height > 320 && this.width > 320) {
              $(".file-name").html(_this.files[0].name);
              $(".modal .image-error-msg").html("");
            }
          } else {
            $(".modal .image-error-msg").html("Min height 300px dan min width 300px");
          }
        };
        img.src = objectUrl;
      }
    });

    $(".get-cropped-img").on("click", function (ev) {
      $uploadCrop.croppie("result", {
        type: "canvas",
        size: "viewport"
      }).then(function (resp) {
        $("#profile-img").attr("src", resp);
        fetch(resp).then(function (res) {
          return res.blob();
        }).then(function (res) {
          return console.log(res);
        });
      });
    });
  }

  uploadProfileImg();

  //delete profile imag
  $(".profile-section #del-btn").click(function (e) {
    deleteConfirmation();
  });

  function deleteConfirmation() {
    document.querySelector("#confirm-delete-btn").addEventListener("click", removeAtr);

    function removeAtr() {
      $("#profile-img").attr("src", "");
      $("#upload-profile-img").croppie("destroy");
      $(".file-name").html("No file selected");
      uploadProfileImg();
      document.querySelector("#confirm-delete-btn").removeEventListener("click", removeAtr);
    }
  }

  $(document).ready(function () {
    $(".select2-no-search").select2({
      tags: true,
      minimumResultsForSearch: Infinity
    });
  });
}
      },
      {},
    ],2: [
      function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extraPageSection = extraPageSection;
exports.themeSection = themeSection;
function extraPageSection() {
  $(document).ready(function () {
    $(".select2").select2({
      tags: true
    });
  });
}

function themeSection() {
  var prevCardSelected = null;
  $(".theme-section .card").click(function (e) {
    if (!prevCardSelected) {
      prevCardSelected = e.currentTarget;
    } else {
      prevCardSelected.classList.remove("active");
      prevCardSelected = e.currentTarget;
    }
    e.currentTarget.classList.add("active");
  });

  var toggle = $(".extra-tab-section .switch input");
  $(toggle).change(function (e) {
    $(".extra-tab-section .alert").toggleClass("hide");
    e.preventDefault();
  });

  var tambahLinkBtn = $(".tambah-link-btn");
  $(tambahLinkBtn).click(addLink);

  function addLink() {
    var html = "<div class=\"form-group mb-3\">\n    <input class=\"form-control\" id=\"link\" aria-describedby=\"link\" maxlength=\"160\" placeholder=\"Link\">\n    <small id=\"deskripsi-input-help\" class=\"form-text text-left eightpx mb-0\">Masukkan link YouTube / Spotify\n    </small>\n  </div>";
    $(".extra-tab-section .link-container").append(html);
  }

  var extraTabImageInput = $(".extra-tab-section .image-option input");
  var imageFile = null;
  $(extraTabImageInput).change(function (e) {
    imageFile = this.files[0];
    e.preventDefault();
  });

  //delete image option
  $(".extra-tab-section #del-btn").click(function (e) {
    deleteConfirmation();
  });

  function deleteConfirmation() {
    document.querySelector("#confirm-delete-btn").addEventListener("click", deleteImage);

    function deleteImage() {
      imageFile = null;
      document.querySelector("#confirm-delete-btn").removeEventListener("click", deleteImage);
    }
  }
}
      },
      {},
    ],3: [
      function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extraPageSection = extraPageSection;
exports.themeSection = themeSection;
function extraPageSection() {
  $(document).ready(function () {
    $(".select2").select2({
      tags: true
    });
  });
}

function themeSection() {
  var prevCardSelected = null;
  $(".theme-section .card").click(function (e) {
    if (!prevCardSelected) {
      prevCardSelected = e.currentTarget;
    } else {
      prevCardSelected.classList.remove("active");
      prevCardSelected = e.currentTarget;
    }
    e.currentTarget.classList.add("active");
  });

  var toggle = $(".extra-tab-section .switch input");
  $(toggle).change(function (e) {
    $(".extra-tab-section .alert").toggleClass("hide");
    e.preventDefault();
  });

  var tambahLinkBtn = $(".tambah-link-btn");
  $(tambahLinkBtn).click(addLink);

  function addLink() {
    var html = "<div class=\"form-group mb-3\">\n    <input class=\"form-control\" id=\"link\" aria-describedby=\"link\" maxlength=\"160\" placeholder=\"Link\">\n    <small id=\"deskripsi-input-help\" class=\"form-text text-left eightpx mb-0\">Masukkan link YouTube / Spotify\n    </small>\n  </div>";
    $(".extra-tab-section .link-container").append(html);
  }

  var extraTabImageInput = $(".extra-tab-section .image-option input");
  var imageFile = null;
  $(extraTabImageInput).change(function (e) {
    imageFile = this.files[0];
    e.preventDefault();
  });

  //delete image option
  $(".extra-tab-section #del-btn").click(function (e) {
    deleteConfirmation();
  });

  function deleteConfirmation() {
    document.querySelector("#confirm-delete-btn").addEventListener("click", deleteImage);

    function deleteImage() {
      imageFile = null;
      document.querySelector("#confirm-delete-btn").removeEventListener("click", deleteImage);
    }
  }
}
      },
      {},
    ],4: [
      function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backgroundSection = backgroundSection;

var _deleteHandler = require("../globalHandler/deleteHandler.js");

function backgroundSection() {
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
    $("#flat-background").css("background-color", $("#colorPicker-background-flat").spectrum("get"));
    e.preventDefault();
  });

  var colorPickGradient1 = $("#colorPicker-background-grad1");
  var colorPickGradient2 = $("#colorPicker-background-grad2");
  var rotateGradientBtn = $("#rotate-gradient-btn");
  var gradientRotationAngle = 0;
  $(colorPickGradient1).change(changeGradientBackground);
  $(colorPickGradient2).change(changeGradientBackground);

  function changeGradientBackground() {
    $("#gradient-background").css("background", "linear-gradient(" + gradientRotationAngle + "deg," + $(colorPickGradient2).spectrum("get") + ", " + $(colorPickGradient1).spectrum("get") + ")");
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
      var imgSrc = URL.createObjectURL(this.files[0]);
      $(backgroundImage).attr("src", imgSrc);
      URL.revokeObjectURL(this.files[0]);
    }
    toggleEmptyClassFromMediaBg(".card-container-img", backgroundImage);
  }

  function changeBackgroundVideo() {
    if (this.files) {
      var vidSrc = URL.createObjectURL(this.files[0]);
      $(backgroundVideo).attr("src", vidSrc);
      URL.revokeObjectURL(this.files[0]);
    }
    toggleEmptyClassFromMediaBg(".card-container-vid", backgroundVideo);
  }

  $(backgroundImageDelBtn).click(function (e) {
    backgroundImageInput.prop("value", "");
    (0, _deleteHandler.deleteHandler)(backgroundImage, "background", null, addEmptyClassFromMediaBg.bind(null, ".card-container-img"), null);
    e.preventDefault();
  });

  $(backgroundVideoDelBtn).click(function (e) {
    backgroundVideoInput.prop("value", "");
    (0, _deleteHandler.deleteHandler)(backgroundVideo, "background", null, addEmptyClassFromMediaBg.bind(null, ".card-container-vid"), null);
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
      },
      {"../globalHandler/deleteHandler.js":7},
    ],5: [
      function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonSection = buttonSection;
exports.fontSection = fontSection;
function buttonSection() {
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

function fontSection() {
  $("#select2-font").change(function (e) {
    $("#select2-select2-font-container").css("font-family", this.value);
    e.preventDefault();
  });

  function formatState(state) {
    if (!state.id) {
      return state.text;
    }

    return $('<div style="' + $(state.element).data("style") + '"> ' + state.text + "</div>");
  }

  $(document).ready(function () {
    $("#select2-font").select2({
      tags: true,
      templateResult: formatState
    });
  });

  $(document).ready(function () {
    $("input:radio[name=font-weight]").change(function () {
      $("#select2-select2-font-container").css("font-weight", this.value);
    });
  });
}
      },
      {},
    ],6: [
      function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.previewHandler = previewHandler;
var previewBtn = document.querySelector(".preview-btn");
var phoneWrapper = document.querySelector(".phone-wrapper");
var closePreviewBtn = document.querySelector(".close-preview-btn");
var mainContentWrapper = document.querySelector('.content-wrapper');
var header = document.querySelector('header');
var footer = document.querySelector('footer');
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

  previewBtn.addEventListener("click", togglePreview);
  closePreviewBtn.addEventListener("click", togglePreview);
}
      },
      {},
    ],7: [
      function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteHandler = deleteHandler;
function deleteHandler(elm, inputType) {
  var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var cb_1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var cb_2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  var deleteConfirmation = document.querySelector("#confirm-delete-btn");
  var cancelDelete = document.querySelector("#cancel-delete-btn");
  deleteConfirmation.addEventListener("click", deleteFunc);
  cancelDelete.addEventListener("click", removeDeleteBtnEvent);

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
    removeDeleteBtnEvent();
  }

  function removeDeleteBtnEvent() {
    deleteConfirmation.removeEventListener("click", deleteFunc);
    cancelDelete.removeEventListener("click", removeDeleteBtnEvent);
  }
}
      },
      {},
    ],})
  