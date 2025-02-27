var map = L.map('map').setView([4.965917443222924, -73.48966839895706], 15); 

// Agregar la capa de OpenStreetMap 
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Agregar controles de Geoman correctamente
map.pm.addControls({
    position: 'topleft',
    drawCircle: false
})


let drawnLayers = [];
let intersectionsLayers = []


// Manejadores de eventos

map.on("pm:create", function(e) {
    let myLayer = e.layer;

    // Si es un polígono, agregarlo al arreglo drawnLayers
    if (myLayer instanceof L.Polygon) {
        drawnLayers.push(myLayer); // Se corrigió el nombre de la variable
        console.info("Se ha creado un polígono");
    }
})

map.on("pm:remove", function(e) {

    drawnLayers = drawnLayers.filter((layer) => layer != e.layer);
    console.log("Se ha eliminado un polígono");
}

)

