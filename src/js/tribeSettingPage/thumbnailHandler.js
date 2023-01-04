let $uploadCrop;
export function uploadThumbnailImg() {
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

    $uploadCrop = $("#upload-thumbnail-img").croppie({
        viewport: {
            width: 250,
            height: 250,
            type: "circle",
        },
        enableExif: true,
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
                    if (isValidSize && this.height > 300 && this.width > 300) {
                        $(".file-name").html(_this.files[0].name);
                        $(".modal .image-error-msg").html("");
                    }
                } else {
                    $(".modal .image-error-msg").html(
                        "Min height 300px dan min width 300px"
                    );
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
                fetch(resp)
                    .then((res) => res.blob())
                    .then((res) => console.log(res));
            });
    });
}

export function searchIcons() {
    let icons = $(".icon-container .icon");
    let searchInput = $("#thumbnail_icon_search_input");
    $(searchInput).keyup(function (e) {
        filter(icons, this.value);
    });

    for (let i = 0; i < icons.length; i++) {
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
    for (let i = 0; i < list.length; i++) {
        let val = $(list[i]).attr("data-search").toLowerCase();
        if (val.indexOf(filterValue.toLowerCase()) > -1) {
            $(list[i]).parent().parent().css("display", "");
        } else {
            $(list[i]).parent().parent().css("display", "none");
        }
    }
}
