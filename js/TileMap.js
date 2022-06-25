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
            this
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
              row
            )
          );
        }
      }
    }
  }

  checkWallCollision(yPosition, xPosition) {
    if (maps[0][xPosition][yPosition] === 1) {
      collision = true;
      return true;
    } else {
      collision = false;
    }
  }

  checkPlatform(yPosition, xPosition) {
    if (maps[0][xPosition][yPosition] !== 2) {
      platform = true;
      return true;
    } else {
      platform = false;
      return false;
    }
  }

  checkObjectCollision(yPosition, xPosition) {
    if (maps[0][xPosition][yPosition] === 4) {
      if (maps[0][xPosition][yPosition - 1] === 3) {
        if (maps[0][xPosition][yPosition + 1] === 2) {
          collision = false;
          return true;
        } else {
          collision = true;
          return false;
        }
      }

      if (maps[0][xPosition][yPosition + 1] === 3) {
        if (maps[0][xPosition][yPosition - 1] === 2) {
          collision = false;
          return true;
        } else {
          collision = true;
          return false;
        }
      }

      if (maps[0][xPosition - 1][yPosition] === 3) {
        if (maps[0][xPosition + 1][yPosition] === 2) {
          collision = false;
          return true;
        } else {
          collision = true;
          return false;
        }
      }

      if (maps[0][xPosition + 1][yPosition] === 3) {
        if (maps[0][xPosition][yPosition] === 4) {
          collision = true;
        } else {
          collision = false;
          return false;
        }
      }
    } else {
      collision = false;
      return true;
    }
  }

  assignCanvasSize(canvas) {
    canvas.width = maps[0][0].length * this.tileWidth;
    canvas.height = maps[0].length * this.tileHeight;
  }
}
