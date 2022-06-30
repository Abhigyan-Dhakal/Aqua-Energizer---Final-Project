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
    this.key.src = KEY_IMG;

    // Interval for key to move vertically
    setInterval(() => {
      this.moveVertically();
    }, KEY_GRAVITY);
  }

  draw(context) {
    this.checkIfGrabbed();
    // Draw image if not exploded and grabbed
    if (!this.grabbed && !this.exploded) {
      context.drawImage(this.key, this.x, this.y, this.width, this.height);
    }
    // Identify and unlock the door on key grabbed
    if (this.grabbed) {
      for (let row = 0; row < activeLevel.length; row++) {
        for (let column = 0; column < activeLevel[row].length; column++) {
          let tile = activeLevel[row][column];
          if (tile === DOOR_ID) {
            activeLevel[row][column] = EMPTY_ID;
          }
        }
      }
    }
  }

  // Function to move key vertically
  moveVertically() {
    // Check platform of the key
    if (
      !this.tileMap.checkKeyPlatform(
        this.x / this.width,
        this.y / this.height + 1
      )
    ) {
      // Change key tile position if not grabbed else set tile to empty
      if (!this.grabbed && !this.exploded) {
        activeLevel[this.y / this.height][this.x / this.width] = EMPTY_ID;
        activeLevel[this.y / this.height + 1][this.x / this.width] = KEY_ID;
        this.y = (this.y / this.height + 1) * this.height;
      } else {
        activeLevel[this.y / this.height][this.x / this.width] = EMPTY_ID;
      }
    }
  }

  // Function to set to position to players position on grabbing the key
  checkIfGrabbed() {
    if (this.x === player.x && this.y === player.y) {
      this.grabbed = true;
      activeLevel[this.y / this.height][this.x / this.width] = PLAYER_ID;
    }
  }
}
