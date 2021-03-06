(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function (BaseClass) {
    function Surrogate () {};
    Surrogate.prototype = BaseClass.prototype;
    this.prototype = new Surrogate();
  };

  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.posX = pos[0];
    this.posY = pos[1];
    this.velX = vel[0];
    this.velY = vel[1];
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.move  = function() {
    this.posX += this.velX;
    this.posY += this.velY;
  }

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.posX,
      this.posY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var distance = Math.sqrt( Math.pow((this.posX - otherObject.posX),2) +
                              Math.pow((this.posY - otherObject.posY),2) );
    var radii = this.radius + otherObject.radius;
    if (radii > distance) {
      return true;
    }
    return false;
  }

  MovingObject.prototype.pacman = function() {
    var oldX = this.posX;
    var oldY = this.posY;
    this.posX = Math.abs(Asteroids.Game.DIM_X - oldX);
    this.posY = Math.abs(Asteroids.Game.DIM_Y - oldY);
  }

  MovingObject.prototype.outOfBounds = function() {
    return ((this.posX > Asteroids.Game.DIM_X || this.posX < 0 )||
           (this.posY > Asteroids.Game.DIM_Y || this.posY < 0 )); 
  }

})(this);