
let slider;

function setup() {
    var canvasDiv = document.getElementById('viz1')
    //var width = canvasDiv.offsetWidth;
    //var height = canvasDiv.offsetHeight;
    var can = createCanvas(500, 300)
    can.parent('viz1')
    console.log(can.position())
    //slider = createSlider(10, 150, 20);
    //slider.position(can.position().x+10,can.position().y+10);
    slider = new HScrollbar(100,280, 300, 10, 1);
}

function draw() {
    clear()
    var rad = map(slider.getPos(),100,400,10,150)
    fill(255,200,0);
    var sun_rad = 200;
    ellipse(100, 150, sun_rad, sun_rad)
    fill(255,0,0)
    ellipse(400, 150, rad, rad)
    var rx = (100*sun_rad + 400*rad)/(sun_rad+rad);
    fill(0)
    ellipse(rx, 150, 10, 10);

    slider.update()
    slider.display()
}

class HScrollbar {
  constructor(xp, yp, sw, sh, l) {
    this.swidth = sw;
    this.sheight = sh;
    let widthtoheight = sw - sh;
    this.ratio = sw / widthtoheight;
    this.xpos = xp;
    this.ypos = yp-this.sheight/2;
    this.spos = this.xpos + this.swidth/2 - this.sheight/2;
    this.newspos = this.spos;
    this.sposMin = this.xpos;
    this.sposMax = this.xpos + this.swidth - this.sheight;
    this.loose = l;
    this.over = false;
    this.locked = false;
  }

  update() {
    if (this.overEvent()) {
      this.over = true;
    } else {
      this.over = false;
    }
    if (mouseIsPressed && this.over) {
      this.locked = true;
    }
    if (!mouseIsPressed) {
      this.locked = false;
    }
    if (this.locked) {
      this.newspos = constrain(mouseX-this.sheight/2, this.sposMin, this.sposMax);
    }
    if (abs(this.newspos - this.spos) > 1) {
      this.spos = this.spos + (this.newspos-this.spos)/this.loose;
    }
  }

  overEvent() {
    if (mouseX > this.xpos && mouseX < this.xpos+this.swidth &&
       mouseY > this.ypos && mouseY < this.ypos+this.sheight) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    noStroke();
    fill(204);
    rect(this.xpos, this.ypos, this.swidth, this.sheight);
    if (this.over || this.locked) {
      fill(0, 0, 0);
    } else {
      fill(102, 102, 102);
    }
    rect(this.spos, this.ypos-this.sheight/2, this.sheight*2, this.sheight*2);
  }

  getPos() {
    // Convert spos to be values between
    // 0 and the total width of the scrollbar
    return this.spos * this.ratio;
  }
}
