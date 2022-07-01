resetBtn.addEventListener("click", clearLocalStorage);

function mainLoop() {
  // Check if the gameData is empty in localStorage
  let retrievedData = JSON.parse(localStorage.getItem("gameData"));

  // If not null, set the current game data with retrieved data from localStorage
  if (retrievedData !== null) {
    gameState.current = retrievedData.state;
    lives = retrievedData.lives;
    levelId = retrievedData.levelId;
  }

  // Run Home/menu state if condition matches
  if (gameState.current === 0) {
    // Menu screen audio
    let menuAudio = new Audio("../audio/menu.mp3");
    if (typeof menuAudio.loop == "boolean") {
      menuAudio.loop = true;
    } else {
      menuAudio.addEventListener(
        "ended",
        function () {
          this.currentTime = 0;
          this.play();
        },
        false
      );
    }
    menuAudio.play();

    currentState = 0;

    let menu = new Image();
    menu.src = MENU_IMG;

    // Show menu buttons
    for (let i = 0; i < 3; i++) {
      allBtn[i].style.display = "block";
    }

    function draw() {
      currentState === 0
        ? window.requestAnimationFrame(draw)
        : window.cancelAnimationFrame(draw);

      context.drawImage(
        menu,
        0,
        0,
        COL_LENGTH * tileWidth,
        (ROW_LENGTH + 1) * tileHeight
      );

      // Create event listeners for every button in menu to change gameState
      playBtn.addEventListener("click", () => {
        menuAudio.pause();
        currentTime = 0;

        gameState.current = 4;
      });
      editorBtn.addEventListener("click", () => {
        gameState.current = 5;
      });

      savedGamesBtn.addEventListener("click", () => {
        gameState.current = 6;
      });
    }
    draw();
  }

  // Run game state if condition matches
  if (gameState.current === 1) {
    let beginsAudio = new Audio("../audio/begins.mp3");
    beginsAudio.play();

    let retrievedCustomMap = JSON.parse(localStorage.getItem("customMap"));
    if (!retrievedCustomMap) {
      activeLevel = maps[levelId];
    } else {
      activeLevel = retrievedCustomMap.map;
    }

    // Create new tilemap object and creating various game objects through tilemap class
    tileMap = new TileMap(tileHeight, tileWidth, context);
    tileMap.assignCanvasSize(canvas);
    player = tileMap.getPlayer();
    ball = tileMap.getBall();
    key = tileMap.getKey();
    stone = tileMap.getStone();
    crab = tileMap.getCrab();
    shark = tileMap.getShark();
    currentState = 1;

    //GameLoop to execute the game
    function gameLoop() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Iterating through objects in the array and drawing in canvas
      for (let index = 0; index < balls.length; index++) {
        balls[index].levelingUp === false ? balls[index].draw(context) : null;
      }
      for (let index = 0; index < keys.length; index++) {
        keys[index].draw(context);
      }
      for (let index = 0; index < stones.length; index++) {
        stones[index].draw(context);
      }
      for (let index = 0; index < crabs.length; index++) {
        crabs[index].draw(context);
      }
      for (let index = 0; index < sharks.length; index++) {
        sharks[index].draw(context);
      }

      player.draw(context);
      tileMap.draw();

      if (currentState === 1) {
        window.requestAnimationFrame(gameLoop);
      } else {
        window.cancelAnimationFrame(gameLoop);
      }
    }
    gameLoop();
  }

  // Run level-up state if condition matches
  if (gameState.current === 2) {
    // Level-up screen audio
    let completedAudio = new Audio("../audio/drum-completed.mp3");
    if (typeof completedAudio.loop == "boolean") {
      completedAudio.loop = true;
    } else {
      completedAudio.addEventListener(
        "ended",
        function () {
          this.currentTime = 0;
          this.play();
        },
        false
      );
    }
    completedAudio.play();

    currentState = 2;

    // Create image object for state background
    let levelUp = new Image();
    levelUp.src = LEVEL_UP_IMG;
    function draw() {
      currentState === 2
        ? window.requestAnimationFrame(draw)
        : window.cancelAnimationFrame(draw);

      context.drawImage(
        levelUp,
        0,
        0,
        COL_LENGTH * tileWidth,
        (ROW_LENGTH + 1) * tileHeight
      );
    }
    draw();

    let newGameData = {
      levelId: retrievedData.levelId,
      lives: retrievedData.lives,
      state: 4,
    };

    canvas.addEventListener("click", () => {
      completedAudio.pause();
      // Redirect to menu if loaded map is custom
      let retrievedCustomMap = JSON.parse(localStorage.getItem("customMap"));
      console.log(retrievedCustomMap);
      if (!retrievedCustomMap && levelId < maps.length) {
        gameState.current = 4;
        localStorage.setItem("gameData", JSON.stringify(newGameData));
      } else {
        clearLocalStorage();
      }
    });
  }

  // Run game-over state if condition matches
  if (gameState.current === 3) {
    currentState = 3;
    let gameOver = new Image();
    gameOver.src = GAME_OVER_IMG;

    function draw() {
      currentState === 3
        ? window.requestAnimationFrame(draw)
        : window.cancelAnimationFrame(draw);

      context.drawImage(
        gameOver,
        0,
        0,
        COL_LENGTH * tileWidth,
        (ROW_LENGTH + 1) * tileHeight
      );
      canvas.addEventListener("click", () => {
        clearLocalStorage();
      });
    }
    draw();
  }

  // Run get-ready state if condition matches
  if (gameState.current === 4) {
    // Menu screen audio
    let getReadyAudio = new Audio("../audio/drum-beginning.mp3");
    if (typeof getReadyAudio.loop == "boolean") {
      getReadyAudio.loop = true;
    } else {
      getReadyAudio.addEventListener(
        "ended",
        function () {
          this.currentTime = 0;
          this.play();
        },
        false
      );
    }
    getReadyAudio.play();

    currentState = 4;

    let getReady = new Image();
    getReady.src = GET_READY_IMG;

    function draw() {
      currentState === 4
        ? window.requestAnimationFrame(draw)
        : window.cancelAnimationFrame(draw);

      context.drawImage(
        getReady,
        0,
        0,
        COL_LENGTH * tileWidth,
        (ROW_LENGTH + 1) * tileHeight
      );

      canvas.addEventListener("click", () => {
        getReadyAudio.pause();
        if (retrievedData !== null) {
          let newGameData = {
            levelId: retrievedData.levelId,
            lives: retrievedData.lives,
            state: 1,
          };
          gameState.current = 1;
          localStorage.setItem("gameData", JSON.stringify(newGameData));
        } else {
          gameState.current = 1;
        }
      });
    }
    draw();
  }

  // Run editor state if condition matches
  if (gameState.current === 5) {
    currentState = 5;
    // Create tileMapEditor object for editing custom map
    const tileMapEditor = new Editor(tileHeight, tileWidth, context);

    function editorLoop() {
      window.requestAnimationFrame(editorLoop);
      context.clearRect(0, 0, canvas.width, canvas.height);
      tileMapEditor.draw();
    }

    editorLoop();
  }

  // Run saved level state if condition matches
  if (gameState.current === 6) {
    let levelData = [];
    currentState = 6;

    // Make API call on levels
    fetch("http://localhost:3000/levels", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        levelData = data;
        showCustomLevels(levelData);
      });
  }
}

