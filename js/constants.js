const canvas = document.getElementById("canvasContainer");
const context = canvas.getContext("2d");

const tileHeight = 44;
const tileWidth = 52;
const movingDirection = {
  up: 1,
  down: 3,
  left: 0,
  right: 2,
};

canvas.width = maps[0][0].length * tileWidth;
canvas.height = maps[0].length * tileHeight + tileHeight;

let balls = [];
let keys = [];
let stones = [];
let crabs = [];
let sharks = [];

let collision = false;
let platform;
