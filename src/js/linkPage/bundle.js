(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id];

    function localRequire(name) {
      return require(mapping[name]);
    }

    const module = { exports: {} };

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  require(0);
})({
  0: [
    function (require, module, exports) {
      "use strict";

      var _circleLinkHandler = require("./circleLinkHandler.js");

      var _inputFormHandler = require("./inputFormHandler.js");

      var _rearrangeHandler = require("./rearrangeHandler.js");

      var _previewHandler = require("../globalHandler/previewHandler.js");

      var _thumbnailHandler = require("../linkPage/thumbnailHandler.js");

      (0, _circleLinkHandler.circleLinkHandler)();
      (0, _inputFormHandler.inputFormHandler)();
      (0, _rearrangeHandler.rearrangeHandler)();
      (0, _previewHandler.previewHandler)();
      (0, _thumbnailHandler.uploadThumbnailImg)();
      (0, _thumbnailHandler.searchIcons)();

      //activate tooltip

      function isTouchDevice() {
        return (
          true ==
          ("ontouchstart" in window ||
            (window.DocumentTouch && document instanceof DocumentTouch))
        );
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
    {
      "./circleLinkHandler.js": 1,
      "./inputFormHandler.js": 2,
      "./rearrangeHandler.js": 3,
      "../globalHandler/previewHandler.js": 4,
      "../linkPage/thumbnailHandler.js": 5,
    },
  ],
  1: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.circleLinkHandler = circleLinkHandler;

      var _deleteHandler = require("../globalHandler/deleteHandler.js");

      var cirlceLinkList = document.querySelectorAll(".circle-link-btn");
      var circleModalImg = document.getElementById("circle-link-modal-img");
      var circelModalTitle = document.getElementById("circle-link-title-input");
      var circelModalLink = document.getElementById("circle-link-link-input");
      var circleTitleLength = document.querySelector(".circle-title-length");
      var MAX_LENGTH = 9;
      var currentLength = 0;

      var ArrOfCircleLinkObj = [];

      function circleLinkHandler() {
        getAllCircleValue();
        var selectedCircleLink = null;
        var circleImg = {
          src: "",
          index: "",
        };

        cirlceLinkList.forEach(function (element, index) {
          element.addEventListener("click", function () {
            selectedCircleLink = ArrOfCircleLinkObj[index];
            circleModalImg.src = selectedCircleLink.imgSrc;

            circleImg.src = circleModalImg.src;
            circleImg.index = index;

            circelModalTitle.value = selectedCircleLink.title;
            currentLength = circelModalTitle.value.length;
            circleTitleLength.textContent = currentLength + " / " + MAX_LENGTH;

            circelModalLink.value = selectedCircleLink.link;
          });
        });

        circleTitleLength.textContent = currentLength + " / " + MAX_LENGTH;
        circelModalTitle.addEventListener("keyup", function (e) {
          currentLength = e.target.value.length;
          circleTitleLength.textContent = currentLength + " / " + MAX_LENGTH;
        });

        var tempImgSrc = "";
        document
          .getElementById("circle-link-img-input")
          .addEventListener("change", function () {
            if (this.files[0].size > 1048576) {
              alert("Max 1MB");
              this.value = "";
            } else {
              tempImgSrc = window.URL.createObjectURL(this.files[0]);
              circleModalImg.src = tempImgSrc;
              this.value = "";
            }
          });

        document
          .getElementById("circle-link-save-btn")
          .addEventListener("click", function () {
            selectedCircleLink.title = circelModalTitle.value;
            selectedCircleLink.link = circelModalLink.value;
            if (tempImgSrc) {
              selectedCircleLink.imgSrc = tempImgSrc;
              selectedCircleLink.elm
                .querySelector("img")
                .setAttribute("src", tempImgSrc);
              tempImgSrc = "";
            }

            selectedCircleLink.elm.querySelector(
              ".cirlce-link-title"
            ).innerText = circelModalTitle.value;

            selectedCircleLink.elm.setAttribute(
              "data-link",
              circelModalLink.value
            );
            if (tempImgSrc || circelModalTitle.value || circelModalLink.value) {
              toggleTitleAndIcon(selectedCircleLink.elm, true);
            }
          });
      }

      function getAllCircleValue() {
        cirlceLinkList.forEach(function (elm, idx) {
          var img = elm
            .querySelector("#circle-img-" + (idx + 1))
            .getAttribute("src");
          var title = elm.querySelector(".cirlce-link-title").innerHTML;
          var link = elm.getAttribute("data-link");
          var active = elm.querySelector("input[type='checkbox']").checked;

          ArrOfCircleLinkObj.push(
            new CircleLinkObj(active, title, img, link, elm, idx)
          );
        });
      }

      function CircleLinkObj(active, title, imgSrc, link, elm, index) {
        this.elm = elm;
        this.link = link;
        this.title = title;
        this.imgSrc = imgSrc;
        this.active = active;
        this.index = index;
        this.deleteBtn = elm.querySelector("#del-btn");
        this.checkbox = elm.querySelector("input[type='checkbox']");
        this.switch = elm.querySelector(".switch");
        var _this = this;

        this.deleteBtn.addEventListener("click", function () {
          (0,
          _deleteHandler.deleteHandler)(_this.elm, "circle", _this, updateCircleLinkElm, toggleTitleAndIcon);
        });
      }

      function updateCircleLinkElm(index) {
        cirlceLinkList[index].querySelector(".cirlce-link-title").innerHTML =
          "";
        cirlceLinkList[index].querySelector(
          "input[type='checkbox']"
        ).checked = false;
        cirlceLinkList[index]
          .querySelector("#circle-img-" + (index + 1))
          .setAttribute("src", "");
        cirlceLinkList[index].setAttribute("data-link", "");
      }

      function toggleTitleAndIcon(elm) {
        var isShow =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : false;

        if (isShow) {
          elm.classList.remove("hide");
        } else {
          elm.classList.add("hide");
        }
      }
    },
    { "../globalHandler/deleteHandler.js": 6 },
  ],
  2: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.inputFormHandler = inputFormHandler;

      var _inputFormHTMLSource = require("./inputFormHTMLSource.js");

      var _deleteHandler = require("../globalHandler/deleteHandler.js");

      var tambahLinkBtn = document.querySelector("#tambahLink-btn");
      var formLinkWrapper = document.querySelector(".form-wrapper");
      var tambahFiturSpesialBtn = document.querySelectorAll(
        ".add-fitur-spesial-btn"
      );
      var arrOfInputLinks = [];

      /**
       * @param {String} HTML representing a single element
       * @return {Element}
       */
      function htmlToElement(html) {
        var template = document.createElement("template");
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
      }

      function reloadCustomSelect(elm) {
        if (elm) {
          $(document).ready(function () {
            $(elm).select2({
              tags: true,
            });
          });
        }
      }

      function inputForm(elm) {
        this.containerElm = elm;
        this.deleteBtn = this.containerElm.querySelector("#del-btn");
        this.tombolInput = this.containerElm.querySelector("#tombol-input");
        this.thumbnailBtn = this.containerElm.querySelector("#thumbnail-btn");
        this.analyticsBtn = this.containerElm.querySelector("#analytics-btn");
        this.dragBtn = this.containerElm.querySelector(".drag-btn");
        this.selectInputFormForDelete = function () {
          (0, _deleteHandler.deleteHandler)(elm, "form-link");
        };
        $(this.deleteBtn).click(this.selectInputFormForDelete);
      }

      function inputFormHandler() {
        var regularInputLinkCount = 0;
        var headerInputLinkCount = 0;
        var donasiInputLinkCount = 0;
        var kontenInputLinkCount = 0;
        var produkDigitalInputLinkCount = 0;
        var paketJasaInputLinkCount = 0;
        var kerjasamaInputLinkCount = 0;
        var embedInputLinkCount = 0;
        var whatsappInputLinkCount = 0;
        var emailInputLinkCount = 0;
        var emailColletionInputLinkCount = 0;
        var videoRequestInputLinkCount = 0;

        function addNewInput(type) {
          var isNewElm =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : false;

          var HTMLString = null;
          switch (type) {
            case "regular":
              HTMLString = (0, _inputFormHTMLSource.regularInputLink)(
                regularInputLinkCount
              );
              regularInputLinkCount++;
              break;
            case "header":
              HTMLString = (0, _inputFormHTMLSource.headerInputLink)(
                headerInputLinkCount
              );
              headerInputLinkCount++;
              break;
            case "donasi":
              HTMLString = (0, _inputFormHTMLSource.donasiInputLink)(
                donasiInputLinkCount
              );
              donasiInputLinkCount++;
              break;
            case "produk-digital":
              HTMLString = (0, _inputFormHTMLSource.produkDigitalInputLink)(
                produkDigitalInputLinkCount
              );
              produkDigitalInputLinkCount++;
              break;
            case "konten":
              HTMLString = (0, _inputFormHTMLSource.kontenInputLink)(
                kontenInputLinkCount
              );
              kontenInputLinkCount++;
              break;
            case "paket-jasa":
              HTMLString = (0, _inputFormHTMLSource.paketJasaInputLink)(
                paketJasaInputLinkCount
              );
              paketJasaInputLinkCount++;
              break;
            case "kerjasama":
              HTMLString = (0, _inputFormHTMLSource.kerjasamaInputLink)(
                kerjasamaInputLinkCount
              );
              kerjasamaInputLinkCount++;
              break;
            case "embed":
              HTMLString = (0, _inputFormHTMLSource.embedInputLink)(
                embedInputLinkCount
              );
              embedInputLinkCount++;
              break;
            case "whatsapp":
              HTMLString = (0, _inputFormHTMLSource.whatsappInputLink)(
                whatsappInputLinkCount
              );
              whatsappInputLinkCount++;
              break;
            case "email":
              HTMLString = (0, _inputFormHTMLSource.emailInputLink)(
                emailInputLinkCount
              );
              emailInputLinkCount++;
              break;
            case "email-collection":
              HTMLString = (0, _inputFormHTMLSource.emailColletionInputLink)(
                emailColletionInputLinkCount
              );
              emailColletionInputLinkCount++;
              break;
            case "video-request":
              HTMLString = (0, _inputFormHTMLSource.videoRequestInputLink)(
                videoRequestInputLinkCount
              );
              videoRequestInputLinkCount++;
              break;
            default:
              HTMLString = (0, _inputFormHTMLSource.regularInputLink)(
                regularInputLinkCount
              );
              regularInputLinkCount++;
              break;
          }
          var HTMLElm = htmlToElement(HTMLString);
          formLinkWrapper.insertBefore(HTMLElm, formLinkWrapper.firstChild);
          var HTMLObj = new inputForm(HTMLElm);
          activateTooltip(HTMLObj);
          reloadCustomSelect(HTMLElm.querySelector("select"));
          // arrOfInputLinks.push(HTMLObj);

          if (isNewElm) {
            scrollToElm(HTMLObj.containerElm);
            focusInput(HTMLObj.tombolInput);
          }
        }

        function scrollToElm(elm) {
          var top = $(elm).offset().top / 2;
          setTimeout(function () {
            window.scrollTo(0, top);
          }, 2);
        }

        function focusInput(elm) {
          setTimeout(function () {
            $(elm).focus();
          }, 10);
        }

        function activateTooltip(Obj) {
          function isTouchDevice() {
            return (
              true ==
              ("ontouchstart" in window ||
                (window.DocumentTouch && document instanceof DocumentTouch))
            );
          }

          if (isTouchDevice() === false) {
            $(Obj.deleteBtn).tooltip({ trigger: "hover" });
            $(Obj.thumbnailBtn).tooltip({ trigger: "hover" });
            $(Obj.analyticsBtn).tooltip({ trigger: "hover" });
            $(Obj.dragBtn).tooltip({ trigger: "hover" });
          }
        }

        $(tambahLinkBtn).click(function () {
          addNewInput("regular", true);
        });

        tambahFiturSpesialBtn.forEach(function (btn) {
          $(btn).click(function () {
            var type = btn.getAttribute("data-type");
            addNewInput(type, true);
          });
        });

        addNewInput("email-collection");
        addNewInput("email");
        addNewInput("whatsapp");
        addNewInput("embed");
        addNewInput("video-request");
        addNewInput("kerjasama");
        addNewInput("paket-jasa");
        addNewInput("konten");
        addNewInput("produk-digital");
        addNewInput("donasi");
        addNewInput("header");
        addNewInput("regular");
      }
    },
    { "./inputFormHTMLSource.js": 7, "../globalHandler/deleteHandler.js": 8 },
  ],
  3: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.rearrangeHandler = rearrangeHandler;
      function rearrangeHandler() {
        //for input form
        var inputFormContainer = document.querySelector(".form-wrapper");
        new Sortable(inputFormContainer, {
          animation: 150,
          handle: ".drag-btn",
          ghostClass: "ghost",
          forceFallback: true,
          onStart: function onStart(evt) {
            document.documentElement.classList.add("draggable-cursor");
            $("[data-toggle=tooltip]").tooltip("hide");
            $("[data-toggle=tooltip]").tooltip("disable");
          },
          // Restores default page cursor
          onEnd: function onEnd(evt) {
            document.documentElement.classList.remove("draggable-cursor");
            $("[data-toggle=tooltip]").tooltip("enable");
          },
        });

        //for circle link
        var circleLinkContainer = document.querySelector(
          ".rounded-link-wrapper"
        );
        new Sortable(circleLinkContainer, {
          animation: 150,
          handle: ".arrange-btn",
          ghostClass: "ghost",
          forceFallback: true,
          onStart: function onStart(evt) {
            document.documentElement.classList.add("draggable-cursor");
            $("[data-toggle=tooltip]").tooltip("hide");
            $("[data-toggle=tooltip]").tooltip("disable");
          },
          // Restores default page cursor
          onEnd: function onEnd(evt) {
            document.documentElement.classList.remove("draggable-cursor");
            $("[data-toggle=tooltip]").tooltip("enable");
          },
        });
      }
    },
    {},
  ],
  4: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.previewHandler = previewHandler;
      var previewBtn = document.querySelector(".preview-btn");
      var phoneWrapper = document.querySelector(".phone-wrapper");
      var closePreviewBtn = document.querySelector(".close-preview-btn");
      var mainContentWrapper = document.querySelector(".content-wrapper");
      var header = document.querySelector("header");
      var footer = document.querySelector("footer");
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
  ],
  5: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.uploadThumbnailImg = uploadThumbnailImg;
      exports.searchIcons = searchIcons;
      var $uploadCrop = void 0;
      function uploadThumbnailImg() {
        var isValidSize = true;
        // function readFile(input) {
        //   if (input.files && input.files[0]) {
        //     var reader = new FileReader();
        //     if (input.files[0].size > 1048576) {
        //       isValidSize = false;
        //       $(".modal .image-error-msg").html("Max 1MB");
        //       return;
        //     }
        //     isValidSize = true;
        //     reader.onload = function (e) {
        //       $(".upload-profile-img").addClass("ready");
        //       $uploadCrop
        //         .croppie("bind", {
        //           url: e.target.result,
        //         })
        //         .then(function () {
        //           console.log("jQuery bind complete");
        //         });
        //     };
        //     reader.readAsDataURL(input.files[0]);
        //   } else {
        //     return false;
        //   }
        // }

        // $uploadCrop = $("#upload-thumbnail-img").croppie({
        //   viewport: {
        //     width: 250,
        //     height: 250,
        //     type: "circle",
        //   },
        //   enableExif: true,
        // });

        // $("#upload").on("change", function (e) {
        //   var _this = this;
        //   if (this.files) {
        //     var file, img;
        //     img = new Image();
        //     var objectUrl = URL.createObjectURL(this.files[0]);
        //     img.onload = function () {
        //       if (this.height > 300 && this.width > 300) {
        //         readFile(_this);
        //         URL.revokeObjectURL(objectUrl);
        //         if (isValidSize && this.height > 300 && this.width > 300) {
        //           $(".file-name").html(_this.files[0].name);
        //           $(".modal .image-error-msg").html("");
        //         }
        //       } else {
        //         $(".modal .image-error-msg").html(
        //           "Min height 300px dan min width 300px"
        //         );
        //       }
        //     };
        //     img.src = objectUrl;
        //   }
        // });

        // $(".get-cropped-img").on("click", function (ev) {
        //   $uploadCrop
        //     .croppie("result", {
        //       type: "canvas",
        //       size: "viewport",
        //     })
        //     .then(function (resp) {
        //       fetch(resp)
        //         .then(function (res) {
        //           return res.blob();
        //         })
        //         .then(function (res) {
        //           return console.log(res);
        //         });
        //     });
        // });
      }

      function searchIcons() {
        var icons = $(".icon-container .icon");
        var searchInput = $("#thumbnail_icon_search_input");
        $(searchInput).keyup(function (e) {
          filter(icons, this.value);
        });

        for (var i = 0; i < icons.length; i++) {
          $(icons[i])
            .parent()
            .click(function (e) {
              $("#thumbnail-icon-modal").modal("hide");
              e.preventDefault();
            });
        }

        //clear search input
        $(".clear-icon-search").click(function (e) {
          $("#thumbnail_icon_search_input").val("");
          filter(icons, "");
        });
      }

      function filter(list, filterValue) {
        for (var i = 0; i < list.length; i++) {
          var val = $(list[i]).attr("data-search").toLowerCase();
          if (val.indexOf(filterValue.toLowerCase()) > -1) {
            $(list[i]).parent().parent().css("display", "");
          } else {
            $(list[i]).parent().parent().css("display", "none");
          }
        }
      }
    },
    {},
  ],
  6: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.deleteHandler = deleteHandler;
      function deleteHandler(elm, inputType) {
        var obj =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : null;
        var cb_1 =
          arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : null;
        var cb_2 =
          arguments.length > 4 && arguments[4] !== undefined
            ? arguments[4]
            : null;

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
  ],
  7: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.regularInputLink = regularInputLink;
      exports.headerInputLink = headerInputLink;
      exports.donasiInputLink = donasiInputLink;
      exports.produkDigitalInputLink = produkDigitalInputLink;
      exports.kontenInputLink = kontenInputLink;
      exports.paketJasaInputLink = paketJasaInputLink;
      exports.kerjasamaInputLink = kerjasamaInputLink;
      exports.embedInputLink = embedInputLink;
      exports.whatsappInputLink = whatsappInputLink;
      exports.emailInputLink = emailInputLink;
      exports.emailColletionInputLink = emailColletionInputLink;
      exports.videoRequestInputLink = videoRequestInputLink;
      function regularInputLink(count) {
        return (
          '<div class="container d-flex form-group " id="regular-link-' +
          count +
          '">\n    <div >   \n      <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n        <i class="fas fa-ellipsis-v"></i>\n      </button>\n    </div>\n    <div class="d-flex flex-column input-container p-3">\n      <input class="form-control  mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n      <input class="form-control  mb-3" type="text" placeholder="Link">\n      <div class="icon-container d-flex align-items-center">\n        <div class="switch mr-3 mr-sm-4">\n          <input type="checkbox" id="switch-1" /><label for="switch-1">Toggle</label>\n        </div>\n        <button class="mr-3 mr-sm-4" id="del-btn" data-toggle="modal" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete" data-tooltip="tooltip" data-placement="top" title="Delete">\n          <i class="fas fa-trash-alt"></i>\n        </button>\n        <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">\n          <i class="fas fa-image"></i>\n        </button>\n        <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">\n          <i class="fa fa-chart-bar" aria-hidden="true"></i>\n        </button>\n      </div>\n    </div>\n  </div>'
        );
      }

      function headerInputLink(count) {
        return (
          ' <div class="container d-flex form-group " id="header-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Header / Section Title\n    </p>\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-2" /><label for="switch-2">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete" id="del-btn">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function donasiInputLink(count) {
        return (
          '<div class="container d-flex form-group " id="donasi-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Terima Dukungan / Donasi <a class="font-weight-light text-primary" href=""><u>Settings</u></a>\n    </p>\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-3" /><label for="switch-3">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function produkDigitalInputLink(count) {
        return (
          '<div class="container d-flex form-group" id="produk-digital-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n    Jual Produk Digital (File/Link)  <a class="font-weight-light text-primary" href=""><u>Edit/Add\n      </u></a>\n    </p>\n    <div class="form-group">\n      <div class="select-container mb-3">\n        <select id="akses-' +
          count +
          '" class="select2" name="akses-' +
          count +
          '"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan\n        ">\n          <option value=""></option>\n          <option value="1">George Washington</option>\n          <option value="2">John Adams</option>\n          <option value="3">Thomas Jefferson</option>\n          <option value="4">James Madison</option>\n          <option value="5">James Monroe</option>\n          <option value="6">John Quincy Adams</option>\n          <option value="7">Andrew Jackson</option>\n          <option value="8">Martin Van Buren</option>\n          <option value="9">William Henry Harrison</option>\n        </select>\n        <span class="arrow-icon">\n          <i class="fas fa-chevron-down"></i>\n        </span>\n      </div>\n    </div>\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-4" /><label for="switch-4">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete"  data-tooltip="tooltip" data-placement="top" title="Delete">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function kontenInputLink(count) {
        return (
          '<div class="container d-flex form-group " id="konten-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Konten <a class="font-weight-light text-primary" href=""><u>Edit/Add\n      </u></a>\n    </p>\n    <div class="form-group">\n      <div class="select-container mb-3">\n        <div class="select-container mb-3">\n          <select id="konten-' +
          count +
          '" class="select2" name="konten-' +
          count +
          '"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan\n          ">\n            <option value=""></option>\n            <option value="1">George Washington</option>\n            <option value="2">John Adams</option>\n            <option value="3">Thomas Jefferson</option>\n            <option value="4">James Madison</option>\n            <option value="5">James Monroe</option>\n            <option value="6">John Quincy Adams</option>\n            <option value="7">Andrew Jackson</option>\n            <option value="8">Martin Van Buren</option>\n            <option value="9">William Henry Harrison</option>\n          </select>\n          <span class="arrow-icon">\n            <i class="fas fa-chevron-down"></i>\n          </span>\n        </div>\n        \n      </div>\n    </div>\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-5" /><label for="switch-5">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete"  data-tooltip="tooltip" data-placement="top" title="Delete">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function paketJasaInputLink(count) {
        return (
          '<div class="container d-flex form-group " id="paketJasa-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Paket Jasa  <a class="font-weight-light text-primary" href=""><u>Edit/Add\n      </u></a>\n    </p>\n    <div class="form-group">\n      <div class="select-container mb-3">\n        <select id="jasa-' +
          count +
          '" class="select2" name="jasa-' +
          count +
          '"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan\n        ">\n          <option value=""></option>\n          <option value="1">George Washington</option>\n          <option value="2">John Adams</option>\n          <option value="3">Thomas Jefferson</option>\n          <option value="4">James Madison</option>\n          <option value="5">James Monroe</option>\n          <option value="6">John Quincy Adams</option>\n          <option value="7">Andrew Jackson</option>\n          <option value="8">Martin Van Buren</option>\n          <option value="9">William Henry Harrison</option>\n        </select>\n        <span class="arrow-icon">\n          <i class="fas fa-chevron-down"></i>\n        </span>\n      </div>\n    </div>\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-6" /><label for="switch-6">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete"  data-tooltip="tooltip" data-placement="top" title="Delete">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function kerjasamaInputLink(count) {
        return (
          '<div class="container d-flex form-group "  id="kerjasama-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Terima Request Kerjasama   <a class="font-weight-light text-primary" href=""><u>Edit Profesi\n      </u></a>\n    </p>\n    <div class="form-group">\n      <div class="select-container mb-3">\n        <select id="requestKerjasama-' +
          count +
          '" class="select2" name="requestKerjasama-' +
          count +
          '"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan\n        ">\n          <option value=""></option>\n          <option value="1">George Washington</option>\n          <option value="2">John Adams</option>\n          <option value="3">Thomas Jefferson</option>\n          <option value="4">James Madison</option>\n          <option value="5">James Monroe</option>\n          <option value="6">John Quincy Adams</option>\n          <option value="7">Andrew Jackson</option>\n          <option value="8">Martin Van Buren</option>\n          <option value="9">William Henry Harrison</option>\n        </select>\n        <span class="arrow-icon">\n          <i class="fas fa-chevron-down"></i>\n        </span>\n      </div>\n    </div>\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-7" /><label for="switch-7">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete"  data-tooltip="tooltip" data-placement="top" title="Delete">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function embedInputLink(count) {
        return (
          '<div class="container d-flex form-group " id="embed-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Embed Video/Musik\n    </p>\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n    <div class="mb-3">\n      <input class="form-control" type="text" placeholder="Link">\n      <span class="eightpx help-text">Masukkan link YouTube / Spotify\n      </span>\n    </div>\n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-8" /><label for="switch-8">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">\n      <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function whatsappInputLink(count) {
        return (
          '<div class="container d-flex form-group " id="whatsapp-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Whatsapp\n    </p>\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n    <div class="mb-3">\n      <input class="form-control" type="text" placeholder="Nomor Whatsapp">\n      <span class="eightpx help-text">Awali dengan kode negara | Contoh: <span class="text-primary" >62</span>87528371029\n      </span>\n    </div>\n    <div class="mb-3">\n      <input class="form-control" type="text" placeholder="Template pesan">\n      <span class="eightpx help-text">Optional\n\n      </span>\n    </div>\n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-9" /><label for="switch-9">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">\n      <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function emailInputLink(count) {
        return (
          '<div class="container d-flex form-group " id="email-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Email\n    </p>\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n    <input class="form-control mb-3" type="text" placeholder="Alamat email">\n    \n    <div class="mb-3">\n      <input class="form-control" type="text" placeholder="Template judul email">\n      <span class="eightpx help-text">Optional\n      </span>\n    </div>\n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-10" /><label for="switch-10">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function emailColletionInputLink(count) {
        return (
          '<div class="container d-flex form-group " id="emailCollection-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Email Collection\n     \n    </p>\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol subscribe\n    ">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-11" /><label for="switch-11">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }

      function videoRequestInputLink(count) {
        return (
          '<div class="container d-flex form-group " id="videoUcapan-link-' +
          count +
          '">\n  <div >   \n    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">\n      <i class="fas fa-ellipsis-v"></i>\n    </button>\n  </div>\n  <div class="d-flex flex-column input-container p-3">\n    <p class="title  mb-3 elevenpx font-weight-bold">\n      Terima Request Video Ucapan  <a class="font-weight-light text-primary" href=""><u>Settings</u></a>\n    </p>\n    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">\n    \n    <div class="icon-container d-flex align-items-center">\n      <div class="switch mr-3 mr-sm-4">\n        <input type="checkbox" id="switch-3" /><label for="switch-3">Toggle</label>\n      </div>\n      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete"  data-tooltip="tooltip" data-placement="top" title="Delete">\n        <i class="fas fa-trash-alt"></i>\n      </button>\n      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">\n        <i class="fas fa-image"></i>\n      </button>\n      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">\n        <i class="fa fa-chart-bar" aria-hidden="true"></i>\n      </button>\n    </div>\n  </div>\n</div>'
        );
      }
    },
    {},
  ],
  8: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.deleteHandler = deleteHandler;
      function deleteHandler(elm, inputType) {
        var obj =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : null;
        var cb_1 =
          arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : null;
        var cb_2 =
          arguments.length > 4 && arguments[4] !== undefined
            ? arguments[4]
            : null;

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
  ],
});
