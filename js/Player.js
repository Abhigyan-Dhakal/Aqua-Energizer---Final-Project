class Player {
  constructor(x, y, width, height, tileMap, exploded) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.xVelocity = this.x;
    this.yVelocity = this.y;
    this.exploded = exploded;

    this.player = new Image();
    this.player.src = "../images/player.png";

    document.addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "w":
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width,
              this.y / this.height - 1
            )
          ) {
            this.tileMap.checkObjectCollision(
              this.x / this.width,
              this.y / this.height - 1
            );
            if (collision === false) {
              this.y -= this.height;
              maps[0][this.y / this.height][this.x / this.width] = 3;
              maps[0][this.y / this.height + 1][this.x / this.width] = 2;
            }
          }
          break;
        case "s":
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width,
              this.y / this.height + 1
            )
          ) {
            this.tileMap.checkObjectCollision(
              this.x / this.width,
              this.y / this.height + 1
            );
            if (collision === false) {
              this.y += this.height;
              maps[0][this.y / this.height][this.x / this.width] = 3;
              maps[0][this.y / this.height - 1][this.x / this.width] = 2;
            }
          }
          break;
        case "a":
          let xPositionLeft = this.y / this.height;
          let yPositionLeft = this.x / this.width - 1;
          let nextElementLeft = maps[0][xPositionLeft][yPositionLeft];
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width - 1,
              this.y / this.height
            )
          ) {
            this.tileMap.checkObjectCollision(
              this.x / this.width - 1,
              this.y / this.height
            );
            if (collision === false) {
              this.x -= this.width;
              maps[0][this.y / this.height][this.x / this.width] = 3;
              maps[0][this.y / this.height][this.x / this.width + 1] = 2;

              if (nextElementLeft === 4) {
                for (let index = 0; index < balls.length; index++) {
                  if (
                    xPositionLeft * balls[index].height === balls[index].y &&
                    yPositionLeft * balls[index].width === balls[index].x
                  ) {
                    balls[index].x = balls[index].x - balls[index].width;
                    maps[0][this.y / this.height][this.x / this.width - 1] = 4;
                  }
                }
              }

              if (nextElementLeft === 9) {
                for (let index = 0; index < stones.length; index++) {
                  if (
                    xPositionLeft * stones[index].height === stones[index].y &&
                    yPositionLeft * stones[index].width === stones[index].x
                  ) {
                    stones[index].x = stones[index].x - stones[index].width;
                    maps[0][this.y / this.height][this.x / this.width - 1] = 9;
                  }
                }
              }
            }
          }

          break;
        case "d":
          let xPositionRight = this.y / this.height;
          let yPositionRight = this.x / this.width + 1;
          let nextElementRight = maps[0][xPositionRight][yPositionRight];
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width + 1,
              this.y / this.height
            )
          ) {
            this.tileMap.checkObjectCollision(
              this.x / this.width + 1,
              this.y / this.height
            );
            if (collision === false) {
              this.x += this.width;
              maps[0][this.y / this.height][this.x / this.width] = 3;
              maps[0][this.y / this.height][this.x / this.width - 1] = 2;
              if (nextElementRight === 4) {
                for (let index = 0; index < balls.length; index++) {
                  if (
                    xPositionRight * balls[index].height === balls[index].y &&
                    yPositionRight * balls[index].width === balls[index].x
                  ) {
                    balls[index].x = balls[index].x + balls[index].width;
                    maps[0][this.y / this.height][this.x / this.width + 1] = 4;
                  }
                }
              }

              if (nextElementRight === 9) {
                for (let index = 0; index < stones.length; index++) {
                  if (
                    xPositionRight * stones[index].height === stones[index].y &&
                    yPositionRight * stones[index].width === stones[index].x
                  ) {
                    stones[index].x = stones[index].x + stones[index].width;
                    maps[0][this.y / this.height][this.x / this.width + 1] = 9;
                  }
                }
              }
            }
          }
          break;
      }
    });
  }

  draw(context) {
    !this.exploded
      ? context.drawImage(this.player, this.x, this.y, this.width, this.height)
      : this.gameOver();
  }

  gameOver() {
    console.log("Game Over");
  }
}
