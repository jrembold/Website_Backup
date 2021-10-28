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

	efield = createVector(-1,0);
	bfield = createVector(0,0,-0.5);
	etfield = createVector(0,0,0);

	particles = [];
}

function draw() {
	background(40);
	strokeWeight(2);
	line(0,200,800,200);
	line(0,400,800,400);

	if (bactive) {
		push();
		fill(50,250,50,50);
		rect(200,100,400,400);
		pop();

		push();
		fill(map(etfield.mag(),0,10,0,255),10,10);
		noStroke();
		rect(200,200,400,-100);
		pop();

	}

	if (frameCount % 20 == 0) {
		for (var i=210; i<400; i+=10) {
			particles.push( new Particle(createVector(800,i), 1));
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
		if (p.position.y>200) {
			etfield.y -= 0.01;
		}
	}
	if (bactive && p.position.x>200 && p.position.x<600) {
		fb = p.velocity.mult(p.charge).cross(bfield);
		fet = etfield.mult(p.charge);
	}
	f.add(efield.mult(p.charge)).add(fb).add(fet);
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


function mouseDragged() {
	if (mouseY>200 && mouseY<400) {
		particles.push( new Particle(createVector(mouseX,mouseY), 1) );
	}
}

