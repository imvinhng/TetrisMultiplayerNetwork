const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add('local');
localTetris.run();

const connectionManager = new ConnectionManager(tetrisManager);
connectionManager.connect('ws://localhost:9000','echo-protocol');

alert(' Rules \n Please use Q or W to rotate the tetromino,\n LEFT and RIGHT arows to move across the board,\n DOWN arrow to speed up the tetromino \n SPACEBAR anytime to pause the game ')

const keyListener = (event) => {
    [
        [37, 39, 81, 87, 40, 32],
    ].forEach((key, index) => {
        const player = localTetris.player;
        if (event.type === 'keydown') {
            if (event.keyCode === key[0]) {
                player.move(-1);
            } else if (event.keyCode === key[1]) {
                player.move(1);
            } else if (event.keyCode === key[2]) {
                player.rotate(-1);
            } else if (event.keyCode === key[3]) {
                player.rotate(1);
            } else if (event.keyCode === 32) {
                alert("PAUSE MENU");
            }
        }

        if (event.keyCode === key[4]) {
            if (event.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
                }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        }

    });
};

document.addEventListener('keydown', event => {
    if (event.keyCode === 32) {
        alert("PAUSE MENU");
    }
});

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
