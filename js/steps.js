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




function updateNoAddress() {
    const count = $('#outputaddress .item-box').length;
    if (count === 0) {
        $('#no-address').show();
    } else {
        $('#no-address').hide();
    }
}
updateNoAddress();

$('#addBtnaddress').click(function() {
    var street = $('#street').val().trim();
    var city = $('#city').val().trim();
    var area = $('#area').val().trim();
    var building = $('#building').val().trim();
    var nearby = $('#nearby').val().trim();

    if (street || city || area || building || nearby) {
        var box = $(`
            <div class="item-box">
                <span class="btndelete">&times;</span>
                <h4 class="title">${street}</h4>
                <p class="text"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>${city}</p>
                <p class="text"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>${area}</p>
                <p class="text"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>${building}</p>
                <p class="text"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#727272" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </svg>${nearby}</p>
             </div>
        `);

        $('#outputaddress').append(box);
        updateNoAddress();

        // Clear fields after adding
        $('#street').val('');
        $('#city').val('');
        $('#area').val('');
        $('#building').val('');
        $('#nearby').val('');

        box.find('.btndelete').click(function() {
            if (confirm('Are you sure you want to delete this address?')) {
                box.remove();
                updateNoAddress();
            }
        });
    } else {
        alert('Please fill in at least one of the fields.');
    }
});




$('#photo').change(function() {
    var file = this.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.upload-box .img img').attr('src', e.target.result);
            $('.upload-box .img').show();
            $('.upload-box span').hide();
        }
        reader.readAsDataURL(file);
    }
});

function updateNoItems() {
    const count = $('#output .item-box').length; // Number of items
    if (count === 0) {
        $('#no-items').show(); // Message: No items found
        $('.titleoffers').hide(); // We hide the address
    } else {
        $('#no-items').hide();
        $('.titleoffers').show(); // We display the address
        $('#item-count').text(count); // We display the number of items
    }
}
updateNoItems();

$('#addBtn').click(function() {
    var name = $('#name').val().trim();
    var category = $('#category').val().trim();
    var valid = $('#valid').val().trim();
    var original = $('#original').val().trim();
    var discounted = $('#discounted').val().trim();
    var discount = $('#discount').val().trim();
    var desc = $('#desc').val().trim();
    var product = $('#product').val().trim();
    var photo = $('#photo')[0].files[0];

    if (name && category && valid && original && discounted && discount && desc && product && photo) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var imgSrc = e.target.result;

            var box = $(`
                    <div class="item-box">
                        <a class="btndelete">&times;</a>
                        <div class="photo">
                        <img src="${imgSrc}" alt="Photo">
                        </div>
                        <div class="item-details">
                        <h4 class="title">${name}</h4>
                        <p class="grocery">${category}</p>
                        <p class="text">${valid}</p>
                        <div class="price">
                        <p class="oldprice">QAR ${original}</p>
                        <p class="newprice">QAR ${discounted}</p>
                        <p class="discount">${discount} %</p>
                        </div>
                        <p class="text">${product}</p>
                        <p class="text">${desc}</p>
                        </div>
                    </div>
                `);

            $('#output').append(box);
            updateNoItems();

            // Reformatting fields
            $('#name').val('');
            $('#category').val('');
            $('#valid').val('');
            $('#original').val('');
            $('#discounted').val('');
            $('#discount').val('');
            $('#desc').val('');
            $('#product').val('');

            // Reset image uploader
            $('#photo').val('');
            $('.upload-box .img img').attr('src', '');
            $('.upload-box .img').hide();
            $('.upload-box span').show();

            box.find('.btndelete').click(function() {
                if (confirm('Are you sure you want to remove this item?')) {
                    box.remove();
                    updateNoItems();
                }
            });
        }
        reader.readAsDataURL(photo);
    } else {
        alert('Please fill in all the fields and choose an image.');
    }
});