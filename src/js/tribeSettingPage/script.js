var containerAccordion = document.querySelector(".accordion-container");

containerAccordion.addEventListener("click", function (e) {
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

    // var tujuan = item.children[0].getAttribute("href");
    if (item.classList.contains("active")) {
      $("html, body").animate(
        {
          scrollTop: $(item).offset().top - 10,
        },
        500,
        "easeInOutExpo"
      );
    }
  }
});

// sub accordion
var subContainerAccordion = document.querySelector(".subAccordion-container");

subContainerAccordion.addEventListener("click", function (e) {
  // e.preventDefault();
  var header = e.target.closest(".subAccordion-header");
  if (header) {
    // Hide current open
    var headerOpen = document.querySelector(
      ".subAccordion-item.active .subAccordion-header"
    );
    if (headerOpen && !headerOpen.isSameNode(header)) {
      headerOpen.closest(".subAccordion-item").classList.remove("active");
    }

    // Show current clicked
    var item = e.target.closest(".subAccordion-item");
    item.classList.toggle("active");
    if (item.classList.contains("active")) {
      $("html, body").animate(
        {
          scrollTop: $(item).offset().top - 10,
        },
        500,
        "easeInOutExpo"
      );
    }
  }
});

// sub accordion Supporter
var subContainerAccordionSupporter = document.querySelector(
  ".subAccordion-containerSupporter"
);

subContainerAccordionSupporter.addEventListener("click", function (e) {
  // e.preventDefault();
  var header = e.target.closest(".subAccordion-headerSupporter");
  if (header) {
    // Hide current open
    var headerOpen = document.querySelector(
      ".subAccordion-itemSupporter.active .subAccordion-headerSupporter"
    );
    if (headerOpen && !headerOpen.isSameNode(header)) {
      headerOpen
        .closest(".subAccordion-itemSupporter")
        .classList.remove("active");
    }

    // Show current clicked
    var item = e.target.closest(".subAccordion-itemSupporter");
    item.classList.toggle("active");
    if (item.classList.contains("active")) {
      $("html, body").animate(
        {
          scrollTop: $(item).offset().top - 10,
        },
        500,
        "easeInOutExpo"
      );
    }
  }
});

