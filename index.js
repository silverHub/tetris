const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const WIDTH = 10;
const HEIGHT = 20;
const SIZE = 20;

let pause = false;

// TODO
// play/pause + reset
// rotation
// floor

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
});

document.addEventListener("click", ({ target }) => {
  if (target.id === "play") {
    pause = !pause;
  }
  if (target.id === "reset") {
  }
});

function createPiece() {
  let posX = 3;
  let posY = 0;
  let startTime = Date.now();
  let speed = 1000;

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

  const moveLeft = () => {
    posX > 0 ? (posX -= 1) : posX;
  };
  const moveRight = () => {
    posX < WIDTH - shape.length - 1 ? (posX += 1) : posX;
  };
  const moveDown = () => {
    posY += 1;
  };
  return { render, update, moveLeft, moveRight, moveDown };
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

  if (!pause) {
    requestAnimationFrame(tick);
  }
}
requestAnimationFrame(tick);
