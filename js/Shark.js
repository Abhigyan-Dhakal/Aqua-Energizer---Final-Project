class Shark {
  constructor(x, y, width, height, tileMap, exploded, horizontal) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.exploded = exploded;
    this.horizontal = horizontal;

    this.shark = new Image();

    if (this.horizontal === true) {
      this.direction = movingDirection.right;
      this.shark.src = "../images/shark-right.png";
    } else {
      this.direction = movingDirection.up;
      this.shark.src = "../images/shark-up.png";
    }

    setInterval(() => {
      !this.exploded ? this.move() : null;
    }, 560);
  }

  draw(context) {
    // console.log(maps[0]);
    !this.exploded
      ? context.drawImage(this.shark, this.x, this.y, this.width, this.height)
      : (maps[0][this.y / this.height][this.x / this.width] = 2);
  }

  move() {
    if (this.horizontal) {
      if (this.direction === movingDirection.right) {
        this.shark.src = "../images/shark-right.png";
        if (
          !this.tileMap.checkSharkCollision(
            this.y / this.height,
            this.x / this.width + 1
          )
        ) {
          this.x += this.width;
          maps[0][this.y / this.height][this.x / this.width] = 11;
          maps[0][this.y / this.height][this.x / this.width - 1] = 2;
        } else {
          this.direction = movingDirection.left;
        }
      }

      if (this.direction === movingDirection.left) {
        this.shark.src = "../images/shark-left.png";
        if (
          !this.tileMap.checkSharkCollision(
            this.y / this.height,
            this.x / this.width - 1
          )
        ) {
          this.x -= this.width;
          maps[0][this.y / this.height][this.x / this.width] = 11;
          maps[0][this.y / this.height][this.x / this.width + 1] = 2;
        } else {
          this.direction = movingDirection.right;
        }
      }
    } else {
      if (this.direction === movingDirection.up) {
        this.shark.src = "../images/shark-up.png";
        if (
          !this.tileMap.checkSharkCollision(
            this.y / this.height - 1,
            this.x / this.width
          )
        ) {
          this.y -= this.height;
          maps[0][this.y / this.height][this.x / this.width] = 11;
          maps[0][this.y / this.height + 1][this.x / this.width] = 2;
        } else {
          this.direction = movingDirection.down;
        }
      }

      if (this.direction === movingDirection.down) {
        this.shark.src = "../images/shark-down.png";
        if (
          !this.tileMap.checkSharkCollision(
            this.y / this.height + 1,
            this.x / this.width
          )
        ) {
          this.y += this.height;
          maps[0][this.y / this.height][this.x / this.width] = 11;
          maps[0][this.y / this.height - 1][this.x / this.width] = 2;
        } else {
          this.direction = movingDirection.up;
        }
      }
    }
  }
}
