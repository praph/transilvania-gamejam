class Animations{
    constructor(Phaser){
        //pope anim
        Phaser.anims.create({
            key: 'pope',
            frames: Phaser.anims.generateFrameNumbers('pope', { start: 0, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        //lady anim
        Phaser.anims.create({
            key: 'lady-left',
            frames: Phaser.anims.generateFrameNumbers('lady', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        // monk animation
        Phaser.anims.create({
            key: 'monk-left',
            frames: Phaser.anims.generateFrameNumbers('monk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        Phaser.anims.create({
            key: 'monk-right',
            frames: Phaser.anims.generateFrameNumbers('monk', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        Phaser.anims.create({
            key: 'monk-pow-left',
            frames: Phaser.anims.generateFrameNumbers('monk', { start: 12, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
        Phaser.anims.create({
            key: 'monk-pow-right',
            frames: Phaser.anims.generateFrameNumbers('monk', { start: 18, end: 24 }),
            frameRate: 10,
            repeat: -1
        });

        // baba animation
        Phaser.anims.create({
            key: 'baba-left',
            frames: Phaser.anims.generateFrameNumbers('baba', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        Phaser.anims.create({
            key: 'baba-right',
            frames: Phaser.anims.generateFrameNumbers('baba', { start: 4, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // player anims
        Phaser.anims.create({
            key: 'left',
            frames: Phaser.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        Phaser.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        Phaser.anims.create({
            key: 'right',
            frames: Phaser.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }
}