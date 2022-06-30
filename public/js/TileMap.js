class TileMap {
  /**
   * Creates a tile map as a platform for game elements in the canvas
   * and executes during the game state. TileMap class renders all
   * the game elemnts during the gameplay, contains functinos for creating
   * different game instances, functions for collision and platform detection
   * of game elements, explosions and game informations.
   *
   * @param {Number} tileHeight - Height of individual tile
   * @param {Number} tileWidth - Width of individual tile
   * @param {Object} context - Canvas 2d context
   */
  constructor(tileHeight, tileWidth, context) {
    this.tileHeight = tileHeight;
    this.tileWidth = tileWidth;
    this.context = context;

    // Creating image objects and assigning source for game items
    this.sand = new Image();
    this.sand.src = SAND_IMG;

    this.wall = new Image();
    this.wall.src = WALL_IMG;

    this.portal = new Image();
    this.portal.src = PORTAL_IMG;

    this.door = new Image();
    this.door.src = DOOR_IMG;

    this.concrete = new Image();
    this.concrete.src = CONCRETE_IMG;

    this.teleport = new Image();
    this.teleport.src = TELEPORT_IMG;

    this.info = new Image();

    this.deductOxygen();
  }

  draw() {
    this.context.globalCompositeOperation = "destination-over";
    this.checkOxygen();
    this.drawInfo();

    this.context.drawImage(
      this.info,
      0 * this.tileWidth,
      ROW_LENGTH * this.tileHeight,
      COL_LENGTH * this.tileWidth,
      this.tileHeight
    );
    this.info.src = "../images/level-info.png";

    // For loop to iterate through map (2D-array) and call draw function for respective item-id
    for (let row = 0; row < activeLevel.length; row++) {
      for (let column = 0; column < activeLevel[row].length; column++) {
        let tile = activeLevel[row][column];

        if (tile === SAND_ID) {
          this.#drawSand(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }
        if (tile === WALL_ID) {
          this.#drawWall(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === PORTAL_ID) {
          this.#drawPortal(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === DOOR_ID) {
          this.#drawDoor(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === CONCRETE_ID) {
          this.#drawConcrete(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === TELEPORT_ID) {
          this.#drawTeleport(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }
      }
    }
  }

  // Private functions to draw images on the respective tile based on the coordinates in 2D-array
  #drawWall(context, column, row, width, height) {
    context.drawImage(
      this.wall,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawSand(context, column, row, width, height) {
    context.drawImage(
      this.sand,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawPortal(context, column, row, width, height) {
    context.drawImage(
      this.portal,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawDoor(context, column, row, width, height) {
    context.drawImage(
      this.door,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawConcrete(context, column, row, width, height) {
    context.drawImage(
      this.concrete,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawTeleport(context, column, row, width, height) {
    context.drawImage(
      this.teleport,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  // Function to create new player object on map
  getPlayer() {
    for (let row = 0; row < activeLevel.length; row++) {
      for (let column = 0; column < activeLevel[row].length; column++) {
        let tile = activeLevel[row][column];
        if (tile === PLAYER_ID) {
          return new Player(
            column * this.tileWidth,
            row * this.tileHeight,
            this.tileWidth,
            this.tileHeight,
            this,
            false
          );
        }
      }
    }
  }

  // Function to create ball objects and push each ball in an array
  getBall() {
    for (let row = 0; row < activeLevel.length; row++) {
      for (let column = 0; column < activeLevel[row].length; column++) {
        let tile = activeLevel[row][column];
        if (tile === BALL_ID) {
          balls.push(
            new Ball(
              column * this.tileWidth,
              row * this.tileHeight,
              this.tileWidth,
              this.tileHeight,
              this,
              column,
              row,
              false,
              false,
              false
            )
          );
        }
      }
    }
  }

  // Function to create stone objects and push each stone in an array
  getStone() {
    for (let row = 0; row < activeLevel.length; row++) {
      for (let column = 0; column < activeLevel[row].length; column++) {
        let tile = activeLevel[row][column];
        if (tile === STONE_ID) {
          stones.push(
            new Stone(
              column * this.tileWidth,
              row * this.tileHeight,
              this.tileWidth,
              this.tileHeight,
              this,
              column,
              row,
              false,
              false
            )
          );
        }
      }
    }
  }

  // Function to create key object and push it in an array
  getKey() {
    for (let row = 0; row < activeLevel.length; row++) {
      for (let column = 0; column < activeLevel[row].length; column++) {
        let tile = activeLevel[row][column];
        if (tile === KEY_ID) {
          keys.push(
            new Key(
              column * this.tileWidth,
              row * this.tileHeight,
              this.tileWidth,
              this.tileHeight,
              this,
              false,
              false
            )
          );
        }
      }
    }
  }

  // Function to create crab objects and push each crab in an array
  getCrab() {
    for (let row = 0; row < activeLevel.length; row++) {
      for (let column = 0; column < activeLevel[row].length; column++) {
        let tile = activeLevel[row][column];
        if (tile === CRAB_ID) {
          crabs.push(
            new Crab(
              column * this.tileWidth,
              row * this.tileHeight,
              this.tileWidth,
              this.tileHeight,
              this,
              false
            )
          );
        }
      }
    }
  }

  // Function to create shark objects and push each shark in an array
  getShark() {
    for (let row = 0; row < activeLevel.length; row++) {
      for (let column = 0; column < activeLevel[row].length; column++) {
        let tile = activeLevel[row][column];
        // Create object of vertically moving shark
        if (tile === SHARK_UP_ID) {
          sharks.push(
            new Shark(
              column * this.tileWidth,
              row * this.tileHeight,
              this.tileWidth,
              this.tileHeight,
              this,
              false,
              true
            )
          );
        }

        // Create object of horizontally moving shark
        if (tile === SHARK_RIGHT_ID) {
          sharks.push(
            new Shark(
              column * this.tileWidth,
              row * this.tileHeight,
              this.tileWidth,
              this.tileHeight,
              this,
              false,
              false
            )
          );
        }
      }
    }
  }

  // Function to check wall collision of game elements
  checkWallCollision(yPosition, xPosition) {
    if (
      activeLevel[xPosition][yPosition] === WALL_ID ||
      activeLevel[xPosition][yPosition] === PORTAL_ID ||
      activeLevel[xPosition][yPosition] === DOOR_ID ||
      activeLevel[xPosition][yPosition] === CONCRETE_ID
    ) {
      collision = true;
      return true;
    } else {
      collision = false;
    }
  }

  // Function to check the platform the game objects are lying over
  checkPlatform(yPosition, xPosition, impact, ball) {
    // Call explode function if falling object has impact set to true and collides with enemy/player
    if (
      activeLevel[xPosition][yPosition] !== EMPTY_ID &&
      activeLevel[xPosition][yPosition] !== TELEPORT_ID
    ) {
      if (
        (activeLevel[xPosition][yPosition] === PLAYER_ID ||
          activeLevel[xPosition][yPosition] === CRAB_ID ||
          activeLevel[xPosition][yPosition] === SHARK_UP_ID ||
          activeLevel[xPosition][yPosition] === SHARK_RIGHT_ID) &&
        impact === true
      ) {
        this.explodeObjects(yPosition, xPosition, ball);
      }

      // Set leveling up status to true if platform is portal
      if (activeLevel[xPosition][yPosition] === PORTAL_ID) {
        ball.levelingUp = true;
      }
      return true;
    } else {
      return false;
    }
  }

  // Function to check the collision of game objects in the map
  checkObjectCollision(yPosition, xPosition) {
    if (
      activeLevel[xPosition][yPosition] === BALL_ID ||
      activeLevel[xPosition][yPosition] === STONE_ID
    ) {
      // Set the collision to false if no game element is present in next tile else false
      if (activeLevel[xPosition][yPosition - 1] === PLAYER_ID) {
        if (activeLevel[xPosition][yPosition + 1] === EMPTY_ID) {
          collision = false;
        } else {
          collision = true;
        }
      }

      if (activeLevel[xPosition][yPosition + 1] === PLAYER_ID) {
        if (activeLevel[xPosition][yPosition - 1] === EMPTY_ID) {
          collision = false;
        } else {
          collision = true;
        }
      }

      // Condition to identify the collision of player ball and stone
      if (activeLevel[xPosition - 1][yPosition] === PLAYER_ID) {
        if (
          activeLevel[xPosition + 1][yPosition] === BALL_ID &&
          activeLevel[xPosition + 1][yPosition] === STONE_ID
        ) {
          collision = false;
        } else {
          collision = true;
        }
      }

      if (activeLevel[xPosition + 1][yPosition] === PLAYER_ID) {
        if (
          activeLevel[xPosition][yPosition] === BALL_ID ||
          activeLevel[xPosition][yPosition] === STONE_ID
        ) {
          collision = true;
        } else {
          collision = false;
        }
      }
    } else {
      let playerMovingAudio = new Audio("../audio/player-moving.mp3");
      playerMovingAudio.play();
      collision = false;
      return true;
    }
  }

  // Function to create explosion on 3x3 tile from point of impact
  explodeObjects(yPosition, xPosition) {
    let explodeAudio = new Audio("../audio/explode.mp3");
    explodeAudio.play();
    // Coordinates of the tiles to be exploded
    let explosionArea = [
      { x: xPosition - 1, y: yPosition - 1 },
      { x: xPosition - 1, y: yPosition },
      { x: xPosition - 1, y: yPosition + 1 },
      { x: xPosition, y: yPosition - 1 },
      { x: xPosition, y: yPosition },
      { x: xPosition, y: yPosition + 1 },
      { x: xPosition + 1, y: yPosition - 1 },
      { x: xPosition + 1, y: yPosition },
      { x: xPosition + 1, y: yPosition + 1 },
    ];

    // Map through explosion coordinates to remove game objects/elements in the coordinate
    explosionArea.map((item) => {
      if (
        activeLevel[item.x][item.y] === SAND_ID ||
        activeLevel[item.x][item.y] === CONCRETE_ID
      ) {
        activeLevel[item.x][item.y] = EMPTY_ID;
      }

      // Set exploded property of ball to true
      if (activeLevel[item.x][item.y] === BALL_ID) {
        let explodedballs = balls.filter((ball) => {
          return (
            ball.x === item.y * this.tileWidth &&
            ball.y === item.x * this.tileHeight
          );
        });
        explodedballs.map((item) => {
          item.exploded = true;
        });
      }

      // Set exploded property of Stone to true
      if (activeLevel[item.x][item.y] === STONE_ID) {
        let explodedStones = stones.filter((stone) => {
          return (
            stone.x === item.y * this.tileWidth &&
            stone.y === item.x * this.tileHeight
          );
        });
        explodedStones.map((item) => {
          item.exploded = true;
        });
      }

      // Set exploded property of player to true
      if (activeLevel[item.x][item.y] === PLAYER_ID) {
        player.exploded = true;
      }

      // Set exploded property of key to true
      if (activeLevel[item.x][item.y] === KEY_ID) {
        key.exploded = true;
      }

      // Set exploded property of crabs to true
      if (activeLevel[item.x][item.y] === CRAB_ID) {
        let explodedCrab = crabs.filter((crab) => {
          return (
            crab.x === item.y * this.tileWidth &&
            crab.y === item.x * this.tileHeight
          );
        });
        explodedCrab.map((item) => {
          item.exploded = true;
        });
      }

      // Set exploded property of sharks to true
      if (
        activeLevel[item.x][item.y] === SHARK_UP_ID ||
        activeLevel[item.x][item.y] === SHARK_RIGHT_ID
      ) {
        let explodedShark = sharks.filter((shark) => {
          return (
            shark.x === item.y * this.tileWidth &&
            shark.y === item.x * this.tileHeight
          );
        });
        explodedShark.map((item) => {
          item.exploded = true;
        });
      }
    });
  }

  // Function to check the platform of key
  checkKeyPlatform(yPosition, xPosition) {
    // Set platform to false if tile below key is player/empty
    if (
      activeLevel[xPosition][yPosition] === EMPTY_ID ||
      activeLevel[xPosition][yPosition] === PLAYER_ID
    ) {
      return false;
    } else {
      return true;
    }
  }

  checkSharkCollision(yPosition, xPosition) {
    if (
      activeLevel[yPosition][xPosition] !== EMPTY_ID &&
      activeLevel[yPosition][xPosition] !== PLAYER_ID
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Function to draw the game information/details
  drawInfo() {
    // Label for current level
    this.context.font = "18px Arial";
    this.context.fillText(levelId + 1, LEVEL_INFO_POS_X, INFO_POS_Y);
    this.context.fillStyle = "white";

    // Label for Score
    this.context.font = "18px Arial";
    this.context.fillText(levelId * SCORE_MUL, SCORE_INFO_POS_X, INFO_POS_Y);
    this.context.fillStyle = "white";

    // Label for left energy balls
    this.context.font = "18px Arial";
    this.context.fillText(`${balls.length} left`, BALL_INFO_POS_X, INFO_POS_Y);
    this.context.fillStyle = "white";

    // Label for oxygen count
    this.context.font = "18px Arial";
    this.context.fillText(oxygen, OXYGEN_INFO_POS_X, INFO_POS_Y);
    this.context.fillStyle = "white";

    // Label for player lives
    this.context.font = "18px Arial";
    this.context.fillText(lives, LIVES_INFO_POS_X, INFO_POS_Y);
    this.context.fillStyle = "white";
  }

  // Function to deduct oxygen count every second i.e. 1000ms
  deductOxygen() {
    setInterval(() => {
      oxygen -= 1;
    }, 1000);
  }

  // Function to explode player if oxygen count equals to 0
  checkOxygen() {
    oxygen === 0 ? (player.exploded = true) : null;
  }

  // Function to assign canvas size for the tileMap object
  assignCanvasSize(canvas) {
    canvas.width = activeLevel[0].length * this.tileWidth;
    canvas.height = activeLevel.length * this.tileHeight + this.tileHeight;
  }
}
