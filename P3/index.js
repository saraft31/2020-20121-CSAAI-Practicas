console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 600;
canvas.height = 600;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");
//-- Posiciones iniciales
let xtabla = 260;
let ytabla = 550;
let xbola = 300;
let ybola = 300;

//-- Velocidades del objeto(de la bola)
let velx = 3;
let vely = 1;

//const Estados
const ESTADO = {
  INIT : 0,
  BEGIN: 1,
  JUGANDO : 2,
  FIN : 4,
  WIN : 5
}
let estado = ESTADO.INIT //primer estado el init

function dibujartabla(){
    ctx.beginPath();
    ctx.rect(xtabla, ytabla, 80, 20); //dibujar
    ctx.fillStyle = 'blanchedalmond'; //estilo
    ctx.fill(); //relleno
    ctx.stroke() //dibujar el trazo
  ctx.closePath();
}
function dibujarbola(){
    ctx.beginPath();
    ctx.arc(xbola, ybola, 10, 0, 2 * Math.PI); //dibujar
    ctx.fillStyle = 'yellow'; //estilo
    ctx.fill(); //relleno
    ctx.stroke() //dibuar el trazo
  ctx.closePath();
}
//-- Funcion principal de animacion
function update()
{
    console.log("test");
  //-- Algoritmo de animacion:
  
  //-- movimiento bola
  if (xbola < 10 || xbola >= (canvas.width - 10) ) {
    velx = -velx;
  }if(ybola <= 10 || ybola >= (canvas.height-10 )) {
    vely = -vely;
  }
  //Actualizar la posición
  xbola = xbola + velx;
  ybola = ybola + vely;

  //rebote raqueta
  if (xbola >= xtabla && xbola <= (xtabla + 100) && ybola >= (ytabla - 10) 
        && ybola <=(ytabla + 75)) {
    vely = vely * -1;
    velx = velx * -1;
  }
  
  //Limites raqueta
  if (xtabla < 0) {
    xtabla = 0;
  }
  if (xtabla > 520){
    xtabla = 520;
  }
  
  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

 
    dibujartabla()
    dibujarbola()
  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);

  if (estado == ESTADO.INIT) //defino el estado init
  {   
      xbola = 300;
      ybola = 300;
      velybola = 0;
      velxbola = 0;
      xRaqueta = 260;
      yRaqueta = 550;
    }
}

//mover raqueta
window.onkeydown = (e) => {
    //-- Según la tecla se hace una cosa u otra
    switch (e.key) {
      case "4": //izq
        xtabla = xtabla - 20;
        break;
      case "6": //drch
        xtabla = xtabla + 20;
        break;
    }
  }
//-- ¡Que empiece la función!
update();
