// Initializing variables for maps and levels
let maps = [];
let editedMap = [];
let levelId = 0;

const level1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 3, 2, 2, 2, 2, 1, 8, 1, 2, 2, 2, 2, 4, 2, 2, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 8, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 8, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 8, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 5, 1, 1, 1, 1, 1, 1, 1],
  [1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1],
  [1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const level2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 0, 0, 0, 2, 9, 2, 2, 4, 2, 2, 2, 6, 2, 1],
  [1, 2, 0, 0, 0, 0, 0, 1, 9, 1, 0, 1, 1, 1, 2, 1, 2, 1],
  [1, 2, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1],
  [1, 2, 0, 0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1],
  [1, 2, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1],
  [1, 2, 0, 0, 0, 0, 0, 2, 2, 0, 9, 0, 9, 0, 0, 1, 2, 1],
  [1, 2, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 0, 1, 7, 2, 2, 0, 3, 0, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const level3 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 2, 2, 2, 2, 2, 2, 11, 2, 9, 2, 2, 2, 8, 0, 1],
  [1, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 8, 2, 2, 2, 8, 0, 1],
  [1, 10, 0, 0, 0, 0, 0, 9, 0, 0, 0, 8, 12, 2, 2, 8, 0, 1],
  [1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 2, 2, 2, 8, 0, 1],
  [1, 2, 0, 0, 2, 4, 2, 2, 2, 2, 0, 0, 2, 2, 2, 8, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1],
  [1, 8, 8, 8, 8, 8, 1, 1, 1, 8, 8, 8, 8, 1, 2, 1, 2, 1],
  [1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 2, 1, 2, 1],
  [1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 2, 1, 2, 1],
  [1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 5, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const level4 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 8, 0, 1],
  [1, 2, 0, 0, 7, 0, 0, 0, 0, 0, 0, 8, 2, 2, 2, 8, 0, 1],
  [1, 2, 0, 0, 0, 0, 0, 9, 0, 0, 0, 8, 12, 2, 2, 8, 0, 1],
  [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 2, 2, 2, 8, 0, 1],
  [1, 10, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 4, 2, 8, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1],
  [1, 8, 8, 8, 8, 8, 1, 1, 1, 8, 8, 8, 8, 1, 2, 1, 2, 1],
  [1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 2, 1, 2, 1],
  [1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 2, 1, 2, 1],
  [1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 5, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const level5 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 0, 0, 0, 2, 8, 9, 8, 2, 0, 2, 0, 0, 0, 0, 2, 1],
  [1, 2, 0, 0, 0, 2, 8, 9, 8, 2, 0, 2, 0, 0, 0, 0, 2, 1],
  [1, 2, 0, 0, 0, 2, 8, 9, 8, 2, 4, 2, 0, 0, 0, 0, 2, 1],
  [1, 2, 0, 0, 0, 2, 8, 9, 8, 2, 4, 2, 0, 0, 0, 0, 2, 1],
  [1, 2, 0, 0, 0, 2, 8, 9, 8, 2, 0, 2, 0, 0, 0, 0, 2, 1],
  [1, 2, 0, 0, 0, 2, 8, 9, 8, 2, 0, 2, 0, 0, 0, 0, 2, 1],
  [1, 2, 0, 0, 0, 2, 8, 9, 8, 2, 0, 2, 0, 0, 0, 0, 2, 1],
  [1, 2, 0, 0, 0, 2, 0, 6, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 3, 2, 2, 2, 7, 9, 2, 2, 2, 2, 9, 1, 1, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1],
];

const defaultEditorMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 2, 2, 2, 14, 13],
];

// Pushing game levels to maps array and assigning active level
maps.push(level1, level2, level3, level4, level5);

let activeLevel = maps[levelId];
