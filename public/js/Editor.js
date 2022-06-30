class Editor {
  /**
   * Editor class is used to create a grid based interface for user to select
   * the game items and draw it over the canvas along with save button for making
   * POST API call to save the two-dimentional array of custom created map.
   *
   * @param {Number} tileHeight - Height of individual tile
   * @param {Number} tileWidth - Width of individual tile
   * @param {Object} context - Canvas 2d context
   */
  constructor(tileHeight, tileWidth, context) {
    // Assign class parameters to the object's property
    this.tileHeight = tileHeight;
    this.tileWidth = tileWidth;
    this.context = context;

    // Creating image objects and assigning source for game items
    this.sand = new Image();
    this.sand.src = SAND_IMG;

    this.wall = new Image();
    this.wall.src = WALL_IMG;

    this.portal = new Image();
    this.portal.src = PORTAL_IMG;

    this.door = new Image();
    this.door.src = DOOR_IMG;

    this.concrete = new Image();
    this.concrete.src = CONCRETE_IMG;

    this.player = new Image();
    this.player.src = PLAYER_IMG;

    this.ball = new Image();
    this.ball.src = BALL_IMG;

    this.crab = new Image();
    this.crab.src = CRAB_IMG;

    this.key = new Image();
    this.key.src = KEY_IMG;

    this.stone = new Image();
    this.stone.src = STONE_IMG;

    this.sharkUp = new Image();
    this.sharkUp.src = SHARK_UP_IMG;

    this.sharkRight = new Image();
    this.sharkRight.src = SHARK_RIGHT_IMG;

    this.save = new Image();
    this.save.src = SAVE_IMG;

    this.back = new Image();
    this.back.src = BACK_IMG;

    this.gameObjects = [
      {
        id: 0,
        position: SAND_EDITOR_POS,
      },
      {
        id: 1,
        position: WALL_EDITOR_POS,
      },
      {
        id: 2,
        position: EMPTY_EDITOR_POS,
      },
      {
        id: 3,
        position: PLAYER_EDITOR_POS,
      },
      {
        id: 4,
        position: BALL_EDITOR_POS,
      },
      {
        id: 5,
        position: PORTAL_EDITOR_POS,
      },
      {
        id: 6,
        position: DOOR_EDITOR_POS,
      },
      {
        id: 7,
        position: KEY_EDITOR_POS,
      },
      {
        id: 8,
        position: CONCRETE_EDITOR_POS,
      },
      {
        id: 9,
        position: STONE_EDITOR_POS,
      },
      {
        id: 10,
        position: CRAB_EDITOR_POS,
      },
      {
        id: 11,
        position: SHARK_UP_EDITOR_POS,
      },
      {
        id: 12,
        position: SHARK_RIGHT_EDITOR_POS,
      },
    ];

    this.selectedItem = null;

    canvas.addEventListener("mousedown", (event) => {
      let coordinates = this.getCoordinates(event);
      // Bound the row of editing items to that of editor grid
      if (coordinates[1] === 12 && coordinates[0] < 13) {
        this.gameObjects.forEach((object) => {
          if (
            object.position[0] === coordinates[0] &&
            object.position[1] === coordinates[1]
          ) {
            this.selectedItem = object;
            console.log(this.selectedItem);
          }
        });
      }

      // Set the boundary of the editor grid tile
      if (
        coordinates[0] > 0 &&
        coordinates[0] < COL_LENGTH - 1 &&
        coordinates[1] > 0 &&
        coordinates[1] < ROW_LENGTH - 1
      ) {
        defaultEditorMap[coordinates[1]][coordinates[0]] = this.selectedItem.id;
      }

      if (coordinates[0] === COL_LENGTH - 1 && coordinates[1] == ROW_LENGTH) {
        for (let index = 0; index < defaultEditorMap.length - 1; index++) {
          editedMap.push(defaultEditorMap[index]);
        }

        let dataObj = {
          map: editedMap,
        };

        fetch("http://localhost:3000/levels", {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(dataObj),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));

        window.location.reload(false);
      }

      if (coordinates[0] === COL_LENGTH - 2 && coordinates[1] == ROW_LENGTH) {
        window.location.reload(false);
      }
    });
  }

  draw() {
    // For loop to iterate through map (2D-array) and call draw function for respective item-id
    for (let row = 0; row < defaultEditorMap.length; row++) {
      for (let column = 0; column < defaultEditorMap[row].length; column++) {
        let tile = defaultEditorMap[row][column];
        if (tile === SAND_ID) {
          this.#drawSand(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }
        if (tile === WALL_ID) {
          this.#drawWall(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === PORTAL_ID) {
          this.#drawPortal(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === DOOR_ID) {
          this.#drawDoor(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === CONCRETE_ID) {
          this.#drawConcrete(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === PLAYER_ID) {
          this.#drawPlayer(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === BALL_ID) {
          this.#drawBall(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === KEY_ID) {
          this.#drawKey(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === STONE_ID) {
          this.#drawStone(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === CRAB_ID) {
          this.#drawCrab(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === SHARK_UP_ID) {
          this.#drawSharkUp(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === SHARK_RIGHT_ID) {
          this.#drawSharkRight(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === SAVE_ID) {
          this.#drawSave(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }

        if (tile === BACK_ID) {
          this.#drawBack(
            this.context,
            column,
            row,
            this.tileWidth,
            this.tileHeight
          );
        }
      }
    }

    // For loop to create grid on rows and column of the editor
    for (let row = 0; row < defaultEditorMap.length - 1; row++) {
      for (let column = 0; column < defaultEditorMap[row].length; column++) {
        this.context.strokeStyle = "yellow";
        this.context.strokeRect(
          column * this.tileWidth,
          row * this.tileHeight,
          this.tileWidth,
          this.tileHeight
        );
      }
    }
  }

  // Function to get the tile coordinates by flooring the click event position
  getCoordinates(event) {
    const { x, y } = event.target.getBoundingClientRect();
    const mouseX = event.clientX - x;
    const mouseY = event.clientY - y;
    return [
      Math.floor(mouseX / this.tileWidth),
      Math.floor(mouseY / this.tileHeight),
    ];
  }

  //Functions to draw images for editor items

  #drawWall(context, column, row, width, height) {
    context.drawImage(
      this.wall,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawSand(context, column, row, width, height) {
    context.drawImage(
      this.sand,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawPortal(context, column, row, width, height) {
    context.drawImage(
      this.portal,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawDoor(context, column, row, width, height) {
    context.drawImage(
      this.door,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawConcrete(context, column, row, width, height) {
    context.drawImage(
      this.concrete,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawPlayer(context, column, row, width, height) {
    context.drawImage(
      this.player,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawBall(context, column, row, width, height) {
    context.drawImage(
      this.ball,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawKey(context, column, row, width, height) {
    context.drawImage(
      this.key,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawStone(context, column, row, width, height) {
    context.drawImage(
      this.stone,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawCrab(context, column, row, width, height) {
    context.drawImage(
      this.crab,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawSharkUp(context, column, row, width, height) {
    context.drawImage(
      this.sharkUp,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawSharkRight(context, column, row, width, height) {
    context.drawImage(
      this.sharkRight,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawSave(context, column, row, width, height) {
    context.drawImage(
      this.save,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }

  #drawBack(context, column, row, width, height) {
    context.drawImage(
      this.back,
      column * this.tileWidth,
      row * this.tileHeight,
      width,
      height
    );
  }
}
