var map = L.map('map').setView([4.965917443222924, -73.48966839895706], 15); 

// Agregar la capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Agregar controles de Geoman correctamente
map.pm.addControls({
    position: 'topleft',
    drawMarker: false
});
