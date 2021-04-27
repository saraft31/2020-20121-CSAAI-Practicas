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
let radio = 10;

//puntos y vidas inicio
let puntos = 0;
let vidas = 3;

//ladrillos
let xinit = 35;
let yinit = 60;
let xincremento = 60;
let yincremento = 50 ;
let filas = 5;
let columnas = 9;
var arraybloques = new Array(filas*columnas);
var arraycolores = ['rgb(255, 0, 238)', 'rgb(255, 241, 118)' ,'rgb(255, 174, 250)', 'rgb(21, 248, 218)'];
let b = 0;
let alturaladrillo = 20;
let anchuraladrillo = 50;

//-- Velocidades del objeto(de la bola)
let velx = 6;
let vely = -2;

//const Estados
const ESTADO = {
  INIT : 0,
  BEGIN: 1,
  JUGANDO : 2,
  FIN : 4,
  WIN : 5
}
let estado = ESTADO.INIT //primer estado el init

for (i = 0; i < filas; i++){
  for(j = 0; j < columnas; j++){
      var bloque = {
          x : xinit + j * xincremento,
          y : yinit + i * yincremento,
          estado : 1,
          //color : arraycolores[Math.floor(Math.random()*4)] para hacer el color random
      };
      arraybloques[b] = bloque; 
      //console.log(arraybloques[b]);
      b = b + 1; //b es cada posicion del arraybloque
  }
}

//para ponerle un color a cada fila del arraybloque
for (b = 36; b < 45; b++){   
  arraybloques[b].color = "rgb(144, 85, 255)"; 
}
for (b = 27; b < 36; b++){   
  arraybloques[b].color = "rgb(255, 174, 250)"; 
}
for (b = 18; b < 27; b++){   
  arraybloques[b].color = "rgb(255, 241, 118)"; 
}
for (b = 9; b < 18; b++){   
  arraybloques[b].color = "rgb(255, 0, 238)"; 
}
for (b = 0; b < 9; b++){   
  arraybloques[b].color = "rgb(21, 248, 218)"; 
}


function dibujartabla(){
    ctx.beginPath();
    ctx.rect(xtabla, ytabla, 80, 20); //dibujar (x,y, dimensiones)
    ctx.fillStyle = 'blanchedalmond'; //estilo
    ctx.fill(); //relleno
    ctx.stroke() //dibujar el trazo
  ctx.closePath();
}

function dibujarbola(){
    var img = new Image();
    img.src = "bola1.jfif";
    ctx.beginPath();
    ctx.arc(xbola, ybola, radio, 0, 2 * Math.PI); //dibujar (x,y,tamaño,esquinas,angulo,radio)
    ctx.fillStyle = ctx.createPattern(img, "repeat");//estilo
    ctx.fill(); //relleno
    ctx.stroke() //dibuar el trazo
  ctx.closePath();
}

function dibujarladrillos(){
  for (b = 0; b < filas*columnas; b++){
      if (arraybloques[b].estado == 1){
          ctx.beginPath();
              ctx.rect(arraybloques[b].x,arraybloques[b].y,anchuraladrillo,alturaladrillo);
              ctx.fillStyle = arraybloques[b].color;
              ctx.fill();
              ctx.stroke()
          ctx.closePath();
      }
  }
}

function life(){
  ctx.font = "20px Zrnic";
    ctx.fillStyle = 'white'
    ctx.fillText("Vidas:", 20, 30);
    ctx.fillText(vidas, 70, 30);
}

function points(){
  ctx.font = "20px Zrnic";
    ctx.fillStyle = 'white'
    ctx.fillText("Puntos:", 480, 30);
    ctx.fillText(puntos, 570, 30);
}

function gameover(){
  if (estado == ESTADO.FIN){
    estado = ESTADO.INIT;
    vidas = 3;
    puntos = 0;
    for (b= 0; b< columnas*filas; b++){
      arraybloques[b].estado = 1;
    }

  }
}
//-- Funcion principal de animacion
function update(){

    console.log("test");
  //-- Algoritmo de animacion:
  if (estado == ESTADO.JUGANDO){
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
    if (xbola >= xtabla && xbola <= (xtabla + 90) && ybola >= (ytabla - radio) 
          && ybola <=(ytabla + 30)) {
      vely = vely * -1;
      //velx = velx * -1; Si pongo los 2 siepre se repiten las mismas trayectorias 
    }
    
    //rebote en lalilios
    for (var b in arraybloques){
      bloque = arraybloques[b];
      if (xbola >= bloque.x && xbola <=(bloque.x + anchuraladrillo + radio) 
          && ybola >= (bloque.y) && ybola <=(bloque.y + alturaladrillo + radio) 
          && bloque.estado == 1){
          bloque.estado = 0; //hace que el bloque desaparezzca cuando lo toca la bola
          vely = vely * -1;
      }
    }
    
    //limete bola por abajo (pierdes)
    if (ybola > 560){
      estado = ESTADO.INIT;
      vidas = vidas - 1;
    }

    //vidas a cero pierdes
    if (vidas == 0){
      estado = ESTADO.FIN;
    }
  }//cierro llave de if estado = jugando 

  //Limites raqueta (por los lados)
  if (xtabla < 0) {
    xtabla = 0;
  }
  if (xtabla > 520){
    xtabla = 520;
  }
    
  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);


    dibujartabla();
    dibujarbola();
    dibujarladrillos();
    life();
    points();
    gameover();
  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);

  if (estado == ESTADO.INIT) //defino el estado init
  {   
      xbola = 300;
      ybola = 500;
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
      case " ":
        estado = ESTADO.JUGANDO;
      break;
    }
  }
//-- ¡Que empiece la función!
update();
