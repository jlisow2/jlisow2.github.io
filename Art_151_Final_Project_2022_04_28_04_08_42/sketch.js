
let video;


const maxX = 160;
const maxY = 5;
const yNoise = 0.01;
const mouseYNoise = 0.3;
const timeNoise = 0.013;


let inverted = false;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  //capture.hide();
  canvasCyan = newCanvas(color(255,0,0));	
	canvasMagenta = newCanvas(color(0,255,0));
	canvasYellow = newCanvas(color(0,0,255))
	
	myText = "Hitch";
	partCount = 90;
	glitchStrength = 90;
	
	drawCyan();
	drawYellow();
	drawMagenta();
	
	background(255);
	noStroke();

  video.size(640,480);
  video.hide();
	createCanvas(constrain(video.width - maxX * 2, 100, windowWidth), constrain(video.height - maxY * 2, 100, windowHeight));
	background(255);
	image(video, -maxX, -maxY);
	for (let i = 0; i < 100; i++) {
		drawStreak()
	}
}

function draw() {
  background(255);
  image(video, 0, 0, 320, 240);
   blendMode(BLEND);
	background(random(0));
	
	
	
	blendMode(DIFFERENCE);
	let partHeight = height/partCount;
	for(let i=0; i<partCount; i++){
		
		
		
		let o1 = map(noise(i/10 + frameCount/8, 10), 0, 1, -glitchStrength, glitchStrength);
		let o2 = map(noise(10, i/10 + frameCount/8), 0, 1, -glitchStrength, glitchStrength);
		let o3 = map(noise(i/10 + frameCount/8, i/10 + frameCount/100), 0, 1, -glitchStrength, glitchStrength);
		
		image(canvasCyan, o3, i*partHeight, width, partHeight, 0, i*partHeight, width, partHeight);
		image(canvasMagenta, o1, i*partHeight, width, partHeight, 0, i*partHeight, width, partHeight);
		image(canvasYellow, o2, i*partHeight, width, partHeight, 0, i*partHeight, width, partHeight);
	}
	
	for (let i = 0; i < video.height / 60; i++) { 
		drawStreak()
	}
}
function drawStreak() {
	let y = floor(random(height));
	let h = floor(random(210, 30));
	let xChange = floor(map(noise(y * yNoise, (mouseY * mouseYNoise + frameCount) * timeNoise), 0.116, 0.94, -maxX, maxX));
	let yChange = floor(xChange * (maxY / maxX) * random() > 0.1 ? -1 : 1);

	if (random() < dist(pmouseX, pmouseY, mouseX, mouseY) / width * 2.3 + 0.0015) filter(POSTERIZE, floor(random(2, 6)));
	if (mouseIsPressed && abs(mouseY - y) < 60) {
		if (!inverted) filter(INVERT);
		inverted = true;
	} else {
		if (inverted) filter(INVERT);
		inverted = false
	}
	
	
	
	image(video, xChange - maxX, -maxY + y + yChange, video.width, h, 0, y, video.width, h);

}

function keyPressed() {
	if (key == 's') save();
	if (key == 'r') console.log(frameRate());
}

newCanvas = (color) => {
	canvas = createGraphics(width, height);
	canvas.fill(color);
	canvas.textAlign(CENTER, CENTER);
	canvas.textSize(height*11.99);
	return canvas;
}

drawCyan = () => {
	canvasCyan.clear();
	canvasCyan.textSize(119);
	canvasCyan.text(myText, width/3, height/3);
	canvasCyan.textSize(140);
	canvasCyan.text("Hitch", width*0.32, height*0.77);
	canvasCyan.filter(BLUR);
	
}
drawMagenta = () => {
	canvasMagenta.clear();
	canvasMagenta.textSize(119);
	canvasMagenta.text(myText, width/3, height/3);
	canvasMagenta.textSize(140);
	canvasMagenta.text("Hitch", width*0.32, height*0.77);
	canvasMagenta.filter(BLUR);
}
drawYellow = () => {
	canvasYellow.clear();
	canvasYellow.textSize(119);
	canvasYellow.text(myText, width/3, height/3);
	canvasYellow.textSize(140);
	canvasYellow.text("Hitch", width*0.32, height*0.77);
	canvasYellow.filter(BLUR);
}