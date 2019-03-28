var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-container',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [
        SceneIntro,
        SceneMenu,
        SceneMain,
        SceneGameOver
    ],
    input: {
        gamepad: true,  // add to enable gamepad input
        queue: true
    }
};


var game = new Phaser.Game(config);
