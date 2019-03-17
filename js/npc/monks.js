class Monks{
    constructor(Phaser, map){
        this.Phaser = Phaser;
        this.map = map;
        this.player = player;

        this.enemies = [];
    }
    create(){
        // other npc characters
        var monks = this.map.createFromObjects('Enemies', 'monks', { key: 'tile_castle_sprite', frame: 5 });
    
        monks.forEach(anim1 => {
            const newEnemy = this.Phaser.physics.add.sprite(anim1.x, anim1.y, 'monk');
            this.Phaser.physics.add.collider(newEnemy, this.Phaser.groundLayer);
            this.enemies.push(newEnemy);
            
            anim1.destroy();
    
            this.Phaser.physics.add.collider(player, newEnemy, this.hitPlayer, null, Phaser);
    
            this.shoot(newEnemy, Phaser.physics);
        })
    }
    update(){

    }
    cleanUpEnemies(){
        this.enemies.forEach((enemy, index) => {
            if(!enemy.active)
                this.enemies.splice(index, 1);
        })
    }
    shoot(enemy){
        const usturoi = this.Phaser.physics.add.sprite(enemy.x, enemy.y, "usturoi");
        usturoi.body.setAllowGravity(false);
    
        if(enemy.x > player.x) {
            usturoi.body.velocity.x = -500;
        } else {
            usturoi.body.velocity.x = 500;
        }

        usturoi.x ++;
        if(enemy.x > player.x + 50) {
            enemySpeed = -60;
            enemy.anims.play('baba-left', true);
        } else if(enemy.x < player.x - 50){
            enemy.anims.play('baba-right', true);
            enemySpeed = 60;
        }
    
        setTimeout(() => {
            if(!enemy.active)
                return;
    
            bullets.push(usturoi);
            this.shoot(enemy, this.Phaser.physics);
        }, Phaser.Math.FloatBetween(1, 10) * 1000)
    }
    animate(){
        this.enemies.forEach((enemy, index) => {
            if(!enemy.active)
                return;
            
            if(enemy.x > player.x) {
                enemySpeed = -60;
                enemy.anims.play('baba-left', true);
            } else {
                enemySpeed = 60;
                enemy.anims.play('baba-right', true);
            }
            enemy.setVelocityX(enemySpeed);
        })
    }
    hitPlayer(player, enemy)
    {
        enemy.destroy();
    }

}