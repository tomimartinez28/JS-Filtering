// VARIABLES

const resultado = document.querySelector('#resultado');
const year = document.querySelector('#year');
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;


// GENERAR UN OBJETO CON LA BUSQUEDA


const datosBusqueda = {
    marca: '',
    modelo: '',
    year: '',
    minimo: '',
    precio: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// EVENTOS

document.addEventListener('DOMContentLoaded', () => {
    // muestra los autos al cargar
    mostrarAutos(autos); 

    // llena las opciones de los select
    llenarSelect();


});


document.addEventListener('change', (e) => {
    guardarBusqueda(e.target);
    filtrarAuto()
})


// FUNCIONES


function mostrarAutos(autos) {

    // limpia el html previo
    limpiarHTML();

    // comienza a iterar por cada auto que da el resultado del filtro
    autos.forEach( auto => {

        const autoHTML = document.createElement('P');



        const { marca, modelo, year, precio, puertas, color, transmision } = auto;

        autoHTML.textContent = `
            ${marca} - ${modelo} - Año: ${year} - Precio: ${precio} - ${puertas} puertas - Color: ${color} - Transmision: ${transmision}
        
        `;


        // inserta en el html el resultado del filtro
        resultado.appendChild(autoHTML);


    });

};


function limpiarHTML() {
    while (resultado.firstChild) { //mientras haya algo
        resultado.removeChild(resultado.firstChild)
    }
};




// LLENA EL SELECT DE LOS AÑOS
function llenarSelect() {
    for(i = maxYear; i >= minYear; i-- ) {
        const yearHTML = document.createElement('OPTION');
        yearHTML.value = i;
        yearHTML.textContent = i;
        year.appendChild(yearHTML);
    };                                      
}

function guardarBusqueda(referencia) {
    datosBusqueda[referencia.id] = referencia.value;
}




// funcion que filtra en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter ( filtrarTransmision ).filter(  filtrarColor );
    
    if(resultado.length > 0) {
        mostrarAutos(resultado);
    } else {
        mensajeSinResultado();
    };   
};

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    };
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year === parseInt(year);
    };
    return auto;
} 

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if ( minimo ) {
        return auto.precio >= minimo;
    };
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if ( maximo ) {
        return auto.precio <= maximo;
    };
    return auto;
}


function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if ( puertas ) {
        return auto.puertas == puertas;
    };
    return auto;
}


function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if ( transmision ) {
        return auto.transmision === transmision;
    };
    return auto;
}



function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if ( color ) {
        return auto.color === color;
    };
    return auto;
}


function mensajeSinResultado(busqueda) {
        limpiarHTML()
        const mensaje = document.createElement('P')
        mensaje.textContent = 'No hay resultados para su busqueda...'
        resultado.appendChild(mensaje);

}

