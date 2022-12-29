export function extraPageSection() {
    $(document).ready(function () {
        $(".select2").select2({
            tags: true,
        });
    });
}

export function themeSection() {
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
        var html = `<div class="form-group mb-3">
    <input class="form-control" id="link" aria-describedby="link" maxlength="160" placeholder="Link">
    <small id="deskripsi-input-help" class="form-text text-left eightpx mb-0">Masukkan link YouTube / Spotify
    </small>
  </div>`;
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
    document
        .querySelector("#confirm-delete-btn")
        .addEventListener("click", deleteImage);

    
    function deleteImage() {
      imageFile = null;
      document
        .querySelector("#confirm-delete-btn")
        .removeEventListener("click", deleteImage);
    }
  }
}
