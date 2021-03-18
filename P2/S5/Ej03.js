console.log("Ejecutando JS...");

//-- Crear objeto gui, con los elementos de la interfaz gráfica
//-- Al tenerlo agrupado podemos pasarlo como parámetro o asignárselo
//-- a otro objeto
const gui = { //gui=interfaz grafica es el objeto ahora
  display: document.getElementById("display"), //elemento 1 del objeto nombre: valor
  boton: document.getElementById("boton"), //elemento 2 del objeto 
}

//-- Objeto contador: Contiene el valor y el método para incrementarse
const counter = {
  valor: 0, //valor inicial 0 
  inc : function(value) {
    this.valor += value; //this la propiedad valor quiero que me la incrementes
    gui.display.innerHTML = this.valor; //y que me la pases a la interfaz grafica
  }
}

//-- Acciones: Ligar el boton al contador
gui.boton.onclick = () => {
  counter.inc(1) //incrementa de uno en uno si pongo -1 decrementa
}