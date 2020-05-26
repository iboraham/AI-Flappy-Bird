function Bird(decisionMaker) {
  this.y = height / 2;
  this.x = 64;

  this.gravity = 0.7;
  this.lift = -12;
  this.velocity = 0;

  if (decisionMaker instanceof SNeuralNetwork) {
    this.decisionMaker = decisionMaker.copy();
    //this.decisionMaker.mutate(mutate);
  } else {
    this.decisionMaker = new SNeuralNetwork(5);
  }

  this.score = 0;
  this.fitness = 0;


  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    this.score += 1;

  }

  this.decide = function(pipes) {
    //5 inputs
    let inputs = []
    inputs[0] = map(this.x, this.x, width, -1, 1);
    inputs[1] = map(pipes[0].top, 0, height, -1, 1);
    inputs[2] = map(pipes[0].bottom, 0, height, -1, 1);
    inputs[3] = map(this.y, 0, height, -1, 1);
    inputs[4] = map(this.velocity, -5, 5, 0, 1);
    this.decisionMaker.decide(inputs);
    decision = this.decisionMaker.outputs;
    if (decision == 1) {
      this.up();
    }
  }

  this.copy = function(bird) {
    return new Bird(this.decisionMaker);
  }

  this.bottomTop = function() {
    return (this.y > height || this.y < 0);
  }

}