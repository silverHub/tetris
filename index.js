import createGame from "./game.js";
import createPiece from "./piece.js";
import createTable from "./table.js";

// TODO
// canvas
// controls
// play/pause + reset
// rotation
// floor

let pause = false;

document.addEventListener("keydown", ({ key }) => {
  if (key === "ArrowLeft") {
    piece.moveLeft();
  }
  if (key === "ArrowRight") {
    piece.moveRight();
  }
  if (key === "ArrowDown") {
    piece.moveDown();
  }
  if (key === "ArrowUp") {
    piece.rotate();
  }
});

document.addEventListener("click", (event) => {

  event.preventDefault();
  const target = event.target;

  if (target.id === "playpause") {
    if (pause) {
      // starting game
      target.innerText = "Pause";
      game.play();
    } else {
      // pausing game
      target.innerText = "Play";
      game.pause();
    }
    pause = !pause;
  }

  if (target.id === "reset") {
    // reset game
  }
});

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


const piece = createPiece(ctx);
const table = createTable(ctx);
const game = createGame(piece, table);
game.play();
