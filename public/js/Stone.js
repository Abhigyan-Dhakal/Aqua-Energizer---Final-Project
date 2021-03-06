class Stone {
  /**
   * Sets up properties like the impact, explosion
   * status of the created stone instance.
   *
   * @param {Number} x - x position of the stone
   * @param {Number} y - y position of the stone
   * @param {Number} width - Width of the stone's tile
   * @param {Number} height - Height of the stone's tile
   * @param {Object} tileMap - Object of TileMap class
   * @param {Number} column - Column of the stone in map
   * @param {Number} row - Row of the stone in map
   * @param {Boolean} impact - Boolean value showing impact of the stone
   * @param {Boolean} exploded - Boolean value representing if stone exploded
   */

  constructor(x, y, width, height, tileMap, column, row, impact, exploded) {
    // Assign class parameters to the object's property
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

    // Set interval for the stone to move down vertically
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
    // Check platform, if empty, set the impact to true and change the vertical position of stone
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
      // Set impact to false on finding a platform
      this.impact = false;
      if (this.exploded) {
        activeLevel[this.y / this.height][this.x / this.width] = EMPTY_ID;
      } else {
        activeLevel[this.y / this.height][this.x / this.width] = STONE_ID;
      }
    }
  }
}
