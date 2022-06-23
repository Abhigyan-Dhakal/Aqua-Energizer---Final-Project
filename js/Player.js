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
          // console.log(this.x / this.width, this.y / this.height - 1);
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width,
              this.y / this.height - 1
            )
          ) {
            this.y -= this.height;
            maps[0][this.y / this.height][this.x / this.width] = 3;
            maps[0][this.y / this.height + 1][this.x / this.width] = 2;
            // console.log(maps[0]);
          }
          break;
        case "s":
          // console.log(this.x / this.width, this.y / this.height + 1);
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width,
              this.y / this.height + 1
            )
          ) {
            this.y += this.height;
            maps[0][this.y / this.height][this.x / this.width] = 3;
            maps[0][this.y / this.height - 1][this.x / this.width] = 2;
          }
          break;
        case "a":
          //console.log(this.x / this.width - 1, this.y / this.height);
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width - 1,
              this.y / this.height
            )
          )
            if (
              this.tileMap.checkObjectCollision(
                this.x / this.width - 1,
                this.y / this.height
              )
            ) {
              this.x -= this.width;
              maps[0][this.y / this.height][this.x / this.width] = 3;
              maps[0][this.y / this.height][this.x / this.width + 1] = 2;
            }
          break;
        case "d":
          let xPosition = this.y / this.height;
          let yPosition = this.x / this.width + 1;
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width + 1,
              this.y / this.height
            )
          ) {
            if (
              this.tileMap.checkObjectCollision(
                this.x / this.width + 1,
                this.y / this.height
              )
            ) {
              for (let index = 0; index < balls.length; index++) {
                if (
                  xPosition * balls[index].height === balls[index].y &&
                  yPosition * balls[index].width === balls[index].x
                ) {
                  balls[index].x = this.x + this.width * 2;
                  maps[0][this.y / this.height][this.x / this.width + 1] = 4;
                }
              }
              this.x += this.width;
              maps[0][this.y / this.height][this.x / this.width] = 3;
              maps[0][this.y / this.height][this.x / this.width - 1] = 2;
            }
          }
          console.log(maps[0]);
          break;
      }
    });
  }

  draw(context) {
    context.drawImage(this.player, this.x, this.y, this.width, this.height);
  }
}
