(function (root){

  var Asteroids = root.Asteroids = ( root.Asteroids || {} );

  var Ship = Asteroids.Ship = function(pos, vel, radius, color) {
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
    // this.rotation = 
    this.orientation = 0;
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 7;
  Ship.COLOR = "red";
  Ship.BULLETSPEED = 20;

  Ship.prototype.power = function(dx, dy) {
    this.velX += dx;
    this.velY += dy;
  }

  Ship.prototype.rotate = function(angle) {
    this.orientation += angle;
  }

  Ship.prototype.foward = function(speed) {
    var radians = this.orientation*Math.PI/180;
    var dx = speed*Math.sin(radians);
    var dy = speed*Math.cos(radians);
    this.velX +=  dx;
    this.velY += -dy;
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

  Ship.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = Ship.COLOR

    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.rotate(this.orientation*Math.PI/180)
    ctx.moveTo(0,0);
    ctx.lineTo(0, -14);
    ctx.lineTo(7, 7);
    ctx.lineTo(-7, 7);
    ctx.lineTo(0, -14);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

  }

})(this);