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
            gravity: {y: 500},
            debug: false
        }
    },
    scene: [
        SceneIntro,
        SceneMenu,
        SceneMain,
        SceneMain2,
        SceneMain3,
        SceneMain4,
        SceneGameOver
    ],
    input: {
        gamepad: true,  // add to enable gamepad input
        queue: true
    },
    plugins: {
        global: [
            {
                key: 'rexVirtualJoyStick',
                plugin: rexvirtualjoystickplugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);
