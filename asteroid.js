(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.AVERAGE_RADIUS = 25;
  Asteroid.MIN_RADIUS = 10;
  Asteroid.COLOR = "black";
  Asteroid.SPEED = 10;

  Asteroid.randomAsteroid = function(dimX, dimY){
    var that = this;
    return new Asteroid(
    [ (Math.random() * dimX), (Math.random() * dimY) ],
      randomVel(),
      randomSize(),
      Asteroid.COLOR );
  };

  var randomVel = function() {
    return [ ((Math.random() - Math.random()) * Asteroid.SPEED),
             ((Math.random() - Math.random()) * Asteroid.SPEED) ];
  }

  var randomSize = function() {
    var radius = Math.random()*Asteroid.AVERAGE_RADIUS;
    while( radius < Asteroid.MIN_RADIUS ){
      radius = Math.random()*Asteroid.AVERAGE_RADIUS;
    }
    return radius;
  }

})(this);
