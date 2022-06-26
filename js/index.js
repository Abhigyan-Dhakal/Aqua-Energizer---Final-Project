const tileMap = new TileMap(tileHeight, tileWidth, context);
const player = tileMap.getPlayer();
const ball = tileMap.getBall();
function gameLoop() {
  window.requestAnimationFrame(gameLoop);
  context.clearRect(0, 0, canvas.width, canvas.height);
  tileMap.draw();

  for (let index = 0; index < balls.length; index++) {
    balls[index].levelingUp === false ? balls[index].draw(context) : "";
  }

  player.draw(context);
}

tileMap.assignCanvasSize(canvas);

gameLoop();
