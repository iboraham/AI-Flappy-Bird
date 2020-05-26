// The flappy bird environment coded by: Daniel Shiffman
// http://codingtra.in
// Code for: https://youtu.be/cXgA1d_E-jY&

//Added neuroevolution process by @iboraham
let birds = [];
let pipes = [];
let activeBirds = [];
let counter = 0;
let le = 10

function setup() {
  createCanvas(640, 480);
  for (var i = 0; i < le; i++) {
    birds[i] = new Bird();
    activeBirds[i] = birds[i];
  }
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  for (var bird of activeBirds) {
    bird.update();
    bird.show();
    bird.decide(pipes);
  }

  // Kill the bird if hits the pipe
  for (let i = 0; i < pipes.length; i++) {
    for (let j = 0; j < activeBirds.length; j++) {
      if (pipes[i].hits(activeBirds[j])) {
        killBird(j);
      }
    }
  }

  // Kill bird if go down of screen
  for (let bird of activeBirds) {
    if (bird.y >= height) {
      killBird(activeBirds.indexOf(bird))
    }
  }


  if (activeBirds.length == 0) {
    birds = createGeneration(birds)
    for (var i = 0; i < bird.length; i++) {
      activeBirds[i] = birds[i];
    }
  }

  if (counter % 75 == 0 && counter != 0) {
    pipes.push(new Pipe());
  }
  counter = counter + 1;
  //console.log(frameCount);
}

function killBird(i) {
  activeBirds.splice(i, 1)
}