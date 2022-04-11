function Pipe() {
  var max_height = height - 116;
  this.top = random(max_height / 2);
  this.x = width;
  this.w = 64;
  pipe_gap = random(150, 200)
  this.bottom = this.top + pipe_gap
  this.speed = 4;

  this.hits = function(bird) {
    point1x = (bird.x) >= this.x && (bird.x) <= this.x + this.w;
    point1y = (bird.y) <= this.top || (bird.y) >= this.bottom;
    point1 = point1x && point1y
    point2x = (bird.x + bird.w) >= this.x && (bird.x + bird.w) <= this.x + this.w;
    point2y = (bird.y) <= this.top || (bird.y) >= this.bottom;
    point2 = point2x && point2y
    point3x = (bird.x) >= this.x && (bird.x) <= this.x + this.w;
    point3y = (bird.y + bird.w) <= this.top || (bird.y + bird.w) >= this.bottom;
    point3 = point3x && point3y
    point4x = (bird.x + bird.w) >= this.x && (bird.x + bird.w) <= this.x + this.w;
    point4y = (bird.y + bird.w) <= this.top || (bird.y + bird.w) >= this.bottom;
    point4 = point4x && point4y

    return point1 || point2 || point3 || point4;
  }

  this.show = function() {
    fill(0, 255, 0);
    smooth();
    image(imgRevPipe, this.x, 0, this.w, this.top);
    image(imgPipe, this.x, this.bottom, this.w, max_height - this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}