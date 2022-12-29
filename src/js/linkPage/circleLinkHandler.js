import { deleteHandler } from "../globalHandler/deleteHandler.js";

let cirlceLinkList = document.querySelectorAll(".circle-link-btn");
let circleModalImg = document.getElementById("circle-link-modal-img");
let circelModalTitle = document.getElementById("circle-link-title-input");
let circelModalLink = document.getElementById("circle-link-link-input");
let circleTitleLength = document.querySelector(".circle-title-length");
const MAX_LENGTH = 9;
let currentLength = 0;

const ArrOfCircleLinkObj = [];

export function circleLinkHandler() {
  getAllCircleValue();
  let selectedCircleLink = null;
  let circleImg = {
    src: "",
    index: "",
  };

  cirlceLinkList.forEach((element, index) => {
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

  let tempImgSrc = "";
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

      selectedCircleLink.elm.querySelector(".cirlce-link-title").innerText =
        circelModalTitle.value;

      selectedCircleLink.elm.setAttribute("data-link", circelModalLink.value);
      if (tempImgSrc || circelModalTitle.value || circelModalLink.value) {
        toggleTitleAndIcon(selectedCircleLink.elm, true);
      }
    });
}

function getAllCircleValue() {
  cirlceLinkList.forEach((elm, idx) => {
    let img = elm.querySelector(`#circle-img-${idx + 1}`).getAttribute("src");
    let title = elm.querySelector(".cirlce-link-title").innerHTML;
    let link = elm.getAttribute("data-link");
    let active = elm.querySelector("input[type='checkbox']").checked;

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
    deleteHandler(
      _this.elm,
      "circle",
      _this,
      updateCircleLinkElm,
      toggleTitleAndIcon
    );
  });
}

function updateCircleLinkElm(index) {
  cirlceLinkList[index].querySelector(".cirlce-link-title").innerHTML = "";
  cirlceLinkList[index].querySelector("input[type='checkbox']").checked = false;
  cirlceLinkList[index]
    .querySelector(`#circle-img-${index + 1}`)
    .setAttribute("src", "");
  cirlceLinkList[index].setAttribute("data-link", "");
}

function toggleTitleAndIcon(elm, isShow = false) {
  if(isShow) {
    elm.classList.remove("hide");
  } else {
    elm.classList.add("hide");
  }
}
