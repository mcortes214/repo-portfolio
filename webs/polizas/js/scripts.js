console.log('test');

var allText =[];
var allTextLines = [];
var Lines = [];

var txtFile = new XMLHttpRequest();

txtFile.open("GET", "datos-polizas.csv", true);
txtFile.onreadystatechange = function()
{
    allText = txtFile.responseText;
    allTextLines = allText.split(/\r\n|\n/);
};

// document.write(allTextLines);
// document.write(allText);
// document.write(txtFile);



const obtenerListaPolizas = async file => {
    const response = await fetch(file)
    const text = await response.text();
    var splitted = text.split("--- DATOS DE PÓLIZAS ---");
    console.log(splitted);
    var listaPolizas = splitted[0].split("\n");
    var datosPolizas = splitted[1].split("\n");
    //Construir el objeto JSON basePolizas
    parsearListaPolizas(listaPolizas);
    parsearDatosPolizas(datosPolizas);

    generarListaDeEmpresas();
}

function obtenerListaPolizasDesdeCajaDeTexto(){
  var info = $('.info-polizas').val();
  var splitted = info.split("--- DATOS DE PÓLIZAS ---");
  console.log(splitted);
  var listaPolizas = splitted[0].split(/\r\n|\n|\r/);
  console.log(listaPolizas);
  var datosPolizas = splitted[1].split(/\r\n|\n|\r/);
  console.log(datosPolizas);
  //Construir el objeto JSON basePolizas
  parsearListaPolizas(listaPolizas);
  parsearDatosPolizas(datosPolizas);

  generarListaDeEmpresas();
}

function generarListaDeEmpresas() {
  console.log('Generando lista de empresas...');
  for (var i = 0; i < Object.keys(basePolizas).length; i++) {
    empresa = Object.keys(basePolizas)[i];
    $('.seleccion-compania').append(
      '<option value="'+empresa+'">'+empresa+'</option>'
    );
  }
  console.log('Fin de lista de empresas');
}

function rellenarDocumento(poliza) {
  console.log('póliza seleccionada: ');
  console.log(poliza);
}







//Inicio

$(document).ready(function(){

//Eventos

  //Al cargar un archivo

  $('.cargar-archivo').click(function(){
    // obtenerListaPolizas('js/polizas.txt');
    obtenerListaPolizasDesdeCajaDeTexto();
  });




  //Al seleccionar una empresa
  $('.seleccion-compania').on('input', function () {
    console.log('Cambio');
    empresa = this.value;
    polizas = Object.keys(basePolizas[empresa]);
    $('.seleccion-poliza').empty();
    for (var i = 0; i < polizas.length; i++) {
      $('.seleccion-poliza').append(
        '<option value="'+polizas[i]+'">'+polizas[i]+'</option>'
      );
    }

  });

  //Generar página
  $('#generar').click(function(){
    //Ocultar formulario
    $('.overlay-formulario').css({
      'display': 'none'
    });

    //Obtener datos del formulario
    var datosPersonales = $('.campo-datos-personales').val().replace(/\n/g, '<br/>');
    var infoAuto = $('.campo-info-auto').val().replace(/\n/g, '<br/>');
    var accesoriosAuto = $('.campo-accesorios-auto').val().replace(/\n/g, '<br/>');

    var vigencia = $('.seleccion-vigencia').children("option:selected").val(); //numero de meses

    var empresa = $('.seleccion-compania').children("option:selected").val();
    var poliza = $('.seleccion-poliza').children("option:selected").val();
    var objPoliza = basePolizas[empresa][poliza];
    var arrayTexto;
    console.log(objPoliza);
    if(objPoliza.texto){
      arrayTexto = objPoliza.texto;
    }
    else{
      arrayTexto = [];
    }
    cantidadCuotas = $('.seleccion-cantidad-cuotas').children("option:selected").val();
    precioCuotas = $('.precio-cuotas').val();

  //Rellenar DOM página con datos del objeto JSON

    //Datos del resumen
    $('.col-datos').append(datosPersonales);
    $('.col-auto').append(infoAuto);
    $('.col-accesorios').append(accesoriosAuto);

    //Vigencia
    $('.vigencia-poliza-resumen').append(vigencia);
    $('.vigencia-poliza').append(vigencia);

    //Título de la póliza
    $('.titulo-poliza').append(poliza);

    //Datos de pago
    $('.texto-anterior-cuotas').append('Débito en '+cantidadCuotas+' cuotas de');
    $('.costo-poliza').append('$'+precioCuotas);
    $('.precio-final-cuotas').append('Precio final: $'+precioCuotas*cantidadCuotas);

    //Texto
    for (var i = 0; i < arrayTexto.length; i++) {
      $('.terminos-poliza').append('<p>'+arrayTexto[i]+'</p>');
    }

    //Íconos de Cobertura
    if (!$('input.checkbox-RC').is(':checked')) {
      $('.contenedor-icono-RC').css({'display':'none'});
    }
    if (!$('input.checkbox-robo').is(':checked')) {
      $('.contenedor-icono-robo').css({'display':'none'});
    }
    if (!$('input.checkbox-incendio').is(':checked')) {
      $('.contenedor-icono-incendio').css({'display':'none'});
    }
    if (!$('input.checkbox-destruccion').is(':checked')) {
      $('.contenedor-icono-destruccion').css({'display':'none'});
    }

  });





});

