console.clear();





// instigate our audio context

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();


// load some sound
const audioElementA1 = document.getElementById('audio-a01');
const audioElementA2 = document.getElementById('audio-a02');
const audioElementA3 = document.getElementById('audio-a03');
const audioElementA4 = document.getElementById('audio-a04');
const audioElementA5 = document.getElementById('audio-a05');
const audioElementA6 = document.getElementById('audio-a06');

const audioElementB1 = document.getElementById('audio-b01');
const audioElementB2 = document.getElementById('audio-b02');
const audioElementB3 = document.getElementById('audio-b03');

const trackA1 = audioCtx.createMediaElementSource(audioElementA1);
const trackA2 = audioCtx.createMediaElementSource(audioElementA2);
const trackA3 = audioCtx.createMediaElementSource(audioElementA3);
const trackA4 = audioCtx.createMediaElementSource(audioElementA4);
const trackA5 = audioCtx.createMediaElementSource(audioElementA5);
const trackA6 = audioCtx.createMediaElementSource(audioElementA6);

const trackB1 = audioCtx.createMediaElementSource(audioElementB1);
const trackB2 = audioCtx.createMediaElementSource(audioElementB2);
const trackB3 = audioCtx.createMediaElementSource(audioElementB3);

const playButtonA = document.querySelector('.tape-controls-play-a');
const playButtonB = document.querySelector('.tape-controls-play-b');
const pauseButtonA = document.querySelector('.tape-controls-pause-a');
const pauseButtonB = document.querySelector('.tape-controls-pause-b');



// play pause audio: dos botones
playButtonA.addEventListener('click', function() {
	reproducirA(this);
}, false);

pauseButtonA.addEventListener('click', function() {
	pausarA(this);
}, false);

playButtonB.addEventListener('click', function() {
	reproducirB(this);
}, false);

pauseButtonB.addEventListener('click', function() {
	pausarB(this);
}, false);



// if track ends
//CONSERVAR TAL CUAL. VA A HABER 1 SOLO track QUE SINCRONICE AL PLAYBACK DEL RESTO.

// Loop canción 1

audioElementA1.addEventListener('ended', () => {
	playButtonA.dataset.playing = 'false';
	playButtonA.setAttribute( "aria-checked", "false" );
	//después de cortar la reproducción, volver a iniciarla (loop)
	reproducirA(playButtonA);
}, false);


// Loop canción 2

audioElementB1.addEventListener('ended', () => {
	playButtonB.dataset.playing = 'false';
	playButtonB.setAttribute( "aria-checked", "false" );
	//después de cortar la reproducción, volver a iniciarla (loop)
	reproducirB(playButtonB);
}, false);



// volume
const gainNodeA1 = audioCtx.createGain();
const gainNodeA2 = audioCtx.createGain();
const gainNodeA3 = audioCtx.createGain();
const gainNodeA4 = audioCtx.createGain();
const gainNodeA5 = audioCtx.createGain();
const gainNodeA6 = audioCtx.createGain();

const gainNodeB1 = audioCtx.createGain();
const gainNodeB2 = audioCtx.createGain();
const gainNodeB3 = audioCtx.createGain();

const gainNodeMasterA = audioCtx.createGain();
const gainNodeMasterB = audioCtx.createGain();


// VOLUMEN CANCIÓN 1

const volumeControlA1 = document.getElementById('volume-a1');
volumeControlA1.addEventListener('input', function() {
	gainNodeA1.gain.value = this.value;
}, false);

const volumeControlA2 = document.getElementById('volume-a2');
volumeControlA2.addEventListener('input', function() {
	gainNodeA2.gain.value = this.value;
}, false);

const volumeControlA3 = document.getElementById('volume-a3');
volumeControlA3.addEventListener('input', function() {
	gainNodeA3.gain.value = this.value;
}, false);

const volumeControlA4 = document.getElementById('volume-a4');
volumeControlA4.addEventListener('input', function() {
	gainNodeA4.gain.value = this.value;
}, false);

const volumeControlA5 = document.getElementById('volume-a5');
volumeControlA5.addEventListener('input', function() {
	gainNodeA5.gain.value = this.value;
}, false);

const volumeControlA6 = document.getElementById('volume-a6');
volumeControlA6.addEventListener('input', function() {
	gainNodeA6.gain.value = this.value;
}, false);

const volumeControlMasterA = document.getElementById('volume-master-a');
volumeControlMasterA.addEventListener('input', function() {
	gainNodeMasterA.gain.value = this.value;
}, false);

// VOLUMEN CANCIÓN 2

