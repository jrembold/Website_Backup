
// Tokyo Colors
var Red = "#8c4351";
var Orange = "#965027";
var Yellow = "#8f5e15"
var Green = "#485e30";
var Teal = "#166775";
var Blue = "#34548a";
var Purple = "#5a4a78";
var FG_col = "#343b58";
var BG_col = "#d5d6db";
var Full_BG = "#dfdfe6";

var cell = 50;
var amp = 3;
var wavel = -7*cell;
var wave_num;
var period = 4;
var afreq;

let cell_w = 32;
let cell_h = 8;

let ttime = 0;

let xspacing = 5; // Distance between each horizontal location
let w; // Width of entire wave
let amplitude = amp*cell; // Height of wave
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave


function setup() {
  canvas = createCanvas(cell_w*cell, cell_h*cell);
  canvas.parent('viz1');
  w = width + 16;
  dx = xspacing;
  wave_num = TWO_PI/wavel;
  afreq = TWO_PI/period;
  yvalues = new Array(floor(w / xspacing)-20);
}

function draw() {
    background(Full_BG);
    grid();
    calcWave();
    renderWave();

    push();
    fill(0);
    textSize(25);
    //text('t = ' + ttime.toFixed(2), cell/2, (cell_h-0.25)*cell);
    text('Click and hold to pause', (cell_w-6)*cell, (cell_h-0.25)*cell);
    pop();

    if (mouseIsPressed) {
        ttime += 0;
    } else {
        ttime += 0.025;
    }

    if (ttime > 200) {
        ttime = 0;
    }
}

function grid() {
    stroke(200);
    //for (let i=0; i < cell_w; i++){
        //line(i*cell, 0*cell, i*cell, cell_h*cell);
    //}
    //for (let i=0; i < cell_h; i++){
        //line(0*cell, i*cell, cell_w*cell, i*cell);
    //}
    strokeWeight(3);
    drawArrow(createVector(2*cell, cell_h/2*cell), createVector((cell_w-3)*cell,0), "black", 2);
    drawArrow(createVector(2*cell, cell_h/2*cell), createVector(0,-(cell_h/2-1)*cell), "black", 2);
    drawArrow(createVector(2*cell, cell_h/2*cell), createVector(-1.4*cell,1.4*cell), "black", 2);
    //line(2*cell, cell_h/2*cell, cell_w*cell, cell_h/2*cell);
    strokeWeight(1);
}

function calcWave() {
  // For every x value, calculate a y value with sine function
  let x = 0;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(afreq*ttime + wave_num*x) * amplitude;
    x += dx;
  }
}

function renderWave() {
  //noStroke();
  push()
  strokeWeight(5);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 20; x < yvalues.length; x+=6) {
      start=createVector(x * xspacing, height / 2);
      eend =createVector(0, yvalues[x]);
      bend =createVector(-yvalues[x]/1.8, yvalues[x]/1.8)
      if (yvalues[x] > 0){
          drawArrow(start, eend, Red, 4, Math.abs(yvalues[x])/10);
          drawArrow(start, bend, Teal,4, Math.abs(yvalues[x])/10);
        } else {
          drawArrow(start, bend, Teal,4, Math.abs(yvalues[x])/10);
          drawArrow(start, eend, Red, 4, Math.abs(yvalues[x])/10);
        }
  }
  pop()
}

function drawArrow(base, vec, myColor, weight=4, size=7) {
  push();
  stroke(myColor);
  strokeWeight(weight);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = size;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}




function setLineDash(list) {
    drawingContext.setLineDash(list);
}
