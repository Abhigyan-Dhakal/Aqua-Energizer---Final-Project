class Ball {
  constructor(x, y, width, height, tileMap, column, row) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.column = column;
    this.row = row;

    this.ball = new Image();
    this.ball.src = "../images/ball.png";

    setInterval(() => {
      this.moveVertically();
    }, 200);
  }

  draw(context) {
    this.tileMap.checkPlatform(this.x / this.width, this.y / this.height + 1);
    context.drawImage(this.ball, this.x, this.y, this.width, this.height);
  }

  moveVertically() {
    if (
      !this.tileMap.checkPlatform(this.x / this.width, this.y / this.height + 1)
    ) {
      maps[0][this.y / this.height][this.x / this.width] = 2;
      this.y = (this.y / this.height + 1) * this.height;
    } else {
      maps[0][this.y / this.height][this.x / this.width] = 4;
    }
  }
}
