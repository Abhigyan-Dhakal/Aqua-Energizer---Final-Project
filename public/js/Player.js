class Player {
  /**
   * Provides movement functionalities to the player object via event listeners,
   * identifies the collision with the environment, game entities, player lives, etc.
   *
   * @param {Number} x - x position of the player
   * @param {Number} y - y position of the player
   * @param {Number} width - Width of the player's tile
   * @param {Number} height - Height of the player's tile
   * @param {Object} tileMap - Object of TileMap class
   * @param {Boolean} exploded - Boolean value representing if player has exploded
   */
  constructor(x, y, width, height, tileMap, exploded) {
    // Assign class parameters to the object's property
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.xVelocity = this.x;
    this.yVelocity = this.y;
    this.exploded = exploded;
    this.minimized = false;

    // Create image object and assigning source for player
    this.player = new Image();
    this.player.src = PLAYER_IMG;

    // Create event listeners for keypress i.e. w,a,s,d
    document.addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "w":
          // Check vertical wall and object collision upwards
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width,
              this.y / this.height - 1
            )
          ) {
            this.tileMap.checkObjectCollision(
              this.x / this.width,
              this.y / this.height - 1
            );
            // Move player vertically up on not detecting collision
            if (collision === false) {
              // Play movement audio when player moves

              this.y -= this.height;
              activeLevel[this.y / this.height][this.x / this.width] =
                PLAYER_ID;
              activeLevel[this.y / this.height + 1][this.x / this.width] =
                EMPTY_ID;
            }
          }
          break;
        case "s":
          // Check vertical wall and object collision downwards
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width,
              this.y / this.height + 1
            )
          ) {
            this.tileMap.checkObjectCollision(
              this.x / this.width,
              this.y / this.height + 1
            );
            // Move player vertically down on not detecting collision
            if (collision === false) {
              this.y += this.height;
              activeLevel[this.y / this.height][this.x / this.width] =
                PLAYER_ID;
              activeLevel[this.y / this.height - 1][this.x / this.width] =
                EMPTY_ID;
            }
          }
          break;
        case "a":
          let xPositionLeft = this.y / this.height;
          let yPositionLeft = this.x / this.width - 1;
          let nextElementLeft = activeLevel[xPositionLeft][yPositionLeft];
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width - 1,
              this.y / this.height
            )
          ) {
            this.tileMap.checkObjectCollision(
              this.x / this.width - 1,
              this.y / this.height
            );
            if (collision === false) {
              this.x -= this.width;
              activeLevel[this.y / this.height][this.x / this.width] =
                PLAYER_ID;
              activeLevel[this.y / this.height][this.x / this.width + 1] =
                EMPTY_ID;

              // Change tile value on moving energy ball if next tile is empty on left position
              if (nextElementLeft === BALL_ID) {
                for (let index = 0; index < balls.length; index++) {
                  if (
                    xPositionLeft * balls[index].height === balls[index].y &&
                    yPositionLeft * balls[index].width === balls[index].x
                  ) {
                    let draggingAudio = new Audio("../audio/dragging.wav");
                    draggingAudio.play();
                    balls[index].x = balls[index].x - balls[index].width;
                    activeLevel[this.y / this.height][this.x / this.width - 1] =
                      BALL_ID;
                  }
                }
              }

              // Change tile value on moving stone if next tile is empty on left position
              if (nextElementLeft === STONE_ID) {
                for (let index = 0; index < stones.length; index++) {
                  if (
                    xPositionLeft * stones[index].height === stones[index].y &&
                    yPositionLeft * stones[index].width === stones[index].x
                  ) {
                    let draggingAudio = new Audio("../audio/dragging.wav");
                    draggingAudio.play();
                    stones[index].x = stones[index].x - stones[index].width;
                    activeLevel[this.y / this.height][this.x / this.width - 1] =
                      STONE_ID;
                  }
                }
              }
            }
          }

          break;
        case "d":
          let xPositionRight = this.y / this.height;
          let yPositionRight = this.x / this.width + 1;
          let nextElementRight = activeLevel[xPositionRight][yPositionRight];
          if (
            !this.tileMap.checkWallCollision(
              this.x / this.width + 1,
              this.y / this.height
            )
          ) {
            this.tileMap.checkObjectCollision(
              this.x / this.width + 1,
              this.y / this.height
            );
            if (collision === false) {
              this.x += this.width;
              activeLevel[this.y / this.height][this.x / this.width] =
                PLAYER_ID;
              activeLevel[this.y / this.height][this.x / this.width - 1] =
                EMPTY_ID;

              // Change tile value on moving energy ball if next tile is empty on right position
              if (nextElementRight === BALL_ID) {
                for (let index = 0; index < balls.length; index++) {
                  if (
                    xPositionRight * balls[index].height === balls[index].y &&
                    yPositionRight * balls[index].width === balls[index].x
                  ) {
                    let draggingAudio = new Audio("../audio/dragging.wav");
                    draggingAudio.play();
                    balls[index].x = balls[index].x + balls[index].width;
                    activeLevel[this.y / this.height][this.x / this.width + 1] =
                      BALL_ID;
                  }
                }
              }
              // Change tile value on moving stone if next tile is empty on right position
              if (nextElementRight === STONE_ID) {
                for (let index = 0; index < stones.length; index++) {
                  if (
                    xPositionRight * stones[index].height === stones[index].y &&
                    yPositionRight * stones[index].width === stones[index].x
                  ) {
                    let draggingAudio = new Audio("../audio/dragging.wav");
                    draggingAudio.play();
                    stones[index].x = stones[index].x + stones[index].width;
                    activeLevel[this.y / this.height][this.x / this.width + 1] =
                      STONE_ID;
                  }
                }
              }
            }
          }
          break;
      }
    });
  }

  draw(context) {
    !this.exploded
      ? context.drawImage(this.player, this.x, this.y, this.width, this.height)
      : this.minimizeLife();
  }

  // Function to decrease player's lives
  minimizeLife() {
    if (this.minimized === false) {
      this.minimized = true;
      lives--;
      // Set game state to get ready if lives is not equal to 0 and repeat same levelId
      if (lives > 0) {
        if (localStorage.getItem("gameData") === null) {
          let gameData = {
            levelId: levelId,
            lives: lives,
            state: 4,
          };
          localStorage.setItem("gameData", JSON.stringify(gameData));
          window.location.reload(false);
        } else {
          let previousData = JSON.parse(localStorage.getItem("gameData"));
          let gameData = {
            levelId: previousData.levelId,
            lives: previousData.lives - 1,
            state: 4,
          };

          localStorage.setItem("gameData", JSON.stringify(gameData));
          window.location.reload(false);
        }
      } else {
        // Set game state to game over if lives is equal to 0 and reset levelId
        levelId = 0;
        let gameData = {
          levelId: levelId,
          lives: 0,
          state: 3,
        };
        localStorage.setItem("gameData", JSON.stringify(gameData));
        window.location.reload(false);
      }
    }
  }
}
