import { availableCell, searchWeapon } from './helper.js';
import { arr, activePlayer, passivePlayer } from './gameMap.js';
// player class
export default class Player {
  constructor(name, image) {
    this.name = name;
    this.image = image;
    this.lifePoints = 100;
    this.damage = 10;
    this.active = false;
  }

  // place the player on the grid method
  setPlayerPosition() {
    let cell = availableCell();
    arr[cell] = this.name;
    const playerBox = document.getElementById(cell);
    playerBox.classList.add(this.name);
    playerBox.innerHTML = `<img src="./image/${this.image}" height="58"></img>`;
    // players should not be adjacent
    const adjacents = [cell - 1, cell - 10, cell + 1, cell + 10];
    // fill adjacent cells to the player with with values to indicate not empty
    // This disallows the cells from being occupied by a another player
    adjacents.forEach((adjacent) => {
      if (adjacent >= 0 && adjacent < 100 && !(adjacent in arr))
        arr[adjacent] = 'full';
    });
    return (this.position = cell);
  }

  // create valid movement range
  setMovementRange(playerPosition) {
    $('div#map > div').removeClass('range');

    rangeX = [];
    rangeY = [];
    const width = 10;
    let up = playerPosition - 10;
    let down = playerPosition + 10;
    let right = playerPosition + 1;
    let left = playerPosition - 1;
    let blocked = false;
    const xMin = playerPosition - (playerPosition % width);
    const xMax = xMin + 9;

    while (up >= 0 && up >= playerPosition - 30) {
      blocked = false;
      const ranges = $(`div#${up}`).attr('class').split(/\s+/);
      ranges.forEach((item) => {
        if (item === 'obstacle' || item === 'player1' || item === 'player2') {
          blocked = true;
        }
      });

      if (blocked === true) {
        break;
      } else {
        $(`div#${up}`).addClass('range');
        rangeY.push(up);
      }
      up -= 10;
    }

    while (down <= 99 && down <= playerPosition + 30) {
      blocked = false;
      const ranges = $(`div#${down}`).attr('class').split(/\s+/);
      ranges.forEach((item) => {
        if (item === 'obstacle' || item === 'player1' || item === 'player2') {
          blocked = true;
        }
      });

      if (blocked === true) {
        break;
      } else {
        $(`div#${down}`).addClass('range');
        rangeY.push(down);
      }
      down += 10;
    }
    while (left >= xMin && left >= playerPosition - 3) {
      blocked = false;
      const ranges = $(`div#${left}`).attr('class').split(/\s+/);
      ranges.forEach((item) => {
        if (item === 'obstacle' || item === 'player1' || item === 'player2') {
          blocked = true;
        }
      });

      if (blocked === true) {
        break;
      } else {
        $(`div#${left}`).addClass('range');
        rangeX.push(left);
      }
      left -= 1;
    }
    while (right <= xMax && right <= playerPosition + 3) {
      blocked = false;
      const ranges = $(`div#${right}`).attr('class').split(/\s+/);
      ranges.forEach((item) => {
        if (item === 'obstacle' || item === 'player1' || item === 'player2') {
          blocked = true;
        }
      });

      if (blocked === true) {
        break;
      } else {
        $(`div#${right}`).addClass('range');
        rangeX.push(right);
      }
      right += 1;
    }
    return [rangeX, rangeY];
  }

  // activate  player
  activatePlayer() {
    if (this.name === 'player1') {
      this.active = true;
      //let passivePlayer = player2;
    }
    // else {
    //   //let activePlayer = player2;
    //   //let passivePlayer = player;
    // }

    if (fight === false) {
      activePlayer.setMovementRange(this.position);
    }
  }

  // player movement method
  movement(targetPosition) {
    // get new player position
    targetPosition = parseInt(targetPosition);

    //remove the previous player position
    arr.splice(this.position, 1);
    rangeX.splice(this.position, 1);
    rangeY.splice(this.position, 1);
    rangeX.splice(targetPosition, 1);
    rangeY.splice(targetPosition, 1);

    if (targetPosition == this.position) {
      return (arr[targetPosition] = 'full');
    }
    arr[targetPosition] = this.name;

    // change player position
    const oldPosition = document.getElementById(this.position);
    oldPosition.classList.remove(this.image, this.name);
    const newPosition = document.getElementById(targetPosition);
    newPosition.classList.add(this.name);
    const searchWeaponFrom = this.position;
    const searchWeaponTo = targetPosition;
    //search weapons
    searchWeapon(searchWeaponFrom, searchWeaponTo);

    this.position = targetPosition;
    adjacentCells = [
      targetPosition - 1,
      targetPosition + 1,
      targetPosition - 10,
      targetPosition + 10,
    ];

    switch (this.name) {
      case 'player1':
        newPosition.innerHTML = `<img src="./image/${this.image}" height="58"></img>`;

        break;
      case 'player2':
        newPosition.innerHTML = `<img src="./image/${this.image}" height="58"></img>`;
        break;
    }

    oldPosition.innerHTML = '';

    $.each(adjacentCells, (index, adjacent) => {
      if ($(`#${adjacent}`).find('img').length) {
        fight = true;
        fightEnabled();
      }
    });

    if (fight === false) {
      passivePlayer.activatePlayer();
    } else {
      // fight
      rangeX = [];
      rangeY = [];
      $('div#map > div').removeClass('range');
      fightEnabled();
    }
  }
}
