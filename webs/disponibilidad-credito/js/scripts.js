var img;
var c;
var ctx;
var campoNombre;
var campoGenero;

//INICIO

$(document).ready(function(){

  //chequear imagen
  campoGenero = document.getElementById("genero");
  campoNombre = document.getElementById("nombre");
  img = document.getElementById('img-fondo');

  if (img.complete) {
    loaded();
  }

  else {
    img.addEventListener('load', loaded);
    img.addEventListener('error', function() {
        alert('error');
    });
  }


  //EVENTOS

  $('#siguiente').click(function(){
    cargarTexto();
  });

  $('#descargar').click(function(){
    download();
  });

}); //fin document.setup







function loaded() { //Cuando todo está completamente cargado
  setupCanvas();
}

function setupCanvas(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);
}


function cargarTexto(){
  ctx.drawImage(img, 0, 0);

  var nombre = campoNombre.value;
  var gen = campoGenero.value;

  var titulo;
  if (gen=='hombre'){
    titulo = 'Sr.';
  }
  else{
    titulo = 'Sra.';
  }


  ctx.font = "bold 39px Raleway";
  ctx.fillStyle = "#222";
  ctx.fillText(titulo+' '+nombre+':', 114, 280);  //Título y Nombre
}

var download = function(){
  image = c.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = campoNombre.value+".png";
  link.href = image;
  link.click();
}
