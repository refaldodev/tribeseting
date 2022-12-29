export function regularInputLink(count) {
    return `<div class="container d-flex form-group " id="regular-link-${count}">
    <div >   
      <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
        <i class="fas fa-ellipsis-v"></i>
      </button>
    </div>
    <div class="d-flex flex-column input-container p-3">
      <input class="form-control  mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
      <input class="form-control  mb-3" type="text" placeholder="Link">
      <div class="icon-container d-flex align-items-center">
        <div class="switch mr-3 mr-sm-4">
          <input type="checkbox" id="switch-1" /><label for="switch-1">Toggle</label>
        </div>
        <button class="mr-3 mr-sm-4" id="del-btn" data-toggle="modal" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete" data-tooltip="tooltip" data-placement="top" title="Delete">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">
          <i class="fas fa-image"></i>
        </button>
        <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">
          <i class="fa fa-chart-bar" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>`;
}

export function headerInputLink(count) {
    return ` <div class="container d-flex form-group " id="header-link-${count}">
  <div >   
    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="d-flex flex-column input-container p-3">
    <p class="title  mb-3 elevenpx font-weight-bold">
      Header / Section Title
    </p>
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
    
    <div class="icon-container d-flex align-items-center">
      <div class="switch mr-3 mr-sm-4">
        <input type="checkbox" id="switch-2" /><label for="switch-2">Toggle</label>
      </div>
      <button class="mr-3 mr-sm-4"  data-toggle="modal" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete" id="del-btn">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</div>`;
}

export function donasiInputLink(count) {
    return `<div class="container d-flex form-group " id="donasi-link-${count}">
  <div >   
    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="d-flex flex-column input-container p-3">
    <p class="title  mb-3 elevenpx font-weight-bold">
      Terima Dukungan / Donasi <a class="font-weight-light text-primary" href=""><u>Settings</u></a>
    </p>
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
    
    <div class="icon-container d-flex align-items-center">
      <div class="switch mr-3 mr-sm-4">
        <input type="checkbox" id="switch-3" /><label for="switch-3">Toggle</label>
      </div>
      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">
        <i class="fas fa-image"></i>
      </button>
      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">
        <i class="fa fa-chart-bar" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>`;
}

export function produkDigitalInputLink(count) {
    return `<div class="container d-flex form-group" id="produk-digital-${count}">
  <div >   
    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="d-flex flex-column input-container p-3">
    <p class="title  mb-3 elevenpx font-weight-bold">
    Jual Produk Digital (File/Link)  <a class="font-weight-light text-primary" href=""><u>Edit/Add
      </u></a>
    </p>
    <div class="form-group">
      <div class="select-container mb-3">
        <select id="akses-${count}" class="select2" name="akses-${count}"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan
        ">
          <option value=""></option>
          <option value="1">George Washington</option>
          <option value="2">John Adams</option>
          <option value="3">Thomas Jefferson</option>
          <option value="4">James Madison</option>
          <option value="5">James Monroe</option>
          <option value="6">John Quincy Adams</option>
          <option value="7">Andrew Jackson</option>
          <option value="8">Martin Van Buren</option>
          <option value="9">William Henry Harrison</option>
        </select>
        <span class="arrow-icon">
          <i class="fas fa-chevron-down"></i>
        </span>
      </div>
    </div>
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
    
    <div class="icon-container d-flex align-items-center">
      <div class="switch mr-3 mr-sm-4">
        <input type="checkbox" id="switch-4" /><label for="switch-4">Toggle</label>
      </div>
      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete"  data-tooltip="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">
        <i class="fas fa-image"></i>
      </button>
      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">
        <i class="fa fa-chart-bar" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>`;
}

