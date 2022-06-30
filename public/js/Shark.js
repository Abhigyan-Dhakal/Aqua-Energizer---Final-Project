class Shark {
  /**
   * Sets up different attributes for the created shark object
   * defines the movement of the shark, identification of its collision
   * with game entities.
   *
   * @param {Number} x - x position of the shark
   * @param {Number} y - y position of the shark
   * @param {Number} width - Width of the shark's tile
   * @param {Number} height - Height of the shark's tile
   * @param {Object} tileMap - Object of TileMap class
   * @param {Boolean} exploded - Boolean value representing if shark has exploded
   * @param {Boolean} horizontal - Boolean value representing if shark moves horizontally/vertically
   */
  constructor(x, y, width, height, tileMap, exploded, horizontal) {
    // Assign class parameters to the object's property
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.exploded = exploded;
    this.horizontal = horizontal;

    // Create image object and assigning source for shark
    this.shark = new Image();

    if (this.horizontal === true) {
      this.direction = movingDirection.right;
      this.shark.src = SHARK_RIGHT_IMG;
    } else {
      this.direction = movingDirection.up;
      this.shark.src = SHARK_UP_IMG;
    }

    // Move shark at a certain time interval if not exploded
    setInterval(() => {
      !this.exploded ? this.move() : null;
    }, SHARK_SPEED);
  }

  // Function to draw shark's image if not exploded
  draw(context) {
    !this.exploded
      ? context.drawImage(this.shark, this.x, this.y, this.width, this.height)
      : (activeLevel[this.y / this.height][this.x / this.width] = 2);

    // Condition to set player's exploded property to true on same shark and player's position
    player.x === this.x && player.y === this.y
      ? (player.exploded = true)
      : null;
  }

  // Function to move the shark
  move() {
    // Condition for horizontal movement
    if (this.horizontal) {
      if (this.direction === movingDirection.right) {
        this.shark.src = SHARK_RIGHT_IMG;
        // Check shark collision with next right tile
        if (
          !this.tileMap.checkSharkCollision(
            this.y / this.height,
            this.x / this.width + 1
          )
        ) {
          this.x += this.width;
          activeLevel[this.y / this.height][this.x / this.width] = SHARK_UP_ID;
          activeLevel[this.y / this.height][this.x / this.width - 1] = EMPTY_ID;
        } else {
          this.direction = movingDirection.left;
        }
      }

      if (this.direction === movingDirection.left) {
        this.shark.src = SHARK_LEFT_IMG;
        // Check shark collision with next left tile
        if (
          !this.tileMap.checkSharkCollision(
            this.y / this.height,
            this.x / this.width - 1
          )
        ) {
          this.x -= this.width;
          activeLevel[this.y / this.height][this.x / this.width] = SHARK_UP_ID;
          activeLevel[this.y / this.height][this.x / this.width + 1] = EMPTY_ID;
        } else {
          this.direction = movingDirection.right;
        }
      }
    } else {
      // Condition for vertical movement
      if (this.direction === movingDirection.up) {
        this.shark.src = SHARK_UP_IMG;
        // Check shark collision with top tile
        if (
          !this.tileMap.checkSharkCollision(
            this.y / this.height - 1,
            this.x / this.width
          )
        ) {
          this.y -= this.height;
          activeLevel[this.y / this.height][this.x / this.width] = SHARK_UP_ID;
          activeLevel[this.y / this.height + 1][this.x / this.width] = EMPTY_ID;
        } else {
          this.direction = movingDirection.down;
        }
      }

      if (this.direction === movingDirection.down) {
        this.shark.src = SHARK_DOWN_IMG;
        // Check shark collision with bottom tile
        if (
          !this.tileMap.checkSharkCollision(
            this.y / this.height + 1,
            this.x / this.width
          )
        ) {
          this.y += this.height;
          activeLevel[this.y / this.height][this.x / this.width] = SHARK_UP_ID;
          activeLevel[this.y / this.height - 1][this.x / this.width] = EMPTY_ID;
        } else {
          this.direction = movingDirection.up;
        }
      }
    }
  }
}
