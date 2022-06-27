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

    this.concrete = new Image();
    this.concrete.src = "../images/concrete.png";
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

        if (tile === 8) {
          this.#drawConcrete(
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

  getStone() {
    for (let row = 0; row < maps[0].length; row++) {
      for (let column = 0; column < maps[0][row].length; column++) {
        let tile = maps[0][row][column];
        if (tile === 9) {
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

  getKey() {
    for (let row = 0; row < maps[0].length; row++) {
      for (let column = 0; column < maps[0][row].length; column++) {
        let tile = maps[0][row][column];
        if (tile === 7) {
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

  getCrab() {
    for (let row = 0; row < maps[0].length; row++) {
      for (let column = 0; column < maps[0][row].length; column++) {
        let tile = maps[0][row][column];
        if (tile === 10) {
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

  getShark() {
    for (let row = 0; row < maps[0].length; row++) {
      for (let column = 0; column < maps[0][row].length; column++) {
        let tile = maps[0][row][column];
        if (tile === 11) {
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

        if (tile === 12) {
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

  checkWallCollision(yPosition, xPosition) {
    if (
      maps[0][xPosition][yPosition] === 1 ||
      maps[0][xPosition][yPosition] === 5 ||
      maps[0][xPosition][yPosition] === 6 ||
      maps[0][xPosition][yPosition] === 8
    ) {
      collision = true;
      return true;
    } else {
      collision = false;
    }
  }

  checkPlatform(yPosition, xPosition, impact, ball) {
    if (maps[0][xPosition][yPosition] !== 2) {
      if (
        (maps[0][xPosition][yPosition] === 3 ||
          maps[0][xPosition][yPosition] === 10 ||
          maps[0][xPosition][yPosition] === 11 ||
          maps[0][xPosition][yPosition] === 12) &&
        impact === true
      ) {
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
    if (
      maps[0][xPosition][yPosition] === 4 ||
      maps[0][xPosition][yPosition] === 9
    ) {
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
        if (
          maps[0][xPosition + 1][yPosition] === 4 &&
          maps[0][xPosition + 1][yPosition] === 9
        ) {
          collision = false;
        } else {
          collision = true;
        }
      }

      if (maps[0][xPosition + 1][yPosition] === 3) {
        if (
          maps[0][xPosition][yPosition] === 4 ||
          maps[0][xPosition][yPosition] === 9
        ) {
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
      if (maps[0][item.x][item.y] === 0 || maps[0][item.x][item.y] === 8) {
        maps[0][item.x][item.y] = 2;
      }

      if (maps[0][item.x][item.y] === 4) {
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

      if (maps[0][item.x][item.y] === 9) {
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

      if (maps[0][item.x][item.y] === 3) {
        player.exploded = true;
      }

      if (maps[0][item.x][item.y] === 7) {
        key.exploded = true;
      }

      if (maps[0][item.x][item.y] === 10) {
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

      if (maps[0][item.x][item.y] === 11 || maps[0][item.x][item.y] === 12) {
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

  checkKeyPlatform(yPosition, xPosition) {
    if (
      maps[0][xPosition][yPosition] === 2 ||
      maps[0][xPosition][yPosition] === 3
    ) {
      return false;
    } else {
      return true;
    }
  }

  checkSharkCollision(yPosition, xPosition) {
    if (maps[0][yPosition][xPosition] !== 2) {
      return true;
    } else {
      return false;
    }
  }

  assignCanvasSize(canvas) {
    canvas.width = maps[0][0].length * this.tileWidth;
    canvas.height = maps[0].length * this.tileHeight + this.tileHeight;
  }
}
