function saludar() {
    alert('Hola mundo');
}

// forEach
let arreglo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

arreglo.forEach(function (valor, indice) {
    console.log(valor);
});

// map
function calcularCuadrado(valor) {
    return valor ** 2;
}

let cuadrados = arreglo.map(calcularCuadrado);

cuadrados.forEach((valor, indice) => {
    console.log(valor);
});

// filter
function mayor50(valor) {
    return valor > 50;
}

let mayores50 = cuadrados.filter(mayor50);

console.log(mayores50);
console.log(cuadrados.filter(valor => valor > 50));

console.warn('Fin de la clase 2');
console.error('Error en la clase 2');
console.info('Información de la clase 2');

// slice
let parte = arreglo.slice(2, 5);
console.log(parte);
console.info(parte);
console.log(arreglo);
