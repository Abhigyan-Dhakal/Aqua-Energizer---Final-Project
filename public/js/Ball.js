class Ball {
  constructor(
    x,
    y,
    width,
    height,
    tileMap,
    column,
    row,
    impact,
    levelingUp,
    exploded
  ) {
    // Assign class parameters to the object's property
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.column = column;
    this.row = row;
    this.impact = impact;
    this.levelingUp = levelingUp;
    this.exploded = exploded;

    // Creating image object and assigning source for ball
    this.ball = new Image();
    this.ball.src = BALL_IMG;

    // Set interval to move the ball vertically
    setInterval(() => {
      this.moveVertically();
    }, BALL_GRAVITY);
  }

  draw(context) {
    !this.exploded
      ? context.drawImage(this.ball, this.x, this.y, this.width, this.height)
      : null;
  }

  moveVertically() {
    if (!this.levelingUp) {
      if (
        !this.tileMap.checkPlatform(
          this.x / this.width,
          this.y / this.height + 1,
          this.impact,
          this
        )
      ) {
        // Set impact to true if no platform
        this.impact = true;
        activeLevel[this.y / this.height][this.x / this.width] = EMPTY_ID;
        activeLevel[this.y / this.height + 1][this.x / this.width] = BALL_ID;
        this.y = (this.y / this.height + 1) * this.height;
      } else {
        // Set impact to false on finding any platform
        this.impact = false;
        if (activeLevel[this.y / this.height + 1][this.x / this.width] !== 5) {
          if (this.exploded) {
            activeLevel[this.y / this.height][this.x / this.width] = EMPTY_ID;
          } else {
            activeLevel[this.y / this.height][this.x / this.width] = BALL_ID;
          }
        } else {
          // Undraw image on going through portal and filter out the ball object from the array
          context.clearRect(this.x, this.y, this.width, this.height);
          activeLevel[this.y / this.height][this.x / this.width] = EMPTY_ID;
          balls = balls.filter((item) => {
            return item.x !== this.x && item.y !== this.y;
          });
        }
      }
    }
    this.checkLevelUp();
  }

  // Function to check level up status
  checkLevelUp() {
    // Identify coordinate of portal in map
    for (let row = 0; row < activeLevel.length; row++) {
      for (let column = 0; column < activeLevel[row].length; column++) {
        let tile = activeLevel[row][column];
        if (tile === PORTAL_ID) {
          portalCoordinate = [column, row];
        }
      }
    }

    // Set game state to level up on empty balls array and player position above portal
    if (balls.length === 0) {
      if (
        activeLevel[portalCoordinate[1] - 1][portalCoordinate[0]] === PLAYER_ID
      ) {
        activeLevel[portalCoordinate[1] - 1][portalCoordinate[0]] = 2;
        levelId++;
        let gameData = {
          levelId: levelId,
          lives: lives,
          state: 2,
        };

        // Set current game data and state to localstorage
        localStorage.setItem("gameData", JSON.stringify(gameData));
        window.location.reload(false);
      }
    }
  }
}
