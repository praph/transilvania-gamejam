class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: "SceneGameOver" });
    }

    preload() {
        this.load.image("end", "assets/za-background-end.jpg");
    }

    create() {
        const end = this.physics.add.sprite(400, 300, 'end');
        end.body.allowGravity = false;

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.spaceBar)){
            this.scene.start("SceneMain");
        }
        if (this.input.gamepad.total) {
            var pad = this.input.gamepad.getPad(0);

            if(pad.A) {
                this.scene.start("SceneMain");
            }
        }
    }
  }
