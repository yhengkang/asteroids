(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship([Game.DIM_X/2,Game.DIM_Y/2], [0,0],
                                    Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR);
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function(numAsteroids) {
    for(var i = 0; i < numAsteroids; i++) {
     this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y))
    }
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ship.draw(this.ctx);
    var that = this;
    this.asteroids.forEach( function(asteroid) {
      asteroid.draw(that.ctx);
    });
    this.bullets.forEach( function(bullet) {
      bullet.draw(that.ctx);
    });
  }

  Game.prototype.move = function() {
    this.ship.move();
    this.asteroids.forEach( function(asteroid) {
      asteroid.move();
    });
    this.bullets.forEach( function(bullet) {
      bullet.move();
    });

  }

  Game.prototype.step = function() {
    this.draw();
    this.move();
    this.checkCollisions();
    this.checkBoundary();
  }

  Game.prototype.start = function () {
    this.addAsteroids(10);
    this.bindKeyHandlers();
    handle = setInterval(this.step.bind(this), Game.FPS);
  }

  Game.prototype.stopOnCollision = function() {
    clearInterval(handle);
    handle = 0;
    return alert("You suck!");
  }

  Game.prototype.checkCollisions = function() {
    var that = this;
    this.asteroids.forEach(function (asteroid) {
      if (asteroid.isCollidedWith(that.ship)){
        that.stopOnCollision();
      }
    });
  }

  Game.prototype.checkBoundary = function() {
    var that = this;
    this.asteroids.forEach(function (asteroid, idx) {
      if ((asteroid.posX > Game.DIM_X || asteroid.posX < 0 )||
          (asteroid.posY > Game.DIM_Y || asteroid.posY < 0 )) {
        that.asteroids.splice(idx, 1);
        that.addAsteroids(1);
      }
    });
  }

  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    key('w', function(){ that.ship.power(0,-5); });
    key('a', function(){ that.ship.power(-5,0); });
    key('s', function(){ that.ship.power(0, 5); });
    key('d', function(){ that.ship.power(5, 0); });
    key('j', function(){ that.fireBullet(); });
  }

  Game.prototype.fireBullet = function() {
    var addBullet = this.ship.fireBullet();

    if(addBullet !== undefined) {
      this.bullets.push(addBullet);
    }
  }

})(this);

