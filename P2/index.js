console.log("Ejecutando JS...");


// Elementos de la interfaz de la calculadora
display = document.getElementById("display")

suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

// -- Insertar digitos
let digitos = document.getElementsByClassName("digito")

for(i=0; i<digitos.length; i++){
    digitos[i].onclick = (ev) =>{
        digito(ev.target);
    }
}

function digito(button) {
    if(display.innerHTML=="0"){
        display.innerHTML = button.id;
    }else{
        display.innerHTML += button.id;
    }
}


//-- Insertar simbolos
suma.onclick = () => {
  display.innerHTML += "+";
}

resta.onclick = () => {
    display.innerHTML += "-";
  }

//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}