class Dracula {
    constructor(Phaser, map, player) {
        this.Phaser = Phaser;
        this.map = map;
        this.player = player;

        this.lifes = 10;
        this.sunTolerance = 1000;
        this.generatePotions();

        this.nightDuration = 5;
        this.night = false;

        // this.startNight = this.startNight.bind(this);
    }

    create() {

    }

    update() {

    }

    /**
     * get lifes
     */
    getLifes() {
        return this.lifes;
    }

    /**
     * generate potions and bind them
     */
    generatePotions() {
        var potions = this.map.createFromObjects('Potion', 'night', {key: 'tile_castle_sprite', frame: 5});

        potions.forEach(anim1 => {
            const potion = this.Phaser.physics.add.sprite(anim1.x, anim1.y, 'potion');
            this.Phaser.physics.add.collider(potion, this.Phaser.groundLayer);

            anim1.destroy();

            this.Phaser.physics.add.collider(this.player, potion, this.potionCollision.bind(this), null, this);
        })
    }

    potionCollision(player, potion) {
        potion.destroy();
        // debugger;
        this.startNight(this.nightDuration);
    }

    /**
     * start night
     */
    getNight() {
        return this.night;
    }

    startNight(time) {
        if (time < 1) {
            this.night = false;

            return;
        } else {
            this.night = true;
        }

        setTimeout(() => {
            time--;

            this.startNight(time);
        }, 1000);
    }

    /**
     * tolerance to sun
     */
    getTolerance() {
        return this.sunTolerance / 10;
    }

    decreaseTolerance() {
        if (this.sunTolerance < 1) {
            this.sunTolerance = 1000;
            this.takeDamage()
        } else {
            this.sunTolerance = this.sunTolerance - 3;
        }
    }

    increaseTolerance() {
        if (this.sunTolerance < 1000)
            this.sunTolerance = this.sunTolerance + 9;
    }

    /**
     * take damage
     */
    takeDamage() {
        if (this.lifes > 0)
            this.lifes--;
        }
}
