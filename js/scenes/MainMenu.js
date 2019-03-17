class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMainMenu" });
    }
  
    preload() {
        this.load.image("menu", "assets/background-start.jpg");
    }
  
    create() {
        const fcc = this.physics.add.sprite(400, 300, 'menu');
        fcc.body.allowGravity = false;


        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // this.spaceBar.on('')
    }
  
    update() {
        if(Phaser.Input.Keyboard.JustDown(this.spaceBar)){
            window.location = 'game.html';
        }
        if (this.input.gamepad.total) {
            var pad = this.input.gamepad.getPad(0);

            
        }
    }
  }