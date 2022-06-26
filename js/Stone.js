class Stone {
  constructor(x, y, width, height, tileMap, column, row, impact, exploded) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.column = column;
    this.row = row;
    this.impact = impact;
    this.exploded = exploded;

    this.stone = new Image();
    this.stone.src = "../images/stone.png";
    this.stone.style.zIndex = -1;

    setInterval(() => {
      this.moveVertically();
    }, 230);
  }

  draw(context) {
    !this.exploded
      ? context.drawImage(this.stone, this.x, this.y, this.width, this.height)
      : "";
  }

  moveVertically() {
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
      maps[0][this.y / this.height + 1][this.x / this.width] = 9;
      this.y = (this.y / this.height + 1) * this.height;
    } else {
      this.impact = false;
      if (this.exploded) {
        maps[0][this.y / this.height][this.x / this.width] = 2;
      } else {
        maps[0][this.y / this.height][this.x / this.width] = 9;
      }
    }
  }
}
