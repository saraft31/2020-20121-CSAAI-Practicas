//----- Obtener elemento de video y configurarlo
let directo = document.getElementById("directo");
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const video3 = document.getElementById("video3");
const boton_video1 = document.getElementById("boton_video1");
const boton_video2 = document.getElementById("boton_video2");
const boton_video3 = document.getElementById("boton_video3");
const boton_test = document.getElementById("boton_test");
const boton_on = document.getElementById("boton_on");
const boton_off = document.getElementById("boton_off");



//-- Establecer las dimensiones de los vídeos
directo.width=420;
directo.height=200;
video1.width=200;  
video1.height=100;
video2.width=200;  
video2.height=100;
video3.width=200;  
video3.height=100;

//-- Imagen de Test usada
const TEST_IMAGE_URL = "text.jpg";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;
video2.poster = TEST_IMAGE_URL;
video3.poster = TEST_IMAGE_URL;

//-- Boton de FUENTES-ON
boton_on.onclick = () => {

 
  //-- Establecer la fuente de la cámara 1
  video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
  video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";
  video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";
  

  //-- Reprodeucimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();
  video2.currentTime = 0;
  video2.play();
  video3.currentTime = 0;
  video3.play();
  

  //-- Y en silencio...
  video1.muted = true;
  video2.muted = true;
  video3.muted = true;
  

  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = TEST_IMAGE_URL;
  
};

boton_off.onclick = () => {

    video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
    video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";
    video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";

    directo.poster = TEST_IMAGE_URL;
    
    directo.src = null;
    video1.currentTime = 0;
    video2.currentTime = 0;
    video3.currentTime = 0;
    
    video1.poster = TEST_IMAGE_URL;
    video2.poster = TEST_IMAGE_URL;
    video3.poster = TEST_IMAGE_URL;
}

//-- Botón de Test
boton_test.onclick = () => {
    directo.poster = TEST_IMAGE_URL;
    directo.src = null;
};

//-- Botón de Selección de la cámara 1
boton_video1.onclick = () => {
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    directo.poster=null;
};

// Botón de Selección de la cámara 2
boton_video2.onclick = () => {
    directo.src = video2.src;
    directo.currentTime = video2.currentTime;
    directo.play();
    directo.poster=null;
};

// Botón de Selección de la cámara 3
boton_video3.onclick = () => {
    directo.src = video3.src;
    directo.currentTime = video3.currentTime;
    directo.play();
    directo.poster=null;
};