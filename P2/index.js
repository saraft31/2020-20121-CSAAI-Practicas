console.log("Ejecutando JS...");


// Elementos de la interfaz de la calculadora
display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

// -- Insertar digitos
//-- Crea un array con todos los elementos de la clase cdigito
let digitos = document.getElementsByClassName("digito")
//-- Crea un array con todos los elementos de la clase operacion
let operacion = document.getElementsByClassName("operacion");

//--Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2_INIT: 3,
    OP2: 4
};

// variable de estado
// por defecto el valor es el inicial
let estado = ESTADO.INIT;


// bucle que va leyendo cada digito que se pulsa
for(i=0; i<digitos.length; i++){
    digitos[i].onclick = (ev) =>{
        digito(ev.target);
        console.log('ESTADO ${estado}');
    }
}

// bucle que va leyendo cada operación
for(i=0; i<operacion.length; i++){
    operacion[i].onclick = (ev) =>{
        operaciones(ev.target.value);
        console.log('ESTADO ${estado}');
    }
}

function digito(button) {
    if(display.innerHTML=="0"){
        display.innerHTML = button.value;
    }else{
        display.innerHTML += button.value;
    }
}



//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}