
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


var samples = 500;


var WIDTH = 1800;
var HEIGHT = 900;



function setup() {
    var canvasDiv = document.getElementById('viz1')
    var can = createCanvas(WIDTH, HEIGHT)
    can.parent('viz1')
    period_slider = createSlider(0.1,1,1,0.1);
    period_slider.position(960 - 2 * 200, HEIGHT+100);
    period_slider.size(200);
    period_slider.parent('viz1')
    period_slider.input(update_plots)

    phi_slider = createSlider(0,2*PI,0,0);
    phi_slider.position(860, HEIGHT+100);
    phi_slider.size(200);
    phi_slider.parent('viz1')
    phi_slider.input(update_plots)

    amp_slider = createSlider(0,1,1,0);
    amp_slider.position(960 + 1 * 200, HEIGHT+100);
    amp_slider.size(200);
    amp_slider.parent('viz1')
    amp_slider.input(update_plots)

    ft_slider = createSlider(-2,2,0.25,0);
    ft_slider.position(960+0.25*1920-100, 450);
    ft_slider.size(400);
    ft_slider.parent('viz1')
    ft_slider.input(update_plots)

    textAlign(CENTER);
    textSize(36);

    update_plots()
    noLoop();
}

function update_plots() {
    background('#dfdfe6');
    noFill();

    // Base Wave Plot
    var base_x = .2 * width / 2;
    var base_y = .7 * height;
    var base_width = .8 * width;
    var base_height = .2 * height;
    var xrange = 1
    var yrange = 2
    rect(base_x, base_y, base_width, base_height);
    setLineDash([5,5]);
    line(base_x, base_y + base_height/2, base_x + base_width, base_y + base_height/2);
    setLineDash([1,0]);

    // Transform Plot
    var len = .6 * height;
    var cent_y = len / 2 + .05 * height;
    var cent_x = width / 2;
    line(cent_x - len / 2, cent_y, cent_x + len / 2, cent_y);
    line(cent_x, cent_y - len / 2, cent_x, cent_y + len / 2);
    setLineDash([5,5]);
    circle(cent_x, cent_y, len / 1.1);
    setLineDash([1,0]);

    let midx = 0;
    let midy = 0;
    for (let i = 0; i < samples; i++) {
        // Base Wave Plot
        let x = i / samples * xrange
        let y = -amp_slider.value() * cos(2*PI*x/period_slider.value() + phi_slider.value())
        col = color(Purple);
        col.setAlpha(150);
        fill(col);
        circle(base_x + x / xrange * base_width, base_y + base_height / 2 + y * base_height / 2 / 1.1, 15)

        // Transform Plot
        let angle_step = 2*PI/ft_slider.value() / samples;
        let ft_x = -y * cos(angle_step * i)
        let ft_y = -y * sin(angle_step * i)
        midx += ft_x;
        midy += ft_y;
        col = color(Teal);
        col.setAlpha(150);
        fill(col)
        circle(cent_x + ft_x * len / 2.2, cent_y + ft_y * len / 2.2, 15)
    }
    fill(Red)
    circle(cent_x + midx/samples * len / 2.2, cent_y + midy/samples * len / 2.2, 15)


    fill(0);
    text(period_slider.value().toFixed(3), cent_x - 300, base_y + base_height + 40);
    text(amp_slider.value().toFixed(3), cent_x + 300, base_y + base_height + 40);
    text(phi_slider.value().toFixed(3), cent_x, base_y + base_height + 40);
    text(ft_slider.value().toFixed(3), cent_x * 1.645, cent_y - 25);




}


function setLineDash(list) {
    drawingContext.setLineDash(list);
    //setLineDash([5,5]);
    //setLineDash([1,0]);
}
