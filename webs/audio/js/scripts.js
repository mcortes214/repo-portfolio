console.clear();

// VARIABLES GLOBALES

var intervaloSeek = '';
var tiempoTranscurrido = 0;


// Inicializar contexto de Audio Web API
	const AudioContext = window.AudioContext || window.webkitAudioContext;
	const audioCtx = new AudioContext();

//Datos de canción

var reproductor = {
	cancion1: {
		tracks: {
			track1: {
				url: 'https://www.maxicortes.com.ar/webs/audio/audio/sonidos-1.mp3',
				nombre: 'Track 1',
			},
			track2: {
				url: 'https://www.maxicortes.com.ar/webs/audio/audio/sonidos-2.mp3',
				nombre: 'Track 2',
			},
			track3: {
				url: 'https://www.maxicortes.com.ar/webs/audio/audio/sonidos-3.mp3',
				nombre: 'Track 3',
			},
			track4: {
				url: 'https://www.maxicortes.com.ar/webs/audio/audio/sonidos-4.mp3',
				nombre: 'Track 4',
			},
			track5: {
				url: 'https://www.maxicortes.com.ar/webs/audio/audio/sonidos-5.mp3',
				nombre: 'Track 5',
			},
			track6: {
				url: 'https://www.maxicortes.com.ar/webs/audio/audio/sonidos-6.mp3',
				nombre: 'Track 6',
			},
		},
		bus: audioCtx.createGain(),
		nombreCancion: 'jorgito',
		activo: false,
	},
	cancion2: {
		tracks: {
			track1: {
				url: 'https://www.maxicortes.com.ar/webs/audio/audio/sonidos-b1.mp3',
				nombre: 'Track 1',
			},
			track2: {
				url: 'https://www.maxicortes.com.ar/webs/audio/audio/sonidos-b2.mp3',
				nombre: 'Track 2',
			},
			track3: {
				url: 'https://www.maxicortes.com.ar/webs/audio/audio/sonidos-b3.mp3',
				nombre: 'Track 3',
			},
		},
		bus: audioCtx.createGain(),
		nombreCancion: 'pepito',
		activo: false,
	},
};

//Canción activa




//-----------------------------------------
// DOCUMENT READY (ejecución de código)

$(document).ready(function(){

	cancionActiva = reproductor.cancion1;
	//Generar markup HTML dinámico partir de los datos (interfaz y audios)
	generarCanciones();

	// Inicializar rangeslider (visualización de interfaz). Después de generar los sliders
	$('input[type="range"]').rangeslider({
		polyfill: false,
		onSlide: function(){
			moverControl(this.$element[0]); //target del evento
		}
	});

	//Event binding. Hacerlo con delegación!

	$('.boton-cancion').on('click', function () {
		var dataCancion = $(this).attr('data-cancion');
		var selectorSeccionCancion = '.contenedor-cancion[data-cancion="'+ dataCancion +'"]';
		var cancionSeleccionada = $(selectorSeccionCancion);
		$('.boton-cancion').removeClass('activo'); //eliminar el activo de todos los contenedores
		$(this).addClass('activo'); //agregarla a la canción seleccionada
		$('.contenedor-cancion').removeClass('activo'); //eliminar el activo de todos los contenedores
		cancionSeleccionada.addClass('activo'); //agregarla a la canción seleccionada

		cancionActiva = reproductor['cancion'+dataCancion];
 	});

$('#play-button').on('click', function () {
	reproducir(cancionActiva);
});

$('#pause-button').on('click', function () {
	pausar(cancionActiva);
});

$('#stop-button').on('click', function () {
	detener(cancionActiva);
});






});

//-----------------------------------------

// FUNCIONES

//moverControl: esta función evalúa los atributos del slider,
//y decide el funcionamiento del control.

function moverControl(input) {

	var acc= $(input).data('accion');
	if(acc=='volumen-track'){
		var cancion = $(input).data('cancion');
		var track = $(input).data('track');
		reproductor['cancion'+cancion].tracks['track'+track].gainNode.gain.value = input.value;
	}
	else if(acc=='volumen-master'){
		gainNodeMaster.gain.value = input.value;
	}

	else if(acc='delay-time'){
		delay.delayTime.value = input.value;
	}

	else if(acc='delay-feedback'){
		feedback.gain.value = input.value;
	}

	else if(acc='reverb-wet'){
		reverbGain.gain.value = input.value;
	}

	else if(acc="seek"){
		// próximamente
	}

	console.log(acc);
}




