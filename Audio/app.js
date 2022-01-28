const audio = new Audio("Goblin.mp3");

const audioCtx = new window.AudioContext();
console.log(audioCtx);

document.querySelector("button").addEventListener("click", () => {
	audio.play();
	audio.addEventListener("playing", () => {
		console.log("started playing");
	});
	audio.addEventListener("ended", () => {
		console.log("ended playing");
	});

	// const osscilator = audioCtx.createOscillator();
	// osscilator.connect(audioCtx.destination);
	// osscilator.type = "sine";
	// osscilator.start();
	// setTimeout(() => osscilator.stop(), 1000);
});
