console.log("Ejecutando JS...");


// Elementos de la interfaz de la calculadora
display = document.getElementById("display")

exp = document.getElementById("exp")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

// -- Insertar digitos
//-- Crea un array con todos los elementos de la clase cdigito
let digitos = document.getElementsByClassName("digito")
//-- Crea un array con todos los elementos de la clase operacion
//let operacion = document.getElementsByClassName("operacion");


for(i=0; i<digitos.length; i++){
    digitos[i].onclick = (ev) =>{
        digito(ev.target);
    }
}

function digito(button) {
    if(display.innerHTML=="0"){
        display.innerHTML = button.value;
    }else{
        display.innerHTML += button.value;
    }
}


//-- Insertar simbolos
suma.onclick = () => {
  display.innerHTML += "+";
}

resta.onclick = () => {
    display.innerHTML += "-";
}

exp.onclick = () => {
    display.innerHTML += "^";
}

//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}