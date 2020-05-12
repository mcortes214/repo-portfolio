console.clear();

function reproducir(e){
	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}

	if (e.dataset.playing === 'false') {
		audioElement1.play();
		audioElement2.play();
		audioElement3.play();
		audioElement4.play();
		audioElement5.play();
		audioElement6.play();
		e.dataset.playing = 'true';
	// if track is playing pause it
} else if (e.dataset.playing === 'true') {
		audioElement1.pause();
		audioElement2.pause();
		audioElement3.pause();
		audioElement4.pause();
		audioElement5.pause();
		audioElement6.pause();
		e.dataset.playing = 'false';
	}

	let state = e.getAttribute('aria-checked') === "true" ? true : false;
	e.setAttribute( 'aria-checked', state ? "false" : "true" );
}

// instigate our audio context

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();


// load some sound
const audioElement1 = document.getElementById('audio-01');
const audioElement2 = document.getElementById('audio-02');
const audioElement3 = document.getElementById('audio-03');
const audioElement4 = document.getElementById('audio-04');
const audioElement5 = document.getElementById('audio-05');
const audioElement6 = document.getElementById('audio-06');
const track1 = audioCtx.createMediaElementSource(audioElement1);
const track2 = audioCtx.createMediaElementSource(audioElement2);
const track3 = audioCtx.createMediaElementSource(audioElement3);
const track4 = audioCtx.createMediaElementSource(audioElement4);
const track5 = audioCtx.createMediaElementSource(audioElement5);
const track6 = audioCtx.createMediaElementSource(audioElement6);

const playButton = document.querySelector('.tape-controls-play');

// play pause audio
playButton.addEventListener('click', function() {

	reproducir(this);

}, false);

// if track ends
//CONSERVAR TAL CUAL. VA A HABER 1 SOLO TRACK QUE SINCRONICE AL PLAYBACK DEL RESTO.
audioElement1.addEventListener('ended', () => {
	playButton.dataset.playing = 'false';
	playButton.setAttribute( "aria-checked", "false" );

	//después de cortar la reproducción, volver a iniciarla
	reproducir(playButton);

}, false);

// volume
const gainNode1 = audioCtx.createGain();
const gainNode2 = audioCtx.createGain();
const gainNode3 = audioCtx.createGain();
const gainNode4 = audioCtx.createGain();
const gainNode5 = audioCtx.createGain();
const gainNode6 = audioCtx.createGain();

const volumeControl1 = document.getElementById('volume-1');
volumeControl1.addEventListener('input', function() {
	gainNode1.gain.value = this.value;
}, false);

const volumeControl2 = document.getElementById('volume-2');
volumeControl2.addEventListener('input', function() {
	gainNode2.gain.value = this.value;
}, false);

const volumeControl3 = document.getElementById('volume-3');
volumeControl3.addEventListener('input', function() {
	gainNode3.gain.value = this.value;
}, false);

const volumeControl4 = document.getElementById('volume-4');
volumeControl4.addEventListener('input', function() {
	gainNode4.gain.value = this.value;
}, false);

const volumeControl5 = document.getElementById('volume-5');
volumeControl5.addEventListener('input', function() {
	gainNode5.gain.value = this.value;
}, false);

const volumeControl6 = document.getElementById('volume-6');
volumeControl6.addEventListener('input', function() {
	gainNode6.gain.value = this.value;
}, false);


//
// // panning
// const pannerOptions = {pan: 0};
// const panner = new StereoPannerNode(audioCtx, pannerOptions);
//
// const pannerControl = document.querySelector('[data-action="panner"]');
// pannerControl.addEventListener('input', function() {
// 	panner.pan.value = this.value;
// }, false);

// connect our graph
track1.connect(gainNode1).connect(audioCtx.destination);
track2.connect(gainNode2).connect(audioCtx.destination);
track3.connect(gainNode3).connect(audioCtx.destination);
track4.connect(gainNode4).connect(audioCtx.destination);
track5.connect(gainNode5).connect(audioCtx.destination);
track6.connect(gainNode6).connect(audioCtx.destination);

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

// Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons
