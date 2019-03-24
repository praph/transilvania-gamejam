class SceneIntro extends Phaser.Scene {
    constructor() {
        super({key: "SceneIntro"});
    }

    preload() {
        this.load.image("fcc-logo", "assets/glyph.png");
    }

    create() {
        const fcc = this.physics.add.sprite(400, 300, 'fcc-logo');
        fcc.body.allowGravity = false;
        fcc.alpha = 0;

        let tweendata = {
            targets: fcc,
            alpha: 1,
            duration: 1000,
            ease: "Cubic.easeIn"
        };
        this.tweens.add(tweendata);


        setTimeout(() => {
            tweendata = {
                targets: fcc,
                alpha: 0,
                duration: 1000,
                ease: "Cubic.easeIn"
            }

            this.tweens.add(tweendata);
        }, 3000)

        setTimeout(() => {
            this.scene.start("SceneMenu");
        }, 5000)
    }

    update() {
    }
}