export function kontenInputLink(count) {
    return `<div class="container d-flex form-group " id="konten-link-${count}">
  <div >   
    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="d-flex flex-column input-container p-3">
    <p class="title  mb-3 elevenpx font-weight-bold">
      Konten <a class="font-weight-light text-primary" href=""><u>Edit/Add
      </u></a>
    </p>
    <div class="form-group">
      <div class="select-container mb-3">
        <div class="select-container mb-3">
          <select id="konten-${count}" class="select2" name="konten-${count}"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan
          ">
            <option value=""></option>
            <option value="1">George Washington</option>
            <option value="2">John Adams</option>
            <option value="3">Thomas Jefferson</option>
            <option value="4">James Madison</option>
            <option value="5">James Monroe</option>
            <option value="6">John Quincy Adams</option>
            <option value="7">Andrew Jackson</option>
            <option value="8">Martin Van Buren</option>
            <option value="9">William Henry Harrison</option>
          </select>
          <span class="arrow-icon">
            <i class="fas fa-chevron-down"></i>
          </span>
        </div>
        
      </div>
    </div>
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
    
    <div class="icon-container d-flex align-items-center">
      <div class="switch mr-3 mr-sm-4">
        <input type="checkbox" id="switch-5" /><label for="switch-5">Toggle</label>
      </div>
      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete"  data-tooltip="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">
        <i class="fas fa-image"></i>
      </button>
      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">
        <i class="fa fa-chart-bar" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>`;
}

export function paketJasaInputLink(count) {
    return `<div class="container d-flex form-group " id="paketJasa-link-${count}">
  <div >   
    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="d-flex flex-column input-container p-3">
    <p class="title  mb-3 elevenpx font-weight-bold">
      Paket Jasa  <a class="font-weight-light text-primary" href=""><u>Edit/Add
      </u></a>
    </p>
    <div class="form-group">
      <div class="select-container mb-3">
        <select id="jasa-${count}" class="select2" name="jasa-${count}"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan
        ">
          <option value=""></option>
          <option value="1">George Washington</option>
          <option value="2">John Adams</option>
          <option value="3">Thomas Jefferson</option>
          <option value="4">James Madison</option>
          <option value="5">James Monroe</option>
          <option value="6">John Quincy Adams</option>
          <option value="7">Andrew Jackson</option>
          <option value="8">Martin Van Buren</option>
          <option value="9">William Henry Harrison</option>
        </select>
        <span class="arrow-icon">
          <i class="fas fa-chevron-down"></i>
        </span>
      </div>
    </div>
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
    
    <div class="icon-container d-flex align-items-center">
      <div class="switch mr-3 mr-sm-4">
        <input type="checkbox" id="switch-6" /><label for="switch-6">Toggle</label>
      </div>
      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete"  data-tooltip="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">
        <i class="fas fa-image"></i>
      </button>
      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">
        <i class="fa fa-chart-bar" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>`;
}

export function kerjasamaInputLink(count) {
    return `<div class="container d-flex form-group "  id="kerjasama-link-${count}">
  <div >   
    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="d-flex flex-column input-container p-3">
    <p class="title  mb-3 elevenpx font-weight-bold">
      Terima Request Kerjasama   <a class="font-weight-light text-primary" href=""><u>Edit Profesi
      </u></a>
    </p>
    <div class="form-group">
      <div class="select-container mb-3">
        <select id="requestKerjasama-${count}" class="select2" name="requestKerjasama-${count}"  tabindex="2" data-placeholder="Pilih yang ingin ditampilkan
        ">
          <option value=""></option>
          <option value="1">George Washington</option>
          <option value="2">John Adams</option>
          <option value="3">Thomas Jefferson</option>
          <option value="4">James Madison</option>
          <option value="5">James Monroe</option>
          <option value="6">John Quincy Adams</option>
          <option value="7">Andrew Jackson</option>
          <option value="8">Martin Van Buren</option>
          <option value="9">William Henry Harrison</option>
        </select>
        <span class="arrow-icon">
          <i class="fas fa-chevron-down"></i>
        </span>
      </div>
    </div>
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
    
    <div class="icon-container d-flex align-items-center">
      <div class="switch mr-3 mr-sm-4">
        <input type="checkbox" id="switch-7" /><label for="switch-7">Toggle</label>
      </div>
      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete"  data-tooltip="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">
        <i class="fas fa-image"></i>
      </button>
      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">
        <i class="fa fa-chart-bar" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>`;
}

export function embedInputLink(count) {
    return `<div class="container d-flex form-group " id="embed-link-${count}">
  <div >   
    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="d-flex flex-column input-container p-3">
    <p class="title  mb-3 elevenpx font-weight-bold">
      Embed Video/Musik
    </p>
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
    <div class="mb-3">
      <input class="form-control" type="text" placeholder="Link">
      <span class="eightpx help-text">Masukkan link YouTube / Spotify
      </span>
    </div>
    <div class="icon-container d-flex align-items-center">
      <div class="switch mr-3 mr-sm-4">
        <input type="checkbox" id="switch-8" /><label for="switch-8">Toggle</label>
      </div>
      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">
      <i class="fas fa-image"></i>
      </button>
      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">
        <i class="fa fa-chart-bar" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>`;
}

