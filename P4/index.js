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





