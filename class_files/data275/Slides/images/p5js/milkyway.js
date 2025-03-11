
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


var fullwidth = 1600;
var fullheight = 800;
var winsize = fullwidth/8;

var num_stars = 500;
var earth_x = fullwidth / 3;
var earth_y = fullheight / 2;
var view_distance = fullwidth/2;
var view_angle;

var star_pos;


function setup() {
  canvas = createCanvas(fullwidth, fullheight);
  canvas.parent('viz1');
  star_pos = generateStarsGrid(winsize/2, fullheight/2 - winsize, fullwidth - winsize, fullheight/2, 20, 40)
  view_angle = PI/40;
  //for (let i = 0; i < num_stars; i++) {
    //star_pos.push(createVector(randomBetween(winsize/2, fullwidth - winsize/2), randomBetween(fullheight/2 - winsize, fullheight - winsize)))
  //}
  //noLoop();
}

function draw() {
  background(Full_BG);

  //rect(winsize/2, fullheight/2 - winsize, fullwidth - winsize, fullheight/2)

  for (let star of star_pos) {
    push();
    fill(Yellow);
    drawStar(star.x, star.y, 3,6,5);
    pop();
  }

  push();
  fill(Blue);
  circle(earth_x, earth_y, 10);
  pop();

  let obs_angle = atan2(mouseY - earth_y, mouseX - earth_x)

  push();
  fill(100, 100);
  noStroke();
  translate(earth_x, earth_y);
  rotate(obs_angle);
  arc(0, 0, view_distance, view_distance, -view_angle, view_angle);
  pop();

  let count = 0;
  for (let star of star_pos) {
    if (isPointInArc(star, createVector(earth_x,earth_y), view_distance, obs_angle, -view_angle, view_angle)) {
      count += 1;
    }
  }

  push();
  fill(count*2);
  rect(width-winsize*5/4, winsize/4, winsize, winsize);
  pop();
}



function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function mouseWheel(event) {
  view_distance -= event.delta/2;
  //redraw();
}

//function mouseMoved() {
  //redraw();
//}

function isPointInArc(point, center, radius, obs_angle, startAngle, endAngle) {
  let d = dist(point.x, point.y, center.x, center.y);
  if (d > radius) return false; // Outside the radius

  let angle = atan2(point.y - center.y, point.x - center.x);
  return angle >= obs_angle+startAngle && angle <= obs_angle+endAngle;
}

function generateStarsGrid(rectX, rectY, rectW, rectH, rows, cols) {
  stars = [];
  let xStep = rectW / cols;
  let yStep = rectH / rows;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = rectX + j * xStep + random(-xStep / 2, xStep / 2);
      let y = rectY + i * yStep + random(-yStep / 2, yStep / 2);
      stars.push(createVector(x, y));
    }
  }
  return stars;
}


//function setLineDash(list) {
    //drawingContext.setLineDash(list);
//}
