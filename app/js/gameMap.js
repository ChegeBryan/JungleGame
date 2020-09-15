// variables
const map = document.getElementById('map');
let fight = false;
export let arr = [];
let rangeX = [];
let rangeY = [];
export let activePlayer;
export let passivePlayer;
let adjacentCells;

// create the game map
function createMap(numberCells) {
  for (let i = 0; i < numberCells; i++) {
    const gridCells = document.createElement('div');
    gridCells.id = i;
    gridCells.classList.add('grid');
    map.appendChild(gridCells);
  }
}
createMap(100);
