console.log('test');

var allText =[];
var allTextLines = [];
var Lines = [];

var txtFile = new XMLHttpRequest();

txtFile.open("GET", "datos-polizas.csv", true);
txtFile.onreadystatechange = function()
{
    allText = txtFile.responseText;
    allTextLines = allText.split(/\r\n|\n/);
};

// document.write(allTextLines);
// document.write(allText);
// document.write(txtFile);


$(document).ready(function(){

  $('#generar').click(function(){
    var input = $('input[name="test"]').val();
    console.log(input);
    $('.overlay-formulario').css({
      'display': 'none'
    });
  });

});
