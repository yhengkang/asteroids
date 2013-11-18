(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.RADIUS = 25;
  Asteroid.COLOR = "black";
  Asteroid.SPEED = 10;

  Asteroid.randomAsteroid = function(dimX, dimY){
    var that = this;
    return new Asteroid(
    [ (Math.random() * dimX), (Math.random() * dimY) ],
    [ ((Math.random() - Math.random()) * Asteroid.SPEED),
                 ((Math.random() - Math.random()) * Asteroid.SPEED) ],
    Asteroid.RADIUS*Math.random(),
    Asteroid.COLOR );
  };

  var randomVel = function() {
    return [ ((Math.random() - Math.random()) * Asteroid.SPEED),
             ((Math.random() - Math.random()) * Asteroid.SPEED) ];
  }

})(this);
