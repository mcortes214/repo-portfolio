

    window.onload = function() {
		
		if( Modernizr.canvas ){
		
	  /* var debug = 0.1; */

//------------------------------------- CANVAS ------------------------------------
	
	$(".nocanvas").css("visibility","hidden");
	


      // Initialise an empty canvas and place it on the page
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
	  var lon = 20;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.body.appendChild(canvas);
      var colorCompuesto;
      var size = 3;
	  var prob = 0.65;
	  
	  var flagGota = false;
	  var Gota = new Image();
		Gota.onload = function() {
			flagGota = true;
      };
	  	Gota.src = "img/gota.png";

//-------------------si se cambia el tamaño del navegador, reajustar canvas

$( window ).resize(function() {
        canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
	  if(window.innerWidth<800){
			canvas.width = 800;
			$("#paisactual").css({"right":800*0.03});	
	  }
	  if(window.innerHeight<600){
			canvas.height = 600;
			$("#contenedorinfo").css({"height":"400px"});	
			$(".tabla").css({"height":"400px"});
	  }	 
});
	// animación de la pantalla inicial
	
	$(".titulo p").animate({"opacity":"1"}, 3000);
	
	setTimeout(function(){
		$(".titulo p").animate({"opacity":"0"}, 3000);
	$(".titulo").animate({"opacity":"0%"}, 5000);
	}, 3000);
	
	setTimeout(function(){
		$(".titulo").css("visibility","hidden");
	}, 8000);


      // posicion inicial
      var posX = 20,
      posY = canvas.height / 2;

//objeto partículas

      var particles = {},
          particleIndex = 0;

      function Particle() {
	//posicion inicial
        this.x = Math.random() * canvas.width;
        this.y = -900;
	//velocidad inicial
	this.vx = 0;
        this.vy = canvas.height / 200 + Math.random()*2-1;
	//transparencia (es fija para cada partícula, no se actualiza con el tiempo)
	this.transparencia = Math.random()/4+0.2;

        // Add new particle to the index
        // Object used as it's simpler to manage that an array
        particleIndex ++;
        particles[particleIndex] = this;
        this.id = particleIndex;
      }

      // Some prototype methods for the particle's "draw" function
      Particle.prototype.draw = function() {
      //1. actualizar variables 
	 this.x += this.vx;
        this.y += this.vy;

	//2. chequear si salió de la pantalla
	//las partículas desaparecerán al llegar al suelo
        if (this.y >= canvas.height) {
          delete particles[this.id];
        }

        // Crear círculos

		colorCompuesto = 'rgba(' + 240 + ',' + 240 + ',' + 240 + ',' + this.transparencia +')';
		context.globalAlpha = this.transparencia;
		context.strokeStyle = colorCompuesto;
		context.fillStyle = colorCompuesto;
		
		/*context.beginPath(); // Comienza el trazo
		context.arc(this.x, this.y, 3, 0, Math.PI*2, false);
		context.closePath(); // Cierra el trazo
		context.fill();*/
		if (flagGota == true){
			context.drawImage(Gota, this.x, this.y);
		}

      

	     }

//cada X milisegundos, ejecutar función contenida

      setInterval(function() {
	context.fillStyle = "white";
        context.clearRect(0, 0, canvas.width, canvas.height);

          if (Math.random() < prob) { //probabilidad de que aparezca una gota
	new Particle();
          }

        for (var i in particles) {
          particles[i].draw();
        }
      }, 5); // a 1000 ms, se crea una gota por segundo con probabilidad 1 (1 por ciclo)
	//a 30 ms, 33,3 gotas por segundo (1 por ciclo, 33,3 ciclos por segundo).
	//para que sean 2 gotas promedio por segundo, 2/33=0,06 (probabilidad)
	
	/*
Cálculo de probabilidad:
- Para definir cada cuánto milisegundos se ejecuta un ciclo de setInterval:
1000/ciclos necesarios
- Para definir la probabilidad de que aparezca una partícula:
Partículas promedio por segundo/ciclos por segundo (siendo probabilidad 1, aparece una gota por ciclo)

Cálculo de velocidad:
Para que una gota atraviese la pantalla en un segundo:
alto de pantalla/ciclos por segundo (más un random que puede ser positivo o negativo, con 
el mismo módulo máximo)
ciclos por segundo = 1000/ms
*/

//------------------------------------- MENÚES ------------------------------------

var paisSeleccionado;

// ---------------- Animaciones

// Abrir Info

$("#botoninfo").click(function() {
	$("#elegir").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#botoninfo").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#paisactual").animate({ "right": canvas.width, "opacity" :"0"}, 1500);
	$(".contenedorinfo").css({"visibility":"visible"}, 1500);	
	$(".contenedorinfo").animate({"left":"0"}, 2000);
	$(".continentes").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
});

// Cerrar Info

$(".textoinfo").click(function() {
	$("#botoninfo").animate({ "left": "3%" , "opacity" :"1"}, 1000 );
	$("#elegir").animate({ "left": "3%" , "opacity" :"1"}, 1000 );
	$("#paisactual").animate({ "right": "3%", "opacity" :"1"}, 1000);
	$(".contenedorinfo").animate({"left":"-100%"}, 1500);
	setTimeout(function(){
		$(".contenedorinfo").css({"visibility":"hidden"}, 1500);	
	}, 1500);
});

// Elegir continente

$("#elegir").click(function() {
	$(this).animate({ "left": "-100px" , "opacity" :"0%", "visibility":"hidden"}, 1500 );
	$(".continentes").css({"visibility":"visible"});
	$(".continentes").animate({ "left": "3%", "opacity" :"1"}, 1500 );
});

// Click en un continente

$("#africa").click(function() {
	$(".continentes").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#botoninfo").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#paisactual").animate({ "right": canvas.width, "opacity" :"0"}, 1500);
	$(".tablaafrica").css({"visibility":"visible"}, 1500);	
	$(".tablaafrica").animate({"left":"0"}, 2000);
});

$("#america").click(function() {
	$(".continentes").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#botoninfo").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#paisactual").animate({ "right": canvas.width, "opacity" :"0"}, 1500);
	$(".tablaamerica").css({"visibility":"visible"}, 1500);	
	$(".tablaamerica").animate({"left":"0"}, 2000);
});

$("#asia").click(function() {
	$(".continentes").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#botoninfo").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#paisactual").animate({ "right": canvas.width, "opacity" :"0"}, 1500);
	$(".tablaasia").css({"visibility":"visible"}, 1500);	
	$(".tablaasia").animate({"left":"0"}, 2000);
});

$("#europa").click(function() {
	$(".continentes").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#botoninfo").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#paisactual").animate({ "right": canvas.width, "opacity" :"0"}, 1500);
	$(".tablaeuropa").css({"visibility":"visible"}, 1500);	
	$(".tablaeuropa").animate({"left":"0"}, 2000);
});

$("#oceania").click(function() {
	$(".continentes").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#botoninfo").animate({ "left": "-300px" , "opacity" :"0"}, 1500 );
	$("#paisactual").animate({ "right": canvas.width, "opacity" :"0"}, 1500);
	$(".tablaoceania").css({"visibility":"visible"}, 1500);	
	$(".tablaoceania").animate({"left":"0"}, 2000);
});

// Click en un país

$(".pais").click(function() {
	paisSeleccionado = $(this).text();
	$("#paisactual .chd").text(paisSeleccionado);
	$("#botoninfo").animate({ "left": "3%" , "opacity" :"1"}, 1000 );
	$("#elegir").animate({ "left": "3%" , "opacity" :"1"}, 1000 );
	$("#paisactual").animate({ "right": "3%", "opacity" :"1"}, 1000);
	$(".tabla").animate({"left":"-100%"}, 1500);
		setTimeout(function(){
		$(".tabla").css({"visibility":"hidden"}, 1500);	
	}, 1500);
});

// ---------------- Recuperación de datos

/* data-mort representa la cantidad de muertes por minuto cada 100.000 habitantes. 
Eso se mapea a cantidad (promedio) de gotas presentes en la pantalla en cada momento dado.
Para eso se debe crear [data-mort] cantidad de gotas por segundo, y las gotas deben abandonar la pantalla
en un segundo, para dejar lugar a las siguientes gotas. Como hay 200 ciclos por segundo, una probabilidad
1 resulta en 200 gotas por segundo y 200 gotas en pantalla en promedio, y dividiendo mortalidad por 200 
se obtiene la probabilidad necesaria para crear la cantidad de gotas adecuada en cada segundo.
 */

var mortalidad;
$(".pais").click(function() {
	mortalidad = $(this).data("mort");
	prob = mortalidad/200;
});

}

else{
}

};