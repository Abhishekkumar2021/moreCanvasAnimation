const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let isFirstTime = true;
function doSomething() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const h = canvas.height;
	const w = canvas.width;
	ctx.fillStyle = "white";
	ctx.strokeStyle = "white";
	ctx.shadowOffsetX = 10;
	ctx.shadowOffsetY = 10;
	ctx.shadowBlur = 10;
	ctx.shadowColor = "rgb(0,0,0,0.2)";

	let hue = 0;

	class Circular {
		constructor() {
			this.radius = Math.random() * 400 + 20;
			this.x = this.radius;
			this.y = 0;
			this.angle = Math.random() * 2 * Math.PI;
			this.w = Math.random() * 0.1;
			this.size = Math.random() * 20 + 20;
		}
		move() {
			this.x = this.radius * Math.cos(this.angle);
			this.y = this.radius * Math.sin(this.angle);
		}
		draw() {
			ctx.save();
			ctx.translate(w / 2, h / 2);
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = `hsl(${hue},50%,50%)`;
			ctx.fill();
			ctx.restore();
		}
		shrink() {}
	}

	let points = [];
	for (let i = 0; i < 10; i++) {
		points.push(new Circular());
	}
	function constellation() {
		for (let i = 0; i < points.length; i++) {
			for (let j = i + 1; j < points.length; j++) {
				let deltaX = points[j].x - points[i].x;
				let deltaY = points[j].y - points[i].y;
				let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
				if (distance <= 100) {
					ctx.save();
					ctx.translate(w / 2, h / 2);
					ctx.beginPath();
					ctx.moveTo(points[j].x, points[j].y);
					ctx.lineTo(points[i].x, points[i].y);
					ctx.strokeStyle = `hsl(${hue},50%,50%)`;
					ctx.lineWidth = points[j].size / 10;
					ctx.stroke();
					ctx.closePath();
					ctx.restore();
				}
			}
		}
	}
	function animation() {
		ctx.clearRect(0, 0, w, h);
		for (let point of points) {
			point.angle += point.w;
			point.move();
			point.draw();
		}
		constellation();
		hue++;
		requestAnimationFrame(animation);
	}
	requestAnimationFrame(animation);
}

window.addEventListener("resize", function () {
	isFirstTime = false;
	doSomething();
});
window.addEventListener("load", () => {
	if (isFirstTime) doSomething();
});
