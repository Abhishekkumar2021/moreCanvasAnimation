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
//ctx.globalCompositeOperation = "destination-over"; // The whole canvas is oppsosited
ctx.border = "2px solid red";

let hue = 0;

//clear full canvas
const clearCanvas = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

//resing the window
window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

//Drawing a sregullar polygon using lines
const drawPolygon = (x, y, n, radius, fill = false) => {
	ctx.beginPath();
	ctx.save();
	ctx.translate(x, y);
	ctx.moveTo(0, -radius);
	for (let i = 0; i < n; i++) {
		ctx.lineTo(0, -radius);
		ctx.rotate((2 * Math.PI) / n);
	}
	ctx.closePath();
	if (fill) ctx.fill();
	else ctx.stroke();
	ctx.restore();
};
// drawPolygon(100, 100, true);
// drawPolygon(6, 200);

//drawing a star , can be able to polygon also
const drawStar = (x, y, n, outer, inner, fill = false) => {
	ctx.beginPath();
	ctx.save();
	ctx.translate(x, y);
	ctx.moveTo(0, -outer);

	for (let i = 0; i < n; i++) {
		ctx.lineTo(0, -outer);
		ctx.rotate(Math.PI / n);
		ctx.lineTo(0, -inner);
		ctx.rotate(Math.PI / n);
	}
	ctx.closePath();
	if (fill) ctx.fill();
	else ctx.stroke();
	ctx.restore();
};

//to check whether I am drawing or not

let isDrawing = false;
let angle = 0;
canvas.addEventListener("mousemove", (evt) => {
	if (isDrawing) {
		ctx.save();
		ctx.translate(evt.x, evt.y);
		ctx.rotate(angle);
		ctx.fillStyle = `hsl(${360 - hue},40%,50%)`;
		drawStar(0, 0, 6, 30, 15, true);
		ctx.fillStyle = `hsl(${hue},40%,50%)`;
		ctx.rotate(-angle * 7);
		drawStar(40, 40, 5, 40, 25, true);
		ctx.restore();
		hue++;
		angle += 0.0314;
		hue %= 360;
	}
});

canvas.addEventListener("mousedown", () => {
	isDrawing = true;
});
canvas.addEventListener("mouseup", () => {
	isDrawing = false;
});
