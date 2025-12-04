// Check the required fields
function validate(stepId) {
    let valid = true;

    $("#" + stepId + " .req").each(function() {
        if ($(this).val().trim() === "") {
            $(this).next(".error").show();
            valid = false;
        } else {
            $(this).next(".error").hide();
        }
    });

    return valid;
}

// next
$(".next-btn").click(function() {
    let nextStep = $(this).data("next");
    let currentStep = nextStep - 1;

    if (!validate("step-" + currentStep)) return;

    /* ==========================
    ✔ Redirection to the page after the last step
    ========================== */
    if (nextStep == 5) {
        window.location.href = "success.html"; // Place the page you want here
        return;
    }

    // Enable page movement
    $(".step-content").removeClass("active");
    $("#step-" + nextStep).addClass("active");

    // Update the shape of the steps above
    $(".step").removeClass("active");
    $(".step[data-step='" + nextStep + "']").addClass("active");

    $(".step[data-step='" + currentStep + "']").addClass("completed");
});

// previous
$(".prev-btn").click(function() {
    let prevStep = $(this).data("prev");

    $(".step-content").removeClass("active");
    $("#step-" + prevStep).addClass("active");

    $(".step").removeClass("active");
    $(".step[data-step='" + prevStep + "']").addClass("active");
});

$(function() {
    $('.upload-box').each(function() {
        const box = $(this);
        const input = box.find('input[type="file"]');
        const img = box.find('img');
        const btn = box.find('a');
        const span = box.find('span');

        // Drag & Drop
        box.on('dragover', function(e) {
            e.preventDefault();
            box.addClass('dragover');
        });
        box.on('dragleave drop', function(e) {
            e.preventDefault();
            box.removeClass('dragover');
        });
        box.on('drop', function(e) {
            const files = e.originalEvent.dataTransfer.files;
            if (files.length) input[0].files = files;
            input.trigger('change');
        });

        // File selected
        input.on('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    img.attr('src', e.target.result).show();
                    btn.show();
                    span.hide();
                }
                reader.readAsDataURL(file);
            }
        });

        // Delete image
        btn.on('click', function(e) {
            e.stopPropagation();
            img.hide().attr('src', '');
            btn.hide();
            input.val('');
            span.show();
        });
    });
});



/*----------------------------------------
Add  Address
----------------------------------------*/
function updateNoAddress() {
    // Check if there are any address boxes
    const count = $('#outputaddress .item-box').length;
    if (count === 0) {
        $('#no-address').show();
    } else {
        $('#no-address').hide();
    }
}
updateNoAddress();

let editMode = false; // To check if edit mode is active
let currentBox = null; // To store the box being edited

