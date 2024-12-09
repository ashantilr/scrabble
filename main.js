import { Game } from "./game.js";

// UI Components
const boardGridElement = document.getElementById("board");
const playButtonElement = document.getElementById("play");

// Game Board
const game = new Game();

window.Game = Game;

window.addEventListener("DOMContentLoaded", () => {
  // Initialize the game board
  game.render(boardGridElement);
});


if (playButtonElement) {
  playButtonElement.addEventListener("click", () => {
    
  });
}
