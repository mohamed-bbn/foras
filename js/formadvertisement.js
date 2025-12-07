/*----------------------------------------
Add  Advertisement
----------------------------------------*/

let editingItems = null;

// Open the image file
$("#uploadBoxs").click(() => $("#fileInputitem").click());

// Display the preview image
$("#fileInputitem").on("change", function() {
    if (!this.files.length) return;
    let reader = new FileReader();
    reader.onload = e => {
        $("#previewImgs").attr("src", e.target.result);
        $("#previewBox").show();
    };
    reader.readAsDataURL(this.files[0]);
});

// remove the image
$("#removeImage").click(() => {
    $("#fileInputitem").val("");
    $("#previewBox").hide();
    $("#previewImgs").attr("src", "");
});

// Update the status of available items
function updateEmptyStates() {
    let count = $("#itemsList .iteminner").length; // Calculate the number
    $("#noItems").toggle($("#itemsList .iteminner").length === 0); //Leave it as it is.
    $("#item-count").text(`(${count})`); // Update the number
    $(".advtitle").toggle(count > 0); // Show items if the number is greater than zero
}

// Add or edit card
function applyItem(data, item = null) {
    // data = {titlename, advtype, location, target, startdate, enddate, description, img}
    if (item) { // amendment
        item.find(".item-name").text(data.titlename);
        item.find(".item-advtype").text(data.advtype);
        item.find(".item-location").text(data.location);
        item.find(".item-startdate").text(data.startdate);
        item.find(".item-enddate").text(data.enddate);
        item.find(".item-description").text(data.description || "");
        item.find("img").attr("src", data.img);

        item.find(".stored-titlename").val(data.titlename);
        item.find(".stored-advtype").val(data.advtype);
        item.find(".stored-location").val(data.location);
        item.find(".stored-startdate").val(data.startdate);
        item.find(".stored-enddate").val(data.enddate);
        item.find(".stored-description").val(data.description || "");
        item.find(".stored-img").val(data.img);
    } else { // Add new
        let id = Date.now();
        $("#itemsList").prepend(`
            <div class="iteminner" data-id="${id}">
                <div class="photo">
                  <img src="${data.img}">
                </div>
                <div class="item-details">
                    <div class="flextitle">
                        <h4 class="title item-name">${data.titlename}</h4>
                        <span class="item-advtype">${data.advtype}</span>
                        <span class="item-location">${data.location}</span>
                    </div>
                    <p class="item-description">${data.description || ""}</p>
                      <div class="flex">
                        <div class="flexinner">
                         <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_404_60419)"> <path d="M4.66406 1.16663V3.49996" stroke="#727272" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M9.33594 1.16663V3.49996" stroke="#727272" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11.0833 2.33337H2.91667C2.27233 2.33337 1.75 2.85571 1.75 3.50004V11.6667C1.75 12.311 2.27233 12.8334 2.91667 12.8334H11.0833C11.7277 12.8334 12.25 12.311 12.25 11.6667V3.50004C12.25 2.85571 11.7277 2.33337 11.0833 2.33337Z" stroke="#727272" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M1.75 5.83337H12.25" stroke="#727272" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <clipPath id="clip0_404_60419"> <rect width="14" height="14" fill="white"/> </clipPath> </defs> </svg>
                         <p class="item-startdate">From :  ${data.startdate}</p>
                         <p class="item-enddate">To : ${data.enddate}</p>
                        </div>
                        <span class="views">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1.20052 7.20297C1.15191 7.072 1.15191 6.92793 1.20052 6.79697C1.67402 5.64888 2.47774 4.66724 3.50981 3.97649C4.54187 3.28574 5.7558 2.91699 6.99769 2.91699C8.23958 2.91699 9.45351 3.28574 10.4856 3.97649C11.5176 4.66724 12.3214 5.64888 12.7949 6.79697C12.8435 6.92793 12.8435 7.072 12.7949 7.20297C12.3214 8.35105 11.5176 9.33269 10.4856 10.0234C9.45351 10.7142 8.23958 11.0829 6.99769 11.0829C5.7558 11.0829 4.54187 10.7142 3.50981 10.0234C2.47774 9.33269 1.67402 8.35105 1.20052 7.20297Z" stroke="#3B82F6" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M7 8.75C7.9665 8.75 8.75 7.9665 8.75 7C8.75 6.0335 7.9665 5.25 7 5.25C6.0335 5.25 5.25 6.0335 5.25 7C5.25 7.9665 6.0335 8.75 7 8.75Z" stroke="#3B82F6" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> </svg>
                          15,420 views
                        </span>
                         <span class="clicks">
                           <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_404_60433)"> <path d="M6.9974 12.8333C10.2191 12.8333 12.8307 10.2216 12.8307 6.99996C12.8307 3.7783 10.2191 1.16663 6.9974 1.16663C3.77573 1.16663 1.16406 3.7783 1.16406 6.99996C1.16406 10.2216 3.77573 12.8333 6.9974 12.8333Z" stroke="#10B981" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M7 10.5C8.933 10.5 10.5 8.933 10.5 7C10.5 5.067 8.933 3.5 7 3.5C5.067 3.5 3.5 5.067 3.5 7C3.5 8.933 5.067 10.5 7 10.5Z" stroke="#10B981" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M7.0026 8.16671C7.64694 8.16671 8.16927 7.64437 8.16927 7.00004C8.16927 6.35571 7.64694 5.83337 7.0026 5.83337C6.35827 5.83337 5.83594 6.35571 5.83594 7.00004C5.83594 7.64437 6.35827 8.16671 7.0026 8.16671Z" stroke="#10B981" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <clipPath id="clip0_404_60433"> <rect width="14" height="14" fill="white"/> </clipPath> </defs> </svg>
                            856 clicks
                        </span>
                         <span class="ctr">
                             CTR: 5.6%
                        </span>
                      <div>
                    <nav class="btnaction">
                        <a class="edit-btn" title="Edit">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_404_61660)"> <path d="M7 1.75H2.91667C2.60725 1.75 2.3105 1.87292 2.09171 2.09171C1.87292 2.3105 1.75 2.60725 1.75 2.91667V11.0833C1.75 11.3928 1.87292 11.6895 2.09171 11.9083C2.3105 12.1271 2.60725 12.25 2.91667 12.25H11.0833C11.3928 12.25 11.6895 12.1271 11.9083 11.9083C12.1271 11.6895 12.25 11.3928 12.25 11.0833V7" stroke="#2D2D2D" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M10.7185 1.53126C10.9505 1.2992 11.2653 1.16882 11.5935 1.16882C11.9217 1.16882 12.2364 1.2992 12.4685 1.53126C12.7005 1.76332 12.8309 2.07807 12.8309 2.40626C12.8309 2.73445 12.7005 3.0492 12.4685 3.28126L7.2109 8.53943C7.07238 8.67782 6.90127 8.77913 6.71331 8.83401L5.0374 9.32401C4.9872 9.33865 4.93399 9.33953 4.88334 9.32655C4.83269 9.31358 4.78646 9.28722 4.74949 9.25025C4.71252 9.21328 4.68616 9.16705 4.67319 9.1164C4.66021 9.06575 4.66109 9.01254 4.67573 8.96234L5.16573 7.28643C5.22087 7.09862 5.32237 6.92771 5.4609 6.78943L10.7185 1.53126Z" stroke="#2D2D2D" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <clipPath id="clip0_404_61660"> <rect width="14" height="14" fill="white"/> </clipPath> </defs> </svg>
                        </a>
                        <a class="del-btn" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.83594 6.41663V9.91663" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M8.16406 6.41663V9.91663" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11.0807 3.5V11.6667C11.0807 11.9761 10.9578 12.2728 10.739 12.4916C10.5202 12.7104 10.2235 12.8333 9.91406 12.8333H4.08073C3.77131 12.8333 3.47456 12.7104 3.25577 12.4916C3.03698 12.2728 2.91406 11.9761 2.91406 11.6667V3.5" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M1.75 3.5H12.25" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M4.66406 3.49996V2.33329C4.66406 2.02387 4.78698 1.72713 5.00577 1.50833C5.22456 1.28954 5.52131 1.16663 5.83073 1.16663H8.16406C8.47348 1.16663 8.77023 1.28954 8.98902 1.50833C9.20781 1.72713 9.33073 2.02387 9.33073 2.33329V3.49996" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> </svg>
                        </a>
                    </nav>
                <div>
                <input type="hidden" class="stored-titlename" value="${data.titlename}">
                <input type="hidden" class="stored-advtype" value="${data.advtype}">
                <input type="hidden" class="stored-location" value="${data.location}">
                 <input type="hidden" class="stored-startdate" value="${data.startdate}">
                <input type="hidden" class="stored-enddate" value="${data.enddate}">
                <input type="hidden" class="stored-description" value="${data.description || ""}">
                <input type="hidden" class="stored-img" value="${data.img}">
            </div>
        `);
    }
    resetForm();
    updateEmptyStates();
}