export function whatsappInputLink(count) {
    return `<div class="container d-flex form-group " id="whatsapp-link-${count}">
  <div >   
    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="d-flex flex-column input-container p-3">
    <p class="title  mb-3 elevenpx font-weight-bold">
      Whatsapp
    </p>
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
    <div class="mb-3">
      <input class="form-control" type="text" placeholder="Nomor Whatsapp">
      <span class="eightpx help-text">Awali dengan kode negara | Contoh: <span class="text-primary" >62</span>87528371029
      </span>
    </div>
    <div class="mb-3">
      <input class="form-control" type="text" placeholder="Template pesan">
      <span class="eightpx help-text">Optional

      </span>
    </div>
    <div class="icon-container d-flex align-items-center">
      <div class="switch mr-3 mr-sm-4">
        <input type="checkbox" id="switch-9" /><label for="switch-9">Toggle</label>
      </div>
      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">
      <i class="fas fa-image"></i>
      </button>
      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">
        <i class="fa fa-chart-bar" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>`;
}

export function emailInputLink(count) {
    return `<div class="container d-flex form-group " id="email-link-${count}">
  <div >   
    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="d-flex flex-column input-container p-3">
    <p class="title  mb-3 elevenpx font-weight-bold">
      Email
    </p>
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
    <input class="form-control mb-3" type="text" placeholder="Alamat email">
    
    <div class="mb-3">
      <input class="form-control" type="text" placeholder="Template judul email">
      <span class="eightpx help-text">Optional
      </span>
    </div>
    <div class="icon-container d-flex align-items-center">
      <div class="switch mr-3 mr-sm-4">
        <input type="checkbox" id="switch-10" /><label for="switch-10">Toggle</label>
      </div>
      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">
        <i class="fas fa-image"></i>
      </button>
      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">
        <i class="fa fa-chart-bar" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>`;
}

export function emailColletionInputLink(count) {
    return `<div class="container d-flex form-group " id="emailCollection-link-${count}">
  <div >   
    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="d-flex flex-column input-container p-3">
    <p class="title  mb-3 elevenpx font-weight-bold">
      Email Collection
     
    </p>
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol subscribe
    ">
    
    <div class="icon-container d-flex align-items-center">
      <div class="switch mr-3 mr-sm-4">
        <input type="checkbox" id="switch-11" /><label for="switch-11">Toggle</label>
      </div>
      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">
        <i class="fas fa-image"></i>
      </button>
      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">
        <i class="fa fa-chart-bar" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>`;
}

export function videoRequestInputLink(count) {
    return `<div class="container d-flex form-group " id="videoUcapan-link-${count}">
  <div >   
    <button class="drag-btn" data-tooltip="tooltip" data-placement="left" title="Drag to reorder">
      <i class="fas fa-ellipsis-v"></i>
    </button>
  </div>
  <div class="d-flex flex-column input-container p-3">
    <p class="title  mb-3 elevenpx font-weight-bold">
      Terima Request Video Ucapan  <a class="font-weight-light text-primary" href=""><u>Settings</u></a>
    </p>
    <input class="form-control mb-3" type="text" placeholder="Tulisan pada tombol" id="tombol-input">
    
    <div class="icon-container d-flex align-items-center">
      <div class="switch mr-3 mr-sm-4">
        <input type="checkbox" id="switch-3" /><label for="switch-3">Toggle</label>
      </div>
      <button class="mr-3 mr-sm-4"  data-toggle="modal" id="del-btn" data-target="#deleteModal" data-tooltip="tooltip" data-placement="top" title="Delete"  data-tooltip="tooltip" data-placement="top" title="Delete">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="mr-3 mr-sm-4" data-tooltip="tooltip" data-placement="top" title="Thumbnail" id="thumbnail-btn" data-target="#thumbnailModal" data-toggle="modal">
        <i class="fas fa-image"></i>
      </button>
      <button class="mr-3 mr-sm-4 chart" data-tooltip="tooltip" data-placement="top" title="Analytics" id="analytics-btn">
        <i class="fa fa-chart-bar" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>`;
}
