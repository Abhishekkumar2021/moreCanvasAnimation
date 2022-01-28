const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let firstTime = true;
let id;
function doSomething() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.shadowOffsetX = 25;
	ctx.shadowOffsetY = 25;
	ctx.shadowColor = "rgb(0,0,0,0.05)";
	ctx.shadowBlur = 20;
	function randomColor() {
		const h = Math.random() * 360;
		const s = 50;
		const l = 50;
		return `hsl(${h},${s}%,${l}%)`;
	}
	class Particle {
		constructor() {
			this.t = 0;
			this.x = 0;
			this.y = 0;
			this.theta = (Math.random() * Math.PI - 0.2) / 2 + 0.1 || 0.1;
			this.speed = Math.random() * 145 + 5;
			this.ux = this.speed * Math.cos(this.theta);
			this.uy = this.speed * Math.sin(this.theta);
			this.size = 25;
			this.vx = this.ux;
			this.vy = this.uy;
			this.T = (2 * this.uy) / 9.81;
			this.color = randomColor();
		}
		draw() {
			ctx.save();
			ctx.translate(0, canvas.height);
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.restore();
		}
		update() {
			this.x = this.ux * this.t;
			this.y = -(this.uy * this.t - (9.81 / 2) * this.t * this.t);
			this.vx = this.ux;
			this.vy = this.uy - 9.81 * this.t;
		}
	}
	let particles = [];
	for (let i = 0; i < 100; i++) {
		particles.push(new Particle());
	}

	function move() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let particle of particles) {
			particle.t += 0.1;
			particle.update();
			particle.draw();
			if (particle.t > particle.T)
				particles.splice(particles.indexOf(particle), 1);
		}
		id = requestAnimationFrame(move);
		if (particles.length === 0) {
			particles.splice(0, 1);
			cancelAnimationFrame(id);
			doSomething();
		}
	}
	move();
}

window.addEventListener("load", () => {
	doSomething();
});
window.addEventListener("resize", () => {
	cancelAnimationFrame(id);
	doSomething();
});