const volumeControlB1 = document.getElementById('volume-b1');
volumeControlB1.addEventListener('input', function() {
	gainNodeB1.gain.value = this.value;
}, false);

const volumeControlB2 = document.getElementById('volume-b2');
volumeControlB2.addEventListener('input', function() {
	gainNodeB2.gain.value = this.value;
}, false);

const volumeControlB3 = document.getElementById('volume-b3');
volumeControlB3.addEventListener('input', function() {
	gainNodeB3.gain.value = this.value;
}, false);

const volumeControlMasterB = document.getElementById('volume-master-b');
volumeControlMasterB.addEventListener('input', function() {
	gainNodeMasterB.gain.value = this.value;
}, false);


// connect our graph
trackA1.connect(gainNodeA1).connect(gainNodeMasterA).connect(audioCtx.destination);
trackA2.connect(gainNodeA2).connect(gainNodeMasterA).connect(audioCtx.destination);
trackA3.connect(gainNodeA3).connect(gainNodeMasterA).connect(audioCtx.destination);
trackA4.connect(gainNodeA4).connect(gainNodeMasterA).connect(audioCtx.destination);
trackA5.connect(gainNodeA5).connect(gainNodeMasterA).connect(audioCtx.destination);
trackA6.connect(gainNodeA6).connect(gainNodeMasterA).connect(audioCtx.destination);

trackB1.connect(gainNodeB1).connect(gainNodeMasterB).connect(audioCtx.destination);
trackB2.connect(gainNodeB2).connect(gainNodeMasterB).connect(audioCtx.destination);
trackB3.connect(gainNodeB3).connect(gainNodeMasterB).connect(audioCtx.destination);

// const powerButton = document.querySelector('.control-power');
//
// powerButton.addEventListener('click', function() {
// 	if (this.dataset.power === 'on') {
// 		audioCtx.suspend();
// 		this.dataset.power = 'off';
// 	} else if (this.dataset.power === 'off') {
// 		audioCtx.resume();
// 		this.dataset.power = 'on';
// 	}
// 	this.setAttribute( "aria-checked", state ? "false" : "true" );
// 	console.log(audioCtx.state);
// }, false);

// track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons



// BOTONES DE CANCIÓN

elementosCancion1 = document.getElementsByClassName('elem-cancion-1');
elementosCancion2 = document.getElementsByClassName('elem-cancion-2');

const botonCancion1 = document.getElementById('boton-cancion-1');
const botonCancion2 = document.getElementById('boton-cancion-2');

botonCancion1.addEventListener('click', function() {
	for (var i = 0; i < elementosCancion1.length; i ++) {
    elementosCancion1[i].style.display = 'block';
	}
	for (var i = 0; i < elementosCancion2.length; i ++) {
    elementosCancion2[i].style.display = 'none';
	}
	pausarB(playButtonB);
}, false);

botonCancion2.addEventListener('click', function() {
	for (var i = 0; i < elementosCancion1.length; i ++) {
    elementosCancion1[i].style.display = 'none';
	}
	for (var i = 0; i < elementosCancion2.length; i ++) {
    elementosCancion2[i].style.display = 'block';
	}
	pausarA(playButtonA);
}, false);



function reproducirA(e){
	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
		console.log('audio context resume (A)');
	}

		audioElementA1.play();
		audioElementA2.play();
		audioElementA3.play();
		audioElementA4.play();
		audioElementA5.play();
		audioElementA6.play();
		e.dataset.playing = 'true';
		console.log('play track A');

	// let state = e.getAttribute('aria-checked') === "true" ? true : false;
	// e.setAttribute( 'aria-checked', state ? "false" : "true" );
}

function pausarA(e) {
	// if track is playing pause it

		audioElementA1.pause();
		audioElementA2.pause();
		audioElementA3.pause();
		audioElementA4.pause();
		audioElementA5.pause();
		audioElementA6.pause();
		e.dataset.playing = 'false';
		console.log('pause track A');
}


function reproducirB(e){
	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
		console.log('audio context resume (B)');
	}

		audioElementB1.play();
		audioElementB2.play();
		audioElementB3.play();
		e.dataset.playing = 'true';
		console.log('play track B');

	// let state = e.getAttribute('aria-checked') === "true" ? true : false;
	// e.setAttribute( 'aria-checked', state ? "false" : "true" );
}

function pausarB() {
	audioElementB1.pause();
	audioElementB2.pause();
	audioElementB3.pause();
	e.dataset.playing = 'false';
	console.log('pause track B');
}
