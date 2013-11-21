(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.MAX_RADIUS = 50;
  Asteroid.MIN_RADIUS = 20;
  Asteroid.COLOR = "black";
  Asteroid.MAX_SPEED = 15;
  Asteroid.MIN_SPEED = 10;

  Asteroid.randomAsteroid = function(dimX, dimY){
    var that = this;
    return new Asteroid(
      randomEdgePosition(dimX, dimY),
      randomVel(),
      randomSize(Asteroid.MAX_RADIUS),
      Asteroid.COLOR 
    );
  };

  var randomVel = function() {
    return [ ((Math.random() - Math.random()) * Asteroid.MAX_SPEED),
             ((Math.random() - Math.random()) * Asteroid.MAX_SPEED) ];
  }

  var randomSize = function(maxSize) {
    do {
      var radius = Math.random()*maxSize;
    } while (radius < Asteroid.MIN_RADIUS)
    return radius;
  }

  var randomEdgePosition = function(dimX, dimY) {
    var diceRoll = Math.random();
    if(diceRoll < 0.25){
      return [1, dimY*Math.random()];
    } else if (diceRoll < 0.5) {
      return [dimX-1, dimY*Math.random()];
    } else if (diceRoll < 0.75) {
      return [dimX*Math.random(), 1];
    } else {
      return [dimX*Math.random(), dimY-1];
    }
    // doesnt have to be exact edge, just has to be a little bit off edge
    // [dx, y], [-dx, y]... [x, dy], [x, -dy]....
    var randomX = Math.random()*Asteroids.Game.DIM_X;
    var randomY = Math.random()*Asteroids.Game.DIM_Y;
    
  }

  Asteroid.prototype.split = function() {
    var originX = this.posX;
    var originY = this.posY;
    var originSize = this.radius;
    return [
      new Asteroid(
        [originX, originY],
        randomVel(),
        randomSize(Math.floor(originSize/1.3)),
        Asteroid.COLOR
      ),
      new Asteroid(
        [originX, originY],
        randomVel(),
        randomSize(Math.floor(originSize/1.3)),
        Asteroid.COLOR
      )
    ];

  }

})(this);
