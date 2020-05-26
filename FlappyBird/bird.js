function Bird(bird_pic) {
  var max_height = height - 116;
  this.y = (max_height - 100) / 2;
  this.x = 40;
  this.velocity = 0;
  this.lift = 9;
  this.gravity = 0.5;
  this.show = function() {
    fill(255);
    //image(bird_pic, this.x, this.y, 64, 64);
    rect(this.x, this.y, 64, 64);
  }
  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    // Game over
    if (this.y > height - 150) {
      this.y = height - 150;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
  this.up = function() {
    this.velocity -= this.lift;
  }
}