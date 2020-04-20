var img;
var c;
var ctx;
var campoFecha;
var campoCompra;
var campoVenta;

//INICIO

$(document).ready(function(){

  //chequear imagen
  campoFecha = document.getElementById("fecha-hora");
  campoCompra = document.getElementById("precio-compra");
  campoVenta = document.getElementById("precio-venta");
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

  var fecha = campoFecha.value;
  var compra = campoCompra.value;
  var venta = campoVenta.value;

  ctx.font = "500 49px Lato";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(fecha, 80, 560);  //Fecha y hora
  ctx.font = "900 75px Lato";
  ctx.fillText('$'+compra, 390, 810);  //Compra
  ctx.fillText('$'+venta, 320, 895);  //Venta
}

var download = function(){
  image = c.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "Tasa de cambio.png";
  link.href = image;
  link.click();
}
