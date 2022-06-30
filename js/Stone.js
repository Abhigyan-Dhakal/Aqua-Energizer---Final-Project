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
    this.stone.src = STONE_IMG;

    setInterval(() => {
      this.moveVertically();
    }, STONE_GRAVITY);
  }

  draw(context) {
    !this.exploded
      ? context.drawImage(this.stone, this.x, this.y, this.width, this.height)
      : null;
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
      activeLevel[this.y / this.height][this.x / this.width] = EMPTY_ID;
      activeLevel[this.y / this.height + 1][this.x / this.width] = STONE_ID;
      this.y = (this.y / this.height + 1) * this.height;
    } else {
      this.impact = false;
      if (this.exploded) {
        activeLevel[this.y / this.height][this.x / this.width] = EMPTY_ID;
      } else {
        activeLevel[this.y / this.height][this.x / this.width] = STONE_ID;
      }
    }
  }
}
