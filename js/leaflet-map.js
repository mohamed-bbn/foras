 $(window).on("load", function() {


     function toggleView(showMap) {
         if (showMap) {
             $('.mapitem').fadeIn(100, function() {
                 if (typeof map !== 'undefined') {
                     map.invalidateSize();
                 }
                 $(this).find('.scroll-box-wrapper .arrow.right').removeClass('hidden');
                 if ($(this).find('.slider-brands').length) {
                     initializeSlider(".slider-brands", {});
                 }
             });

             $('.item .rowbox, .hideitem').fadeOut(100);
         } else {
             $('.mapitem').fadeOut(100);
             $('.item .rowbox, .hideitem').fadeIn(100);
         }
     }
     $('.showmap').click(() => toggleView(true));
     $('.showlist').click(() => toggleView(false));


     // Set up the map
     if (document.getElementById('map')) {
         var map = L.map('map').setView([25.2854, 51.5310], 11);
     }
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
         ],
         realestate: [
             { id: 101, coords: [25.2854, 51.5310], count: 3 },
             { id: 102, coords: [25.2200, 51.4300], count: 2 },
             { id: 103, coords: [25.2200, 51.5200], count: 4 },
             { id: 104, coords: [25.3300, 51.4500], count: 5 },
             { id: 105, coords: [25.3550, 51.4800], count: 3 },
             { id: 106, coords: [25.4000, 51.6100], count: 2 },
             { id: 107, coords: [25.3900, 51.4200], count: 1 },
             { id: 108, coords: [25.3533, 51.4880], count: 4 }
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




 });