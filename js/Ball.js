class Ball {
  constructor(
    x,
    y,
    width,
    height,
    tileMap,
    column,
    row,
    impact,
    levelingUp,
    exploded
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.column = column;
    this.row = row;
    this.impact = impact;
    this.levelingUp = levelingUp;
    this.exploded = exploded;

    this.ball = new Image();
    this.ball.src = "../images/ball.png";
    this.ball.style.zIndex = -1;

    setInterval(() => {
      this.moveVertically();
    }, 230);
  }

  draw(context) {
    !this.exploded
      ? context.drawImage(this.ball, this.x, this.y, this.width, this.height)
      : "";
  }

  moveVertically() {
    if (!this.levelingUp) {
      if (
        !this.tileMap.checkPlatform(
          this.x / this.width,
          this.y / this.height + 1,
          this.impact,
          this
        )
      ) {
        this.impact = true;
        maps[0][this.y / this.height][this.x / this.width] = 2;
        maps[0][this.y / this.height + 1][this.x / this.width] = 4;
        this.y = (this.y / this.height + 1) * this.height;
      } else {
        this.impact = false;
        if (maps[0][this.y / this.height + 1][this.x / this.width] !== 5) {
          if (this.exploded) {
            maps[0][this.y / this.height][this.x / this.width] = 2;
          } else {
            maps[0][this.y / this.height][this.x / this.width] = 4;
          }
        } else {
          context.clearRect(this.x, this.y, this.width, this.height);
          maps[0][this.y / this.height][this.x / this.width] = 2;
          balls = balls.filter((item) => {
            return item.x !== this.x && item.y !== this.y;
          });
          this.checkLevelUp();
        }
      }
    }
  }

  checkLevelUp() {
    if (balls.length === 0) {
      console.log("Level Up");
    }
  }
}
