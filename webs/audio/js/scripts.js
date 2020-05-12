console.clear();

// instigate our audio context

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();


// load some sound
const audioElement1 = document.getElementById('audio-01');
const audioElement2 = document.getElementById('audio-02');
const audioElement3 = document.getElementById('audio-03');
const track1 = audioCtx.createMediaElementSource(audioElement1);
const track2 = audioCtx.createMediaElementSource(audioElement2);
const track3 = audioCtx.createMediaElementSource(audioElement3);

const playButton = document.querySelector('.tape-controls-play');

// play pause audio
playButton.addEventListener('click', function() {

	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}

	if (this.dataset.playing === 'false') {
		audioElement1.play();
		audioElement2.play();
		audioElement3.play();
		this.dataset.playing = 'true';
	// if track is playing pause it
	} else if (this.dataset.playing === 'true') {
		audioElement1.pause();
		audioElement2.pause();
		audioElement3.pause();
		this.dataset.playing = 'false';
	}

	let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );

}, false);

// if track ends
//CONSERVAR TAL CUAL. VA A HABER 1 SOLO TRACK QUE SINCRONICE AL PLAYBACK DEL RESTO.
audioElement1.addEventListener('ended', () => {
	playButton.dataset.playing = 'false';
	playButton.setAttribute( "aria-checked", "false" );
}, false);

// volume
const gainNode1 = audioCtx.createGain();
const gainNode2 = audioCtx.createGain();
const gainNode3 = audioCtx.createGain();

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