$('#addBtnaddress').click(function() {
    var street = $('#street').val().trim();
    var city = $('#city').val().trim();
    var area = $('#area').val().trim();
    var building = $('#building').val().trim();
    var nearby = $('#nearby').val().trim();

    // Prevent adding empty address

    if (!street || !city || !area || !building || !nearby) {
        alert("Please fill all fields before saving.");
        return;
    }

    // If edit mode → update the existing box
    if (editMode) {
        currentBox.find('.street').text(street);
        currentBox.find('.city').text(city);
        currentBox.find('.area').text(area);
        currentBox.find('.building').text(building);
        currentBox.find('.nearby').text(nearby);

        // 🔥 أهم جزء — إيقاف وضع التعديل
        editMode = false;
        currentBox = null;

        // 🔥 إخفاء زرار Cancel
        $('#cancelEdit').hide();

        // 🔥 رجوع زر Add لحالته
        $('#addBtnaddress').text("Add Address");

        // مسح الحقول
        $('#street, #city, #area, #building, #nearby').val("");

        return;
    }

    // Create new address box
    var box = $(`
        <div class="item-box">
            <h4 class="title street">${street}</h4>
            <p class="text">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>
              <span class="city">${city}</span>
            </p>
            <p class="text">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>
              <span class="area">${area}</span>
            </p>
            <p class="text">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>
              <span class="building">${building}</span>
             </p>
            <p class="text">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>
              <span class="nearby">${nearby}</span>
             </p>
             <nav class="btnaction">
                <a class="editBtn" title="Edit">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_404_61660)"> <path d="M7 1.75H2.91667C2.60725 1.75 2.3105 1.87292 2.09171 2.09171C1.87292 2.3105 1.75 2.60725 1.75 2.91667V11.0833C1.75 11.3928 1.87292 11.6895 2.09171 11.9083C2.3105 12.1271 2.60725 12.25 2.91667 12.25H11.0833C11.3928 12.25 11.6895 12.1271 11.9083 11.9083C12.1271 11.6895 12.25 11.3928 12.25 11.0833V7" stroke="#2D2D2D" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M10.7185 1.53126C10.9505 1.2992 11.2653 1.16882 11.5935 1.16882C11.9217 1.16882 12.2364 1.2992 12.4685 1.53126C12.7005 1.76332 12.8309 2.07807 12.8309 2.40626C12.8309 2.73445 12.7005 3.0492 12.4685 3.28126L7.2109 8.53943C7.07238 8.67782 6.90127 8.77913 6.71331 8.83401L5.0374 9.32401C4.9872 9.33865 4.93399 9.33953 4.88334 9.32655C4.83269 9.31358 4.78646 9.28722 4.74949 9.25025C4.71252 9.21328 4.68616 9.16705 4.67319 9.1164C4.66021 9.06575 4.66109 9.01254 4.67573 8.96234L5.16573 7.28643C5.22087 7.09862 5.32237 6.92771 5.4609 6.78943L10.7185 1.53126Z" stroke="#2D2D2D" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <clipPath id="clip0_404_61660"> <rect width="14" height="14" fill="white"/> </clipPath> </defs> </svg>
                </a>
                <a class="deleteBtn" title="Delete">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.83594 6.41663V9.91663" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M8.16406 6.41663V9.91663" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11.0807 3.5V11.6667C11.0807 11.9761 10.9578 12.2728 10.739 12.4916C10.5202 12.7104 10.2235 12.8333 9.91406 12.8333H4.08073C3.77131 12.8333 3.47456 12.7104 3.25577 12.4916C3.03698 12.2728 2.91406 11.9761 2.91406 11.6667V3.5" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M1.75 3.5H12.25" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M4.66406 3.49996V2.33329C4.66406 2.02387 4.78698 1.72713 5.00577 1.50833C5.22456 1.28954 5.52131 1.16663 5.83073 1.16663H8.16406C8.47348 1.16663 8.77023 1.28954 8.98902 1.50833C9.20781 1.72713 9.33073 2.02387 9.33073 2.33329V3.49996" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> </svg>
                </a>
             </nav>
        </div>
    `);
    $('#outputaddress').append(box);

    // Clear inputs after adding
    $('#street, #city, #area, #building, #nearby').val("");

    updateNoAddress();
});

// =========================
// Edit Button
// =========================

$(document).on('click', '.editBtn', function() {

    currentBox = $(this).closest('.item-box');
    $('#street').val(currentBox.find('.street').text());
    $('#city').val(currentBox.find('.city').text());
    $('#area').val(currentBox.find('.area').text());
    $('#building').val(currentBox.find('.building').text());
    $('#nearby').val(currentBox.find('.nearby').text());

    // تشغيل وضع التعديل
    editMode = true;

    // تغيير الأزرار
    $('#addBtnaddress').text("Update Address");
    $('#cancelEdit').show();
});


$('#cancelEdit').click(function() {

    // رجوع للوضع العادي
    editMode = false;
    currentBox = null;

    // مسح الحقول
    $('#street, #city, #area, #building, #nearby').val("");

    // إعادة الأزرار لحالتها
    $('#addBtnaddress').text("Add Address");
    $('#cancelEdit').hide();
});

// =========================
// Delete Button (with Confirm)
// =========================
$(document).on('click', '.deleteBtn', function() {
    // Show confirmation alert before deleting
    if (confirm("Are you sure you want to delete this address?")) {
        $(this).closest('.item-box').remove();
        updateNoAddress();
    }
});


/*----------------------------------------
Add  offers
----------------------------------------*/

let editingItem = null;

// Open the image file
$("#uploadBox").click(() => $("#fileInput").click());

// Display the preview image
$("#fileInput").on("change", function() {
    if (!this.files.length) return;
    let reader = new FileReader();
    reader.onload = e => {
        $("#previewImg").attr("src", e.target.result);
        $("#previewBox").show();
    };
    reader.readAsDataURL(this.files[0]);
});

// remove the image
$("#removeImage").click(() => {
    $("#fileInput").val("");
    $("#previewBox").hide();
    $("#previewImg").attr("src", "");
});

// Update the availability of items and the Offers title
function updateEmptyState() {
    let count = $("#itemsList .item-box").length;
    $("#noItems").toggle(count === 0);
    $("#item-count").text(`(${count})`);
    $(".titleoffers").toggle(count > 0);
}

// Add or edit card
function applyItem(data, item = null) {
    if (item) { // edit
        item.find(".item-name").text(data.productname);
        item.find(".item-category").text(data.category);
        item.find(".item-validuntil").text(data.validuntil);
        item.find(".item-original").text(`${data.original} QAR`);
        item.find(".item-discounted").text(`${data.discounted} QAR`);
        item.find(".item-discount").text(`${data.discount} %`);
        item.find(".item-description").text(data.description || "");
        item.find("img").attr("src", data.img);
        item.find(".stored-productname").val(data.productname);
        item.find(".stored-category").val(data.category);
        item.find(".stored-validuntil").val(data.validuntil);
        item.find(".stored-original").val(data.original);
        item.find(".stored-discounted").val(data.discounted);
        item.find(".stored-discount").val(data.discount);
        item.find(".stored-description").val(data.description || "");
        item.find(".stored-img").val(data.img);




    } else { // Add new
        let id = Date.now();
        $("#itemsList").prepend(`
            <div class="item-box" data-id="${id}">
               <div class="photo"> <img src="${data.img}"></div>
                <div class="item-details">
                    <h4 class="title item-name">${data.productname}</h4>
                    <p class="grocery item-category">${data.category}</p>
                    <p class="text item-validuntil">${data.validuntil}</p>
                    <div class="price">
                        <p class="oldprice item-original"> ${data.original} QAR</p>
                        <p class="newprice item-discounted">${data.discounted} QAR</p>
                        <p class="discount item-discount">${data.discount} %</p>
                    </div>
                    <p class="item-description">${data.description || ""}</p>
                </div>
                 <nav class="btnaction">
                    <a class="edit-btn" title="Edit">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_404_61660)"> <path d="M7 1.75H2.91667C2.60725 1.75 2.3105 1.87292 2.09171 2.09171C1.87292 2.3105 1.75 2.60725 1.75 2.91667V11.0833C1.75 11.3928 1.87292 11.6895 2.09171 11.9083C2.3105 12.1271 2.60725 12.25 2.91667 12.25H11.0833C11.3928 12.25 11.6895 12.1271 11.9083 11.9083C12.1271 11.6895 12.25 11.3928 12.25 11.0833V7" stroke="#2D2D2D" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M10.7185 1.53126C10.9505 1.2992 11.2653 1.16882 11.5935 1.16882C11.9217 1.16882 12.2364 1.2992 12.4685 1.53126C12.7005 1.76332 12.8309 2.07807 12.8309 2.40626C12.8309 2.73445 12.7005 3.0492 12.4685 3.28126L7.2109 8.53943C7.07238 8.67782 6.90127 8.77913 6.71331 8.83401L5.0374 9.32401C4.9872 9.33865 4.93399 9.33953 4.88334 9.32655C4.83269 9.31358 4.78646 9.28722 4.74949 9.25025C4.71252 9.21328 4.68616 9.16705 4.67319 9.1164C4.66021 9.06575 4.66109 9.01254 4.67573 8.96234L5.16573 7.28643C5.22087 7.09862 5.32237 6.92771 5.4609 6.78943L10.7185 1.53126Z" stroke="#2D2D2D" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <clipPath id="clip0_404_61660"> <rect width="14" height="14" fill="white"/> </clipPath> </defs> </svg>
                    </a>
                    <a class="del-btn" title="Delete">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.83594 6.41663V9.91663" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M8.16406 6.41663V9.91663" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M11.0807 3.5V11.6667C11.0807 11.9761 10.9578 12.2728 10.739 12.4916C10.5202 12.7104 10.2235 12.8333 9.91406 12.8333H4.08073C3.77131 12.8333 3.47456 12.7104 3.25577 12.4916C3.03698 12.2728 2.91406 11.9761 2.91406 11.6667V3.5" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M1.75 3.5H12.25" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> <path d="M4.66406 3.49996V2.33329C4.66406 2.02387 4.78698 1.72713 5.00577 1.50833C5.22456 1.28954 5.52131 1.16663 5.83073 1.16663H8.16406C8.47348 1.16663 8.77023 1.28954 8.98902 1.50833C9.20781 1.72713 9.33073 2.02387 9.33073 2.33329V3.49996" stroke="#EF4444" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/> </svg>
                    </a>
                </nav>
                <input type="hidden" class="stored-productname" value="${data.productname}">
                <input type="hidden" class="stored-category" value="${data.category}">
                <input type="hidden" class="stored-validuntil" value="${data.validuntil}">
                <input type="hidden" class="stored-original" value="${data.original}">
                <input type="hidden" class="stored-discounted" value="${data.discounted}">
                <input type="hidden" class="stored-discount" value="${data.discount}">
                <input type="hidden" class="stored-description" value="${data.description || ""}">
                <input type="hidden" class="stored-img" value="${data.img}">
            </div>
        `);
    }
    resetForm();
    updateEmptyState();
}

