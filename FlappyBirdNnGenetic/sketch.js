// The flappy bird environment coded by: Daniel Shiffman
// http://codingtra.in
// Code of environment for: https://youtu.be/cXgA1d_E-jY&

//Added neuroevolution process by @iboraham - github
let birds = [];
let pipes = [];
let activeBirds = [];
let counter = 0;
const generationSize = 500;
let scoreLimit = 10000;
let bestScore = 0;
// Interface elements
let speedSlider;
let speedSpan;
let generationSpan;
let bestScoreSpan;
let bestBird;
let generationCounter = 1;
let imgBird;
let imgPipe;
let imgBackground;

function preload() {
  imgBird = loadImage('img/bird.png');
  imgPipe = loadImage('img/pipe.png');
  imgBackground = loadImage('img/background.png');
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent('canvascontainer')
  setupMyCanvas();
  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
  generationSpan = select('#gen');
  bestScoreSpan = select('#ahs');
}

function setupMyCanvas() {
  for (var i = 0; i < generationSize; i++) {
    birds[i] = new Bird();
    activeBirds[i] = birds[i].copy();
  }
  pipes.push(new Pipe());
}

function draw() {
  for (let n = 0; n < speedSlider.value(); n++) {
    speedSpan.html(speedSlider.value() + 'x');
    if (counter % 75 == 0 && counter != 0) {
      pipes.push(new Pipe());
    }
    counter = counter + 1;

    // Refresh background
    background(imgBackground);

    generationSpan.html(generationCounter);

    //Show pipe and update their move in every frame
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
      // Kill the bird if hits the pipe or go down of screen
      for (let j = 0; j < activeBirds.length; j++) {
        if (pipes[i].hits(activeBirds[j]) || activeBirds[j].y >= height) {
          killBird(j);
        }
      }
    }
    for (var bird of activeBirds) {
      // Refresh bird moves
      bird.update();
      bird.show();
      //decide in every frame
      bird.decide(pipes);
      if (bird.y <= 0) {
        bird.y = 0;
      }
      if (bird.score == scoreLimit) {
        let div = createDiv('----Reached score 2k---- ').size(400, 100);
        div.html('bestScore reached at generation:' + generationCounter, true);
        noLoop();
      }
      if (activeBirds.length == 1) {
        if (bird.score > bestScore) {
          bestBird = bird.copy();
          bestScore = bird.score;
          bestScoreSpan.html(bestScore);
          //console.log(bestScore, generationCounter);
        }
      }
    }
  }
  if (activeBirds.length == 0) {
    createGeneration();
    generationCounter++;
    setupMyCanvas();
  }
}

function killBird(i) {
  activeBirds.splice(i, 1)
}