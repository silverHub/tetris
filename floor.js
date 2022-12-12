import { SIZE } from "./config.js";
const createFloor = (ctx) => {
  let bricks = [];

  const removeBricks = (y) => {
    bricks = bricks.filter((brick) => brick[1] != y);
    bricks = bricks.map(brick => [brick[0], brick[1] < y ? brick[1] + SIZE : brick[1]])
  };
  const removeFullLine = () => {
    let sum = {};
    bricks
      .map((brick) => brick[1])
      .forEach((y) => {
        sum[y] = sum[y] ? sum[y] + 1 : 1;
      });
    
    Object.entries(sum).forEach(
      ([ind, value]) => value === 10  && removeBricks(ind)
    );
  };
  const add = (piece) => {
    for (const brick of piece.getBricks()) {
      bricks.push(brick);
    }
    removeFullLine();
  };

  const getFloorBricks = () => bricks;

  const render = () => {
    for (const coord of bricks) {
      const [x, y] = coord;
      ctx.fillStyle = "grey";
      ctx.fillRect(x, y, SIZE, SIZE);
    }
  };

  const reset = () => {
    bricks = [];
  };

  return { add, getFloorBricks, render, reset };
};

export default createFloor;
