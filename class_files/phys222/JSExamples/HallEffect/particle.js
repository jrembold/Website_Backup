var Particle = function(position, charge) {
	this.acceleration = createVector(0,0);
	this.velocity = createVector(random(-1,1), 0);
	this.position = position.copy();
	this.charge = charge;
	this.mass = 20;

	this.run = function() {
		this.update();
		this.display();
	};

	this.update = function() {
		this.acceleration = computeForce(this).div(this.mass);
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
	};

	this.display = function() {
		stroke(200);
		strokeWeight(2);
		if (this.charge<0) {
			fill(0,200,240,100);
		} else {
			fill(250,50,50,100);
		}
		ellipse(this.position.x, this.position.y, 20, 20);
	};

	this.isDead = function() {
		if (this.position.x<0 || this.position.x>800) {
			return true;
		}
		return false;
	}
}
