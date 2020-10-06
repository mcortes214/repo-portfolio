var h;

function setup() {
  frameRate(10);
  createCanvas(800, 800);
  colorMode(HSB, 100);
  h = 10;
  noStroke();
}

function draw() {

  var col = color(h, 50, mouseX/80);
  background(col);

  var col2 = color(h+30,50,100,mouseX/80);
  fill(col2);
  // for(var i = 0; i<100 ;i++){
  // ellipse(random(0,width), random(0,height), random(25-250), random(25-250));
  // }

  h += 0.5;
  if (h > 100) {
    h = 0;
  }

}
