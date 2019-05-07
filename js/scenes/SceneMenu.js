class SceneMenu extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMenu" });
    }
  
    preload() {
        this.load.image("menu", "assets/background-start.jpg");
    }
  
    create() {
        const fcc = this.physics.add.sprite(400, 300, 'menu');
        fcc.body.allowGravity = false;


        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // this.pointer = this.scene.scene.input.activePointer;

        this.scene.scene.input.on('pointerdown', function(pointer){
            this.scene.scene.start("SceneMain");
        });
    }
  
    update() {

        if(Phaser.Input.Keyboard.JustDown(this.spaceBar)){
            this.scene.start("SceneMain");
        }

        // if (this.pointer.isDown) {
        //     this.scene.start("SceneMain");
        // }

        if (this.input.gamepad.total) {
            var pad = this.input.gamepad.getPad(0);

            if(pad.A) {
                this.scene.start("SceneMain");
            }
        }
    }
  }