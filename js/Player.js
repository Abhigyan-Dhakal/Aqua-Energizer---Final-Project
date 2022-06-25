class Player {
  constructor(x, y, width, height, tileMap) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.xVelocity = this.x;
    this.yVelocity = this.y;

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
          }

          break;
        case "d":
          let xPositionRight = this.y / this.height;
          let yPositionRight = this.x / this.width + 1;
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
          }
          break;
      }
    });
  }

  draw(context) {
    context.drawImage(this.player, this.x, this.y, this.width, this.height);
  }
}
