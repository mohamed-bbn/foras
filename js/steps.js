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
$(function() {
    // Delete the item
    $(document).on('click', '.remove-btn', function() {
        $(this).closest('.address-row').remove();
    });

    //Add a new item
    $('.add-btn').on('click', function() {
        const newRow = `<div class="address-row"><a class="remove-btn">delete</a> <div class="row"> <div class="col-sm-12 field"> <label for="">Store Name <em>*</em></label> <input class="form-control req" type="text" placeholder="Enter street address" onfocus="this.placeholder=''" onblur="this.placeholder='Enter street address'"> <div class="error">This field is required</div> </div> <!-- End field --> <div class="col-sm-6 field"> <label for="">City <em>*</em></label> <input class="form-control req" type="text" placeholder="e.g., Doha" onfocus="this.placeholder=''" onblur="this.placeholder='e.g., Doha'"> <div class="error">This field is required</div> </div> <!-- End field --> <div class="col-sm-6 field"> <label for="">Area <em>*</em></label> <input class="form-control req" type="text" placeholder="e.g., West Bay" onfocus="this.placeholder=''" onblur="this.placeholder='e.g., West Bay'"> <div class="error">This field is required</div> </div> <!-- End field --> <div class="col-sm-6 field"> <label for="">Building Number</label> <input class="form-control" type="text" placeholder="Building number" onfocus="this.placeholder=''" onblur="this.placeholder='Building number'"> </div> <!-- End field --> <div class="col-sm-6 field"> <label for="">Nearby Landmark</label> <input class="form-control" type="text" placeholder="e.g., Near City Center Mall" onfocus="this.placeholder=''" onblur="this.placeholder='e.g., Near City Center Mall'"> </div> <!-- End field --> <div class="col-sm-12 field"> <label for="">Google Maps Link (Optional)</label> <input class="form-control" type="text" placeholder="Paste Google Maps link here" onfocus="this.placeholder=''" onblur="this.placeholder='Paste Google Maps link here'"> </div> <!-- End field --> </div> <!-- End row --> </div>`;
        $('.address-container').append(newRow);
    });
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