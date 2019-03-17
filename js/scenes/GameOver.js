class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "GameOver" });
    }
  
    preload() {
        this.load.image("menu", "assets/background-start.jpg");
    }
  
    create() {
        const fcc = this.physics.add.sprite(400, 300, 'menu');
        fcc.body.allowGravity = false;
    }
  
    update() {
        if (this.input.gamepad.total) {
            var pad = this.input.gamepad.getPad(0);
        }
    }
  }