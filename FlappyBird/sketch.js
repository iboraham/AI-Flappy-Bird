var bird;
var pipes = []
var score = 0;

function preload() {
  bird_pic = loadImage('img/bird.png');
  background_img = loadImage('img/background.jpg');
}

function setup() {
  createCanvas(400, 600);
  resetSketch();
}

function resetSketch() {
  pipes = []
  bird = new Bird(bird_pic);
  pipes.push(new Pipe());
  //background(background_img);
  loop();
  score = 0;
}

function gameOver() {
  textSize(24);
  textAlign(CENTER, CENTER);
  text('Press Enter for Start Game', width / 2, height / 2);
  fill(0, 102, 153);
  noLoop();
}

function draw() {
  background(background_img);
  bird.update();
  bird.show();
  textSize(18);
  textAlign(LEFT, BASELINE);
  text('Score: ' + score, 0, 18);
  fill(0, 102, 153);

  if (frameCount % 50 == 0) {
    pipes.push(new Pipe());
  }

  if (bird.y >= 450) {
    if (frameCount % 40 == 0) {
      gameOver();
    }
  }
  for (var pipe of pipes) {
    var i = 0;
    pipe.show();
    pipe.update();
    if (pipe.offscreen()) {
      pipes.splice(i, 1)
    }
    if (pipe.hits(bird)) {
      bird.velocity = 0;
      bird.x = pipe.x;
      if (frameCount % 100 == 0) {
        gameOver();
      }
    }
    if (pipe.passedPipe(bird)) {
      score += 1;
    }
    i++;
  }
}

function keyPressed() {
  if (keyCode == 32) {
    bird.up();
  }
  if (keyCode == ENTER) {
    resetSketch();
  }
}