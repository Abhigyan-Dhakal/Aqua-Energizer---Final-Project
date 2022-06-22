const tileMap = new TileMap(tileHeight, tileWidth, context);

const player = tileMap.getPlayer();
const ball = tileMap.getBall();
// console.log(balls);
function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  tileMap.draw();
  player.draw(context);
  for (let index = 0; index < balls.length; index++) {
    balls[index].draw(context);
  }
}

tileMap.assignCanvasSize(canvas);

setInterval(gameLoop, 1000 / 60);
