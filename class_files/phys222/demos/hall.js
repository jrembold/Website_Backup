let m = 10;
let v = 0;
let dt=.25;

let particles;
let efield;
let bfield;
let etfield;

let bactive = false;

let forces = [];
let forceStep = 25;
let forceScale = 1000;

function setup() {
	createCanvas(800,600);
	background(40);
	stroke(250);
	strokeWeight(2);
	fill(250,50,50,100);
	createDiv('<br>');
	makebactive = createButton('Activate B Field');
	makebactive.mousePressed(togBfield);

	resetfieldbut = createButton('Reset Surface Charges');
	resetfieldbut.mousePressed(resetfield);

	efield = createVector(-1,0);
	bfield = createVector(0,0,-0.5);
	etfield = createVector(0,0,0);

	particles = [];
}

function draw() {
	background(40);
	strokeWeight(2);
	textSize(26);
	line(0,200,800,200);
	line(0,400,800,400);

	push();
	fill(200,200,200);
	drawarrow(createVector(750,175), createVector(-50,0));
	noStroke();
	text('I', 760, 185);
	pop();


	if (bactive) {
		// Draw the green region
		push();
		fill(50,250,50,50);
		rect(200,100,400,400);
		pop();

		// Label the green region
		textAlign(CENTER);
		push();
		fill(200,200,200);
		noStroke();
		text('Magnetic Field (out of screen)', 400, 475);
		pop();

		// Draw the top plate to change color as charges
		push();
		fill(map(etfield.mag(),0,2,0,255),10,10);
		noStroke();
		rect(200,200,400,-100);
		pop();

		// Draw Mag Force vector and label
		push();
		stroke(0,200,0);
		fill(0,200,0);
		drawarrow(createVector(50,500), createVector(0,-50));
		noStroke();
		textAlign(LEFT);
		textSize(16);
		text('Mag Force', 60,450);
		pop();

		// Draw E perp force vector and label
		push();
		stroke(0,250,250);
		fill(0,250,250);
		drawarrow(createVector(50,500), createVector(0,map(etfield.mag(),0,2,0,50)));
		noStroke();
		textAlign(LEFT);
		textSize(16);
		text('E Perp Force', 60,550);
		pop();

	}

	if (frameCount % 20 == 0) {
		for (var i=210; i<400; i+=20) {
			particles.push( new Particle(createVector(850+random(-40,40),i), 1));
		}
	}


	// If displaying particles:
	for (var i = particles.length-1; i >= 0; i--) {
		let p = particles[i];
		p.run();
		if (p.isDead()) {
			particles.splice(i,1);
		}
	}
}

function computeForce(p) {
	f = createVector(0,0);
	fb = createVector(0,0);
	fet = createVector(0,0);
	if (p.position.y>400 || p.position.y<200) {
		p.velocity.y = 0;
		p.position.x = -50;
		etfield.y += 0.01;
		if (p.position.y>400) {
			etfield.y -= 0.01;
		}
	}
	if (bactive && p.position.x>200 && p.position.x<600) {
		fb = p.velocity.mult(p.charge).cross(bfield);
		fet = etfield.mult(p.charge);
	}
	//f.add(efield.mult(p.charge)).add(fb).add(fet);
	f.add(fb).add(fet);
	return f;
}

function togBfield() {
	if (bactive) {
		bactive = false;
		makebactive.html('Turn On B');
	} else {
		bactive = true;
		makebactive.html('Turn Off B');
	}
}

function resetfield() {
	etfield = createVector(0,0);
}

function drawarrow(p,a) {
	line(p.x, p.y, p.x+a.x, p.y+a.y);
	push();
	var ang = a.heading();
	var offset = 10;
	translate(p.x+a.x, p.y+a.y);
	rotate(ang+HALF_PI);
	triangle(-offset/2, offset, offset/2, offset, 0, -offset/2);
	pop();
}


function mouseDragged() {
	if (mouseY>200 && mouseY<400) {
		particles.push( new Particle(createVector(mouseX,mouseY), 1) );
	}
}

