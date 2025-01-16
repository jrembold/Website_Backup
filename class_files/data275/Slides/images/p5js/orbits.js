
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


var w = -0.05;
var t = 0;
var mode = 1;


function setup() {
    var canvasDiv = document.getElementById('viz1')
    var can = createCanvas(600, 600)
    can.parent('viz1')
}

function draw() {
    background('#dfdfe6');
    setLineDash([5,5]);
    noFill();
    circle(300, 300, 100);
    circle(300, 300, 200);
    circle(300, 300, 300);
    circle(300, 300, 400);
    circle(300, 300, 500);

    setLineDash([1,0]);

    function orbit(rad, col) {
        let size = 25;
        let rate = compute_w(rad)
        push();
        fill(col);
        circle(300 + rad*cos(rate*t), 300 + rad*sin(rate*t), size);
        pop();
    }
    t += 1;
    orbit(50,  Red);
    orbit(100, Orange);
    orbit(150, Yellow);
    orbit(200, Green);
    orbit(250, Teal);

}

function compute_w(R) {
    if (mode == 0) {
        return -0.05
    } else if (mode == 1) {
        return -2.5 / R
    }
}

function mouseClicked() {
    if (mode == 0) {
        mode = 1;
    } else {
        mode = 0;
    }
}



function setLineDash(list) {
    drawingContext.setLineDash(list);
}
