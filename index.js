const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = 10;
const HEIGHT = 20;
const SIZE = 20;

function createPiece() {
  let posX = 3;
  let posY = 0;
  let startTime = Date.now();
  let speed = 500;

  const shape = [
    [0, 1, 0],
    [1, 1, 1],
  ];
  const render = () => {
    for (const [rowInd, row] of shape.entries()) {
      for (const [colInd, col] of row.entries()) {
        ctx.fillStyle = col ? "red" : "black";
        ctx.fillRect(
          (posX + colInd) * SIZE,
          (posY + rowInd) * SIZE,
          SIZE,
          SIZE
        );
      }
    }
  };
  const update = () => {
    const now = Date.now();

    if (now - startTime > speed) {
      if (posY < HEIGHT - shape.length) {
        posY += 1;
        console.log(`posY`, posY);
      }
      startTime = now;
    }
  };
  return { render, update };
}

function renderGrid() {
  ctx.strokeStyle = "white";
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      ctx.strokeRect(x * SIZE, y * SIZE, SIZE, SIZE);
    }
  }
}
function createTable() {
  const render = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, SIZE * WIDTH, SIZE * HEIGHT);
    renderGrid();
  };
  return { render };
}

const piece = createPiece();
const table = createTable();

function tick(delay) {
  //console.log(`delay`, delay);
  table.render();

  piece.render();
  piece.update(delay);

  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