var basePolizas = {};

function parsearListaPolizas(str){
  //Flags
  var empresas = false;
  var polizas = false;
  var empresaActiva = "";

  for (var i = 0; i < str.length; i++) {
    var linea = str[i].replace(/\n|\r|\r\n/g, "")


    if (linea == ""){
      continue;
    }

    else if (linea == "EMPRESA:") {
      console.log("empresa!");
      empresas = true;
    }

    else if (linea == "POLIZAS:") {
      console.log("pólizas!");
      polizas = true;
    }

    else if (linea == "-") {
      empresas = false;
    }

    else if (linea == "-----") {
      polizas = false;
    }

    else if(empresas){
      empresaActiva = linea;
      console.log("act: "+empresaActiva);
      basePolizas[linea] = {};
    }

    else if(polizas){
      basePolizas[empresaActiva][linea] = {};
    }
  }
}



function parsearDatosPolizas(str) {
  //Flags
  var empresa = false;
  var empresaActiva = "";
  var poliza = false;
  var polizaActiva = "";
  var costo = false;
  var costoPoliza = "";
  var texto = false;
  var textoPoliza = "";

  console.log("Parseando datos de pólizas...");

  for (var i = 0; i < str.length; i++) {
    var linea = str[i].replace(/\n|\r|\r\n/g, "")

    if (linea == ""){
      continue;
    }

    else if (linea == "EMPRESA:") {
      // console.log("empresa!");
      empresa = true;
    }

    else if (linea == "PÓLIZA:") {
      // console.log("póliza!");
      poliza = true;
    }

    else if (linea == "COSTO:") {
      // console.log("costo!");
      costo = true;
    }

    else if (linea == "TEXTO:") {
      // console.log("texto!");
      texto = true;
    }

    else if (linea == "-" || linea == "-----") {
      // console.log("separador");
      empresa = false;
      poliza = false;
      costo = false;
      texto = false;
    }

    else if (empresa) {
      empresaActiva = linea;
      console.log("Empresa: "+empresaActiva);
    }


    else if (poliza) {
      polizaActiva = linea;
      console.log("Póliza: "+polizaActiva);
      //Si existe una póliza, abrir un nuevo array vacío de texto.
      //Si no, mostrar un error
      if(!basePolizas[empresaActiva]){
        alert('La empresa "'+empresaActiva+'" que figura en datos-polizas.txt no existe en lista-polizas.txt. Revisar que el nombre de la empresa esté escrito de la misma manera en ambos archivos.');
        continue;
      }
      if (!basePolizas[empresaActiva][polizaActiva]) {
        alert('La póliza "'+polizaActiva+'", de la empresa "'+empresaActiva+'", figura en datos-polizas.txt pero no existe en lista-polizas.txt. Revisar que el nombre de la póliza esté escrito de la misma manera en ambos archivos.');
        continue;
      }
        basePolizas[empresaActiva][polizaActiva]['texto'] = [];
    }

    else if (costo) {
      costoPoliza = linea;
      try{
        basePolizas[empresaActiva][polizaActiva]['costo'] = linea;
      }
      catch(e){continue;}
      console.log("Costo: "+costoPoliza);
    }

    else if (texto) {
      textoPoliza = linea;
      try{
        basePolizas[empresaActiva][polizaActiva]['texto'].push(linea);
      }
      catch(e){continue;}
      console.log("Línea de texto: "+textoPoliza);
    }


  }
}
