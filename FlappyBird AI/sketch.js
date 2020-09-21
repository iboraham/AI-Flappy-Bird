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
let actSpan;
let bestBird;
let generationCounter = 1;
let imgBird;
let imgPipe;
let imgBackground;
let maxGenerationCounter = 25;

function preload() {
  imgBird = loadImage('img/bird.png');
  imgPipe = loadImage('img/pipe.png');
  imgBackground = loadImage('img/background.jpg');
  imgRevPipe = loadImage('img/rev_pipe.png')
}

function setup() {
  let canvas = createCanvas(400, 600);
  canvas.parent('canvascontainer')
  speedSlider = select('#speedSlider');
  actSpan = select('#act');
  speedSpan = select('#speed');
  generationSpan = select('#gen');
  bestScoreSpan = select('#ahs');
  setupMyCanvas();
}

function setupMyCanvas() {
  for (var i = 0; i < generationSize; i++) {
    birds[i] = new Bird();
    activeBirds[i] = birds[i].copy();
  }
  actSpan.html(activeBirds.length);
  pipes.push(new Pipe());
}

function draw() {
  if (frameCount % 75 == 0 && frameCount != 0) {
    pipes.push(new Pipe());
  }

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
      if (pipes[i].hits(activeBirds[j]) || activeBirds[j].y >= (height - 116) - activeBirds[j].w / 2) {
        activeBirds[j].y = (height - 116) - activeBirds[j].w / 2;
        activeBirds[j].velocity = 0;
        killBird(j);
        actSpan.html(activeBirds.length);
      }
    }
  }
  for (var bird of activeBirds) {
    // Refresh bird moves
    bird.update();
    bird.show();
    // Decide in every frame
    bird.decide(pipes);
    if (bird.y <= 0) {
      bird.y = 0;
    }
    if (bird.score == scoreLimit) {
      let div = createDiv('----Reached score 10k---- ').size(400, 100);
      div.html('bestScore reached at generation:' + generationCounter, true);
      noLoop();
    }
    if (activeBirds.length == 1) {
      if (bird.score > bestScore) {
        bestBird = bird.copy();
        bestScore = bird.score;
        bestScoreSpan.html(bestScore);
      }
    }
  }

  if (activeBirds.length == 0) {
    gameOver()
  }
}

function gameOver() {
  createGeneration();
  generationCounter++;
  setupMyCanvas();
}

function killBird(i) {
  activeBirds.splice(i, 1)
}