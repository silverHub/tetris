import createPiece from "./piece.js";
import createTable from "./table.js";
import createFloor from "./floor.js";

let isGridVisible = false;

function createGame(ctx) {
  const table = createTable(ctx);
  const floor = createFloor(ctx)
  let piece = createPiece(ctx, floor.getFloorBricks);

  let animationId = null;

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

  function tick(delay) {
    //console.log(`delay`, delay);
    table.render();


    if (piece.end()) {
      floor.add(piece)  
      piece.reset()
    }
    piece.render();
    piece.update();
    floor.render();

    if (isGridVisible) {
      table.renderGrid();
    }
    animationId = requestAnimationFrame(tick);
  }
  const play = () => {
    animationId = requestAnimationFrame(tick);
  };
  const pause = () => {
    animationId && cancelAnimationFrame(animationId);
  };
  const reset = () => {
    floor.reset();
    piece.reset();
  }
  return { play, pause, reset };
}
export default createGame;
