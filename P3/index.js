console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 600;
canvas.height = 600;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");
//-- Posición del elemento a animar
let xtabla = 260;
let ytabla = 550;
let xbola = 300;
let ybola = 300;

//-- Velocidades del objeto(de la bola)
let velx = 3;
let vely = 1;

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
  if (xbola < 0 || xbola >= (canvas.width - 20) ) {
    velx = -velx;
  }if(ybola <= 0 || ybola > 600) {
    vely = -vely;
  }
  //-- Actualizar la posición
  xbola = xbola + velx;
  ybola = ybola + vely;

  
  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

 
    dibujartabla()
    dibujarbola()
  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();
