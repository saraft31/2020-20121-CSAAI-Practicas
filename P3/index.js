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

//sonidos
const raqueta = new Audio("raqueta.mp3");
const rebote = new Audio("rebote.mp3");
const ladrillo = new Audio("bip6.mp3");
const fallo = new Audio("fallo.mp3");
const fin = new Audio("gameover.mp3");

//botones
const button0 = document.getElementById("button0");
const button = document.getElementById("button");
const button2 = document.getElementById("button2");


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
    ctx.strokeStyle = 'black';//borde negro
    ctx.setLineDash([]); //continua
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
    ctx.strokeStyle = 'black'; //borde negr
    ctx.setLineDash([]); //continua
    ctx.stroke() //dibuar el trazo
  ctx.closePath();
}

function dibujarladrillos(){
  for (b = 0; b < filas*columnas; b++){
      if (arraybloques[b].estado == 1){
          ctx.beginPath();
              ctx.rect(arraybloques[b].x,arraybloques[b].y,anchuraladrillo,alturaladrillo);
              ctx.fillStyle = arraybloques[b].color;
              ctx.strokeStyle = 'black';
              ctx.setLineDash([]);
              ctx.fill();
              ctx.stroke()
          ctx.closePath();
      }
  }
}

function dibujarred(){
    ctx.beginPath();    
    ctx.moveTo( 0, 570);//de este punto 
    ctx.lineTo(600, 570); //a este
    ctx.setLineDash([10, 10]); //discontinua
    ctx.strokeStyle = 'white'; //borde blanco
    ctx.stroke();
  ctx.closePath();
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

function ganas(){
  found = false;
  b = 0; 
  while (found == false && b < filas*columnas){
      if (arraybloques[b].estado == 1){
          found = true;
      }
     b = b + 1;
  }
  if (found == false){
    for (b = 0;  b < columnas*filas; b++){
      arraybloques[b].estado = 1
  }  
  estado = ESTADO.WIN;
}
}

function gameover(){
  if (estado == ESTADO.FIN){
    estado = ESTADO.INIT;
    vidas = 3;
    puntos = 0;
    //esto lo hago para que cuando se reinicien los ladrillos sea cada linea con su color
    for (b = 0; b < 9; b++){
      arraybloques[b].estado = 1;
      arraybloques[b].color = "rgb(21, 248, 218)";
    }
    for (b = 9; b < 18; b++){
      arraybloques[b].estado = 1;
      arraybloques[b].color = "rgb(255, 0, 238)";
    }
    for (b = 18; b < 27; b++){
      arraybloques[b].estado = 1;
      arraybloques[b].color = "rgb(255, 241, 118)";
    }
    for (b = 27; b < 36; b++){
      arraybloques[b].estado = 1;
      arraybloques[b].color = "rgb(255, 174, 250)";
    }
    for (b = 36; b < 45; b++){
      arraybloques[b].estado = 1;
      arraybloques[b].color = "rgb(144, 85, 255)";
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
      rebote.play();
    }if(ybola <= 10 || ybola >= (canvas.height-10 )) {
      vely = -vely;
      rebote.play();
    }
    //Actualizar la posición
    xbola = xbola + velx;
    ybola = ybola + vely;

    //rebote raqueta
    if (xbola >= xtabla - radio && xbola <= (xtabla + 90) &&
    ybola >= (ytabla - radio) && ybola <=(ytabla + 30 - radio)){
      vely = vely * -1;
      raqueta.play();
      
      //velx = velx * -1;//Si pongo los 2 siepre se repiten las mismas trayectorias 
    }
    
    //rebote en lalilios
    for (var b in arraybloques){
      bloque = arraybloques[b];
      if (xbola >= bloque.x && xbola <=(bloque.x + anchuraladrillo + radio) 
          && ybola >= (bloque.y) && ybola <=(bloque.y + alturaladrillo + radio) 
          && bloque.estado == 1){
          bloque.estado = 0; //hace que el bloque desaparezzca cuando lo toca la bola
          vely = vely * -1;
          ladrillo.play();
          //según el color se suma una puntuación distinta
          if (bloque.color == "rgb(144, 85, 255)"){
            puntos = puntos + 1;
          }
          if (bloque.color == "rgb(255, 174, 250)"){
            puntos = puntos + 2;
          }
          if (bloque.color == "rgb(255, 241, 118)"){
            puntos = puntos + 4;
          }
          if (bloque.color == "rgb(255, 0, 238)"){
            puntos = puntos + 8;
          }
          if (bloque.color == "rgb(21, 248, 218)"){
            puntos = puntos + 10;
          }
      }
    }
    
    //limete bola por abajo (pierdes)
    if (ybola > 570){
      estado = ESTADO.INIT;
      vidas = vidas - 1;
      fallo.play();
    }

    //vidas a cero pierdes
    if (vidas == 0){
      estado = ESTADO.FIN;
      fin.play();
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
    dibujarred();
    ganas();
  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);

  if (estado == ESTADO.INIT) //defino el estado init
  {   
      xbola = 300;
      ybola = 500;
      vely = -2;
      velx = 6;
      xRaqueta = 260;
      yRaqueta = 550;
      
    }
  //estado ganas
  if (estado ==  ESTADO.WIN){
    console.log('pene');
    estado = ESTADO.INIT;
  }
}

//mover raqueta
window.onkeydown = (e) => {
    //-- Según la tecla se hace una cosa u otra
    switch (e.key) {
      case "4": //izq
        xtabla = xtabla - 30;
        break;
      case "6": //drch
        xtabla = xtabla + 30;
        break;
      case " ":
        estado = ESTADO.JUGANDO;
      break;
    }
  }
//-- ¡Que empiece la función!

//funcionbotones
button0.onclick = (ev) => {
  estado = ESTADO.JUGANDO;
}
button.onclick = (ev) => {
  xtabla = xtabla - 50;
}
button2.onclick = (ev) => {
  xtabla = xtabla + 50;
}

update();
