const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//context styles
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = "white";
context.strokeStyle = "white";

context.shadowOffsetX = 10;
context.shadowOffsetY = 10;
context.shadowColor = "rgb(0,0,0,0.2)";
context.shadowBlur = 5;
// context.globalCompositeOperation = "destination-over";
//clear full canvas
const clearCanvas = () => {
	context.clearRect(0, 0, canvas.width, canvas.height);
};

const fadeCanvas = () => {
	context.fillStyle = "rgba(46,47,48,0.25)";
	context.fillRect(0, 0, canvas.width, canvas.height);
};

let hue = 1;
//particle class
class Particle {
	constructor() {
		this.size = Math.random() * 100 + 1;
		this.x = (canvas.width - 2 * this.size) * Math.random() + this.size;
		this.y = (canvas.height - 2 * this.size) * Math.random() + this.size;
		this.color = this.randomColor();
		this.vx = Math.random() * 20 - 10;
		this.vy = Math.random() * 20 - 10;
	}
	randomColor() {
		const h = Math.random() * 360;
		const s = 50;
		const l = 50;
		return `hsl(${h},${s}%,${l}%)`;
	}
	draw() {
		context.fillStyle = this.color;
		context.fillStyle = context.beginPath();
		context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		context.fill();
	}
	moveAndShrink() {
		if (this.x >= canvas.width - this.size || this.x <= this.size) {
			this.vx = -this.vx;
		}
		if (this.y >= canvas.height - this.size || this.y <= this.size) {
			this.vy = -this.vy;
		}
		this.x += this.vx;
		this.y += this.vy;
		// if (this.size >= 0.3) this.size -= 0.1;
	}
}

//The particles array
let particles = [];

//fill 100 particles
const fillParticles = () => {
	for (let i = 0; i < 1; i++) {
		particles.push(new Particle());
	}
};

//the constellation effect
const constellation = () => {
	for (let i = 0; i < particles.length; i++) {
		for (let j = i + 1; j < particles.length; j++) {
			let deltaX = particles[j].x - particles[i].x;
			let deltaY = particles[j].y - particles[i].y;
			let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			if (distance <= 300) {
				context.strokeStyle = particles[i].color;
				context.beginPath();
				context.moveTo(particles[j].x, particles[j].y);
				context.lineTo(particles[i].x, particles[i].y);
				context.lineWidth = (particles[j].size + particles[i].size) / 10;
				context.stroke();
				context.closePath();
			}
		}
	}
};

//The bursting effect
fillParticles();

const handleParticles = () => {
	for (let particle of particles) {
		particle.moveAndShrink();
		particle.draw();
		if (particle.size < 0.3) {
			particles.splice(particles.indexOf(particle), 1);
		}
	}
};

canvas.addEventListener("click", () => {
	fillParticles();
});
// //animation
let id;
const updateParticles = (timestamp) => {
	// console.log(timestamp);
	// clearCanvas();
	// fadeCanvas();
	handleParticles();
	hue++;
	id = requestAnimationFrame(updateParticles);
};
updateParticles();
