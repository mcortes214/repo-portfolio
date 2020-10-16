//setup global variables

var canvas = "";

$(document).ready(function(){

  $('.overlay').click(function(){
    console.log('clikc');
    $(this).css({opacity:0});
  });


  var defImg = document.getElementById('defaultImg');
  defImg.setAttribute('src','img/img.jpg')
  canvas = document.getElementById("kale");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  draw();
});


function draw() {
        var ctx = canvas.getContext('2d');
        var img = new Image();
        var slider = document.getElementById("slider-1");
        var triangles = slider.value; //amount of triangles for kaleidoscope

        img.onload = function(){
            //getting image dimensions so entire canvas width is covered
            var diagonal = Math.sqrt(Math.pow(canvas.width,2) + Math.pow(canvas.height,2));
            var scaleFactor = img.width/img.height;
            var h = diagonal/2;
            var w = parseInt(scaleFactor*h);

            //event listeners
            //draw kaleidoscope once before mouse movement detection begins
            kaleidoscope(w, h, img, canvas, ctx, triangles, 0);

            //draw kaleidoscope when mouse enters window
            canvas.addEventListener('mouseenter', function(e){
                var mouseX = e.clientX.map(0, canvas.width, -w/10, w/10);
                window.requestAnimationFrame(function(){kaleidoscope(w, h, img, canvas, ctx, triangles, mouseX);});
            });

            //redraw kaleidoscope when mouse moves along x-axis
            canvas.addEventListener('mousemove', function(e){
                var mouseX = e.clientX.map(0, canvas.width, -w/8, w/8);
                window.requestAnimationFrame(function(){kaleidoscope(w, h, img, canvas, ctx, triangles, mouseX);});
            });

            //redraw kaleidoscope when number of triangles is vhanged by input range
            slider.addEventListener("input", function(e){
             triangles = slider.value;
                window.requestAnimationFrame(function(){kaleidoscope(w, h, img, canvas, ctx, triangles, 0);});
            });

            //redraw kaleidoscope when window size changes
            window.addEventListener("resize", function(){
                canvas.height = window.innerHeight;
                canvas.width = window.innerWidth;
                window.requestAnimationFrame(function(){kaleidoscope(w, h, img, canvas, ctx, triangles, 0);});
                diagonal = Math.sqrt(Math.pow(canvas.width,2) + Math.pow(canvas.height,2));
                scaleFactor = img.width/img.height;
                h = diagonal/2;
                w = parseInt(scaleFactor*h);
            });

        }
    img.src = document.getElementById("defaultImg").src;
}

/* draws a kaleidoscope
 * tranlates coordinates to center of canvas and then rotates by vertexAngle
 * then sets up the triangle clipping mask
 * and rotates again by baseAngle so the image is perpendicular to the vertexAngle
 * finally draws the image (as is, or mirrored)
 */
function kaleidoscope(w, h, img, canvas, ctx, triangles, offset){
    //creates the triangle for the clipping mask
    var triangleClip = new Path2D();
    triangleClip.moveTo(0,0);
    triangleClip.lineTo(canvas.width, 0);
    triangleClip.lineTo(canvas.width*Math.cos((Math.PI/180)*(360/triangles)),canvas.width*Math.sin((Math.PI/180)*(360/triangles)));
    triangleClip.lineTo(0, 0);

    //gets the angles of the triangleClip
    var vertexAngle = 360/triangles;
    var baseAngle = (180 - vertexAngle)/2;

    //start drawing triangles
    for (var i=0; i < triangles; i++){
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate((Math.PI/180)*vertexAngle*i);
        ctx.clip(triangleClip);
        if (i % 2 === 0) {
            ctx.rotate(-(Math.PI/180)*baseAngle);
            mirror(img, ctx, w/2+offset, 0, w, h);
        }
        else {
            ctx.rotate(-(Math.PI/180)*baseAngle);
            ctx.drawImage(img, -w/2+offset, 0, w, h);
        }
        ctx.restore();
    }
}

//http://stackoverflow.com/questions/8168217/html-canvas-how-to-draw-a-flipped-mirrored-image
function mirror(v, canvas, x, y, width, height){
    canvas.save();
    canvas.scale(-1,1);
    canvas.drawImage(v, x ,y ,width*-1,height);
    canvas.restore();
}

//http://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers#23202637
/* maps number from one range to another */
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
