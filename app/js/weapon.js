import { availableCell } from './helper.js';
import { arr } from './gameMap.js';
// weapon class
export default class Weapons {
  constructor(name, image, damage) {
    this.name = name;
    this.image = image;
    this.damage = damage;
  }

  // set weapons on the the grid
  setWeaponposition() {
    let cell = availableCell();
    arr[cell] = this.name;
    const weaponBox = document.getElementById(cell);
    weaponBox.classList.add(this.name);
  }
}