function generarCanciones(){
	//Acá metí básicamente todas las cosas que tengan que estar en un loop de canciones o de tracks.
	//Capaz pueda separar esto a futuro.

	// Primero identificar las canciones

	const elementoSelectores = $('#selectores-canciones')[0];
	var cantidadCanciones = Object.keys(reproductor).length;
	var primeraCancion = true;

	//Y por cada canción:
	for(var i=1; i<cantidadCanciones+1; i++){
		var cancionActual = reproductor['cancion'+i];

		//1- Generar un selector
		var nombreCancion = cancionActual.nombreCancion;

		if(primeraCancion){
			$(elementoSelectores).append(
				'<button type="button" class="boton-cancion activo" data-cancion="'+i+'">'+nombreCancion+'</button>'
			);

		}
		else{
			$(elementoSelectores).append(
				'<button type="button" class="boton-cancion" data-cancion="'+i+'">'+nombreCancion+'</button>'
			);
		}

		//2- Generar un contenedor
		const elementoCanales = $('#canales')[0];

		if(primeraCancion){
			$(elementoCanales).append(
				'<div class="contenedor-cancion activo" data-cancion="'+i+'" id="contenedor-cancion-'+i+'"></div>'
			);
		}
		else {
			$(elementoCanales).append(
				'<div class="contenedor-cancion" data-cancion="'+i+'" id="contenedor-cancion-'+i+'"></div>'
			);
		}


		//3- Y generar los canales dentro del contenedor (loop for)

		var elementoContenedorCancionActual = $('#contenedor-cancion-'+i)[0];
		var cantidadTracks = Object.keys(cancionActual.tracks).length;

		for(var j=1; j<cantidadTracks+1; j++){

			//Primero el HTML (sliders y audios),
			var trackActual = cancionActual.tracks['track'+j];
			var linkTrackActual = trackActual.url;
			$(elementoContenedorCancionActual).append(
				'<input type="range" class="rangeslider" data-accion="volumen-track" data-cancion="'+i+'" data-track="'+j+'" id="volumen-cancion-'+i+'-track-'+j+'" min="0" max="2" value="1" step="0.001" data-orientation="vertical">'
				+
				'<audio id="audio-cancion-'+i+'-track-'+j+'" src="'+linkTrackActual+'" crossorigin="anonymous"></audio>'
			);

			//Después generar los Audio Nodes, y vincularlos a un bus
			trackActual['mediaElement'] = $('#audio-cancion-'+i+'-track-'+j)[0];
			trackActual['audioSourceNode'] = audioCtx.createMediaElementSource(trackActual.mediaElement);
			trackActual['gainNode'] = audioCtx.createGain();
			var asn = trackActual.audioSourceNode;
			var bus = cancionActual.bus;
			var gn = trackActual.gainNode;
			asn.connect(gn).connect(bus);

			//Y finalmente vincular el slider de cada track a los audio nodes (event binding)
			var volumeControl = $('#volumen-cancion-'+i+'-track-'+j)[0];

			volumeControl.addEventListener('ValueChange', function() {
				console.log('movimiento');
				console.log('trackActual');
			}, false);
		}

	//Conectar los buses de canción al master gain:
	cancionActual.bus.connect(gainNodeMaster);

	//Vincular un loop al evento de que el primer track termine
	cancionActual.tracks.track1.mediaElement.addEventListener('ended', () => {
		detener(cancionActual);
		reproducir(cancionActual);
	}, false);

	//Y generar un seek bar para esta canción

	// var audio = cancionActual.tracks.track1.mediaElement;
	// $(audio).on('loadedmetadata', function(){
	// 	cancionActual['duracionCancion'] = 's';
	// 	console.log('cargado');
	// });

	// $(elementoContenedorCancionActual).append(
	// 	'<span class="global-control-tag">Seek bar</span>'
	// 	+
	// 	'<input type="range" id="seek-'+cancionActual+'" class="rangeslider" data-accion="seek" data-cancion="'+cancionActual+'" min="0" max="'+''+'" value="0" step="0.001"/>'
	// );

	primeraCancion = false; //reiniciar variable
	}
}



// Audio Nodes de controles master

//Master
const gainNodeMaster = audioCtx.createGain();

//Delay

const delay = audioCtx.createDelay();
const feedback = audioCtx.createGain();
feedback.gain.value = 0.2;
delay.delayTime.value = 0.2;

//Reverb
//Recuperar el archivo de audio por HTTP (así me devuelve un arraybuffer fácilmente)

let reverb = audioCtx.createConvolver();
let reverbGain = audioCtx.createGain();

var source = audioCtx.createBufferSource();
getData();

function getData() {
  var request = new XMLHttpRequest();

  request.open('GET', 'audio/reverb-ir.wav', true);
  request.responseType = 'arraybuffer';


  request.onload = function() {
		console.log('onload...');
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;
				reverb.buffer = source.buffer;
        // source.connect(audioCtx.destination);
        // source.loop = true;
      },

      function(e){ console.log("Error with decoding audio data" + e.err); });

  }

  request.send();
	console.log('Sending HTTP request...');
}


//ROUTEO

//Conectar todos los tracks de las canciones a sus buses
//PRIMERO BYPASSEAR TODO, SACAR EL SONIDO

gainNodeMaster.connect(audioCtx.destination);
gainNodeMaster.connect(delay);
delay.connect(feedback);
feedback.connect(delay);
delay.connect(audioCtx.destination);
gainNodeMaster.connect(reverb);
reverb.connect(reverbGain).connect(audioCtx.destination);




// FUNCIONES de playback (toman un objeto de canción como argumento)

function reproducir(song){
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	var largoCancion = Object.keys(song.tracks).length;
	for(var i=1; i<largoCancion+1; i++){
		var track = song.tracks['track'+i].mediaElement;
		track.play();
	}

	intervaloSeek = setInterval(function(){
		//reproduccion Seek
		tiempoTranscurrido += 0.1;
		console.log(tiempoTranscurrido);
	},100);
}

function pausar(song){
	var largoCancion = Object.keys(song.tracks).length;
	for(var i=1; i<largoCancion+1; i++){
		var track = song.tracks['track'+i].mediaElement;
		track.pause();
	}
}

function detener(song){
	var largoCancion = Object.keys(song.tracks).length;
	for(var i=1; i<largoCancion+1; i++){
		var track = song.tracks['track'+i].mediaElement;
		track.pause();
		track.currentTime = 0;
		tiempoTranscurrido = 0;
	}
}
