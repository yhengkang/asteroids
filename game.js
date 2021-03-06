(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship([Game.DIM_X/2,Game.DIM_Y/2], [0,0],
                                    Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR);
    this.score = 0;
  };

  Game.DIM_X = 1200;
  Game.DIM_Y = 800;
  Game.FPS = 30;
  Game.MAX_ASTEROIDS = 15;

  Game.prototype.addAsteroids = function(numAsteroids) {
    for(var i = 0; i < numAsteroids; i++) {
     this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y))
    }
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var that = this;
    this.asteroids.forEach( function(asteroid) {
      asteroid.draw(that.ctx);
    });
    this.bullets.forEach( function(bullet) {
      bullet.draw(that.ctx);
    });
    this.ship.draw(this.ctx);
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
    this.checkAsteroidsNumbers();
  }

  Game.prototype.start = function () {
    this.addAsteroids(Game.MAX_ASTEROIDS);
    this.bindKeyHandlers();
    handle = setInterval(this.step.bind(this), Game.FPS);
  }

  Game.prototype.stopOnCollision = function() {
    clearInterval(handle);
    return alert("Game Over! Your score was " + Math.floor(this.score))
  }

  Game.prototype.checkCollisions = function() {
    var that = this;
    this.asteroids.forEach(function (asteroid) {
      if (asteroid.isCollidedWith(that.ship)){
        that.stopOnCollision();
      }
      that.bullets.forEach(function (bullet) {
        if (bullet.isCollidedWith(asteroid)){
          that.asteroids = that.asteroids.concat(asteroid.split());
          that.removeAsteroid(asteroid);
          that.removeBullet(bullet);
        }
      });

    });
  }

  Game.prototype.checkBoundary = function() {
    var that = this;
    this.asteroids.forEach(function (asteroid) {
      if ( asteroid.outOfBounds() ) {
        asteroid.pacman();
      }
    });
    this.bullets.forEach(function (bullet){
      if ( bullet.outOfBounds() ) {
        that.removeBullet(bullet);
        // bullet.pacman();
      }
    })
    if ( this.ship.outOfBounds() ) {
      that.ship.pacman();
    }
  }

  Game.prototype.checkAsteroidsNumbers = function() {
    if(this.asteroids.length < Game.MAX_ASTEROIDS) {
      this.addAsteroids(Game.MAX_ASTEROIDS - this.asteroids.length);
    }
  }

  Game.prototype.bindKeyHandlers = function() {
    var that = this;

    key('w', function(){ that.ship.foward(5); });
    key('a', function(){ that.ship.rotate(-15); });
    key('d', function(){ that.ship.rotate(15); });
    key('s', function(){ that.ship.foward(-2); });
    key('j', function(){ that.fireBullet(); });
  }

  Game.prototype.fireBullet = function() {
    var addBullet = this.ship.fireBullet();

    if(addBullet !== undefined) {
      this.bullets.push(addBullet);
    }
  }

  Game.prototype.removeAsteroid = function(asteroid) {
    this.score += asteroid.radius;
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  }

  Game.prototype.removeBullet = function(bullet) {
    this.bullets.splice(this.bullets.indexOf(bullet), 1);
  }

})(this);

