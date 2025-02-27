document.getElementById("Centroid").addEventListener("click", function() {

    console.log("Vamos a calcular los centroides...");
    detectCentroids();
    })

document.getElementById("Areas").addEventListener("click", function() {
    console.log("Vamos a calcular las áreas...");
    calculateAreas();
    }
)

document.getElementById("Centroid_distance").addEventListener("click", function() {
    console.log("Vamos a calcular la distancia entre centroides...");
    calculateCentroidDistances();
    }
)