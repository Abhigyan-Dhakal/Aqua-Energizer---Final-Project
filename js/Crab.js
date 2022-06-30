class Crab {
  constructor(x, y, width, height, tileMap, exploded) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.exploded = exploded;

    this.crab = new Image();
    this.crab.src = CRAB_IMG;

    setInterval(() => {
      !this.exploded ? this.move() : null;
    }, CRAB_SPEED);
  }

  draw(context) {
    !this.exploded
      ? context.drawImage(this.crab, this.x, this.y, this.width, this.height)
      : (activeLevel[this.y / this.height][this.x / this.width] = 2);
  }

  move() {
    if (
      (player.y / player.height > this.y / this.height &&
        activeLevel[this.y / this.height + 1][this.x / this.width] ===
          EMPTY_ID) ||
      activeLevel[this.y / this.height + 1][this.x / this.width] === PLAYER_ID
    ) {
      this.y += this.height;
      activeLevel[this.y / this.height - 1][this.x / this.width] = EMPTY_ID;
    } else if (
      (player.y / player.height < this.y / this.height &&
        activeLevel[this.y / this.height - 1][this.x / this.width] ===
          EMPTY_ID) ||
      activeLevel[this.y / this.height - 1][this.x / this.width] === PLAYER_ID
    ) {
      this.y -= this.height;
      activeLevel[this.y / this.height + 1][this.x / this.width] = EMPTY_ID;
    } else if (
      (player.x / player.width < this.x / this.width &&
        activeLevel[this.y / this.height][this.x / this.width - 1] ===
          EMPTY_ID) ||
      activeLevel[this.y / this.height][this.x / this.width - 1] === PLAYER_ID
    ) {
      this.x -= this.width;
      activeLevel[this.y / this.height][this.x / this.width + 1] = EMPTY_ID;
    } else if (
      (player.x / player.width > this.x / this.width &&
        activeLevel[this.y / this.height][this.x / this.width + 1] ===
          EMPTY_ID) ||
      activeLevel[this.y / this.height][this.x / this.width + 1] === PLAYER_ID
    ) {
      this.x += this.width;
      activeLevel[this.y / this.height][this.x / this.width - 1] = EMPTY_ID;
    }

    this.exploded
      ? (activeLevel[this.y / this.height][this.x / this.width] = EMPTY_ID)
      : (activeLevel[this.y / this.height][this.x / this.width] = CRAB_ID);

    player.x === this.x && player.y === this.y
      ? (player.exploded = true)
      : null;
  }
}
