let bird;
let pipes = []
let score = 0;
let freeze;

function preload() {
  bird_pic = loadImage('img/bird.png');
  background_img = loadImage('img/background.jpg');
  pipe_img = loadImage('img/pipe.png');
  rev_pipe_img = loadImage('img/rev_pipe.png')
}

function setup() {
  createCanvas(400, 600);
  resetSketch();
}

function resetSketch() {
  pipes = []
  bird = new Bird(bird_pic);
  loop();
  score = 0;
  freeze = 0;
}

function gameOver() {
  textSize(24);
  textAlign(CENTER, CENTER);
  text('Game Over! \nPress Enter for Start Game!', width / 2, height / 2);
  fill(0, 102, 153);
  frameCount = 0;
  noLoop();
}

function draw() {

  if (frameCount % 70 == 0) {
    pipes.push(new Pipe());
  }

  background(background_img);
  bird.update();
  bird.show();
  textSize(18);
  textAlign(LEFT, BASELINE);
  text('Score: ' + score, 0, 18);
  fill(0, 102, 153);

  check_pipes()

}

function check_pipes() {
  for (var pipe of pipes) {
    pipe.show();
  }
  var flag = 0;
  for (var pipe of pipes) {
    if (pipe.hits(bird)) {
      flag++;
    }
  }
  for (var pipe of pipes) {
    var i = 0;
    if (flag == 0 && freeze == 0) {
      pipe.update();
    }
    if (pipe.offscreen()) {
      pipes.splice(i, 1)
    }
    if (pipe.hits(bird)) {
      freeze = 1;
      bird.velocity = 3;
    }
    if (pipe.passedPipe(bird)) {
      score += 1;
    }
    i++;
  }
}

function keyPressed() {
  if (keyCode == 32 && freeze == 0) {
    bird.up();
  }
  if (keyCode == ENTER) {
    resetSketch();
  }
}