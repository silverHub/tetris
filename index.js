import createGame from "./game.js";

// TODO
// OK canvas
// OK controls
// OK play/pause + reset
// OK rotation
// OK floor
// OK pieces
// OK delete-line
// endgame
// score
// mobile support
// test

const pauseOverlay = document.getElementById("pause-overlay");
let pause = false;
const togglePause = () => {
  if (pause) {
    // starting game
    // hide pause overlay
    pauseOverlay.style.display = "none"
    game.play();
  } else {
    // pausing game
    // show pause overlay
    pauseOverlay.style.display = "block"
    game.pause();
  }
  pause = !pause;

}

document.addEventListener("click", (event) => {

  event.preventDefault();
  const target = event.target;

  if (target.id === "reset") {
    game.reset()
  }
});
document.addEventListener("keydown", ({ key }) => {
  if (key === " ") {
    togglePause()
  }
});

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const game = createGame(ctx);
game.play();
