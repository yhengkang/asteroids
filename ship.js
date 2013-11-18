(function (root){

  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  var Ship = Asteroids.Ship = function(pos, vel, radius, color) {
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 5;
  Ship.COLOR = "red";
  Ship.BULLETSPEED = 50;

  Ship.prototype.power = function(dx, dy) {
    this.velX += dx;
    this.velY += dy;
  }

  Ship.prototype.fireBullet = function() {
    var speed = Math.sqrt( Math.pow(this.velX, 2) + Math.pow(this.velY, 2) );
    var bullet_velX = (this.velX / speed) * Ship.BULLETSPEED;
    var bullet_velY = (this.velY / speed) * Ship.BULLETSPEED;
    var bullet_vel = [ bullet_velX, bullet_velY ];
    if(this.velX !== 0 || this.velY !== 0) {
      return new Asteroids.Bullet([this.posX, this.posY], bullet_vel, 2, "red");
    }
  }
})(this);