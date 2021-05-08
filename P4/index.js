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

//Constantes de los deslizadores
const desRojo = document.getElementById('rojo');
const desVerde = document.getElementById('verde');
const desAzul = document.getElementById('azul');

//Constantes de los botones
const bGris = document.getElementById('grises');
const bColores = document.getElementById('colores');
const bNegativo= document.getElementById('negativo');

//-- Valor de los deslizadores
const value_rojo = document.getElementById('valueR');
const value_verde = document.getElementById('valueG');
const value_azul = document.getElementById('valueB');

//oculto los deslizadores inicialmente
document.getElementById('sliders').style.display = 'none';


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
    img1.style.border="coral 4px solid";
    img2.style.border="black 2px solid";
    img1.src="pp.jpg";
    document.getElementById('sliders').style.display = 'none';
}
image2.onclick = () => {
    console.log("Imagen 2");
    img2.style.border="coral 4px solid";
    img1.style.border="black 2px solid";
    img2.src="ww.jpg";
    document.getElementById('sliders').style.display = 'none';
}

//Función de retrollamada de imagen cargada
//una vez pinchado en la imagen la cargo en el canvas 
img1.onload = function(){
    img = img1 ;
    canvas.width = img1.width;
    canvas.height = img1.height;
    ctx.drawImage(img1, 0, 0);
    console.log("Imagen1 ready");
    deslizadores();
    
  };

img2.onload = function(){
    img= img2 ;
    canvas.width = img2.width;
    canvas.height = img2.height;
    ctx.drawImage(img2, 0, 0);
    console.log("Imagen2 ready");
    deslizadores();
    
};

function filtroColores(data){
  var umbralR = desRojo.value;
  var umbralG = desVerde.value;
  var umbralB = desAzul.value;
  //-- Filtrar la imagen según el nuevo umbral
  for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR){
        data[i] = umbralR;
      }
      if (data[i+1] > umbralG){
        data[i+1] = umbralG;
      }
      if (data[i+2] > umbralB){
        data[i+2] = umbralB;
      }
    }
}


function deslizadores(){
  
  ctx.drawImage(img, 0,0); //retrollamada de los deslizadores
  
  desRojo.oninput = () => {
    value_rojo.innerHTML = desRojo.value;//muestro el nuevo valor del deslizador
    ctx.drawImage(img, 0,0); //Situo la imagen 1 en el canvas
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);//Obtener la imagen del canvas en pixeles
    let data = imgData.data; //Obtener el array con todos los píxeles
    filtroColores(data); // Obtener el umbral del rojo según del deslizador
    //Insertar imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }

  desVerde.oninput = () => {
    value_verde.innerHTML = desVerde.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    //-- Obtener el umbral del del deslizador
    filtroColores(data);
    ctx.putImageData(imgData, 0, 0);
  }

  desAzul.oninput = () => {
    value_azul.innerHTML = desAzul.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    //-- Obtener el umbral del azul del deslizador
    filtroColores(data);
    ctx.putImageData(imgData, 0, 0);
  }
}


//funcion para poner la imagen en grises
function grises(){
  var grises = 0;
  //ctx.drawImage(img2, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  for (var i = 0; i < data.length; i+=4) {
    grises = (3 * data[i] + 4 * data[i+1] + data[i+2])/8;
    data[i] = grises;
    data[i+1] = grises;
    data[i+2] = grises;
  }
  ctx.putImageData(imgData, 0, 0);
}
//cuando pincho en grises se llama a la funcion grises
bGris.onclick = () => {
  console.log("aplico filtro grises");
  document.getElementById('sliders').style.display = 'none';
  grises();
}
 //para que se desplieguen los deslizadores
bColores.onclick = () => {
  console.log("activo deslizadores");
  document.getElementById('sliders').style.display = 'block';
}

//funcion para negativo
function negativo(){
  //--Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
  //--Obtener el array con todos los píxeles
  let data = imgData.data;
  for (let i = 0; i < data.length; i+=4) {
    //--Calcular RGB complementario
    data[i] = 255 - data[i];
    data[i+1] = 255 - data[i+1];
    data[i+2] = 255 - data[i+2];
  }
  ctx.putImageData(imgData, 0,0);
}

bNegativo.onclick = () =>{
  console.log("aplico filtro negativo");
  document.getElementById('sliders').style.display = 'none';
  negativo();
}


console.log("Fin...");