// cover iamge
function coverSection() {
  //input profile image
  // $(".cover-image").css("display", "none");

  let $uploadCrop;
  function uploadCoverSE() {
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
          if (this.height > 215 && this.width > 1000) {
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

  uploadCoverSE();

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
          $(".modal .image-error-msgprofile").html("Max 1MB");

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
              $(".modal .image-error-msgprofile").html("");
              $(".get-cropped-imgPicture").prop("disabled", false);
            }
          } else {
            $(".modal .image-error-msgprofile").html(
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

  //delete profile image
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

// text area
$("textarea")
  .each(function () {
    this.setAttribute(
      "style",
      "height:" + this.scrollHeight + "px;overflow-y:hidden;"
    );
  })
  .on("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    var result = 0;
    if (this.id === "shortDescription") {
      $("#countShortDescription").text(this.value.length + " " + " / 60");
    } else if (this.id === "textMessage") {
      $("#countTextMessage").text(this.value.length + " " + " / 100");
    } else if (this.id === "word") {
      $("#countword").text(this.value.length + " " + " / 200");
    } else if (this.id === "profileName") {
      $("#countProfileName").text(this.value.length + " " + " / 60");
    } else if (this.id === "TextonButton") {
      $("#countTextonButton").text(this.value.length + " " + " / 20");
    } else if (this.id === "TextonButton2") {
      $("#countTextonButton2").text(this.value.length + " " + " / 20");
    } else if (this.id === "ItemName") {
      $("#countItemName").text(this.value.length + " " + " / 20");
    } else if (this.id === "titleAmount") {
      $("#countTitleAmount").text(this.value.length + " " + " / 100");
    } else if (this.id === "titleNOS") {
      $("#countTitleNOS").text(this.value.length + " " + " / 100");
    }
  });

// Function untuk mengupload image
function uploadImageItem() {
  // Ambil element form dan file yang akan diupload
  const form = document.getElementById("upload-form");
  const file = document.getElementById("uploadItem").files[0];

  // Jika tidak ada file yang dipilih, tampilkan pesan error
  if (!file) {
    showErrorMessageItem("Silakan pilih file gambar terlebih dahulu");
    return;
  }

  // Ambil ukuran file
  const fileSize = file.size;
  const fileSizeKB = fileSize / 1024; // Ukuran file dalam KB

  // Jika ukuran file lebih dari 500KB, tampilkan pesan error
  if (fileSizeKB > 500) {
    showErrorMessageItem("Ukuran file tidak boleh lebih dari 500KB");
    return;
  }

  // Ambil informasi mengenai lebar dan tinggi gambar
  const imageURL = URL.createObjectURL(file);
  const image = new Image();
  image.src = imageURL;
  image.onload = function () {
    // Ambil lebar dan tinggi gambar
    const width = this.naturalWidth;
    const height = this.naturalHeight;

    // Jika lebar atau tinggi gambar kurang dari 100, tampilkan pesan error
    if (width < 100 || height < 100) {
      showErrorMessageItem(
        "Lebar dan tinggi gambar tidak boleh kurang dari 100 pixel"
      );
      return;
    }

    // Selain itu, lakukan proses upload file
    var src = URL.createObjectURL(file);
    var preview = document.getElementById("item-image");
    var item = document.getElementById("wrapperitem-image");

    preview.src = src;
    preview.style.display = "block";
    var btn = document.getElementById("wrapper-deleteItem");
    btn.style.display = "block";
    item.style.display = "block";
    showErrorMessageItem("");
  };
}

// Function untuk menampilkan pesan error
function showErrorMessageItem(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerText = message;
}

// Event listener untuk mengupload image ketika file dipilih
const fileInputItem = document.getElementById("uploadItem");
fileInputItem.addEventListener("change", function () {
  uploadImageItem();
});

// confirm-delete-btnItem

function deleteImageItem() {
  // Ambil element gambar
  // const image = document.getElementById("item-image");
  $("#item-image").attr("src", "");
  // Hapus element gambar
  var item = document.getElementById("wrapperitem-image");
  var btn = document.getElementById("wrapper-deleteItem");
  btn.style.display = "none";

  // image.parentNode.removeChild(image);
  item.style.display = "none";
}

// Event listener untuk menghapus image ketika tombol hapus diklik
const deleteButton = document.getElementById("confirm-delete-btnItem");
deleteButton.addEventListener("click", function () {
  deleteImageItem();
});

// select2
// In your Javascript (external .js resource or <script> tag)
$(document).ready(function () {
  $(".language").select2();
});

// Function untuk mengupload video
function uploadVideo() {
  // Ambil element form dan file yang akan diupload
  // const form = document.getElementById('upload-form');
  const file = document.getElementById("video-file").files[0];

  // Jika tidak ada file yang dipilih, tampilkan pesan error
  if (!file) {
    showErrorMessageVideo("Silakan pilih file video terlebih dahulu");
    return;
  }

  // Ambil ukuran file
  const fileSize = file.size;
  const fileSizeMB = fileSize / (1024 * 1024); // Ukuran file dalam MB

  // Jika ukuran file lebih dari 20MB, tampilkan pesan error
  if (fileSizeMB > 20) {
    showErrorMessageVideo("Ukuran file tidak boleh lebih dari 20MB");
    return;
  }

  // Selain itu, lakukan proses upload file
  var freader = new FileReader();
  const fileVideo = document.getElementById("video-file").files[0];

  var videoShow = document.querySelector(".wrapper-showVideo");
  freader.readAsDataURL(fileVideo);
  freader.onload = function () {
    console.log(freader.result);
    videoShow.style.display = "block";
    document.getElementById("sourceVideo").src = freader.result;
    var btn = document.getElementById("wrapper-deleteVideo");
    btn.style.display = "block";
    showErrorMessageVideo("");
  };
}

// Function untuk menampilkan pesan error
function showErrorMessageVideo(message) {
  const errorMessage = document.querySelector(".error-message-Video");
  errorMessage.innerText = message;
}

const fileInputVideo = document.getElementById("video-file");
fileInputVideo.addEventListener("change", function () {
  uploadVideo();
  var vid = document.getElementById("sourceVideo");
  var videoShow = document.querySelector(".wrapper-showVideo");
  vid.addEventListener("loadedmetadata", (event) => {
    vid.style.width = vid.videoWidth;
    videoShow.style.height = videoShow.videoHeight;
    console.log(vid.videoWidth);
  });
});

// Fungsi delete untuk menghapus video
function deleteVideo() {
  // Mendapatkan elemen confirm-delete-btnVideo
  var video = document.getElementById("sourceVideo");
  var videoShow = document.querySelector(".wrapper-showVideo");

  videoShow.style.display = "none";
  var btn = document.getElementById("wrapper-deleteVideo");
  btn.style.display = "none";
  // Mengosongkan sumber video
  video.src = "";
  const fileInputVideo = document.getElementById("video-file");

  showErrorMessageVideo("");
}
document
  .getElementById("confirm-delete-btnVideo")
  .addEventListener("click", deleteVideo);

// image message supporter
function uploadImageMessage() {
  // Ambil element form dan file yang akan diupload
  // const form = document.getElementById("upload-form");
  const file = document.getElementById("image-message").files[0];
  console.log(file);

  // Jika tidak ada file yang dipilih, tampilkan pesan error
  if (!file) {
    showErrorMessageImage("Silakan pilih file gambar terlebih dahulu");
    return;
  }

  // Ambil ukuran file
  const fileSize = file.size;
  const fileSizeKB = 1 * 1024 * 1024; // Ukuran file dalam KB

  // Jika ukuran file lebih dari 500KB, tampilkan pesan error
  if (fileSize > fileSizeKB) {
    showErrorMessageImage("Ukuran file tidak boleh lebih dari 1MB");
    return;
  }

  // Ambil informasi mengenai lebar dan tinggi gambar
  const imageURL = URL.createObjectURL(file);
  const image = new Image();
  image.src = imageURL;
  image.onload = function () {
    // Ambil lebar dan tinggi gambar
    const width = this.naturalWidth;
    const height = this.naturalHeight;

    // Jika lebar atau tinggi gambar kurang dari 100, tampilkan pesan error
    if (width < 100 || height < 100) {
      showErrorMessageImage(
        "Lebar dan tinggi gambar tidak boleh kurang dari 100 pixel"
      );
      return;
    }
    var parent = document.querySelector(".wrapper-showImage");
    widthParent = parent.offsetWidth;

    // Selain itu, lakukan proses upload file
    var src = URL.createObjectURL(file);
    var preview = document.getElementById("image-supporter");
    var btn = document.getElementById("wrapper-deleteImageMessageModal");
    btn.style.display = "block";
    preview.src = src;
    preview.style.display = "block";
    // preview.style.width = `${width}px`;
    preview.style.height = `auto`;
    // var btn = document.getElementById("wrapper-deleteItem");
    // btn.style.display = "block";
    var item = document.querySelector(".wrapper-showImage");
    item.style.display = "block";
    showErrorMessageImage("");
  };
}

// Function untuk menampilkan pesan error
function showErrorMessageImage(message) {
  const errorMessage = document.querySelector(".error-message-imageSupporter");
  errorMessage.innerText = message;
}

// Event listener untuk mengupload image ketika file dipilih
const fileInputImage = document.getElementById("image-message");
fileInputImage.addEventListener("change", function () {
  uploadImageMessage();
});

// Event listener untuk button delete
function deleteImageMessage() {
  // Ambil element gambar
  // const image = document.getElementById("item-image");
  $("#image-supporter").attr("src", "");
  // Hapus element gambar

  var btn = document.getElementById("wrapper-deleteImageMessageModal");
  btn.style.display = "none";
  var item = document.querySelector(".wrapper-showImage");

  // image.parentNode.removeChild(image);
  item.style.display = "none";
}
document
  .getElementById("wrapper-deleteImageMessage")
  .addEventListener("click", deleteImageMessage);

// radio

$('input[type="radio"].radioedit').on("change", function () {
  $('input[type="radio"].radioedit').not(this).prop("checked", false);
  if (this.name != "custom") {
    $("#year").attr("disabled", true);
    $("#months").attr("disabled", true);
    $("#date").attr("disabled", true);
    $("#hour").attr("disabled", true);
    $("#minute").attr("disabled", true);
  } else {
    $("#year").attr("disabled", false);
    $("#months").attr("disabled", false);
    $("#date").attr("disabled", false);
    $("#hour").attr("disabled", false);
    $("#minute").attr("disabled", false);
  }
});

$('input[type="radio"].radioedit2').on("change", function () {
  $('input[type="radio"].radioedit2').not(this).prop("checked", false);
  console.log(this.name);
  if (this.name != "custom2") {
    $("#year2").attr("disabled", true);
    $("#months2").attr("disabled", true);
    $("#date2").attr("disabled", true);
    $("#hour2").attr("disabled", true);
    $("#minute2").attr("disabled", true);
  } else {
    $("#year2").attr("disabled", false);
    $("#months2").attr("disabled", false);
    $("#date2").attr("disabled", false);
    $("#hour2").attr("disabled", false);
    $("#minute2").attr("disabled", false);
  }
});

// var toolbarOptions = [
//   // ["bold", "italic", "underline"], // toggled buttons
//   [
//     "bold",
//     "italic",
//     "underline",
//     { list: "ordered" },
//     { list: "bullet" },
//     { link: "url" },
//   ],
// ];

// var quill = new Quill("#editorQuill", {
//   modules: {
//     toolbar: toolbarOptions,
//   },
//   theme: "bubble",

//   // modules: {
//   //   toolbar: toolbarOptions
//   // }
// });
// var quill2 = new Quill("#editorQuillAmount", {
//   theme: "bubble",
//   modules: {
//     toolbar: toolbarOptions,
//   },
//   // modules: {
//   //   toolbar: toolbarOptions
//   // }
// });
// var quill3 = new Quill("#editorQuillSupporter", {
//   theme: "bubble",
//   modules: {
//     toolbar: toolbarOptions,
//   },
//   // modules: {
//   //   toolbar: toolbarOptions
//   // }
// });

// const editor = new EditorJS({
//   holder: "editorjs",
//   // tools: {

//   //   list: {
//   //     class: List,
//   //     inlineToolbar: true,
//   //     config: {
//   //       defaultStyle: "unordered",
//   //     },
//   //   },
//   // },
//   tools: {
//     list: {
//       class: List,

//       inlineToolbar: true,
//       shortcut: "CMD+SHIFT+L",
//     },
//     paragraph: {
//       class: Paragraph,
//       inlineToolbar: true,
//     },
//     linkTool: {
//       class: LinkTool,
//     },

//     underline: Underline,
//   },
//   minHeight: 0,
// });

// conTOHU
const editor = new EditorJS({
  holder: "editorjs",
  inlineToolbar: ["bold", "italic", "underline", "link"],
  tools: {
    list: List,
    underline: Underline,
  },
  minHeight: 0,
});
