import { WIDTH, HEIGHT, SIZE, SHAPES, COLORS } from "./config.js";


function createPiece(ctx, getFloorBricks) {
  let ind = Math.floor(Math.random() * 4);
  let shape = SHAPES[ind];
  let color = COLORS[ind];

  let posX = Math.floor(WIDTH / 2 - shape[0].length / 2);
  let posY = 0;
  let startTime = Date.now();
  let speed = 1000;

  function hitFloorDownNext() {
    const floor = getFloorBricks();
    return getBricks().some((brick) => {
      let match = false;
      for (const floorBrick of floor) {
        if (brick[0] === floorBrick[0] && brick[1] + SIZE === floorBrick[1]) {
          match = true;
          break;
        }
      }
      return match;
    });
  }

  function hitFloor() {
    const floor = getFloorBricks();
    return getBricks().some((brick) => {
      let match = false;
      for (const floorBrick of floor) {
        if (brick[0] === floorBrick[0] && brick[1] === floorBrick[1]) {
          match = true;
          break;
        }
      }
      return match;
    });
  }

  const hitBottomEdge = () => posY > HEIGHT - shape.length;
  const hitRightEdge = () => posX > WIDTH - shape[0].length;
  const hitLeftEdge = () => posX < 0;

  const hitBottomEdgeNext = () => posY >= HEIGHT - shape.length;

  const end = () => {
    return hitFloorDownNext() || hitBottomEdgeNext();
  };

  const getBricks = () => {
    const bricks = [];
    for (const [rowInd, row] of shape.entries()) {
      for (const [colInd, col] of row.entries()) {
        if (col) {
          bricks.push([(posX + colInd) * SIZE, (posY + rowInd) * SIZE]);
        }
      }
    }
    return bricks;
  };

  const render = () => {
    for (const [rowInd, row] of shape.entries()) {
      for (const [colInd, col] of row.entries()) {
        ctx.fillStyle = col ? color : "black";
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
      posY += 1;
      startTime = now;
    }
  };

  const moveLeft = () => {
    posX--;
    if (hitLeftEdge() || hitFloor()) {
      posX++;
    }
  };
  const moveRight = () => {
    posX++;
    if (hitRightEdge() || hitFloor()) {
      posX--;
    }
  };
  const moveDown = () => {
    posY += 1;
  };
  const reset = () => {
    ind = Math.floor(Math.random() * 4);
    shape = SHAPES[ind];
    color = COLORS[ind];
  
    posX = Math.floor(WIDTH / 2 - shape[0].length / 2);;
    posY = 0;

    startTime = Date.now();
  };

  const rotatePiece = () => {
    let newShape = new Array(shape[0].length).fill(null);
    for (let i = 0; i < newShape.length; i++) {
      newShape[i] = new Array(shape.length).fill(null);
    }

    for (let x = 0; x < shape.length; x++) {
      for (let y = 0; y < shape[x].length; y++) {
        newShape[y][shape.length - 1 - x] = shape[x][y];
      }
    }
    return newShape;
  };

  const adjustPosition = (newShape) => {
    const length = shape[0].length - newShape[0].length;

    const newPosX = posX + Math.floor(length / 2);
    const newPosY = posY;
    return [newPosX, newPosY];
  };

  const rotate = () => {
    const newShape = rotatePiece();
    const newPosition = adjustPosition(newShape);

    const oldShape = shape;
    const oldPosition = [posX, posY];

    shape = newShape;
    posX = newPosition[0];
    posY = newPosition[1];

    if (hitLeftEdge() || hitRightEdge() || hitBottomEdge() || hitFloor()) {
      shape = oldShape;
      posX = oldPosition[0];
      posY = oldPosition[1];
    }
  };

  return {
    render,
    update,
    moveLeft,
    moveRight,
    moveDown,
    end,
    reset,
    rotate,
    getBricks,
  };
}

export default createPiece;
