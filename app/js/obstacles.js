import { availableCell } from './helper.js';
import { arr } from './gameMap.js';

// create object class
export default class Obstacles {
  constructor(name, image) {
    this.name = name;
    this.image = image;
  }

  // set obstacles on the grid
  setObstaclePosition() {
    for (let i = 0; i < 10; i++) {
      let cell = availableCell();
      arr[cell] = this.name;
      const obstacleBox = document.getElementById(cell);
      obstacleBox.classList.add(this.name);
    }
  }
}
