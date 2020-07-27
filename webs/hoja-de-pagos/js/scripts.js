console.log('holi');

$(document).ready(function(){

  $('.imprimir').click(function(){
      window.print();
  });

  $('#crear-hoja').click(function(){
    crearFechas();
    $('.overlay-pagina').css({'left' : '-100vw'});
    $('.overlay-pagina').css({'opacity' : '0'});
  });

});

function crearFechas() {
  var d = $('#input-fecha').val();
  if(d){
    moment.locale('es');
    var fechaDeHoy = moment(d);
    var fechaHoyFormato = fechaDeHoy.format('LL');
    console.log(fechaHoyFormato);

    //Fecha inicial
    $('.fecha-de-hoy').append(fechaHoyFormato);

    //Fechas subsiguientes
    var semana;

    for (var i = 0; i < 16; i++) {
       semana = fechaDeHoy.add(7, 'days');
       $('.bloque-1').append('<p class="fecha-pago">⬜ '+semana.format('LL')+'</p>');
    }

    for (var i = 0; i < 4; i++) {
       semana = fechaDeHoy.add(7, 'days');
       $('.bloque-2').append('<p class="fecha-pago">⬜ '+semana.format('LL')+'</p>');
    }

    for (var i = 0; i < 4; i++) {
       semana = fechaDeHoy.add(7, 'days');
       $('.bloque-3').append('<p class="fecha-pago">⬜ '+semana.format('LL')+'</p>');
    }
  }
}
