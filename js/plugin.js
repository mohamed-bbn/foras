$(window).on("load", function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $('.header').addClass("sticky");
        } else {
            if ($(this).scrollTop() < 1) {
                $('.header').removeClass("sticky");
            }
        }
    });

    $(function() {
        const navbarMenu = $("#navbar");
        const overlayMenu = $(".overlay");

        $("#burger, .overlay").click(function() {
            navbarMenu.toggleClass("active");
            overlayMenu.toggleClass("active");
        });

        navbarMenu.on("click", "[data-toggle]", function(e) {
            if (window.innerWidth <= 999) {
                e.preventDefault();
                const $menuDropdown = $(this).parent();

                if ($menuDropdown.hasClass("active")) {
                    $menuDropdown.removeClass("active").find(".submenu").removeAttr("style");
                } else {
                    $(".menu-dropdown.active .submenu").removeAttr("style");
                    $(".menu-dropdown.active").removeClass("active");

                    $menuDropdown.addClass("active");
                    $menuDropdown.find(".submenu").css("max-height", $menuDropdown.find(".submenu")[0].scrollHeight + "px");
                }
            }
        });

        $(window).on("resize", function() {
            if (window.innerWidth > 999) {
                navbarMenu.removeClass("active");
                $(".menu-dropdown.active").removeClass("active").find(".submenu").removeAttr("style");
            }
        });
    });


    $('.cancel').click(function() {
        $('.navbar,.overlay').removeClass("active");
    });
    $(".menu-item").click(function() {
        $(this).addClass("activelink").siblings().removeClass("activelink");
    });

    ////////////////// End show Header

    //  Start Slider Price
    $(function() {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 2000,
            values: [30, 1000],
            animate: true,
            step: 5,
            slide: function(event, ui) {
                $("#amount-min").val(ui.values[0].toLocaleString('en-US'));
                $("#amount-max").val(ui.values[1].toLocaleString('en-US'));
            }
        });
        $("#amount-min").val($("#slider-range").slider("values", 0).toLocaleString('en-US'));
        $("#amount-max").val($("#slider-range").slider("values", 1).toLocaleString('en-US'));
    });
    //  End  Slider Price


    function setActiveClass(parentSelector, childSelector) {
        $(parentSelector).on("click", childSelector, function() {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings().removeClass("active");
            }
        });
    }
    setActiveClass(".pagination", "li a");
    setActiveClass(".listmenu", "a");
    setActiveClass(".baroffers", "a");
    setActiveClass(".scroll-box-wrapper", "a");


    // This function is specific to each element that gets the active class


    const scrollAmount = 100; // Distance per click

    $('.scroll-box-wrapper').each(function() {
        const $wrapper = $(this);
        const $scrollBox = $wrapper.find('.scroll-box');
        const $leftArrow = $wrapper.find('.arrow.left');
        const $rightArrow = $wrapper.find('.arrow.right');

        // Stock update
        function updateArrows() {
            const scrollLeft = $scrollBox.scrollLeft();
            const maxScroll = $scrollBox[0].scrollWidth - $scrollBox.outerWidth();

            $leftArrow.toggleClass('hidden', scrollLeft <= 0);
            $rightArrow.toggleClass('hidden', scrollLeft >= maxScroll - 5);
        }

        // Click on the stock
        $rightArrow.on('click', function() {
            $scrollBox.animate({
                scrollLeft: '+=' + scrollAmount
            }, 400, updateArrows);
        });
        $leftArrow.on('click', function() {
            $scrollBox.animate({
                scrollLeft: '-=' + scrollAmount
            }, 400, updateArrows);
        });

        // Update inventory as you go
        $scrollBox.on('scroll', updateArrows);

        // Dragging with the mouse
        let isDown = false,
            startX, scrollLeft;
        $scrollBox.on('mousedown', function(e) {
            isDown = true;
            $scrollBox.addClass('dragging');
            startX = e.pageX - $scrollBox.offset().left;
            scrollLeft = $scrollBox.scrollLeft();
            e.preventDefault();
        });
        $(document).on('mouseup', function() {
            isDown = false;
            $scrollBox.removeClass('dragging');
        });
        $(document).on('mousemove', function(e) {
            if (!isDown) return;
            const x = e.pageX - $scrollBox.offset().left;
            const walk = (x - startX) * 1.5;
            $scrollBox.scrollLeft(scrollLeft - walk);
            updateArrows();
        });

        // Activate the first time
        updateArrows();
    });

    // This function scroll

    $(".iconfilter").on("click", function() {
        toggleSidebar(true);
    });

    $(".close-sidebar, .overlaybox").on("click", function() {
        toggleSidebar(false);
    });

    function toggleSidebar(show) {
        $(".sidebar, .overlaybox").toggleClass("active", show);
        $("body").toggleClass("no-scroll", show);
    }

    ////////////////////////////////sidebar/////////////////////////////////




    function initializeSlider(selector, options) {
        $(selector)
            .on('init', function() {
                $(this).removeClass('slick-loading').addClass('slick-loaded');
                $(".slider-loader").hide();
            })
            .slick(options);
    }

    initializeSlider(".slider-offers,.slider-arrivals", {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 999, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 450, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });


    initializeSlider(".slider-customer", {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });


    initializeSlider(".slider-blogs", {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });


    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('.scrollTopBtn').addClass('show');
        } else {
            $('.scrollTopBtn').removeClass('show');
        }
    });

    $('.scrollTopBtn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // End Scroll Top





    $(document).on("click", ".qty-btn.plus", function() {
        let $box = $(this).closest(".quantity-box");
        let $input = $box.find(".qty");
        let currentValue = parseInt($input.val()) || 0;
        $input.val(currentValue + 1).trigger("change");
    });

    $(document).on("click", ".qty-btn.minus", function() {
        let $box = $(this).closest(".quantity-box");
        let $input = $box.find(".qty");
        let currentValue = parseInt($input.val()) || 0;
        let min = parseInt($input.attr("min")) || 1;

        if (currentValue > min) {
            $input.val(currentValue - 1).trigger("change");
        }
    });

    /////////////////////////////////////////////////////////////////









    $(".shoppingcart .table").on("click", ".removeitem", function() {
        let $row = $(this).closest("tr"); // الصف اللي هيتشال

        if (confirm("Are you sure you want to delete this item?")) {
            $row.fadeOut(300, function() {
                $(this).remove();

                // نحسب عدد الصفوف اللي فيها بيانات فعلية
                const remainingRows = $(".shoppingcart .table tr").filter(function() {
                    return $(this).find("td").length > 0;
                }).length;

                if (remainingRows === 0) {
                    $(".shoppingcart .empty-message").fadeIn(300); // تظهر الرسالة
                    $(".shoppingcart .item").fadeOut(300); // تختفي العناصر
                }
            });
        }
    });



    $(".toggle-pass").click(function() {
        const input = $("input.pass");
        const isPassword = input.attr("type") === "password";
        input.attr("type", isPassword ? "text" : "password");
        $(".toggle-pass").toggle();
    });
    // End password

    $('.accordion-header').click(function() {
        // إغلاق كل المحتويات
        $('.accordion-content').slideUp();
        $('.accordion-header').removeClass('active');

        // فتح المحتوى الذي تم الضغط عليه
        if (!$(this).next().is(':visible')) {
            $(this).next().slideDown();
            $(this).addClass('active');
        }
    });




    $(document).on('click', '.close-filter', function(e) {
        e.preventDefault(); // منع الانتقال للرابط
        const $filterItem = $(this).parent('a'); // العنصر اللي هيتحذف
        const $container = $filterItem.closest('.itamsfilter'); // الديف الأب

        $filterItem.remove(); // حذف الفلتر

        // لو مفيش أي عناصر a جوا itamsfilter
        if ($container.find('a').length === 0) {
            $container.remove(); // حذف الـ itamsfilter بالكامل
        }
    });



    $('#copy').click(() => {
        const $inp = $('#link');
        $inp.select();
        navigator.clipboard.writeText($inp.val());
    });


    $(".m-bank").click(function() {
        $(".hidebank").slideDown();
    });
    $(".m-cash").click(function() {
        $(".hidebank").slideUp();
    });

    // فتح popup
    $('.iconuser').on('click', function() {
        $('.itemuser, .overlaybox').addClass('active');
        $('body').addClass('no-scroll');

    });
    $('.clos-user, .overlaybox').on('click', function(e) {
        if ($(e.target).is('.overlaybox, .clos-user')) {
            $('.itemuser, .overlaybox').removeClass('active');
            $('body').removeClass('no-scroll');
        }
    });

    // منع إغلاق عند الضغط جوه popup
    $('.itemuser').on('click', function(e) {
        e.stopPropagation();
    });


    $(document).on("click", ".removeitem", function() {
        let $item = $(this).closest(".subitem");

        if (confirm("Are you sure you want to delete this item?")) {
            $item.fadeOut(300, function() {
                $(this).remove();

                // تحقق بعد الحذف هل يوجد عناصر أخرى
                if ($(".subitem").length === 0) {
                    $(".no-items").fadeIn(300);
                }
            });
        }
    });

});


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('.img_prev')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        var img = input.value;
        $('.img_prev').attr('src', img);
    }
}
$(document).ready(function() {
    let editLi = null;

    function updateNoAddressMessage() {
        if ($('#address-list li').length === 0) {
            $('#no-address').show();
        } else { $('#no-address').hide(); }
    }

    function clearInputs() { $('#province,#district,#street,#house-number').val(''); }

    // فتح المودال
    $('#add-address-btn').click(function() {
        editLi = null;
        $('#modal-title').text('Add addres');
        clearInputs();
        $('#address-modal').fadeIn();
    });

    $('.close-btn').click(function() { $('#address-modal').fadeOut(); });
    $('#address-modal').click(function(e) { if (e.target === this) { $(this).fadeOut(); } });

    $('#save-address').click(function() {
        const province = $('#province').val().trim();
        const district = $('#district').val().trim();
        const street = $('#street').val().trim();
        const houseNumber = $('#house-number').val().trim();

        if (!province || !district || !street || !houseNumber) {
            return alert('Please fill in all fields');
        }

        if (editLi) {
            editLi.find('p').eq(0).html('<strong>Governorate:</strong> ' + province);
            editLi.find('p').eq(1).html('<strong>Area:</strong> ' + district);
            editLi.find('p').eq(2).html('<strong>Street:</strong> ' + street);
            editLi.find('p').eq(3).html('<strong>House number:</strong> ' + houseNumber);
        } else {
            const newLi = $(`
                <li>
                    <p><strong>Governorate:</strong> ${province}</p>
                    <p><strong>Area:</strong> ${district}</p>
                    <p><strong>Street:</strong> ${street}</p>
                    <p><strong>House number:</strong> ${houseNumber}</p>
                    <div class="actions">
                        <a class="edit-btn" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 10.6667H11.25M8.625 1.04167C8.85706 0.809602 9.17181 0.67923 9.5 0.67923C9.6625 0.67923 9.82341 0.711237 9.97355 0.773424C10.1237 0.835611 10.2601 0.92676 10.375 1.04167C10.4899 1.15657 10.5811 1.29299 10.6432 1.44312C10.7054 1.59325 10.7374 1.75416 10.7374 1.91667C10.7374 2.07917 10.7054 2.24008 10.6432 2.39021C10.5811 2.54035 10.4899 2.67676 10.375 2.79167L3.08333 10.0833L0.75 10.6667L1.33333 8.33333L8.625 1.04167Z" stroke="#EC008C" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            Edit addres
                        </a>
                        <a class="delete-btn" title="delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                            <path d="M2.83203 15.5C2.3737 15.5 1.98134 15.3368 1.65495 15.0104C1.32856 14.684 1.16536 14.2917 1.16536 13.8333V3H0.332031V1.33333H4.4987V0.5H9.4987V1.33333H13.6654V3H12.832V13.8333C12.832 14.2917 12.6688 14.684 12.3424 15.0104C12.0161 15.3368 11.6237 15.5 11.1654 15.5H2.83203ZM11.1654 3H2.83203V13.8333H11.1654V3ZM4.4987 12.1667H6.16536V4.66667H4.4987V12.1667ZM7.83203 12.1667H9.4987V4.66667H7.83203V12.1667Z" fill="#EC008C"></path>
                            </svg>
                            delete addres
                        </a>
                    </div>
                </li>
            `);
            $('#address-list').append(newLi);
        }

        clearInputs();
        $('#address-modal').fadeOut();
        updateNoAddressMessage();
    });


    function updateNoAddressMessage() {
        if ($('#address-list li').length === 0) {
            $('#no-address').show();
            // لا تحذف ul، خليها موجودة
        } else {
            $('#no-address').hide();
        }
    }


    $(document).on('click', '.delete-btn', function() {
        if (confirm('Are you sure you want to delete this address?')) {
            $(this).closest('li').remove();
            updateNoAddressMessage();
        }
    });

    $(document).on('click', '.edit-btn', function() {
        editLi = $(this).closest('li');
        $('#province').val(editLi.find('p').eq(0).text().split(': ')[1]);
        $('#district').val(editLi.find('p').eq(1).text().split(': ')[1]);
        $('#street').val(editLi.find('p').eq(2).text().split(': ')[1]);
        $('#house-number').val(editLi.find('p').eq(3).text().split(': ')[1]);
        $('#modal-title').text('Edit addres');
        $('#address-modal').fadeIn();
    });

    updateNoAddressMessage();
});