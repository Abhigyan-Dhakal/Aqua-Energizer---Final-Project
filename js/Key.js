class Key {
  constructor(x, y, width, height, tileMap, grabbed, exploded) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.grabbed = grabbed;
    this.exploded = exploded;

    this.key = new Image();
    this.key.src = "../images/key.png";

    setInterval(() => {
      this.moveVertically();
    }, 400);
  }

  draw(context) {
    this.checkIfGrabbed();
    if (!this.grabbed && !this.exploded) {
      context.drawImage(this.key, this.x, this.y, this.width, this.height);
    }
    if (this.grabbed) {
      for (let row = 0; row < maps[0].length; row++) {
        for (let column = 0; column < maps[0][row].length; column++) {
          let tile = maps[0][row][column];
          if (tile === 6) {
            maps[0][row][column] = 2;
          }
        }
      }
    }
  }

  moveVertically() {
    if (
      !this.tileMap.checkKeyPlatform(
        this.x / this.width,
        this.y / this.height + 1
      )
    ) {
      if (!this.grabbed && !this.exploded) {
        maps[0][this.y / this.height][this.x / this.width] = 2;
        maps[0][this.y / this.height + 1][this.x / this.width] = 7;
        this.y = (this.y / this.height + 1) * this.height;
      } else {
        maps[0][this.y / this.height][this.x / this.width] = 2;
      }
    }
  }

  checkIfGrabbed() {
    if (this.x === player.x && this.y === player.y) {
      this.grabbed = true;
      maps[0][this.y / this.height][this.x / this.width] = 3;
    }
  }
}
