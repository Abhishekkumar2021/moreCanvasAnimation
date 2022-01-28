const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//ctx styles
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.shadowColor = "rgb(0,0,0,0.2)";
ctx.shadowBlur = 5;

let width = 640;
let height = 958;
const img = new Image();
img.src = "img.jpg";
img.addEventListener("load", () => {
	ctx.drawImage(
		img,
		canvas.width / 2 - width / 2,
		canvas.height / 2 - height / 2,
		width,
		height
	);
	// const scannedImage = ctx.getImageData(
	// 	canvas.width / 2 - width / 2,
	// 	canvas.height / 2 - height / 2,
	// 	canvas.width / 2 + width / 2,
	// 	canvas.height / 2 + height / 2
	// );
	// let imgArray = scannedImage.data;

	// for (let i = 0; i < imgArray.length; i += 4) {
	// 	let total = imgArray[i] + imgArray[i + 1] + imgArray[i + 2];
	// 	imgArray[i] = total / 4;
	// 	imgArray[i + 1] = total / 4;
	// 	imgArray[i + 2] = total / 4;
	// }
	// scannedImage.data = imgArray;
	// ctx.putImageData(
	// 	scannedImage,
	// 	canvas.width / 2 - width / 2,
	// 	canvas.height / 2 - height / 2
	// );
	let particles = [];
	class Particle {
		constructor() {
			this.x = Math.random() * canvas.width;
			this.y = 0;
			this.velocity = Math.random() * 50;
			this.size = Math.random() * 4 + 1;
		}
		update() {
			this.y += this.velocity;
			if (this.y > canvas.height) {
				this.y = 0;
				this.x = Math.random() * canvas.width;
			}
		}
		draw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	function init() {
		for (let i = 0; i < 1000; i++) {
			particles.push(new Particle());
		}
	}
	init();

	function animate() {
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 0.05;
		for (let i = 0; i < particles.length; i++) {
			particles[i].update();
			particles[i].draw();
		}
		requestAnimationFrame(animate);
	}
	// animate();
});

// canvas.addEventListener("mousemove", function (evt) {
// 	ctx.clearRect(evt.x - 50, evt.y - 50, 100, 100);
// });
