$(document).ready(function(){
  $(document).mousemove(function(e){
    var a = e.clientX;
    $('.dibujo2').css({'opacity':a/1000});
  });
});
