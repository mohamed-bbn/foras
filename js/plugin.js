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
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 767, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        ]
    });

    initializeSlider(".slider-brands2", {
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


    function toggleView(showMap) {
        if (showMap) {
            $('.mapitem').fadeIn(300, function() {
                if (typeof map !== 'undefined') {
                    map.invalidateSize();
                }
                $(this).find('.scroll-box-wrapper .arrow.right').removeClass('hidden');
                if ($(this).find('.slider-brands').length) {
                    initializeSlider(".slider-brands", {
                        dots: true,
                        infinite: true,
                        speed: 1000,
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        responsive: [
                            { breakpoint: 767, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                        ]
                    });
                }
            });

            $('.item .rowbox, .hideitem').fadeOut(100);
        } else {
            $('.mapitem').fadeOut(300);
            $('.item .rowbox, .hideitem').fadeIn(100);
        }
    }
    $('.showmap').click(() => toggleView(true));
    $('.showlist').click(() => toggleView(false));

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

    // Set up the map
    var map = L.map('map').setView([25.2854, 51.5310], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    var markersData = {
        offers: [
            { id: 1, coords: [25.2854, 51.5310], icon: 'images/m-1.png', count: 3 },
            { id: 2, coords: [25.2200, 51.4300], icon: 'images/m-2.jpg', count: 2 },
            { id: 3, coords: [25.2200, 51.5200], icon: 'images/m-3.png', count: 4 },
            { id: 4, coords: [25.3300, 51.4500], icon: 'images/m-4.png', count: 5 },
            { id: 5, coords: [25.3550, 51.4800], icon: 'images/m-5.png', count: 3 },
            { id: 6, coords: [25.4000, 51.6100], icon: 'images/m-6.png', count: 2 },
            { id: 7, coords: [25.3900, 51.4200], icon: 'images/m-2.jpg', count: 1 },
            { id: 8, coords: [25.3533, 51.4880], icon: 'images/m-3.png', count: 4 }
        ],
        stores: [
            { id: 11, coords: [25.2854, 51.5310], icon: 'images/m-6.png', count: 2 },
            { id: 12, coords: [25.2200, 51.4300], icon: 'images/m-5.png', count: 3 },
            { id: 13, coords: [25.2200, 51.5200], icon: 'images/m-3.png', count: 1 },
            { id: 14, coords: [25.3300, 51.4500], icon: 'images/m-4.png', count: 4 },
            { id: 15, coords: [25.3550, 51.4800], icon: 'images/m-5.png', count: 2 },
            { id: 16, coords: [25.4000, 51.6100], icon: 'images/m-6.png', count: 1 },
            { id: 17, coords: [25.3900, 51.4200], icon: 'images/m-5.png', count: 2 },
            { id: 18, coords: [25.3533, 51.4880], icon: 'images/m-1.png', count: 3 }
        ]
    };
    var currentMarkers = [];
    var currentPopup = null;

    function makeHtmlIcon(iconUrl, count) {
        var html = '<div class="html-marker"><div class="marker-circle"><img src="' + iconUrl + '"/><span class="marker-badge">' + count + '</span></div></div>';
        return L.divIcon({
            className: '',
            html: html,
            iconSize: [50, 50],
            iconAnchor: [25, 25]
        });
    }

    function showMarkers(type) {
        $.each(currentMarkers, function(i, m) {
            map.removeLayer(m);
        });
        currentMarkers = [];
        $('#info-box').hide();
        $('#offers-popup').hide();
        if (currentPopup) map.closePopup(currentPopup);

        $.each(markersData[type], function(i, item) {
            var marker = L.marker(item.coords, {
                icon: makeHtmlIcon(item.icon, item.count)
            }).addTo(map);

            if (type === 'offers') {
                marker.on('click', function() {
                    $('#offers-popup').fadeIn(200);
                });
            } else if (type === 'stores') {
                var el = marker._icon;
                $(el).hover(
                    function() {
                        var pos = map.latLngToContainerPoint(item.coords);
                        $('#info-box').css({
                            top: pos.y + 'px',
                            left: pos.x + 'px'
                        }).fadeIn(200);
                    },
                    function() {
                        $('#info-box').fadeOut(100);
                    }
                );
            }
            currentMarkers.push(marker);
        });
    }
    $('#offers-popup .close-btn').click(function() {
        $('#offers-popup').fadeOut(100);
    });

    showMarkers('offers');

    $('.tab-btn').click(function(e) {
        e.preventDefault();
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        showMarkers($(this).data('type'));
    });

    window.onView = function(id) {
        alert('Open view for item id: ' + id);
    }
    window.onDetails = function(id) {
        alert('Open details for item id: ' + id);
    }

    /*----------------------------------------
      LEAFLET MAP INITIALIZATION
    ----------------------------------------*/



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



}); // END window.load