class Crab {
  constructor(x, y, width, height, tileMap, exploded) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.exploded = exploded;

    this.crab = new Image();
    this.crab.src = "../images/crab.png";

    setInterval(() => {
      !this.exploded ? this.move() : null;
    }, 380);
  }

  draw(context) {
    !this.exploded
      ? context.drawImage(this.crab, this.x, this.y, this.width, this.height)
      : (maps[0][this.y / this.height][this.x / this.width] = 2);
  }

  move() {
    if (
      (player.y / player.height > this.y / this.height &&
        maps[0][this.y / this.height + 1][this.x / this.width] === 2) ||
      maps[0][this.y / this.height + 1][this.x / this.width] === 3
    ) {
      this.y += this.height;
      maps[0][this.y / this.height - 1][this.x / this.width] = 2;
    } else if (
      (player.y / player.height < this.y / this.height &&
        maps[0][this.y / this.height - 1][this.x / this.width] === 2) ||
      maps[0][this.y / this.height - 1][this.x / this.width] === 3
    ) {
      this.y -= this.height;
      maps[0][this.y / this.height + 1][this.x / this.width] = 2;
    } else if (
      (player.x / player.width < this.x / this.width &&
        maps[0][this.y / this.height][this.x / this.width - 1] === 2) ||
      maps[0][this.y / this.height][this.x / this.width - 1] === 3
    ) {
      this.x -= this.width;
      maps[0][this.y / this.height][this.x / this.width + 1] = 2;
    } else if (
      (player.x / player.width > this.x / this.width &&
        maps[0][this.y / this.height][this.x / this.width + 1] === 2) ||
      maps[0][this.y / this.height][this.x / this.width + 1] === 3
    ) {
      this.x += this.width;
      maps[0][this.y / this.height][this.x / this.width - 1] = 2;
    }

    this.exploded
      ? (maps[0][this.y / this.height][this.x / this.width] = 2)
      : (maps[0][this.y / this.height][this.x / this.width] = 10);

    player.x === this.x && player.y === this.y
      ? (player.exploded = true)
      : null;
  }
}
