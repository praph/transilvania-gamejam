class Monks {
    constructor(Phaser, map, player, dracula) {
        this.Phaser = Phaser;
        this.map = map;
        this.player = player;
        this.dracula = dracula;

        this.enemies = [];
        this.crosses = [];
    }

    create() {
        // other npc characters
        var monks = this.map.createFromObjects('Enemies', 'monks', {key: 'tile_castle_sprite', frame: 5});

        monks.forEach(anim1 => {
            const newEnemy = this.Phaser.physics.add.sprite(anim1.x, anim1.y, 'monk');
            this.Phaser.physics.add.collider(newEnemy, this.Phaser.groundLayer);
            this.enemies.push(newEnemy);

            anim1.destroy();

            this.Phaser.physics.add.collider(this.player, newEnemy, this.hitPlayer, null, this);

            this.shoot(newEnemy, Phaser.physics);
        })
    }

    cleanUpEnemies() {
        this.enemies.forEach((enemy, index) => {
            if (!enemy.active)
                this.enemies.splice(index, 1);
        })
    }

    shoot(enemy) {
        if (this.ifOnCamera(enemy.x, enemy.y)) {
            const cross = this.Phaser.physics.add.sprite(enemy.x, enemy.y, "cross");
            cross.body.setAllowGravity(false);

            if (enemy.x > this.player.x) {
                cross.body.velocity.x = -250;
            } else {
                cross.body.velocity.x = 250;
            }

            this.crosses.push(cross);
            this.Phaser.physics.add.collider(cross, this.Phaser.groundLayer, this.destroyBullet, null, this);
            this.Phaser.physics.add.collider(cross, this.player, this.shootPlayer, null, this);
        }

        setTimeout(() => {
            if (enemy.active)
                this.shoot(enemy, this.Phaser.physics);
        }, Phaser.Math.FloatBetween(1, 4) * 1000)
    }

    shootPlayer(bullet) {
        bullet.destroy();

        this.dracula.takeDamage()
    }

    /**
     * calculate if the enemy is on camera
     * @param {*} enemyX
     */
    ifOnCamera(enemyX) {
        if (this.player.body.x - enemyX < 400 && this.player.body.x - enemyX > -400)
            return 1;

        return 0;
    }

    animate() {
        this.enemies.forEach((enemy, index) => {
            if (!enemy.active)
                return;
            let enemySpeed;
            if (enemy.x > this.player.x) {
                enemySpeed = -60;
                enemy.anims.play('monk-left', true);
            } else {
                enemySpeed = 60;
                enemy.anims.play('monk-right', true);
            }
            enemy.setVelocityX(enemySpeed);
        });
        this.crosses.forEach((cross, index) => {
            if (cross.x > this.player.x) {
                cross.angle += 5;
            } else {
                cross.angle -= 5;
            }
        })
    }

    destroyBullet(bullet) {
        bullet.destroy();
    }

    hitPlayer(player, enemy) {
        this.dracula.takeDamage();

        enemy.destroy();
    }
}
