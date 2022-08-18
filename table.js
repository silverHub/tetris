import {WIDTH, HEIGHT, SIZE} from './config.js';

function createTable(ctx) {


    const renderGrid = () => {
        ctx.strokeStyle = "white";
        for (let x = 0; x < WIDTH; x++) {
            for (let y = 0; y < HEIGHT; y++) {
                ctx.strokeRect(x * SIZE, y * SIZE, SIZE, SIZE);
            }
        }
    }

    const render = () => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, SIZE * WIDTH, SIZE * HEIGHT);
    };
    return { render, renderGrid };
}


export default createTable;
