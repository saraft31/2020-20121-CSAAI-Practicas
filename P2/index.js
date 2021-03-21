console.log("Ejecutando JS...");


// Elementos de la interfaz de la calculadora
display = document.getElementById("display")
boton1 = document.getElementById("boton1")
boton2 = document.getElementById("boton2")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

//-- Funciones de retrollamada de los botones
//-- Cada vez que se aprieta un boton se actua
//-- sobre la cadena: añadiendo digito, operador +
//-- poniendo a cero o evaluando la expresión

// -- Insertar digitos
boton1.onclick = () => {
  display.innerHTML += "1";
}

boton2.onclick = () => {
  display.innerHTML += "2";
}

boton3.onclick = () => {
  display.innerHTML += "3";
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