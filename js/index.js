resetBtn.addEventListener("click", clearLocalStorage);

function clearLocalStorage() {
  localStorage.clear();
  window.location.reload(false);
}

function mainLoop() {
  let retrievedData = JSON.parse(localStorage.getItem("gameData"));
  if (retrievedData !== null) {
    gameState.current = retrievedData.state;
    lives = retrievedData.lives;
    levelId = retrievedData.levelId;
  }

  if (gameState.current === 0) {
    currentState = 0;

    let menu = new Image();
    menu.src = "../images/menu.jpg";

    for (let i = 0; i < 3; i++) {
      allBtn[i].style.display = "block";
    }

    function draw() {
      currentState === 0
        ? window.requestAnimationFrame(draw)
        : window.cancelAnimationFrame(draw);

      context.drawImage(menu, 0, 0, 18 * tileWidth, 13 * tileHeight);
      playBtn.addEventListener("click", () => {
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

  if (gameState.current === 1) {
    let retrievedCustomMap = JSON.parse(localStorage.getItem("customMap"));
    if (!retrievedCustomMap) {
      activeLevel = maps[levelId];
    } else {
      activeLevel = retrievedCustomMap.map;
    }

    tileMap = new TileMap(tileHeight, tileWidth, context);
    tileMap.assignCanvasSize(canvas);
    player = tileMap.getPlayer();
    ball = tileMap.getBall();
    key = tileMap.getKey();
    stone = tileMap.getStone();
    crab = tileMap.getCrab();
    shark = tileMap.getShark();
    currentState = 1;

    function gameLoop() {
      context.clearRect(0, 0, canvas.width, canvas.height);

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

  if (gameState.current === 2) {
    currentState = 2;
    let levelUp = new Image();
    levelUp.src = "../images/level-up.png";
    function draw() {
      currentState === 2
        ? window.requestAnimationFrame(draw)
        : window.cancelAnimationFrame(draw);

      context.drawImage(levelUp, 0, 0, 18 * tileWidth, 13 * tileHeight);
    }
    draw();

    let newGameData = {
      levelId: retrievedData.levelId,
      lives: retrievedData.lives,
      state: 4,
    };

    canvas.addEventListener("click", () => {
      gameState.current = 4;
      localStorage.setItem("gameData", JSON.stringify(newGameData));
    });
  }

  if (gameState.current === 3) {
    currentState = 3;
    let gameOver = new Image();
    gameOver.src = "../images/game-over.png";
    function draw() {
      currentState === 3
        ? window.requestAnimationFrame(draw)
        : window.cancelAnimationFrame(draw);

      context.drawImage(gameOver, 0, 0, 18 * tileWidth, 13 * tileHeight);
      canvas.addEventListener("click", () => {
        clearLocalStorage();
      });
    }
    draw();
  }

  if (gameState.current === 4) {
    currentState = 4;
    let getReady = new Image();
    getReady.src = "../images/get-ready.png";
    function draw() {
      currentState === 4
        ? window.requestAnimationFrame(draw)
        : window.cancelAnimationFrame(draw);

      context.drawImage(getReady, 0, 0, 18 * tileWidth, 13 * tileHeight);
      canvas.addEventListener("click", () => {
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

  if (gameState.current === 5) {
    currentState = 5;
    const tileMapEditor = new Editor(tileHeight, tileWidth, context);

    function editorLoop() {
      window.requestAnimationFrame(editorLoop);
      context.clearRect(0, 0, canvas.width, canvas.height);
      tileMapEditor.draw();
    }

    editorLoop();
  }

  if (gameState.current === 6) {
    let levelData = [];
    currentState = 6;
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

function loop() {
  checkGameState();
  requestAnimationFrame(loop);
}

function checkGameState() {
  if (gameState.current !== currentState) {
    for (let i = 0; i < 3; i++) {
      allBtn[i].style.display = "none";
    }
    mainLoop();
  }
}

const showCustomLevels = (levelData) => {
  levelContainer = document.createElement("div");
  levelContainer.classList.add("levels-container");
  levelData.map((data, index) => {
    date = new Date(data.createdAt);
    customLevelContainer = document.createElement("div");
    customLevelContainer.classList.add("level");
    customLevelHeading = document.createElement("h2");
    customLevelHeading.innerHTML = `Custom Level ${index + 1}`;
    customLevelDate = document.createElement("p");
    customLevelDate.innerHTML = `Created At: ${date.toDateString()}`;
    customLevelContainer.appendChild(customLevelHeading);
    customLevelContainer.appendChild(customLevelDate);
    levelContainer.appendChild(customLevelContainer);

    customLevelContainer.addEventListener("click", () => {
      levelContainer.style.display = "none";
      let customMap = {
        map: data.map,
      };
      // console.log(customMap);
      localStorage.setItem("customMap", JSON.stringify(customMap));
      // localStorage.setItem("customMap", customMap);
      gameState.current = 1;
    });
  });
  container.appendChild(levelContainer);
};

loop();
