const tileMap = new TileMap(tileHeight, tileWidth, context);
const player = tileMap.getPlayer();
const ball = tileMap.getBall();
const key = tileMap.getKey();
const stone = tileMap.getStone();

function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  context.clearRect(0, 0, canvas.width, canvas.height);
  tileMap.draw();

  for (let index = 0; index < balls.length; index++) {
    balls[index].levelingUp === false ? balls[index].draw(context) : "";
  }

  for (let index = 0; index < keys.length; index++) {
    keys[index].draw(context);
  }

  for (let index = 0; index < stones.length; index++) {
    stones[index].draw(context);
  }

  player.draw(context);
}

tileMap.assignCanvasSize(canvas);

gameLoop();
