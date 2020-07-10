console.log('iframe test Howler - 1.0');

/*
Dependencias:
JQuery                  -- DOM
RangeSlider             -- Interfaz - Sliders
Anthony Terrien Knobs   -- Interfaz - Knobs
*/

/*
En vez de usar variables globales, se usan objetos que representan cada módulo.
Cada uno tiene un namespace que vuelve claro a qué módulo se hace el llamado
de una variable usada para comunicación entre módulos.
Los módulos solo contienen variables (propiedades) y funciones (métodos).

La ejecución del código comienza al final del documento (sección 2).
*/

/*
Listado de módulos:
Mensaje   -- Gestiona la comunicación entre documento principal e iframe.
Canciones -- Almacenar toda la información y lógica de las canciones
Efectos   -- Reverb y delay
Master    -- Master fader
Playback  -- Funcionalidad de Play/pause, Stop, y cambio de canción
*/



//--------










//--       1. Módulos










//*---------------------- COMUNICACIÓN ENTRE IFRAME Y PARENT

var iframe = {

  escucharMensaje: function () {
    return new Promise(function(resolve, reject){

      window.addEventListener("message", receiveMessage, false);

      function receiveMessage(event) {
        console.log('mensaje recibido desde el iframe');
        //capturar los datos recibidos y parsearlos (tracks e IR de reverb)
        datosDeCanciones = event.data;
        canciones.parsearCanciones(datosDeCanciones);
        fx.parsearReverb(datosDeCanciones);
        resolve();
      }

    });
  }

}















//*---------------------- DOCUMENT READY

var doc = {

  ready: function () {
    return new Promise(function(resolve, reject){
      $(document).ready(function() {
        resolve();
      });
    });
  }

}













//*---------------------- CANCIONES

var canciones = {

  reproductor: {},      //Se rellena automáticamente con los datos del embed
                        //Toda la info de todos los canales

  parsearCanciones: function (datos) {
    var objetoTracks = datos.tracks;
    //Loopear a través de las canciones
    var cantidadCanciones = Object.keys(objetoTracks).length;
    for(var i=0; i < cantidadCanciones; i++){
      var nombreCancion = Object.keys(objetoTracks)[i];  //Nombre de la canción
      //generar canción vacía
      reproductor['cancion'+(i+1)] = {
        nombreCancion: nombreCancion,
        tracks: {}
      };
      this.parsearTracksDeCancion(objetoTracks, nombreCancion, i+1);
    }
  },

  parsearTracksDeCancion: function (objetoTracks, nombreCancion, i) {
    var trackKeyList = Object.keys(objetoTracks[nombreCancion]);
    //Loopear tracks de cada canción
    var cantidadDeTracks = trackKeyList.length;
    for (var j = 0; j < cantidadDeTracks; j++) { //rellenar con links de los audios
      var trackKey = trackKeyList[j];
      reproductor['cancion'+(i)].tracks['track'+(j+1)] = {
        url: objetoTracks[nombreCancion][trackKey],
      };

    }
  },

  generarCanciones: function (){
    	// Primero identificar las canciones

    	var cantidadCanciones = Object.keys(reproductor).length;
    	var primeraCancion = true;
    	//Y por cada canción:
    	for(var i=1; i<cantidadCanciones+1; i++){
    		var cancionActual = reproductor['cancion'+i];
        //Generar selectores
        canciones.generarSelectorCancion(cancionActual, primeraCancion, i);
        //Generar contenedores de canales
        canciones.generarContenedorCanales(primeraCancion, i);
        //Generar canales
        canciones.generarCanales(cancionActual, i);
        //InicializarSliders
        canciones.inicializarSlidersCanciones();
      }
    },

  generarCanales: function(cancionActual, i){
    var elementoContenedorCancionActual = $('#contenedor-canales-'+i)[0];
    var cantidadTracks = Object.keys(cancionActual.tracks).length;

    for(var j=1; j<cantidadTracks+1; j++){
      //Primero el HTML (sliders y audios),
      var trackActual = cancionActual.tracks['track'+j];
      var linkTrackActual = trackActual.url;
      $(elementoContenedorCancionActual).append(
        `
        <div class="contenedor-canal">
          <input type="range" class="rangeslider" data-accion="volumen-track" data-cancion="`+i+`" data-track="`+j+`" id="volumen-cancion-`+i+`-track-`+j+`" min="0" max="2" value="1" step="0.001" data-orientation="vertical">
          <audio id="audio-cancion-`+i+`-track-`+j+`" src="`+linkTrackActual+`" crossorigin="anonymous"></audio>
          <div class="contenedor-controles-canal">
            <div class="boton-mute-canal" data-cancion="`+i+`" data-track="`+j+`" id="mute-cancion-`+i+`-track-`+j+`">M</div>
            <div class="boton-solo-canal" data-cancion="`+i+`" data-track="`+j+`" id="solo-cancion-`+i+`-track-`+j+`">S</div>
          </div>
        </div>
        `
      );
    }
  },

  generarContenedorCanales: function(primcancion, i){
    const elementoCanales = $('#canales')[0];
    if(primcancion){
      $(elementoCanales).append(`
        <div class="contenedor-cancion activo" data-cancion="`+i+`" id="contenedor-cancion-`+i+`">
        <div class="contenedor-canales" data-cancion="`+i+`" id="contenedor-canales-`+i+`"></div>
        </div>
        `);
    }
    else {
      $(elementoCanales).append(`
        <div class="contenedor-cancion" data-cancion="`+i+`" id="contenedor-cancion-`+i+`">
        <div class="contenedor-canales" data-cancion="`+i+`" id="contenedor-canales-`+i+`"></div>
        </div>
        `);
    }
  },

  generarSelectorCancion: function(cactual, primcancion, i){
      const elemselec = $('#selectores-canciones')[0];
      var nombreCancion = cactual.nombreCancion;

      if(primcancion){
        $(elemselec).append(
          '<button type="button" class="boton-cancion activo" data-cancion="'+i+'">'+nombreCancion+'</button>'
        );
      }
      else{
        $(elemselec).append(
          '<button type="button" class="boton-cancion" data-cancion="'+i+'">'+nombreCancion+'</button>'
        );
      }
    },

  inicializarSlidersCanciones: function(){
    $('input[type="range"]:not(.seekbar)').rangeslider({
      polyfill: false,
      onSlide: function(){
        // moverControl(this.$element[0]); //target del evento
        console.log('controlmovido');
      }
    });
  }


};












//*---------------------- EFECTOS

var fx = {
  urlIRReverb: '',

  parsearReverb: function() {
    fx.urlIRReverb = datosDeCanciones.reverb;
  },
}






//----------















//--       2. Ejecución











/*Usar promises para acciones que dependen de otras acciones
(ver estructura de iframe.escucharMensaje()).

IMPORTANTE:

Para generar una secuencia de promesas, cada una de las funciones involucradas
debe devolver una promesa con return, igual que la primera.

Todavía no entiendo cómo se aprovecha el poner código dentro y fuera de la
promesa; por ahora poner todo dentro.

Si pongo funciones sin promesa, se ejecutan independientemente después de que
la primera promesa se resuelve.

//https://javascript.info/promise-chaining
*/


iframe.escucharMensaje()
.then(canciones.generarCanciones);


$(document).ready(function(){
  $('.boton-prueba').click(function(){
    console.log('click prueba');
  });
});
