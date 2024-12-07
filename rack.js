export class Rack {
  constructor() {
    this.available = {};
  }

  /**
   * Returns an object of available tiles mapped to their amount.
   *
   * @returns {Object<string, number>} An object describing the tiles available
   * in this rack.
   */
  getAvailableTiles() {
    return this.available;
  }

  /**
   * This function will draw n tiles from the game's bag. If there are not
   * enough tiles in the bag, this should take all the remaining ones.
   *
   * @param {number} n The number of tiles to take from the bag.
   * @param {Game} game The game whose bag to take the tiles from.
   */
  takeFromBag(n, game) {
    
  }
}
