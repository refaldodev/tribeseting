var containerLinkBio = document.querySelector(".accordion-container");

containerLinkBio.addEventListener("click", function (e) {
  // e.preventDefault();
  var header = e.target.closest(".accordion-header");
  if (header) {
    // Hide current open
    var headerOpen = document.querySelector(
      ".accordion-item.active .accordion-header"
    );
    if (headerOpen && !headerOpen.isSameNode(header)) {
      headerOpen.closest(".accordion-item").classList.remove("active");
    }

    // Show current clicked
    var item = e.target.closest(".accordion-item");
    item.classList.toggle("active");
  }
});

// cover iamge
function coverSection() {
  //input profile image
  // $(".cover-image").css("display", "none");

  let $uploadCrop;
  function uploadProfileImg() {
    var isValidSize = true;
    function readFile(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        if (input.files[0].size > 1048576) {
          isValidSize = false;
          $(".get-cropped-img").prop("disabled", true);
          $(".modal .image-error-msg").html("Max 1MB");

          return;
        }
        isValidSize = true;
        reader.onload = function (e) {
          $(".upload-profile-img").addClass("ready");
          $uploadCrop
            .croppie("bind", {
              url: e.target.result,
            })
            .then(function () {
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
        width: 750,
        height: 215,
        type: "square",
      },
      enableExif: true,

      enableOrientation: true,
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
            if (isValidSize && this.height > 215 && this.width > 1000) {
              $(".file-name").html(_this.files[0].name);
              $(".modal .image-error-msg").html("");
              $(".get-cropped-img").prop("disabled", false);
            }
          } else {
            $(".modal .image-error-msg").html(
              "Min height 300px dan min width 1000px"
            );
            $(".cover-image").css("display", "none");
            $(".get-cropped-img").prop("disabled", true);
          }
        };
        img.src = objectUrl;
      }
    });

    $(".get-cropped-img").on("click", function (ev) {
      $uploadCrop
        .croppie("result", {
          type: "canvas",
          size: "viewport",
        })
        .then(function (resp) {
          $("#cover-image").attr("src", resp);
          fetch(resp)
            .then((res) => res.blob())
            .then((res) => {
              console.log(res);
            });
        });
      $(".cover-image").css("display", "block");
      $("#wrapper-deleteIcon").css("display", "flex");

      var aspect_ratio = 4 / 14;
      // Store the jQuery object for future reference
      var $box = jQuery(".cover-image");

      // Initial resize of .box
      jQuery(document).ready(function ($) {
        $box.height($box.width() * aspect_ratio);
      });
      // Resize .box on browser resize
      jQuery(window).resize(function () {
        $box.height($box.width() * aspect_ratio);
      });
    });
  }

  uploadProfileImg();

  //delete profile imag
  $("#wrapper-deleteIcon").click(function (e) {
    deleteConfirmation();
  });

  function deleteConfirmation() {
    document
      .querySelector("#confirm-delete-btn")
      .addEventListener("click", function () {
        $("#wrapper-deleteIcon").css("display", "none");

        removeAtr();
      });

    function removeAtr() {
      $("#cover-image").attr("src", "");
      $("#upload-profile-img").croppie("destroy");
      $(".file-name").html("No file selected");
      $(".cover-image").css("display", "none");
      uploadProfileImg();
      document
        .querySelector("#confirm-delete-btn")
        .removeEventListener("click", removeAtr);
    }
  }
}

coverSection();

var aspect_ratio = 4 / 14;
// Store the jQuery object for future reference
var $box = jQuery(".cover-image");

// Initial resize of .box
jQuery(document).ready(function ($) {
  $box.height($box.width() * aspect_ratio);
});
// Resize .box on browser resize
jQuery(window).resize(function () {
  $box.height($box.width() * aspect_ratio);
});

// profile image
function profileSection() {
  //input profile image
  // $(".cover-image").css("display", "none");

  let $uploadCrop;
  function uploadProfileImg() {
    var isValidSize = true;
    function readFile(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        if (input.files[0].size > 1048576) {
          isValidSize = false;
          $(".get-cropped-imgPicture").prop("disabled", true);
          $(".modal .image-error-msg").html("Max 1MB");

          return;
        }
        isValidSize = true;
        reader.onload = function (e) {
          $(".upload-profile-imgPicture").addClass("ready");
          $uploadCrop
            .croppie("bind", {
              url: e.target.result,
            })
            .then(function () {
              console.log("jQuery bind complete");
            });
        };
        reader.readAsDataURL(input.files[0]);
      } else {
        return false;
      }
    }

    $uploadCrop = $("#upload-profile-imgPicture").croppie({
      viewport: {
        width: 250,
        height: 250,
        type: "circle",
      },
      enableExif: true,

      enableOrientation: true,
    });

    $("#uploadProfile").on("change", function (e) {
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
              $(".file-nameprofile").html(_this.files[0].name);
              $(".modal .image-error-msg").html("");
              $(".get-cropped-imgPicture").prop("disabled", false);
            }
          } else {
            $(".modal .image-error-msg").html(
              "Min height 300px dan min width 300px"
            );
            $(".profile-img-container").css("display", "none");
            $(".get-cropped-imgPicture").prop("disabled", true);
          }
        };
        img.src = objectUrl;
      }
    });

    $(".get-cropped-imgPicture").on("click", function (ev) {
      $uploadCrop
        .croppie("result", {
          type: "canvas",
          size: "viewport",
        })
        .then(function (resp) {
          $("#profile-image").attr("src", resp);
          fetch(resp)
            .then((res) => res.blob())
            .then((res) => {
              console.log(res);
            });
        });
      $(".profile-img-container").css("display", "block");
      $("#wrapper-deleteIconProfile").css("display", "flex");
    });
  }

  uploadProfileImg();

  //delete profile imag
  $("#wrapper-deleteIconProfile").click(function (e) {
    deleteConfirmation();
  });

  function deleteConfirmation() {
    document
      .querySelector("#confirm-delete-btnProfile")
      .addEventListener("click", function () {
        $("#wrapper-deleteIconProfile").css("display", "none");

        removeAtr();
      });

    function removeAtr() {
      $("#profile-image").attr("src", "");
      $("#upload-profile-imgPicture").croppie("destroy");
      $(".file-nameprofile").html("No file selected");
      $(".profile-img-container").css("display", "none");
      uploadProfileImg();
      document
        .querySelector("#confirm-delete-btnProfile")
        .removeEventListener("click", removeAtr);
    }
  }
}

profileSection();
