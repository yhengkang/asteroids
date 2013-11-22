(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
    Asteroids.MovingObject.call(this, pos, vel, radius, color);

    this.randomArr = randomGen();
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.MAX_RADIUS = 60;
  Asteroid.MIN_RADIUS = 30;
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
    var asteroidArr = [];
    var numAsteroid = 0;
    if (this.radius > 50) {
      numAsteroid = 3;
    } else if (this.radius > 40) {
      numAsteroid = 2;
    }
    for (var i = 0; i < numAsteroid; i++){
      asteroidArr.push(
         new Asteroid(
          [this.posX, this.posY],
          randomVel(),
          randomSize(Math.floor(this.radius/1.3)),
          Asteroid.COLOR
        )
      );
    }
    return asteroidArr;
  }

  Asteroid.prototype.draw = function(ctx) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    var randomArr = this.randomArr;
    ctx.moveTo(this.posX, this.posY);

    //bottom middle to bottom right
    ctx.lineTo(this.posX, this.posY + this.radius*randomArr[7]); //middle
    ctx.lineTo(this.posX + this.radius/2*randomArr[0], this.posY + this.radius);
    ctx.lineTo(this.posX + this.radius/1.4*randomArr[0], this.posY + this.radius/1.4*randomArr[4]); //corner
    //bottom right to top right
    ctx.lineTo(this.posX + this.radius, this.posY + this.radius/2*randomArr[1]);
    ctx.lineTo(this.posX + this.radius*randomArr[8], this.posY); //middle
    ctx.lineTo(this.posX + this.radius, this.posY - this.radius/2*randomArr[2]);
    ctx.lineTo(this.posX + this.radius/1.4, this.posY - this.radius/1.4); //corner  
    //top right to top left
    ctx.lineTo(this.posX + this.radius/2*randomArr[3], this.posY - this.radius);
    ctx.lineTo(this.posX, this.posY - this.radius*randomArr[9]); //middle
    ctx.lineTo(this.posX - this.radius/2*randomArr[4], this.posY - this.radius);
    ctx.lineTo(this.posX - this.radius/1.4*randomArr[3], this.posY - this.radius/1.4*randomArr[2]); //corner
    //top left to bottom left
    ctx.lineTo(this.posX - this.radius, this.posY - this.radius/2*randomArr[5]);
    ctx.lineTo(this.posX - this.radius*randomArr[10], this.posY); //middle
    ctx.lineTo(this.posX - this.radius, this.posY + this.radius/2*randomArr[6]);
    ctx.lineTo(this.posX - this.radius/1.4*randomArr[5], this.posY + this.radius/1.4*randomArr[5]); //corner
    //bottom left to bottom middle
    ctx.lineTo(this.posX - this.radius/2, this.posY + this.radius);
    ctx.lineTo(this.posX, this.posY + this.radius*randomArr[7]); //original middle

    ctx.closePath();
    ctx.fill();
  }
  //generates array of 12 integers to scale by range between 1.2 to 0.8
  var randomGen = function() {
    var randomArr = [];
    for (var i = 0; i < 12; i++) {
      var diceRoll = Math.random();
      if (diceRoll > 0.7) {
        randomArr.push(1.2);
      } else if (diceRoll >= 0.5){
        randomArr.push(1.1);
      } else if (diceRoll >= 0.3) {
        randomArr.push(0.9);
      } else {
        randomArr.push(0.8);
      }
    }
    return randomArr;
  }

})(this);
