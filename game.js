import { scoring } from "./scoring.js";

// Given shuffle algorithm for picking words in a bag
function shuffle(array) {
  // Fisher-Yates shuffle, used for random decoder cipher below
  let m = array.length;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    let i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    let t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export class Game {
  // Private fields
  #bag; // The bag of tiles
  #grid; // The game board

  constructor() {
    this.#bag = this.#initBag();
    this.#grid = this.#initGrid();
  }

  #initBag() {
    
    const bag = [];
    for(let x=0; x<12; ++x)
    {
      bag.push("e");
    }
    for(let x=0; x<9; ++x)
    {
      bag.push("a");
      bag.push("i");
    }
    for(let x=0; x<8; ++x)
    {
      bag.push("o");
    }
    for(let x=0; x<6; ++x)
    {
      bag.push("n");
      bag.push("r");
      bag.push("t");
    }
    for(let x=0; x<4; ++x)
    {
      bag.push("l");
      bag.push("s");
      bag.push("u");
      bag.push("d");
    }
    for(let x=0; x<3; ++x)
    {
      bag.push("g");
    }
    for(let x=0; x<2; ++x)
    {
      bag.push("*");
      bag.push("b");
      bag.push("c");
      bag.push("m");
      bag.push("p");
      bag.push("f");
      bag.push("h");
      bag.push("v");
      bag.push("w");
      bag.push("y");
    }

    bag.push("k");
    bag.push("j");
    bag.push("x");
    bag.push("q");
    bag.push("z");
    
    
    return shuffle(bag);
  }

  #initGrid() {
    
    const grid = [undefined];
    let row=[undefined];
    for(let x=0; x<15; x++)
    {
      row.push(null);
    }
    for(let x=0; x<15; x++)
    {
      grid.push(row);
    }
    return grid;
  }

  /**
   * This function removes the first n tiles from the bag and returns them. If n
   * is greater than the number of remaining tiles, this removes and returns all
   * the tiles from the bag. If the bag is empty, this returns an empty array.
   * @param {number} n The number of tiles to take from the bag.
   * @returns {Array<string>} The first n tiles removed from the bag.
   */
  takeFromBag(n) {
    
    let arr=[];
    if(this.#bag.length===0){ return [];}
    if(n>(this.#bag.length - n))
    {
      arr= this.#bag;
    }
    else{
      for(let i=0; i<n; i++)
      {
        arr.push(this.#bag[i]);
      }
    }
    return arr;

  }

  #canBePlacedOnBoard(word, position, direction) {
    
    let length = word.length;
    let canPlace = true;
    if(position.x >15 || position.x<0||position.y >15 || position.y<0)
    {
      canPlace=false;
    }
    if(direction)
    {
      let spaces = 15-position.y;
      if(spaces< length)
      {
        canPlace=false;
      }
      else{
        for(let i=position.y; i<length; i++)
        {
          if(this.#grid[position.x][i]!==null)
          {
            canPlace=false;
          }
        }
      }
      
    }
    if(!direction)
    {
      let spaces = 15-position.x;
      if(spaces< length)
      {
        canPlace=false;
      }
      else{
        for(let i=position.x; i<length; i++)
        {
          if(this.#grid[i][position.y]!==null)
          {
            canPlace=false;
          }
        }
      }
      
    }
   
    return canPlace;
  }

  #placeOnBoard(word, position, direction) {
  
    let length = word.length;
    if(direction)
    {
      count=0;
      for(let i=position.y; i<length; i++)
        {
          this.#grid[position.x][i]=word[count];
          count++;
        }
    }
    if(!direction)
    {
      count=0;
      for(let i=position.x; i<length; i++)
        {
          this.#grid[i][position.y]=word[count];
          count++;
        }
    }
  }

  /**
   * This function will be called when a player takes a turn and attempts to
   * place a word on the board. It will check whether the word can be placed at
   * the given position. If not, it'll return -1. It will then compute the score
   * that the word will receive and return it, taking into account special
   * positions.
   *
   * @param {string} word The word to be placed.
   * @param {Object<x|y, number>} position The position, an object with
   * properties x and y. Example: { x: 2, y: 3 }.
   * @param {boolean} direction Set to true if horizontal, false if vertical.
   * @returns {number} The score the word will obtain (including special tiles),
   * or -1 if the word cannot be placed.
   */
  playAt(word, position, direction) {
    if (!this.#canBePlacedOnBoard(word, position, direction)) {
      return -1;
    }

    // Place the word on the board
    this.#placeOnBoard(word, position, direction);

    // Compute the score
    return scoring.score(word, position, direction);
  }

  render(element) {
    
    
  }

  
  testGetBag() {
    return this.#bag;
  }

  testGetGrid() {
    return this.#grid;
  }

  testCanBePlacedOnBoard(word, position, direction) {
    return this.#canBePlacedOnBoard(word, position, direction);
  }

  testPlaceOnBoard(word, position, direction) {
    this.#placeOnBoard(word, position, direction);
  }
}
