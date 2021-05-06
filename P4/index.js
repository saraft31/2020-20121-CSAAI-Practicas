//holo
//lo primero que voy a ahcer es que en el canvas aparezca
//la imagen que selecciono 
console.log('Ejecutando JS...');

//-- Obtener elementos del DOM
//coontexto del canvas
const canvas = document.getElementById('canvas');
const img1 = document.getElementById('image1');
const img2 = document.getElementById('image2')
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizador = document.getElementById('deslizador');

//-- Valor del deslizador
const range_value = document.getElementById('range_value');


//imagen de antes 
var test = new Image(450,300);
test.src = 'pp.jpg';

test.onload = function(){
  canvas.width = test.width;
  canvas.height = test.height;
  ctx.drawImage(test, 0,0);
};

//Selección de imágenes
//cuando pinchas en una imagen
image1.onclick = () => {
    console.log("Imagen 1");
    img1.src="pp.jpg";
}
image2.onclick = () => {
    console.log("Imagen 2");
    img2.src="ww.jpg";
}

//Función de retrollamada de imagen cargada
//una vez pinchado en la imagen la cargo en el canvas 
img1.onload = function(){
    canvas.width = img1.width;
    canvas.height = img1.height;
    ctx.drawImage(img1, 0, 0);
    console.log("Imagen1 ready");
  };

img2.onload = function(){
    canvas.width = img2.width;
    canvas.height = img2.height;
    ctx.drawImage(img2, 0, 0);
    console.log("Imagen2 ready");
};


//-- Funcion de retrollamada del deslizador
deslizador.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    range_value.innerHTML = deslizador.value;
  
    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    
    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
    //-- Obtener el array con todos los píxeles
    let data = imgData.data
  
    //-- Obtener el umbral de rojo del desliador
    umbral = deslizador.value
  
    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbral)
        data[i] = umbral;
    }
  
    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }


console.log("Fin...");


