class Player {
  constructor(x, y, width, height, tileMap, exploded) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileMap = tileMap;
    this.xVelocity = this.x;
    this.yVelocity = this.y;
    this.exploded = exploded;
    this.minimized = false;

    this.player = new Image();
    this.player.src = PLAYER_IMG;

    document.addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "w":
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
            if (collision === false) {
              this.y -= this.height;
              activeLevel[this.y / this.height][this.x / this.width] =
                PLAYER_ID;
              activeLevel[this.y / this.height + 1][this.x / this.width] =
                EMPTY_ID;
            }
          }
          break;
        case "s":
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

              if (nextElementLeft === 4) {
                for (let index = 0; index < balls.length; index++) {
                  if (
                    xPositionLeft * balls[index].height === balls[index].y &&
                    yPositionLeft * balls[index].width === balls[index].x
                  ) {
                    balls[index].x = balls[index].x - balls[index].width;
                    activeLevel[this.y / this.height][
                      this.x / this.width - 1
                    ] = 4;
                  }
                }
              }

              if (nextElementLeft === 9) {
                for (let index = 0; index < stones.length; index++) {
                  if (
                    xPositionLeft * stones[index].height === stones[index].y &&
                    yPositionLeft * stones[index].width === stones[index].x
                  ) {
                    stones[index].x = stones[index].x - stones[index].width;
                    activeLevel[this.y / this.height][
                      this.x / this.width - 1
                    ] = 9;
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
              if (nextElementRight === 4) {
                for (let index = 0; index < balls.length; index++) {
                  if (
                    xPositionRight * balls[index].height === balls[index].y &&
                    yPositionRight * balls[index].width === balls[index].x
                  ) {
                    balls[index].x = balls[index].x + balls[index].width;
                    activeLevel[this.y / this.height][
                      this.x / this.width + 1
                    ] = 4;
                  }
                }
              }

              if (nextElementRight === 9) {
                for (let index = 0; index < stones.length; index++) {
                  if (
                    xPositionRight * stones[index].height === stones[index].y &&
                    yPositionRight * stones[index].width === stones[index].x
                  ) {
                    stones[index].x = stones[index].x + stones[index].width;
                    activeLevel[this.y / this.height][
                      this.x / this.width + 1
                    ] = 9;
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

  minimizeLife() {
    if (this.minimized === false) {
      this.minimized = true;
      lives--;
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
        levelId = 0;
        let gameData = {
          levelId: levelId,
          lives: 0,
          state: 3,
        };
        localStorage.setItem("gameData", JSON.stringify(gameData));
        window.location.reload(false);
      }
      // this.gameOver();
    }
  }

  gameOver() {
    console.log("Game Over");
    // window.location.reload(false);
  }
}
