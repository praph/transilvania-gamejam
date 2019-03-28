class SceneMain extends Phaser.Scene {
    constructor() {
        super({key: "SceneMain"});
    }

    preload() {
        let loadingBar = this.add.graphics({
          fillStyle: {
            color: 0x8B0000 // red color
          }
        });

        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 48, frameHeight: 60});
        this.load.spritesheet('baba', 'assets/baba.png', {frameWidth: 28, frameHeight: 39});
        this.load.spritesheet('monk', 'assets/monk.png', {frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('lady', 'assets/lady.png', {frameWidth: 24, frameHeight: 48});
        this.load.spritesheet('pope', 'assets/pope.png', {frameWidth: 73, frameHeight: 68});
        this.load.spritesheet('tile_castle_sprite', 'assets/map/tile_castle.png', {frameWidth: 32, frameHeight: 32});

        this.load.image("usturoi", "assets/usturoi.png");
        this.load.image("potion", "assets/potion.png");
        this.load.image("cross", "assets/cross.png");
        this.load.image("tiles", "assets/map/tile_castle.png");
        this.load.image("tiles_grey", "assets/map/tile_castle_grey.png");
        this.load.image("background", "assets/background/background.png");

        this.load.image("bg-red", "assets/blood.png");
        // this.load.image("background-1", "assets/background/background-1.png");
        // this.load.image("background-2", "assets/background/background-2.png");
        // this.load.image("background-3", "assets/background/background-3.png");
        this.load.image("health-vampire", "assets/Vampire_icon-icons.com_75033.png");
        this.load.image("tolerance-inside", "assets/tolerance-inside.png");
        this.load.image("tolerance-placeholder", "assets/tolerance-placeholder.png");

        this.load.tilemapTiledJSON("map", "assets/map/map800.json");

        this.load.audio('dracula', 'assets/dracula.ogg');
        this.load.audio('wolf', 'assets/werewolf.ogg');
        // making the loading bar
        this.load.on("progress", (percent) => {
          loadingBar.fillRect(0, game.renderer.height-50, game.renderer.width * percent, 50);
        });
    }

    create() {
        this.player = {};
        this.enemy = {};
        this.monk = {};
        this.potion = {};
        this.red = {};
        this.cross = {};
        this.pope = {};
        this.lady = {};
        this.cursors = {};
        this.gameOver = false;
        this.takenDamage = false;
        this.lifesModeText = {};
        this.takenDamageText = {};
        this.fpsText = {};
        this.healthBar = {};
        this.toleranceBar = {};

// classes
        this.babe = {};
        this.monks = {};
        this.parallaxBackground = {};
        this.dracula = {};
        this.gui = {};

// layers
        this.groundLayer = {};
        // create map
        const map = this.make.tilemap({key: "map"})

        this.cameras.main.backgroundColor.setTo(153, 207, 255);

        var music = this.sound.add('dracula');
        music.setLoop(true);
        music.play();
        var wolf = this.sound.add('wolf');
        wolf.setLoop(true);
        wolf.play();
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        this.tileset = map.addTilesetImage('tile_castle', "tiles");
        this.tileset_grey = map.addTilesetImage('tile_castle_grey', "tiles_grey");
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const backgroundCastleLayer = map.createDynamicLayer("Castel", this.tileset_grey, 0, 0);
        this.groundLayer = map.createDynamicLayer("Ground", this.tileset_grey, 0, 0);
        const groundNightLayer = map.createDynamicLayer("GroundNight", this.tileset, 0, 0);
        // const backgroundLayer = map.createDynamicLayer("Background", this.tileset_grey, 0, 0);
        const backgroundUsiLayer = map.createDynamicLayer("Usi", this.tileset_grey, 0, 0);
        var coins = map.createFromObjects('Night', 'shadow', {key: 'tile_castle_sprite', frame: 5});
        var coinsGroup = this.physics.add.group();

        coins.forEach(sprite => {
            coinsGroup.add(sprite)
        })
        coinsGroup.children.entries.forEach(sprite => {
            sprite.body.setAllowGravity(false);
            sprite.setAlpha(0);
            // sprite.alpha
        })

        // the player will collide with this layer
        this.groundLayer.setCollisionByExclusion([-1]);

        // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        // The player and its settings
        this.player = this.physics.add.sprite(500, 450, 'dude');
        this.enemy = this.physics.add.sprite(-10, 25, 'baba');
        this.lady = this.physics.add.sprite(-10, 45, 'lady');
        this.pope = this.physics.add.sprite(-10, 55, 'pope');
        this.monk = this.physics.add.sprite(-10, 65, 'monk');


        // init classes
        this.dracula = new Dracula(this, map, this.player);
        this.babe = new Babe(this, map, this.player, this.dracula);
        this.monks = new Monks(this, map, this.player, this.dracula);
        this.parallaxBackground = new ParallaxBackground(this, map);
        // create animations
        const animations = new Animations(this);


        this.red = this.add.image(400, 300, 'bg-red')
        this.red.setDepth(-10);
        // Parallax background
        this.parallaxBackground.create();

        this.potion = this.physics.add.sprite(-10, 15, 'potion');

        this.cross = this.physics.add.sprite(-10, 35, 'cross');


        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //  Our player animations, turning, walking left and walking right.

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        //  The score
        this.lifesModeText = this.add.text(16, 16, 'lifes');
        this.lifesModeText.setScrollFactor(0);

        // enemy interactions
        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.collider(this.enemy, this.groundLayer);
        this.physics.add.collider(this.monk, this.groundLayer);
        this.physics.add.collider(this.lady, this.groundLayer);
        this.physics.add.collider(this.pope, this.groundLayer);
        this.physics.add.collider(this.potion, this.groundLayer);
        this.physics.add.collider(this.cross, this.groundLayer);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        this.buttons = {}
        this.buttons.nightMode = this.input.keyboard.addKey('n');  // Get key object

        this.physics.add.overlap(this.player, coinsGroup, this.oFunctie);

        // night damage
        this.takenDamageText = this.add.text(16, 32, this.takenDamage ? 'la soare!!!' : 'la umbra');
        this.takenDamageText.setScrollFactor(0);

        this.babe.create(this, map, this.player);
        this.monks.create(this, map, this.player);

        const waterLayer = map.createStaticLayer("apa", this.tileset, 0, 0);
        waterLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, waterLayer);

        this.fpsText = this.add.text(16, 79, 'fps');
        this.fpsText.setScrollFactor(0);

        this.gui = new GameGUI(this);
        this.healthBar = this.gui.createHealthBar();
        this.toleranceBar = this.gui.createToleranceBar();
    }

    oFunctie(sprite, health) {
        this.takenDamage = false;
    }

    update() {
        if (this.input.gamepad.total) {
            var pad = this.input.gamepad.getPad(0);
        }
        var xAxis = pad ? pad.axes[0].getValue(0) : 0;

        if (this.takenDamage && !this.dracula.getNight()) {
            this.red.setDepth(10);
            this.red.setAlpha(.5);
            this.red.setScrollFactor(0);
        } else {
            this.red.setDepth(-10);
            this.red.setAlpha(0);
        }

        this.babe.cleanUpEnemies();

        // dracula's tolerance to sun
        if (this.takenDamage && !this.dracula.getNight())
            this.dracula.decreaseTolerance()
        else
            this.dracula.increaseTolerance()

        this.takenDamage = true;

        // update texts
        this.takenDamageText.setText('tolerance: ' + this.dracula.getTolerance());
        this.lifesModeText.setText('lifes: ' + this.dracula.getLifes());
        this.fpsText.setText('fps: ' + game.loop.actualFps);
        this.gui.updateHealthBar(this.dracula.getLifes());
        this.gui.updateToleranceBar(this.dracula.getTolerance());

        this.babe.animate();
        this.monks.animate();

        if (this.dracula.getLifes() == 0) {
              this.scene.start("SceneGameOver");
        }

        if (this.cursors.left.isDown || xAxis < 0) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);

            this.parallaxBackground.tileLeft();
        } else if (this.cursors.right.isDown || xAxis > 0) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);

            this.parallaxBackground.tileRight();
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-370);
        }
        if (pad && pad.A && player.body.onFloor())
            this.player.setVelocityY(-370);


        if (this.dracula.getNight()) {
            var texture = this.sys.textures.get('tiles');
            this.tileset_grey.setImage(texture);
            this.parallaxBackground.day();
        } else {
            var texture = this.sys.textures.get('tiles_grey');
            this.tileset_grey.setImage(texture);
            this.parallaxBackground.night();
        }
    }
}
