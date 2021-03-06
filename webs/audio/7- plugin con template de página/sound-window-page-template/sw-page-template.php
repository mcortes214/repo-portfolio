<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sound Window | Nicolás Melmann</title>
  </head>
  <body>

<iframe id="player" src="https://www.maxicortes.com.ar/webs/audio/reproductor-plugin-v1.html" width="800px" height="800px"></iframe>

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.0.min.js"></script>

<script>
/*-----------------CANCIONES------------------*/
var canciones = {
  tracks: {
    'Primera canción': {
      track_1: 'https://www.maxicortes.com.ar/webs/audio/audio/webm/sonidos-1.webm',
      track_2: 'https://www.maxicortes.com.ar/webs/audio/audio/webm/sonidos-2.webm',
      track_3: 'https://www.maxicortes.com.ar/webs/audio/audio/webm/sonidos-3.webm',
      track_4: 'https://www.maxicortes.com.ar/webs/audio/audio/webm/sonidos-4.webm',
      track_5: 'https://www.maxicortes.com.ar/webs/audio/audio/webm/sonidos-5.webm',
      track_6: 'https://www.maxicortes.com.ar/webs/audio/audio/webm/sonidos-6.webm',
    },
    'Segunda canción': {
      track_1: 'https://www.maxicortes.com.ar/webs/audio/audio/webm/sonidos-b1.webm',
      track_2: 'https://www.maxicortes.com.ar/webs/audio/audio/webm/sonidos-b2.webm',
      track_3: 'https://www.maxicortes.com.ar/webs/audio/audio/webm/sonidos-b3.webm',
    },
  },
  reverb: 'https://www.maxicortes.com.ar/webs/audio/audio/reverb-ir.wav',
};

/*--------------------------------------------*/
document.getElementById("player").onload = function(){
  document.getElementById("player").contentWindow.postMessage(canciones, "*");
  console.log('mensaje enviado');
}

$(window).mouseup(function() {
  document.getElementById("player").contentWindow.postMessage('mouseup', "*");
});

</script>

<style>

iframe#player {
    border: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
}

body {
    margin: 0;
    height: 100vh;
}

</style>

  </body>
</html>
