class TileMap {
  constructor(tileHeight, tileWidth, context) {
    this.tileHeight = tileHeight;
    this.tileWidth = tileWidth;
    this.context = context;

    this.sand = new Image();
    this.sand.src = "../images/sand.png";

    this.wall = new Image();
    this.wall.src = "../images/wall.png";

    this.portal = new Image();
    this.portal.src = "../images/portal.png";

    this.door = new Image();
    this.door.src = "../images/door.png";
  }

  draw() {
    for (let row = 0; row < maps[0].length; row++) {
      for (let column = 0; column < maps[0][row].length; column++) {
        let tile = maps[0][row][column];

        if (tile === 0) {
          this.#drawSand(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }
        if (tile === 1) {
          this.#drawWall(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === 5) {
          this.#drawPortal(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === 6) {
          this.#drawDoor(
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
    // console.log("drawing sand");
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

  getPlayer() {
    for (let row = 0; row < maps[0].length; row++) {
      for (let column = 0; column < maps[0][row].length; column++) {
        let tile = maps[0][row][column];
        if (tile === 3) {
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

  getBall() {
    for (let row = 0; row < maps[0].length; row++) {
      for (let column = 0; column < maps[0][row].length; column++) {
        let tile = maps[0][row][column];
        if (tile === 4) {
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

  checkWallCollision(yPosition, xPosition) {
    if (
      maps[0][xPosition][yPosition] === 1 ||
      maps[0][xPosition][yPosition] === 5
    ) {
      collision = true;
      return true;
    } else {
      collision = false;
    }
  }

  checkPlatform(yPosition, xPosition, impact, ball) {
    // console.log(ball);
    if (maps[0][xPosition][yPosition] !== 2) {
      if (maps[0][xPosition][yPosition] === 3 && impact === true) {
        this.explodeObjects(yPosition, xPosition, ball);
      }

      if (maps[0][xPosition][yPosition] === 5) {
        ball.levelingUp = true;
      }
      return true;
    } else {
      return false;
    }
  }

  checkObjectCollision(yPosition, xPosition) {
    if (maps[0][xPosition][yPosition] === 4) {
      if (maps[0][xPosition][yPosition - 1] === 3) {
        if (maps[0][xPosition][yPosition + 1] === 2) {
          collision = false;
        } else {
          collision = true;
        }
      }

      if (maps[0][xPosition][yPosition + 1] === 3) {
        if (maps[0][xPosition][yPosition - 1] === 2) {
          collision = false;
        } else {
          collision = true;
        }
      }

      if (maps[0][xPosition - 1][yPosition] === 3) {
        if (maps[0][xPosition + 1][yPosition] === 2) {
          collision = false;
        } else {
          collision = true;
        }
      }

      if (maps[0][xPosition + 1][yPosition] === 3) {
        if (maps[0][xPosition][yPosition] === 4) {
          collision = true;
        } else {
          collision = false;
        }
      }
    } else {
      collision = false;
      return true;
    }
  }

  explodeObjects(yPosition, xPosition) {
    // console.log(maps[0]);
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

    explosionArea.map((item) => {
      if (maps[0][item.x][item.y] === 0) {
        maps[0][item.x][item.y] = 2;
      }
      if (maps[0][item.x][item.y] === 4) {
        // console.log(item.y * this.tileWidth, item.x * this.tileHeight);
        // maps[0][item.x][item.y] = 2;
        let explodedballs = balls.filter((ball) => {
          return (
            ball.x === item.y * this.tileWidth &&
            ball.y === item.x * this.tileHeight
          );
        });
        explodedballs.map((item) => {
          item.exploded = true;
        });
        // maps[0][item.x][item.y] = 2;
        // ball.exploded = true;
      }
      if (maps[0][item.x][item.y] === 3) {
        console.log(player);
        console.log(player.exploded);
        player.exploded = true;
        console.log(player.exploded);
      }
    });
  }

  assignCanvasSize(canvas) {
    canvas.width = maps[0][0].length * this.tileWidth;
    canvas.height = maps[0].length * this.tileHeight;
  }
}
