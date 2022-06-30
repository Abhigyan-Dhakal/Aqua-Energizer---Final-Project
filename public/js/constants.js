// Fetch canvas container and context for canvas
const canvas = document.getElementById("canvasContainer");
const context = canvas.getContext("2d");

// Set height and width for individual tile
const tileHeight = 44;
const tileWidth = 52;

// Set width and height of canvas based on the count of column and rows
canvas.width = maps[0][0].length * tileWidth;
canvas.height = maps[0].length * tileHeight + tileHeight;

// Assign DOM elements to the constants
const container = document.querySelector(".container");
const resetBtn = document.querySelector(".reset-btn");
const playBtn = document.querySelector(".play-btn");
const editorBtn = document.querySelector(".editor-btn");
const savedGamesBtn = document.querySelector(".saved-games-btn");
const allBtn = document.querySelectorAll(".btn");

const movingDirection = {
  up: 1,
  down: 3,
  left: 0,
  right: 2,
};

// Initialize variables
let player;
let ball;
let key;
let stone;
let crab;
let shark;
let tileMap;
let levelUp;

let levelContainer;
let customLevelContainer;
let customLevelHeading;
let customLevelDate;
let portalCoordinate = [];

// Initializing empty arrays for game objects
let balls = [];
let keys = [];
let stones = [];
let crabs = [];
let sharks = [];

// Initializing initial game details
let collision = false;
let lives = 3;
let level = 0;
let oxygen = 60;
let platform;

// Row and column lengths
const ROW_LENGTH = 12;
const COL_LENGTH = 18;

// ID for game item
const SAND_ID = 0;
const WALL_ID = 1;
const EMPTY_ID = 2;
const PLAYER_ID = 3;
const BALL_ID = 4;
const PORTAL_ID = 5;
const DOOR_ID = 6;
const KEY_ID = 7;
const CONCRETE_ID = 8;
const STONE_ID = 9;
const CRAB_ID = 10;
const SHARK_UP_ID = 11;
const SHARK_RIGHT_ID = 12;
const SAVE_ID = 13;
const BACK_ID = 14;
const TELEPORT_ID = 15;

// Source path for the images in the game
const SAND_IMG = "../images/sand.png";
const WALL_IMG = "../images/wall.png";
const PORTAL_IMG = "../images/portal.png";
const DOOR_IMG = "../images/door.png";
const CONCRETE_IMG = "../images/concrete.png";
const PLAYER_IMG = "../images/player.png";
const BALL_IMG = "../images/ball.png";
const CRAB_IMG = "../images/crab.png";
const KEY_IMG = "../images/key.png";
const STONE_IMG = "../images/stone.png";
const SHARK_UP_IMG = "../images/shark-up.png";
const SHARK_RIGHT_IMG = "../images/shark-right.png";
const SHARK_LEFT_IMG = "../images/shark-left.png";
const SHARK_DOWN_IMG = "../images/shark-down.png";
const TELEPORT_IMG = "../images/teleport.png";
const SAVE_IMG = "../images/save.png";
const BACK_IMG = "../images/back.png";
const MENU_IMG = "../images/menu.jpg";
const LEVEL_UP_IMG = "../images/level-up.png";
const GAME_OVER_IMG = "../images/game-over.png";
const GET_READY_IMG = "../images/get-ready.png";

// Item's coordinates in the editor
const SAND_EDITOR_POS = [0, 12];
const WALL_EDITOR_POS = [1, 12];
const EMPTY_EDITOR_POS = [2, 12];
const PLAYER_EDITOR_POS = [3, 12];
const BALL_EDITOR_POS = [4, 12];
const PORTAL_EDITOR_POS = [5, 12];
const DOOR_EDITOR_POS = [6, 12];
const KEY_EDITOR_POS = [7, 12];
const CONCRETE_EDITOR_POS = [8, 12];
const STONE_EDITOR_POS = [9, 12];
const CRAB_EDITOR_POS = [10, 12];
const SHARK_UP_EDITOR_POS = [11, 12];
const SHARK_RIGHT_EDITOR_POS = [12, 12];

// Movement speed for game objects
const BALL_GRAVITY = 230;
const STONE_GRAVITY = 230;
const CRAB_SPEED = 400;
const SHARK_SPEED = 400;
const KEY_GRAVITY = 400;

// Level information label positions
const SCORE_MUL = 25;
const INFO_POS_Y = 558;
const LEVEL_INFO_POS_X = 200;
const SCORE_INFO_POS_X = 327;
const BALL_INFO_POS_X = 492;
const OXYGEN_INFO_POS_X = 660;
const LIVES_INFO_POS_X = 796;
