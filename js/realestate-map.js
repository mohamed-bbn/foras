document.addEventListener("DOMContentLoaded", function() {
    if (typeof L === "undefined" || !document.getElementById('map-realestate')) return;

    var map = L.map('map-realestate').setView([25.2854, 51.5310], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    var markerBox = document.getElementById("marker-box");
    var boxContent = document.getElementById("box-content");
    var closeBtn = document.getElementById("close-box");

    closeBtn.addEventListener("click", function() {
        markerBox.style.display = "none";
    });
    var markers = [
        { id: 101, coords: [25.2854, 51.5310], number: 1 },
        { id: 102, coords: [25.2200, 51.4300], number: 2 },
        { id: 103, coords: [25.2200, 51.5200], number: 3 },
        { id: 104, coords: [25.3300, 51.4500], number: 4 },
        { id: 105, coords: [25.3550, 51.4800], number: 5 },
        { id: 106, coords: [25.4000, 51.6100], number: 6 },
        { id: 107, coords: [25.3900, 51.4200], number: 7 },
    ];

    markers.forEach(function(item) {
        var icon = L.divIcon({
            html: `<div class="itemnumber">${item.number}</div>`, //        
            className: '',
            iconSize: [35, 35],
            iconAnchor: [17, 35]
        });

        var marker = L.marker(item.coords, { icon: icon }).addTo(map);

        marker.on("click", function(e) {
            var pos = map.latLngToContainerPoint(e.latlng);
            markerBox.style.left = (pos.x + 10) + "px";
            markerBox.style.top = (pos.y - 50) + "px";
            markerBox.style.display = "block";

            // boxContent.innerHTML = realestateData[item.id] || "<p>لا توجد بيانات لهذا العقار</p>";
        });
    });

    // -----------------------------
    //     (Drag)
    // -----------------------------

    const box = document.querySelector(".drag-box");

    let isDragging = false;
    let startX;
    let initialLeft;

    function getClientX(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
    }

    function startDrag(e) {
        isDragging = true;
        startX = getClientX(e);
        initialLeft = parseInt(window.getComputedStyle(box).left);
        box.style.cursor = "grabbing";
    }

    function onDrag(e) {
        if (!isDragging) return;

        let deltaX = getClientX(e) - startX;
        box.style.left = initialLeft + deltaX + "px";
    }

    function stopDrag() {
        isDragging = false;
        box.style.cursor = "grab";
    }

    box.addEventListener("mousedown", startDrag);
    box.addEventListener("touchstart", startDrag);

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("touchmove", onDrag);

    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);


});