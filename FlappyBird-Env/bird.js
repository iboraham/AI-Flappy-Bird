function Bird(bird_pic) {
  var max_height = height - 116;
  this.y = (max_height - 100) / 2;
  this.x = 40;
  this.velocity = 0;
  this.lift = 12;
  this.gravity = 0.7;
  this.w = 32;
  this.show = function() {
    image(bird_pic, this.x, this.y, this.w * 1.4, this.w);
  }
  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    // Game over
    if (this.y >= max_height - bird.w / 2) {
      this.y = max_height - bird.w / 2;
      this.velocity = 0;
      if (frameCount % 40 == 0) {
        gameOver();
      }
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