function detectCentroids() {

    drawnLayers.forEach(
       function (layer){

            try{

                let centroid = turf.centroid(layer.toGeoJSON());
                L.geoJSON(centroid, {
                    style: {
                        color: "red",
                        fillColor: "green"
                    }
                }).addTo(map);
                console.log("Centroide detectado: ", centroid);

            }catch(error){

                console.warn("Error al detectar centroides: ", error);

            }
        }
    )
}

function calculateAreas() {
    
    drawnLayers.forEach(
        function (layer) {
            try {

                let area = turf.area(layer.toGeoJSON());
                let centroid = turf.centroid(layer.toGeoJSON());
                
                x = centroid.geometry.coordinates[1];
                y = centroid.geometry.coordinates[0];

                let areaFormatted = area.toFixed(2).toLocaleString("es-ES");

                L.marker([x,y], {
                    icon: L.divIcon(
                        {
                            className: "area_label",
                            html: `<div class="area_marker">Área: ${area.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m²</div>`,
                            iconSize: [150, 40],
                            iconAnchor: [50, 20]
                        }
                    )
                }
                ).addTo(map);
                console.log("Área calculada: ", areaFormatted);

            }catch(error){

                console.warn("Error al calcular áreas: ", error);

            }
        }
    )
}

function calculateCentroidDistances() {
    if (drawnLayers.length < 2) {
        console.warn("No hay suficientes polígonos para calcular la distancia entre centroides.");
        return;
    }

    let centroids = drawnLayers.map(layer => turf.centroid(layer.toGeoJSON()));

    centroids.forEach((centroid, index) => {
        let [lng, lat] = centroid.geometry.coordinates;

        // Agregar un marcador con el número del centroide
        L.marker([lat, lng], {
            icon: L.divIcon({
                className: "centroid_label",
                html: `<div class="centroid-number">${index + 1}</div>`,
                iconSize: [15, 15],
                iconAnchor: [5, 5]
            })
        }).addTo(map);

        console.log(`Centroide ${index + 1}: [${lat}, ${lng}]`);
    });

    for (let i = 0; i < centroids.length; i++) {
        try {
            let centroid1 = centroids[i];
            let centroid2 = centroids[(i + 1) % centroids.length]; // Conectar el último con el primero

            let distance = turf.distance(centroid1, centroid2);
            let distanceFormatted = distance.toFixed(2).toLocaleString("es-ES");

            console.log(`Distancia entre centroides ${i + 1} y ${(i + 2) % centroids.length || 1}: ${distanceFormatted} km`);

            let line = turf.lineString([centroid1.geometry.coordinates, centroid2.geometry.coordinates]);

            L.geoJSON(line, {
                style: { color: "blue", weight: 2 }
            }).addTo(map);

            let midPoint = turf.midpoint(centroid1, centroid2);
            let [midLng, midLat] = midPoint.geometry.coordinates;

            let dx = centroid2.geometry.coordinates[0] - centroid1.geometry.coordinates[0];
            let dy = centroid2.geometry.coordinates[1] - centroid1.geometry.coordinates[1];
            let angle = Math.atan2(dy, dx) * (180 / Math.PI); // Convertir a grados
            
            if (angle > 90 || angle < -90) {
                angle += 180;
            }
            // ** Crear el marcador de distancia con rotación **
            L.marker([midLat, midLng], {
                icon: L.divIcon({
                    className: "distance_label",
                    html: `<div class="distance-marker" style="transform: rotate(${angle}deg);">Distancia: ${distanceFormatted} km</div>`,
                    iconSize: [150, 30],
                    iconAnchor: [50, 15]
                })
            }).addTo(map);

        } catch (error) {
            console.warn("Error al calcular la distancia entre centroides: ", error);
        }
    }
}
