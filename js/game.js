var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    input: {
        gamepad: true,  // add to enable gamepad input
        queue: true
    }
};

var musicConfig = {
    mute: false,
    volume: 20,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0
}

var player;
var enemy;
var monk;
var potion;
var enemySpeed;
var cross;
var usturoi;
var bullet;
var pope;
var platforms;
var lady;
var cursors;
var gameOver = false;
var night = false;
var takenDamage = false;
var lifesModeText;
var takenDamageText;
var fpsText;
var healthBar = [];

// classes
var babe;
var monks;
var parallaxBackground;
var dracula;
var gui;

// enemies
var enemyGroup;
var enemies = []; // arr
var bullets = []; // arr

// layers
var groundLayer;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('baba', 'assets/baba.png', { frameWidth: 28, frameHeight: 39 });
    this.load.spritesheet('monk', 'assets/monk.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('lady', 'assets/lady.png', { frameWidth: 24, frameHeight: 48 });
    this.load.spritesheet('pope', 'assets/pope.png', { frameWidth: 73, frameHeight: 68 });
    this.load.spritesheet('tile_castle_sprite', 'assets/map/tile_castle.png', { frameWidth: 32, frameHeight: 32 });

    this.load.image("usturoi", "assets/usturoi.png");
    this.load.image("potion", "assets/potion.png");
    this.load.image("cross", "assets/cross.png");
    this.load.image("tiles", "assets/map/tile_castle.png");
    this.load.image("tiles_grey", "assets/map/tile_castle_grey.png");
    this.load.image("background", "assets/background/background.png");

    // this.load.image("background-1", "assets/background/background-1.png");
    // this.load.image("background-2", "assets/background/background-2.png");
    // this.load.image("background-3", "assets/background/background-3.png");
    this.load.image("health-vampire", "assets/Vampire_icon-icons.com_75033.png");
    this.load.image("tolerance-inside", "assets/tolerance-inside.png");
    this.load.image("tolerance-placeholder", "assets/tolerance-placeholder.png");

    this.load.tilemapTiledJSON("map", "assets/map/map800.json");

    this.load.audio('dracula', 'assets/dracula.mp3');
}

function create ()
{
    // create map
    const map = this.make.tilemap({key:"map"})

    this.cameras.main.backgroundColor.setTo(153,207,255);

    var music = this.sound.add('dracula', 'musicConfig');
    music.play();
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    this.tileset = map.addTilesetImage('tile_castle', "tiles");
    this.tileset_grey = map.addTilesetImage('tile_castle_grey', "tiles_grey");
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const backgroundCastleLayer = map.createDynamicLayer("Castel", this.tileset_grey, 0, 0);
    groundLayer = map.createDynamicLayer("Ground", this.tileset_grey, 0, 0);
    this.groundLayer = groundLayer;
    const groundNightLayer = map.createDynamicLayer("GroundNight", this.tileset, 0, 0);
    // const backgroundLayer = map.createDynamicLayer("Background", this.tileset_grey, 0, 0);
    const backgroundUsiLayer = map.createDynamicLayer("Usi", this.tileset_grey, 0, 0);
    var coins = map.createFromObjects('Night', 'shadow', { key: 'tile_castle_sprite', frame: 5 });
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
    groundLayer.setCollisionByExclusion([-1]);

    // set the boundaries of our game world
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    // The player and its settings
    player = this.physics.add.sprite(500, 450, 'dude');
    enemy = this.physics.add.sprite(-10, 25, 'baba');
    lady = this.physics.add.sprite(-10, 45, 'lady');
    pope = this.physics.add.sprite(-10, 55, 'pope');
    monk = this.physics.add.sprite(-10, 65, 'monk');


    // init classes
    babe = new Babe(this, map, player);
    monks = new Monks(this, map);
    parallaxBackground = new ParallaxBackground(this, map);
    // create animations
    const animations = new Animations(this);
    dracula = new Dracula(this, map);

    // Parallax background
    parallaxBackground.create();

    potion = this.physics.add.sprite(-10, 15, 'potion');

    cross = this.physics.add.sprite(-10, 35, 'cross');


    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  The score
    lifesModeText = this.add.text(16, 16, 'lifes');
    lifesModeText.setScrollFactor(0);

    // enemy interactions
    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, groundLayer);
    this.physics.add.collider(enemy, groundLayer);
    this.physics.add.collider(monk, groundLayer);
    this.physics.add.collider(lady, groundLayer);
    this.physics.add.collider(pope, groundLayer);
    this.physics.add.collider(potion, groundLayer);
    this.physics.add.collider(cross, groundLayer);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);

    this.buttons = {}
    this.buttons.nightMode = this.input.keyboard.addKey('n');  // Get key object

    this.physics.add.overlap(player, coinsGroup, oFunctie);

    // night damage
    takenDamageText = this.add.text(16, 32, takenDamage ? 'la soare!!!' : 'la umbra');
    takenDamageText.setScrollFactor(0);

    babe.create(this, map, player);
    monks.create(this, map, player);

    fpsText = this.add.text(16, 79, 'fps');
    fpsText.setScrollFactor(0);

    gui = new GameGUI(this);
    healthBar = gui.createHealthBar();
    toleranceBar = gui.createToleranceBar();
}

function oFunctie(sprite, health){
    // console.log(123);
    takenDamage = false;
}

function update ()
{
    if (this.input.gamepad.total) {
        var pad = this.input.gamepad.getPad(0);
    }
    var xAxis = pad ? pad.axes[0].getValue(0) : 0;
    

    babe.cleanUpEnemies();

    // dracula's tolerance to sun
    if(takenDamage && !dracula.getNight())
        dracula.decreaseTolerance()
    else
        dracula.increaseTolerance()

    takenDamage = true;

    // update texts
    takenDamageText.setText('tolerance: ' + dracula.getTolerance());
    lifesModeText.setText('lifes: ' + dracula.getLifes());
    fpsText.setText('fps: ' + game.loop.actualFps);
    gui.updateHealthBar(dracula.getLifes());
    gui.updateToleranceBar(dracula.getTolerance());

    babe.animate();
    monks.animate();

    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown || xAxis < 0)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);

        parallaxBackground.tileLeft();

        // console.log(player.body.x);

    }
    else if (cursors.right.isDown || xAxis > 0)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);

        parallaxBackground.tileRight();
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.onFloor())
    {
        player.setVelocityY(-370);
    }
    if(pad && pad.A && player.body.onFloor())
        player.setVelocityY(-370);


    if(dracula.getNight()){
        var texture = this.sys.textures.get('tiles');
        this.tileset_grey.setImage(texture);
        parallaxBackground.day();
    }else{
        var texture = this.sys.textures.get('tiles_grey');
        this.tileset_grey.setImage(texture);
        parallaxBackground.night();
    }
}