// Save a new item
$("#saveBtn").click(() => {
    let productname = $("#productname").val().trim();
    let category = $("#category").val().trim();
    let validuntil = $("#validuntil").val().trim();
    let original = $("#original").val().trim();
    let discounted = $("#discounted").val().trim();
    let discount = $("#discount").val().trim();
    let description = $("#description").val().trim();
    let file = $("#fileInput")[0].files[0];
    let url = $("#ProductURL").val().trim();

    if (!productname || !category || !validuntil || !original || !discounted || !discount)
        return alert("Complete the required data");

    if (file) {
        let reader = new FileReader();
        reader.onload = e => applyItem({
            productname,
            category,
            validuntil,
            original,
            discounted,
            discount,
            description,
            img: e.target.result
        });
        reader.readAsDataURL(file);
    } else if (url) {
        applyItem({
            productname,
            category,
            validuntil,
            original,
            discounted,
            discount,
            description,
            img: url
        });
    } else {
        alert("Choose an image or provide an image link");
    }
});

//Modify an item
$(document).on("click", ".edit-btn", function() {
    editingItem = $(this).closest(".item-box");

    let data = {
        productname: editingItem.find(".stored-productname").val(),
        category: editingItem.find(".stored-category").val(),
        validuntil: editingItem.find(".stored-validuntil").val(),
        original: editingItem.find(".stored-original").val(),
        discounted: editingItem.find(".stored-discounted").val(),
        discount: editingItem.find(".stored-discount").val(),
        description: editingItem.find(".stored-description").val(),
        img: editingItem.find(".stored-img").val()
    };

    editingItem.data("original", {...data });

    $("#productname").val(data.productname);
    $("#category").val(data.category);
    $("#validuntil").val(data.validuntil);
    $("#original").val(data.original);
    $("#discounted").val(data.discounted);
    $("#discount").val(data.discount);
    $("#description").val(data.description || "");
    $("#ProductURL").val("");
    $("#previewImg").attr("src", data.img).show();
    $("#saveBtn").hide();
    $("#updateBtn,#cancelBtn").show();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Update the item
$("#updateBtn").click(() => {
    if (!editingItem) return;

    let productname = $("#productname").val().trim();
    let category = $("#category").val().trim();
    let validuntil = $("#validuntil").val().trim();
    let original = $("#original").val().trim();
    let discounted = $("#discounted").val().trim();
    let discount = $("#discount").val().trim();
    let description = $("#description").val().trim();
    let file = $("#fileInput")[0].files[0];
    let url = $("#ProductURL").val().trim();

    if (!productname || !category || !validuntil || !original || !discounted || !discount)
        return alert("Complete the required data");

    let applyUpdate = img => applyItem({
        productname,
        category,
        validuntil,
        original,
        discounted,
        discount,
        description,
        img
    }, editingItem);

    if (file) {
        let reader = new FileReader();
        reader.onload = e => applyUpdate(e.target.result);
        reader.readAsDataURL(file);
    } else if (url) {
        applyUpdate(url);
    } else {
        applyUpdate($("#previewImg").attr("src"));
    }
});

// Cancel modification
$("#cancelBtn").click(() => {
    if (editingItem && editingItem.data("original")) {
        let o = editingItem.data("original");
        editingItem.find(".item-name").text(o.productname);
        editingItem.find(".item-category").text(o.category);
        editingItem.find(".item-validuntil").text(o.validuntil);
        editingItem.find(".item-original").text(`${o.original} QAR`);
        editingItem.find(".item-discounted").text(`${o.discounted} QAR`);
        editingItem.find(".item-discount").text(`${o.discount} %`);
        editingItem.find(".item-description").text(o.description || "");
        editingItem.find("img").attr("src", o.img);
        editingItem.find(".stored-productname").val(o.productname);
        editingItem.find(".stored-category").val(o.category);
        editingItem.find(".stored-validuntil").val(o.validuntil);
        editingItem.find(".stored-original").val(o.original);
        editingItem.find(".stored-discounted").val(o.discounted);
        editingItem.find(".stored-discount").val(o.discount);
        editingItem.find(".stored-description").val(o.description || "");
        editingItem.find(".stored-img").val(o.img);
    }
    resetForm();
    updateEmptyState();
});

// Delete an item
$(document).on("click", ".del-btn", function() {
    if (confirm("Are you sure about deleting it?"))
        $(this).closest(".item-box").remove();
    updateEmptyState();
});

// Reset the form
function resetForm() {
    editingItem = null;
    $("#productname,#category,#validuntil,#original,#discounted,#discount,#description,#ProductURL,#fileInput").val("");
    $("#previewBox").hide();
    $("#saveBtn").show();
    $("#updateBtn,#cancelBtn").hide();
}

updateEmptyState();