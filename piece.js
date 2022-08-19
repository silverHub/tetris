
import { WIDTH, HEIGHT, SIZE } from './config.js';

function createPiece(ctx) {
    let posX = 3;
    let posY = 0;
    let startTime = Date.now();
    let speed = 1000;

    let shape = [
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
    const rotate = () => {

        const newShape = new Array(shape[0].length).fill(null);
        for (let i = 0; i < newShape.length; i++) {
            newShape[i] = new Array(shape.length).fill(null);
        }

        for (let x = 0; x < shape.length; x++) {
            for (let y = 0; y < shape[x].length; y++) {
                newShape[y][shape.length - 1 - x] = shape[x][y];
            }
        }
        shape = newShape;
    };

    return { render, update, moveLeft, moveRight, moveDown, rotate };
}

export default createPiece;