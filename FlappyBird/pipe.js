function Pipe() {
  var max_height = height - 116;
  this.top = random(max_height / 2);
  this.x = width;
  this.w = 36;
  pipe_gap = random(120, 150)
  this.bottom = this.top + pipe_gap
  this.speed = 4;

  this.show = function() {
    fill(0, 255, 0);
    smooth();
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, max_height - this.bottom);
  }
  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    return this.x < -this.w
  }
  this.hits = function(bird) {
    y_bool = bird.y <= this.top || bird.y >= this.bottom;
    x_bool = bird.x >= this.x && bird.x <= this.x + this.w;
    return x_bool && y_bool;
  }

  this.passedPipe = function(bird) {
    return bird.x == this.x && bird.y > this.top && bird.y < this.bottom;
  }
}