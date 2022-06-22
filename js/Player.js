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

    document.addEventListener("keypress", ({ key }) => {
      switch (key) {
        case "w":
          console.log(this.x / this.width, this.y / this.height - 1);
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width,
              this.y / this.height - 1
            )
          ) {
            this.y -= this.height;
            maps[0][this.y / this.height][this.x / this.width] = 3;
            maps[0][this.y / this.height + 1][this.x / this.width] = 2;
            console.log(maps[0]);
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
          ) {
            this.x -= this.width;
            maps[0][this.y / this.height][this.x / this.width] = 3;
            maps[0][this.y / this.height][this.x / this.width + 1] = 2;
          }
          break;
        case "d":
          //console.log(this.x / this.width + 1, this.y / this.height);
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width + 1,
              this.y / this.height
            )
          ) {
            this.x += this.width;
            maps[0][this.y / this.height][this.x / this.width] = 3;
            maps[0][this.y / this.height][this.x / this.width - 1] = 2;
          }
          break;
      }
    });
  }

  draw(context) {
    context.drawImage(this.player, this.x, this.y, this.width, this.height);
  }
}
