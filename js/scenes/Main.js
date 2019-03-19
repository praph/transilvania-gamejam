class SceneMain extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMain" });
    }
  
    preload() {
        this.load.image("menu", "assets/background-start.jpg");
    }
  
    create() {
        const fcc = this.physics.add.sprite(400, 300, 'menu');
        fcc.body.allowGravity = false;
        
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        console.log(spaceBar);
    }
  
    update() {
        
        if (this.input.gamepad.total) {
            var pad = this.input.gamepad.getPad(0);
        }
    }
  }