// Save a new item
$("#saveBtn").click(() => {
    let titlename = $("#titlename").val().trim();
    let advtype = $("#advtype").val().trim();
    let location = $("#location").val().trim();
    let startdate = $("#startdate").val().trim();
    let enddate = $("#enddate").val().trim();
    let description = $("#description").val().trim();
    let file = $("#fileInputitem")[0].files[0];
    let url = $("#ProductURL").val().trim();

    // Check only the required fields
    if (!titlename || !advtype || !location || !startdate || !enddate)
        return alert("Complete the required information");

    // Specify the image (file, URL, or error if empty)
    if (file) {
        let reader = new FileReader();
        reader.onload = e => applyItem({
            titlename,
            advtype,
            location,
            startdate,
            enddate,
            description,
            img: e.target.result
        });
        reader.readAsDataURL(file);
    } else if (url) {
        applyItem({
            titlename,
            advtype,
            location,
            startdate,
            enddate,
            description,
            img: url
        });
    } else {
        alert("Choose an image or provide an image link.");
    }
});

//Modify an item
$(document).on("click", ".edit-btn", function() {
    editingItems = $(this).closest(".iteminner");

    let data = {
        titlename: editingItems.find(".stored-titlename").val(),
        advtype: editingItems.find(".stored-advtype").val(),
        location: editingItems.find(".stored-location").val(),
        startdate: editingItems.find(".stored-startdate").val(),
        enddate: editingItems.find(".stored-enddate").val(),
        description: editingItems.find(".stored-description").val(),
        img: editingItems.find(".stored-img").val()
    };

    editingItems.data("target", {...data
    });

    $("#titlename").val(data.titlename);
    $("#advtype").val(data.advtype);
    $("#location").val(data.location);
    $("#startdate").val(data.startdate);
    $("#enddate").val(data.enddate);
    $("#description").val(data.description || "");
    $("#ProductURL").val("");
    $("#previewImgs").attr("src", data.img).show();
    $("#saveBtn").hide();
    $("#updateBtn,#cancelBtn").show();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Update the item
$("#updateBtn").click(() => {
    if (!editingItems) return;

    let titlename = $("#titlename").val().trim();
    let advtype = $("#advtype").val().trim();
    let location = $("#location").val().trim();
    let startdate = $("#startdate").val().trim();
    let enddate = $("#enddate").val().trim();
    let description = $("#description").val().trim();
    let file = $("#fileInputitem")[0].files[0];
    let url = $("#ProductURL").val().trim();

    if (!titlename || !advtype || !location || !startdate || !enddate)
        return alert("Complete the required information");

    let applyUpdate = img => applyItem({
        titlename,
        advtype,
        location,
        startdate,
        enddate,
        description,
        img
    }, editingItems);

    if (file) {
        let reader = new FileReader();
        reader.onload = e => applyUpdate(e.target.result);
        reader.readAsDataURL(file);
    } else if (url) {
        applyUpdate(url);
    } else {
        applyUpdate($("#previewImgs").attr("src"));
    }
});

// Cancel modification
$("#cancelBtn").click(() => {
    if (editingItems && editingItems.data("target")) {
        editingItems.find(".item-name").text(o.titlename);
        editingItems.find(".item-advtype").text(o.advtype);
        editingItems.find(".item-location").text(o.location);
        editingItems.find(".item-startdate").text("startdate: " + o.startdate);
        editingItems.find(".item-enddate").text("enddate: " + o.enddate);
        editingItems.find(".item-description").text(o.description || "");
        editingItems.find("img").attr("src", o.img);

        editingItems.find(".stored-titlename").val(o.titlename);
        editingItems.find(".stored-advtype").val(o.advtype);
        editingItems.find(".stored-location").val(o.location);
        editingItems.find(".stored-startdate").val(o.startdate);
        editingItems.find(".stored-enddate").val(o.enddate);
        editingItems.find(".stored-description").val(o.description || "");
        editingItems.find(".stored-img").val(o.img);
    }
    resetForm();
});

// Delete an item
$(document).on("click", ".del-btn", function() {
    if (confirm("هل أنت متأكد من الحذف؟"))
        $(this).closest(".iteminner").remove();
    updateEmptyStates();
});

// Reset the form
function resetForm() {
    editingItems = null;
    $("#titlename,#advtype,#location, #startdate,#enddate,#description,#ProductURL,#fileInputitem").val("");
    $("#previewBox").hide();
    $("#saveBtn").show();
    $("#updateBtn,#cancelBtn").hide();
}

updateEmptyStates();