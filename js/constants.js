const canvas = document.getElementById("canvasContainer");
const context = canvas.getContext("2d");

const tileHeight = 54;
const tileWidth = 62;
let balls = [];
let keys = [];
let stones = [];

let collision = false;
let platform;
