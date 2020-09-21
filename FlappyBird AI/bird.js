function Bird(decisionMaker) {

  var max_height = height - 116;
  this.y = (max_height - 100) / 2;
  this.x = 40;
  this.velocity = 0;
  this.lift = -9;
  this.gravity = 0.5;
  this.w = 32;

  this.velocity = 0;
  this.score = 0;
  this.fitness = 0;

  if (decisionMaker instanceof NeuralNetwork) {
    this.decisionMaker = decisionMaker.copy();
  } else {
    this.decisionMaker = new NeuralNetwork(5, 2, 2);
  }


  this.show = function() {
    image(imgBird, this.x, this.y, this.w * 1.4, this.w);
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    this.score += 1;
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  this.decide = function(pipes) {
    let inputs = []
    if (pipes.length != 0) {
      inputs[0] = map(this.x, this.x, width, -1, 1);
      inputs[1] = map(pipes[0].top, 0, height, -1, 1);
      inputs[2] = map(pipes[0].bottom, 0, height, -1, 1);
      inputs[3] = map(this.y, 0, height, -1, 1);
      inputs[4] = map(this.velocity, -5, 5, 0, 1);
      let decision = this.decisionMaker.predict(inputs);
      if (decision[0] > decision[1] && this.velocity >= 0) {
        this.up();
      }
    } else {
      if (counter % 15 == 0 && counter != 0) {
        this.up();
      }
    }

  }

  this.copy = function() {
    return new Bird(this.decisionMaker);
  }

  this.mutate = function() {
    this.brain.mutate(0.1);
  }


}