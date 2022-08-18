
let isGridVisible = false;

function createGame(piece, table) {
    let animationId = null;

    function tick(delay) {
        //console.log(`delay`, delay);
        table.render();

        piece.render();
        piece.update();

        if (isGridVisible) {
            table.renderGrid();
        }
        animationId = requestAnimationFrame(tick);
    }
    const play = () => {
        animationId = requestAnimationFrame(tick);
    }
    const pause = () => {
        animationId && cancelAnimationFrame(animationId);
    }
    return { play, pause };
}
export default createGame;