// Function to show custom maps on the interface
const showCustomLevels = (levelData) => {
  levelContainer = document.createElement("div");
  levelContainer.classList.add("levels-container");
  // Iterate through the data and create DOM elements for every custom map
  levelData.map((data, index) => {
    date = new Date(data.createdAt);
    customLevelContainer = document.createElement("div");
    customLevelContainer.classList.add("level");

    customLevelHeading = document.createElement("h2");
    customLevelHeading.innerHTML = `Custom Level ${index + 1}`;

    customLevelDate = document.createElement("p");
    customLevelDate.innerHTML = `Created At: ${date.toDateString()}`;

    backButton = document.createElement("button");
    backButton.innerHTML = `Back`;
    backButton.classList.add("back-btn");

    customLevelContainer.appendChild(customLevelHeading);
    customLevelContainer.appendChild(customLevelDate);
    levelContainer.appendChild(backButton);

    levelContainer.appendChild(customLevelContainer);

    // Click event for every DOM item to execute custom map in game state
    customLevelContainer.addEventListener("click", () => {
      console.log("Custom");
      levelContainer.style.display = "none";
      let customMap = {
        map: data.map,
      };
      // console.log(customMap);
      localStorage.setItem("customMap", JSON.stringify(customMap));
      // localStorage.setItem("customMap", customMap);
      gameState.current = 1;
    });

    backButton.addEventListener("click", () => {
      levelContainer.style.display = "none";
      gameState.current = 0;
    });
  });
  container.appendChild(levelContainer);
};

// Execute function to check current gamestate and loop the function itself
function loop() {
  checkGameState();
  requestAnimationFrame(loop);
}

// Check the value of current key in gameState with current state and execute loop if doesn't match
function checkGameState() {
  if (gameState.current !== currentState) {
    clearBtn();
    mainLoop();
  }
}

// Initiating the application execution
loop();
