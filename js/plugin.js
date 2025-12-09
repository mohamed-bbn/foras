$(window).on("load", function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 42) {
            $('.header').addClass("sticky");
        } else {
            if ($(this).scrollTop() < 1) {
                $('.header').removeClass("sticky");
            }
        }
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $('.headermall').addClass("sticky");
        } else {
            if ($(this).scrollTop() < 1) {
                $('.headermall').removeClass("sticky");
            }
        }
    });


    /*----------------------------------------
      HEADER STICKY ON SCROLL
    ----------------------------------------*/

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

    /*----------------------------------------
      NAVBAR TOGGLE (Burger Menu)
    ----------------------------------------*/

    $('.cancel').click(function() {
        $('.navbar,.overlay').removeClass("active");
    });
    // Close navbar

    $(".menu-item").click(function() {
        $(this).addClass("activelink").siblings().removeClass("activelink");
    });

    // Active menu item highlight

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

    /*----------------------------------------
      PRICE RANGE SLIDER (jQuery UI)
    ----------------------------------------*/


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
    setActiveClass(".scroll-box-wrapper .listlinks", "a");
    setActiveClass(".listreale");
    setActiveClass(".listcategory", "a");
    setActiveClass(".listmenuuser", "a");
    setActiveClass(".mallproducts", ".minhead .flex a");
    setActiveClass(".listactions", "a");
    setActiveClass(".itembar", "a");
    /*----------------------------------------
      ACTIVE CLASS HANDLER
    ----------------------------------------*/


    const scrollAmount = 400; //        

    function initScrollBoxes() {
        $('.scroll-box-wrapper').each(function() {
            const $wrapper = $(this);
            const $scrollBox = $wrapper.find('.scroll-box');
            const $leftArrow = $wrapper.find('.arrow.left');
            const $rightArrow = $wrapper.find('.arrow.right');

            function updateArrows() {
                const scrollLeft = $scrollBox.scrollLeft();
                const maxScroll = $scrollBox[0].scrollWidth - $scrollBox.outerWidth();

                if (maxScroll > 5) {
                    $rightArrow.removeClass('hidden');
                } else {
                    $rightArrow.addClass('hidden');
                }

                $leftArrow.toggleClass('hidden', scrollLeft <= 0);
                $rightArrow.toggleClass('hidden', scrollLeft >= maxScroll - 5);
            }

            $rightArrow.off('click').on('click', function() {
                $scrollBox.animate({ scrollLeft: '+=' + scrollAmount }, 400, updateArrows);
            });

            $leftArrow.off('click').on('click', function() {
                $scrollBox.animate({ scrollLeft: '-=' + scrollAmount }, 400, updateArrows);
            });

            $scrollBox.off('scroll').on('scroll', updateArrows);

            let isDown = false,
                startX, scrollLeft;
            $scrollBox.off('mousedown').on('mousedown', function(e) {
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

            const images = $scrollBox.find('img');
            if (images.length > 0) {
                let loaded = 0;
                images.each(function() {
                    if (this.complete) {
                        loaded++;
                    } else {
                        $(this).on('load', function() {
                            loaded++;
                            if (loaded === images.length) {
                                updateArrows();
                            }
                        });
                    }
                });
                if (loaded === images.length) updateArrows();
            } else {
                updateArrows();
            }
            setTimeout(updateArrows, 500);
        });
    }

    initScrollBoxes();
    $(window).on('resize', function() {
        initScrollBoxes();
    });

    /*----------------------------------------
      HORIZONTAL SCROLL BOXES (with drag)
    ----------------------------------------*/

    $(".iconfilter,.iconuser").on("click", function() {
        toggleSidebar(true);
    });

    $(".close-sidebar, .overlaybox").on("click", function() {
        toggleSidebar(false);
    });

    function toggleSidebar(show) {
        $(".sidebar, .overlaybox,.listmenuuser").toggleClass("active", show);
        $("body").toggleClass("no-scroll", show);
    }

    /*----------------------------------------
       SIDEBAR TOGGLE
     ----------------------------------------*/


    function initializeSlider(selector, options) {
        $(selector)
            .on('init', function() {
                $(this).removeClass('slick-loading').addClass('slick-loaded');
                $(".slider-loader").hide();
            })
            .slick(options);
    }

    initializeSlider(".slider-brands", {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 12,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 10, slidesToScroll: 1 } },
            { breakpoint: 999, settings: { slidesToShow: 8, slidesToScroll: 1 } },
            { breakpoint: 767, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        ]
    });

    initializeSlider(".slider-offers", {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 999, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 550, settings: { slidesToShow: 1, slidesToScroll: 1 } },

        ]
    });

    initializeSlider(".slider-sales,.slider-deals", {
        dots: true,
        infinite: true,
        speed: 1000,
        adaptiveHeight: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 999, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 550, settings: { slidesToShow: 1, slidesToScroll: 1 } },

        ]
    });

    initializeSlider(".slider-realestate", {
        dots: true,
        infinite: true,
        speed: 1000,
        adaptiveHeight: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 999, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 650, settings: { slidesToShow: 1, slidesToScroll: 1 } },

        ]
    });


    /*----------------------------------------
      TOGGLE LIST / MAP VIEW
    ----------------------------------------*/


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

    /*----------------------------------------
         SCROLL TO TOP BUTTON
       ----------------------------------------*/


    $('.addfavorite').click(function() {
        $(this).toggleClass('active');
    });

    /*----------------------------------------
       FAVORITE TOGGLE
     ----------------------------------------*/


    function makeTimer() {
        $(".counter").each(function() {
            let endTime = $(this).data("end");
            if (!endTime) return;

            let end = Date.parse(endTime) / 1000;
            let now = Date.parse(new Date()) / 1000;
            let timeLeft = end - now;

            if (timeLeft < 0) timeLeft = 0;

            let days = Math.floor(timeLeft / 86400);
            let hours = Math.floor((timeLeft % 86400) / 3600);
            let minutes = Math.floor((timeLeft % 3600) / 60);
            let seconds = Math.floor(timeLeft % 60);

            if (hours < 10) hours = "0" + hours;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;

            $(this).find(".days").text(days);
            $(this).find(".hours").text(hours);
            $(this).find(".minutes").text(minutes);
            $(this).find(".seconds").text(seconds);
        });
    }
    setInterval(makeTimer, 1000);

    /*----------------------------------------
      COUNTDOWN TIMER
    ----------------------------------------*/


    $(".toggle-pass").click(function() {
        const parent = $(this).closest(".position-relative");
        const input = parent.find("input.pass");
        const isPassword = input.attr("type") === "password";
        input.attr("type", isPassword ? "text" : "password");
        parent.find(".eye, .eye-slash").toggle();
    });

    /*----------------------------------------
      SHOW / HIDE PASSWORD
    ----------------------------------------*/

    $('.accordion-header').click(function() {
        $('.accordion-content').slideUp();
        $('.accordion-header').removeClass('active');
        if (!$(this).next().is(':visible')) {
            $(this).next().slideDown();
            $(this).addClass('active');
        }
    });

    /*----------------------------------------
      ACCORDION TOGGLE
    ----------------------------------------*/


    $('.copy-btn').click(function() {
        const text = $(this).siblings('.copy-text').text(); //
        navigator.clipboard.writeText(text).then(() => {
            $(this).text('Copied!'); //      
            setTimeout(() => $(this).text('Copy Code'), 1500);
        });
    });

    /*----------------------------------------
       COPY TO CLIPBOARD
     ----------------------------------------*/


    $(function() {
        $(".store-select").each(function() {
            const $select = $(this);
            const $header = $select.find(".ss-header");
            const $panel = $select.find(".ss-panel");
            const $list = $select.find(".ss-list");
            const $title = $select.find(".title p");
            const $pill = $select.find(".pill");

            $header.on("click", function(e) {
                e.stopPropagation();
                $(".store-select").not($select).removeClass("active");
                $(".store-select .ss-panel").not($panel).removeClass("open");
                $panel.toggleClass("open");
                if ($panel.hasClass("open")) {
                    $select.addClass("active");
                } else {
                    $select.removeClass("active");
                }
            });

            $list.on("click", ".ss-item", function(e) {
                e.stopPropagation();
                $list.find(".ss-item").removeClass("active");
                $(this).addClass("active");

                const name = $(this).find(".name").text().trim();
                $title.text(name.length > 12 ? name.slice(0, 12) + "…" : name);
                $pill.text(name.length > 12 ? name.slice(0, 12) + "…" : name);
                $panel.removeClass("open");
                $select.removeClass("active");
            });
        });

        $(document).on("click", function() {
            $(".store-select .ss-panel").removeClass("open");
            $(".store-select").removeClass("active");
        });
    });

    /*----------------------------------------
       Select Stores
     ----------------------------------------*/


    $('.showgrid, .showlist').on('click', function() {
        const isGrid = $(this).hasClass('showgrid');
        $(".item-realestate .rowbox").toggleClass('active', isGrid);
    });

    /*----------------------------------------
       Realestate grid
     ----------------------------------------*/


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

    /*----------------------------------------
       Quantity
     ----------------------------------------*/


    $('.realefilter').click(function() {
        $(this).next('.des-form').slideToggle(200);
        $(this).find('.icon').toggle();
    });

    /*----------------------------------------
       Filter Realestate
     ----------------------------------------*/



    $('.slider-box').each(function() {

        const sliderId = $(this).data('slider');
        const $slider = $(this);
        const $slides = $slider.find('.slide');

        const $thumbsWrapper = $('.thumbs-box[data-slider="' + sliderId + '"]');
        const $thumbsContainer = $thumbsWrapper.find('.thumbs');
        const $thumbLeft = $thumbsWrapper.find('.thumb-arrow.left');
        const $thumbRight = $thumbsWrapper.find('.thumb-arrow.right');

        let currentIndex = 0;
        const total = $slides.length;
        const thumbWidth = 250;

        // Create thumbnails
        $slides.each(function(i) {
            const thumbImg = $(this).find('img').clone();
            const $thumb = $('<span data-index="' + i + '"></span>').append(thumbImg);
            $thumbsContainer.append($thumb);
        });

        const $allThumbs = $thumbsContainer.find('span');
        $allThumbs.eq(0).addClass('active');

        function getThumbVisible() {
            return Math.floor($thumbsWrapper.width() / thumbWidth);
        }

        if (total > getThumbVisible()) {
            $thumbsWrapper.addClass('show-thumbs-arrows');
        }

        let thumbPosition = 0;

        function updateSlider(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            currentIndex = index;

            $slides.parent().css('transform', 'translateX(' + (-100 * index) + '%)');

            $allThumbs.removeClass('active')
                .eq(index).addClass('active');

            const thumbVisible = getThumbVisible();

            if (total > thumbVisible) {
                const maxPos = total - thumbVisible;
                thumbPosition = Math.min(
                    Math.max(index - Math.floor(thumbVisible / 2), 0),
                    maxPos
                );
                $thumbsContainer.css('transform', 'translateX(' + (-thumbWidth * thumbPosition) + 'px)');
            }
        }

        // Click thumbnail
        $allThumbs.click(function() {
            updateSlider($(this).data('index'));
        });

        // Main arrows
        $slider.find('.main-arrow.right').click(function() {
            updateSlider(currentIndex + 1);
        });

        $slider.find('.main-arrow.left').click(function() {
            updateSlider(currentIndex - 1);
        });

        // Thumbs arrows
        $thumbRight.click(function() {
            const thumbVisible = getThumbVisible();
            const maxPos = total - thumbVisible;

            if (thumbPosition < maxPos) {
                thumbPosition++;
                $thumbsContainer.css('transform', 'translateX(' + (-thumbWidth * thumbPosition) + 'px)');
            }
        });

        $thumbLeft.click(function() {
            if (thumbPosition > 0) {
                thumbPosition--;
                $thumbsContainer.css('transform', 'translateX(' + (-thumbWidth * thumbPosition) + 'px)');
            }
        });

        // Autoplay
        setInterval(function() {
            updateSlider(currentIndex + 1);
        }, 3000);

    });

    $(function() {
        $('.btnhide').on('click', function() {
            $(this).toggleClass('active');
            $(".thumbs-wrapper.action").toggleClass('show');
        });

        $('.custom-slider').on('click', '.slide', function() {
            $(".overlaybro, .popupbrochure").addClass('active');
            $("body").addClass("no-scroll");
        });

        $('.close-btn, .overlaybro').on('click', function() {
            $(".overlaybro, .popupbrochure").removeClass('active');
            $("body").removeClass("no-scroll");
        });

    });

    /*----------------------------------------
    Slider brochure
    ----------------------------------------*/


    function checkEmpty() {
        if ($(".items-list li").length === 0) {
            $(".top-controls").hide();
            $(".numcart").hide();
            $(".emptyitem").hide();
            $(".empty-message").show();
        }
    }

    // ======Select all ======
    $("#check-all").on("change", function() {
        $(".item-check").prop("checked", $(this).prop("checked"));
    });

    // ======Track any changes to the checkbox item  ======
    $(document).on("change", ".item-check", function() {

        let total = $(".item-check").length;
        let checked = $(".item-check:checked").length;

        // If they were all educated → Sign on the main page
        $("#check-all").prop("checked", total === checked);
    });

    // ====== Delete one item ======
    $(document).on("click", ".delete-btn", function() {

        let li = $(this).closest("li");
        let checkbox = li.find(".item-check");

        if (!checkbox.prop("checked")) {
            alert("This item must be selected first before deletion.");
            return;
        }

        if (!confirm("Do you want to delete this item?")) return;

        li.slideUp(200, function() {
            $(this).remove();
            checkEmpty();
        });
    });

    // ====== Delete selected items ======
    $("#delete-selected").on("click", function() {
        let selected = $(".item-check:checked");
        if (selected.length === 0) {
            alert("An item must be selected first before deletion.");
            return;
        }
        if (!confirm("Do you want to delete the selected items?")) return;
        selected.each(function() {
            $(this).closest("li").slideUp(200, function() {
                $(this).remove();
                checkEmpty();
            });
        });
        $("#check-all").prop("checked", false);
    });

    /*----------------------------------------
    Cart  delete
    ----------------------------------------*/


    $('#copy').click(() => {
        const $inp = $('#link');
        $inp.select();
        navigator.clipboard.writeText($inp.val());
    });

    /*----------------------------------------
    Copy  delete
    ----------------------------------------*/


    $(function() {
        let count = 0;
        $(".comparebtn").on("click", function() {
            $(this).toggleClass("active");

            if ($(this).hasClass("active")) {
                count++;
            } else {
                count--;
                $(this).find(".active").removeClass("active");
            }
            $("#coun").text(count);
            if (count > 0) {
                $(".comparebox").fadeIn();
            } else {
                $(".comparebox").fadeOut();
            }
        });
    });

    $(function() {
        let count = 0;

        $(".compare-btn").on("click", function() {
            $(this).toggleClass("active");

            if ($(this).hasClass("active")) {
                count++;
            } else {
                count--;
                $(this).find(".active").removeClass("active");
            }

            $("#counter").text(count);
            if (count > 0) {
                $(".counter-box").fadeIn();
            } else {
                $(".counter-box").fadeOut();
            }
        });
    });


    $(document).on('click', '.counter-box', function() {
        $('.popupcompare').fadeIn(300);
    });

    $(document).on('click', '.close-btn', function() {
        $('.popupcompare').fadeOut(300);
    });


    $('#items-container').on('click', '.remov-btn', function() {
        const item = $(this).parent();

        if (confirm('Are you sure you want to delete this item?')) {
            item.fadeOut(300, function() {
                $(this).remove();
            });
        }
    });

    $('.clearall').click(function() {
        if (confirm('Are you sure you want to delete all items?')) {
            $('#items-container .compitem').fadeOut(300, function() {
                $(this).remove();
                $(".innercontant .alert").fadeOut(300);
                $(".allcompare").fadeOut(300);
            });
        }
    });

    $(document).on('click', '.showstores', function() {
        $('.hideoffer').fadeOut(300);
        $('.hidestores').fadeIn(300);
    });

    $(document).on('click', '.showoffer', function() {
        $('.hideoffer').fadeIn(300);
        $('.hidestores').fadeOut(300);
    });


    /*----------------------------------------
       COMPARISON POPUP
     ----------------------------------------*/


    $(".deleteitem").on("click", function() {
        let item = $(this).closest(".subfavorite");
        if (confirm("Are you sure you want to delete it?")) {

            item.fadeOut(200, function() {
                item.remove();
                if ($(".subfavorite").length === 0) {
                    $(".empty-message").fadeIn(300);
                }
            });
        }
    });

    /*----------------------------------------
       Delete Favorite
     ----------------------------------------*/


}); // END window.load



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