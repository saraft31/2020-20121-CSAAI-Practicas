console.log("Ejecutando JS...");


// Elementos de la interfaz de la calculadora
display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borra_ultimo = document.getElementById("borra_ultimo")
onOFF = document.getElementById("onoff")

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
        digito(ev.target.value);
        console.log(estado, "digito");
    }
}

// bucle que va leyendo cada operación
for(i=0; i<operacion.length; i++){
    operacion[i].onclick = (ev) =>{
        operaciones(ev.target.value);
        console.log(estado, "operacion");
    }
}

//-- Comprobacion de estado de digitos
function digito(boton){
    //-- Segun el estado hacemos una cosa u otra
    if(estado == ESTADO.INIT){
      display.innerHTML = boton;
      estado = ESTADO.OP1;
    }else if (estado == ESTADO.OP1){
      display.innerHTML += boton;
    } else if (estado == ESTADO.OPERATION) {
      display.innerHTML += boton;
      estado = ESTADO.OP2_INIT;
    }else if (estado == ESTADO.OP2_INIT) {
      display.innerHTML +=  boton;
      estado = ESTADO.OP2;
    }else if (estado == ESTADO.OP2){
      display.innerHTML += boton;
    }
  }

//-- Comprobacion de estado de las operaciones
function operaciones(operacion){
    //-- Segun el estado hacemos una cosa u otra
    if (estado != ESTADO.OPERATION) {
      display.innerHTML += operacion;
      estado = ESTADO.OPERATION;
    }
  }


function onoff(){
  currentvalue = document.getElementById('onoff').value;
  document.getElementById("display").style.backgroundColor = "black";
  if(currentvalue == "Off"){
    onOFF.value="On";
    document.getElementById("display").style.backgroundColor =  "rgba(255, 0, 0, 0.705)";
    display.innerHTML = "0";
    estado = ESTADO.INIT;
  }else{
    onOFF.value="Off";
    document.getElementById("display").style.backgroundColor = "black";
  }
}

function play(){
  currentvalue = document.getElementById('onoff').value;
  if(currentvalue == "Off"){
    
  }
}

// Poner el display electronicos
// 

//-- Borra el ultimo digito u operando
borra_ultimo.onclick = (ev) => {
    display.innerHTML = display.innerHTML.slice(0,-1);
    console.log(estado,"borrar digito");
  }

//-- Poner una coma
coma.onclick = () => {
    if(estado == ESTADO.OP1 || estado == ESTADO.OP2_INIT || estado == ESTADO.INIT){
      display.innerHTML += coma.innerHTML;
      estado = ESTADO.OPERATION;
      console.log(estado, "poner coma");
    }
  }

//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
  console.log(estado,"igual");
}

//-- Poner a cero la expresion
clear.onclick = (ev) => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
  console.log(estado,"poner a 0");
}