console.log('iframe test Howler/WAD - 1.0');





//**---------------------- RECEPCIÓN DEL MENSAJE IFRAME

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  console.log('mensaje recibido');
  gestionarMensaje(event.data);
}

var reproductor = {
}; //Se rellena automáticamente con los datos del embed
//Ver "Generación del objeto de datos"













//**---------------------- GENERACIÓN DEL OBJETO DE DATOS
function gestionarMensaje(datos){
  var objetoDatos = datos.tracks;
  var reverb = datos.reverb;

  audioReverb = reverb;
  // var objetoDatos = event.data; //descomentar esto al final del test

  //loopear por el objeto de datos para cargar la información en el objeto "reproductor"


  for(var i=0; i < Object.keys(objetoDatos).length; i++){
    var key = Object.keys(objetoDatos)[i];
    var tracks = Object.keys(objetoDatos[key]);
    console.log(tracks);
    reproductor['cancion'+(i+1)] = {
      nombreCancion: key,
      bus: audioCtx.createGain(),
      tracks: {}
    }; //generar objeto vacío de canción

    for (var j = 0; j < tracks.length; j++) {
      var trackKey = tracks[j];
      reproductor['cancion'+(i+1)].tracks['track'+(j+1)] = {
        url: objetoDatos[key][trackKey],
      };
    }

}


  console.log(objetoDatos);




//**---------------------- CÓDIGO DEL REPRODUCTOR
