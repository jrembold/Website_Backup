
let charge_pos;
let charge_neg;
let charges;

let ef = [];
let ef_step = 25;
let ef_scale = 500000;

let box_loc;
let box_size;

let vf;

let botl;
let botr;
let topl;
let topr;

let f1;
let f2;
let f3;
let f4;
let f_tot;


function setup() {
	createCanvas(1000,800);
	createDiv('<br>');
	background(40);
	stroke(250);
	strokeWeight(2);
	fill(100,100);
	//fill(250,50,50,100);
	vf = createGraphics(1000,800);
	vf.background(40);


	charge_pos = createVector(0.75*width, 0.5*height);
	charge_neg = createVector(0.25*width, 0.5*height);
	charges = [charge_pos, charge_neg];
	
		
	for (let i=1; i<width; i+=ef_step) {
		for (let j=1; j<height; j+=ef_step) {
			let p = createVector(i,j);
			ef.push(computeEF(p));
		}
	}

	box_loc = createVector(0.5*width, 0.5*height);
	box_size = 500;

	generate_bg();
	rectMode(CENTER);

}

function generate_bg() {
	vf.push();
	vf.fill(250,50,50,150);
	vf.ellipse(charge_pos.x, charge_pos.y, 30);
	vf.pop();

	vf.push();
	vf.fill(0,200,240,150);
	vf.ellipse(charge_neg.x, charge_neg.y, 30);
	vf.pop();

	// Show the Electric Field
	let count = 0;
	for (let i=1; i<width; i+=ef_step) {
		for (let j=1; j<height; j+=ef_step) {
			vf.push();
			vf.stroke(0,250,105);
			if (ef[count].magSq()<5000) {
				vf.line(i, j, i+ef[count].x, j+ef[count].y);
				vf.push();
				vf.fill(0,250,105);
				var ang = ef[count].heading()
				var offset = 3;
				vf.translate(i+ef[count].x, j+ef[count].y);
				vf.rotate(ang+HALF_PI);
				vf.triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2);
				vf.pop();
			}
			vf.pop();
			count++;
		}
	}
}

function draw() {
	background(40);
	image(vf,0,0);

	col_out = color(255,0,0,150);
	col_in = color(0,200,240, 150);

	fill(lerpColor(col_in, col_out, map(f_tot, -10000, 10000, 0, 1)));
	rect(box_loc.x, box_loc.y, box_size, box_size);
	push();
	botl = createVector(box_loc.x - box_size/2, box_loc.y + box_size/2, 0);
	botr = createVector(box_loc.x + box_size/2, box_loc.y + box_size/2, 0);
	topr = createVector(box_loc.x + box_size/2, box_loc.y - box_size/2, 0);
	topl = createVector(box_loc.x - box_size/2, box_loc.y - box_size/2, 0);

	//console.log(botl,botr);
	col_out = color(255,0,0);
	col_in = color(0,200,240);
	strokeWeight(8);

	//var f1 = map(flux(botl, botr),-10000, 10000, 0, 1);
	stroke(lerpColor(col_in, col_out, f1));
	line(botl.x, botl.y, botr.x, botr.y);

	//var f2 = map(flux(botr, topr),-10000, 10000, 0, 1);
	stroke(lerpColor(col_in, col_out, f2));
	line(botr.x, botr.y, topr.x, topr.y);

	//var f3 = map(flux(topr, topl),-10000, 10000, 0, 1);
	stroke(lerpColor(col_in, col_out, f3));
	line(topr.x, topr.y, topl.x, topl.y);

	//var f4 = map(flux(topl, botl),-10000, 10000, 0, 1);
	stroke(lerpColor(col_in, col_out, f4));
	line(topl.x, topl.y, botl.x, botl.y);


	//noStroke();
	//f5 = map(flux(botl,botr)+flux(botr,topr)+flux(topr,topl)+flux(topl,botl), -10000, 10000, 0, 1);
	//mycolor = lerpColor(col_in,col_out,f5);
	//mycolor.setAlpha(32);
	//fill(mycolor);
	//rect(box_loc.x, box_loc.y, box_size, box_size);

	pop();
	//console.log(flux(botl,botr));
}

function flux(p1,p2) {
	var f = 0;
	var numsteps = 200;
	var step = p2.copy().sub(p1).div(numsteps);
	var cur = p1.copy().add(step);
	var A = step.cross(createVector(0,0,-1)).normalize();
	for (let i=0; i<numsteps; i+=1) {
		f += computeEF(cur).dot(A);
		cur = cur.add(step)
	}
	return f
}

function computeEF(p) {
	f = createVector(0,0);
	charges.forEach( function(charge) {
		if (charge==charge_neg) {
			f.add(p5.Vector.sub(p,charge).normalize().mult(-ef_scale/(pow(p.dist(charge),2))));
		} else {
			f.add(p5.Vector.sub(p,charge).normalize().mult(ef_scale/(pow(p.dist(charge),2))));
		}
	});
	return f;
}

function mouseWheel(event) {
	box_size += event.delta;
	f_tot= flux(botl,botr) + flux(botr,topr) + flux(topl,topl) + flux(topl,botl);
	console.log(f_tot)
	f1 = map(flux(botl, botr),-5000, 5000, 0, 1);
	f2 = map(flux(botr, topr),-5000, 5000, 0, 1);
	f3 = map(flux(topr, topl),-5000, 5000, 0, 1);
	f4 = map(flux(topl, botl),-5000, 5000, 0, 1);
}

function mouseDragged() {
	box_loc = createVector(mouseX, mouseY);
	f_tot= flux(botl,botr) + flux(botr,topr) + flux(topl,topl) + flux(topl,botl);
	console.log(f_tot)
	f1 = map(flux(botl, botr),-5000, 5000, 0, 1);
	f2 = map(flux(botr, topr),-5000, 5000, 0, 1);
	f3 = map(flux(topr, topl),-5000, 5000, 0, 1);
	f4 = map(flux(topl, botl),-5000, 5000, 0, 1);
}


