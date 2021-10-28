let m = 10;
let v = 0;
let dt=.25;

let moving = false;
let showCh = false;
let showF = false;
let showBall = true;
let showAllParts = false;

let ball;
let loc1;
let loc2;
let loc3;
let charges;
let particles;

let forces = [];
let forceStep = 25;
let forceScale = 100000;

function setup() {
	createCanvas(800,600);
	createDiv('<br>');
	background(40);
	stroke(250);
	strokeWeight(2);
	fill(250,50,50,100);

	ballsize = createSlider(5,50,10);
	createDiv('<br>');
	playbut = createButton('Play');
	showCharge = createButton('Show Charges');
	showField = createButton('Show E Field');
	showParticles = createButton('Show Particles');

	playbut.mousePressed(togPlayback);
	showCharge.mousePressed(togShowC);
	showField.mousePressed(togField);
	showParticles.mousePressed(togParticles);

	ball = createVector(width/2.5, height/2);
	loc1 = createVector(0.75*width, 0.5*height);
	loc2 = createVector(0.25*width, 0.25*height);
	loc3 = createVector(0.25*width, 0.75*height);
	charges = [loc1, loc2, loc3];
	particles = [];
	
		
	for (let i=1; i<width; i+=forceStep) {
		for (let j=1; j<height; j+=forceStep) {
			let p = createVector(i,j);
			forces.push(computeForce(p));
		}
	}

}

function draw() {
	background(40);

	// Show the Electric Field
	if (showF) {
		let count = 0;
		for (let i=1; i<width; i+=forceStep) {
			for (let j=1; j<height; j+=forceStep) {
				push();
				stroke(0,250,105);
				if (forces[count].magSq()<2000) {
					line(i, j, i+forces[count].x, j+forces[count].y);
					push();
					var ang = forces[count].heading()
					var offset = 3;
					translate(i+forces[count].x, j+forces[count].y);
					rotate(ang+HALF_PI);
					triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2);
					pop();
				}
				pop();
				count++;
			}
		}
	}

	// Show the charges
	if (showCh) {
		charges.forEach( function(charge) {
			push();
			if (charge==loc1) {
				fill(0,200,240,150);
			} else {
				fill(250,50,50,150);
			}
			ellipse(charge.x, charge.y, 30);
			pop();
		});
	}

	// Draw the ball
	if (showBall) {
		ellipse(ball.x,ball.y,ballsize.value());
	}

	// If the ball is moving, update the next ball position
	if (moving) {
		let f = computeForce(ball);
		v += f.x*dt;
		ball.x += v/ballsize.value()*dt;
	}

	// If the ball hits the first charge, stop the motion

	charges.forEach( function(charge) {
		if (ball.dist(charge)<15) {
			moving = false;
			showBall = false;
			playbut.html('Go!');
		}
	});

	// If displaying particles:
	if (showAllParts) {
		for (var i = particles.length-1; i >= 0; i--) {
			let p = particles[i];
			p.run();
			if (p.isDead()) {
				particles.splice(i,1);
			}
		}
	}

}

function computeForce(p) {
	f = createVector(0,0);
	charges.forEach( function(charge) {
		if (charge==loc1) {
			f.add(p5.Vector.sub(p,charge).normalize().mult(-forceScale/(pow(p.dist(charge),2))));
		} else {
			f.add(p5.Vector.sub(p,charge).normalize().mult(forceScale/(pow(p.dist(charge),2))));
		}
	});
	return f;
}

var Particle = function(position, charge) {
	this.acceleration = createVector(0,0);
	this.velocity = createVector(random(-1,1), random(-1,0));
	this.position = position.copy();
	this.charge = charge;
	this.mass = 20;

	this.run = function() {
		this.update();
		this.display();
	};

	this.update = function() {
		this.acceleration = computeForce(this.position).div(this.mass).mult(-this.charge);
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
	};

	this.display = function() {
		stroke(200);
		strokeWeight(2);
		if (this.charge>0) {
			fill(0,200,240,100);
		} else {
			fill(250,50,50,100);
		}
		ellipse(this.position.x, this.position.y, 20, 20);
	};

	this.isDead = function() {
		for (var c = 0; c < charges.length; c++) {
			if (this.position.dist(charges[c])<20 || this.position.dist(charges[c])>1000) {
				return true;
			}
		}
		return false;
	}
}

function togPlayback() {
	if (!moving) {
		ball.x = width/2.5;
		ball.y = height/2;
		v = 0;
		moving = true;
		showBall = true;
		playbut.html('Pause');
	} else if (moving) {
		moving = false;
		playbut.html('Go!')
	}
}

function togShowC() {
	if (showCh) {
		showCh = false;
		showCharge.html('Show Charges');
	} else if (!showCh) {
		showCh = true;
		showCharge.html('Hide Charges');
	}
}

function togField() {
	if (showF) {
		showF = false;
		showField.html('Show E Field');
	} else if (!showF) {
		showF = true;
		showField.html('Hide E Field');
	}
}

function togParticles() {
	if (showAllParts) {
		showAllParts = false;
		showParticles.html('Show Particles');
	} else {
		showAllParts = true;
		showBall = false;
		showParticles.html('Hide Particles');
	}
}

function mouseDragged() {
	if (showAllParts) {
		particles.push( new Particle(createVector(mouseX,mouseY), random([-1,1])) );
	}
}

