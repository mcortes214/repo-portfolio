//Javascript general

$('document').ready(function(){

  //Módulo: Smooth Anchor Scroll --------------------------------------
  //tomado de: http://jsfiddle.net/9SDLw/
  /*Clases asociadas: ninguna
  */

  $('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 1000);
    return false;
});

//Módulo: Scroll Hide Navbar --------------------------------------
//Modificación basada en: https://codepen.io/Mhmdhasan/pen/mAdaQE

/*Clases asociadas:
  .scrollHide
  .scrollHide-hidden
*/

(function(){

    //VARIABLES

      navbar = $('.scrollHide');
      var a = $(window).scrollTop();
      var b = navbar.height();
      var c, currentScrollTop = 0;

    //EVENTOS

    //condiciones de scroll

      $(window).scroll(function () {
         a = $(window).scrollTop();
         currentScrollTop = a;

         if (c < currentScrollTop && a > b + b) {
           navbar.addClass("scrollHide-hidden");
         }
         else if (c > currentScrollTop && !(a <= b) || currentScrollTop == 0) {
           navbar.removeClass("scrollHide-hidden");
         }
         c = currentScrollTop;
     });

}()); //--fin de módulo

//Módulo: ScrollSpy --------------------------------------
//Maximiliano Cortés

/*Clases asociadas:
  .ss_item
  .ss_item-active
Otros atributos asociados:
  ss-data
*/

(function(){

    //VARIABLES

        var cantidadItems = $('.ss_item').length;
        var arrayOffsets = [];
        var scrolltopActual;

        //variables de utilidad
        var a;
        var aPrev; //estado previo de a

    //1- Almacenar en arrayOffsets los offsets de todas las secciones .ss_item
    for(a=0; a<cantidadItems; a++){
         var index = $($('.ss_item')[a]).attr('data-ss'); // HACK: es necesario ir y venir entre objetos jQuery/elementos DOM?
         arrayOffsets.push($(index).offset().top);
    }

    //2- Escuchar evento Scroll, evaluar cuál es la sección activa

    $(window).scroll(function(){
        evaluarSeccion();
    })


    //FUNCIONES

    var evaluarSeccion = function(){
                            scrolltopActual = $(document).scrollTop();

                            //comprobar rango (a = indice de sección activa)
                            a=arrayOffsets.length-1;
                            while(scrolltopActual<arrayOffsets[a]){
                              a--;
                            }

                            //Hubo un cambio de sección?
                            if(a!=aPrev){
                              $('.ss_item-active').toggleClass('ss_item-active');
                              $($('.ss_item')[a]).toggleClass('ss_item-active');
                            }

                            //resetear aPrev
                            aPrev = a;
                          };


}()) //--fin de módulo

});
