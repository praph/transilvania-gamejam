class Babe{
    constructor(Phaser, map, player){
        this.Phaser = Phaser;
        this.map = map;
        this.player = player;

        this.enemies = [];
        this.enemies1 = [];
        this.enemies2 = [];
        this.enemies3 = [];
        this.enemies4 = [];
        this.enemies5 = [];
    }
    create(){
        var anim1 = this.map.createFromObjects('Enemies', 'babe', { key: 'tile_castle_sprite', frame: 5 });
    
        anim1.forEach(anim1 => {
            const newEnemy = this.Phaser.physics.add.sprite(anim1.x, anim1.y, 'baba');
            this.Phaser.physics.add.collider(newEnemy, this.Phaser.groundLayer);
            this.enemies.push(newEnemy);
            
            anim1.destroy();
    
            this.Phaser.physics.add.collider(player, newEnemy, this.hitPlayer, null, Phaser);
    
            this.shoot(newEnemy, Phaser.physics);
        })

        // other npc characters
        var lady = this.map.createFromObjects('Mina', 'lady', { key: 'tile_castle_sprite', frame: 5 });
    
        lady.forEach(anim1 => {
            const newEnemy = this.Phaser.physics.add.sprite(anim1.x, anim1.y, 'lady');
            this.Phaser.physics.add.collider(newEnemy, this.Phaser.groundLayer);
            this.enemies2.push(newEnemy);
            
            anim1.destroy();
    
            this.Phaser.physics.add.collider(player, newEnemy, this.hitPlayer, null, Phaser);
    
            // this.shoot(newEnemy, Phaser.physics);
        })
        var boss = this.map.createFromObjects('Enemies', 'boss', { key: 'tile_castle_sprite', frame: 5 });
    
        boss.forEach(anim1 => {
            const newEnemy = this.Phaser.physics.add.sprite(anim1.x, anim1.y, 'pope');
            this.Phaser.physics.add.collider(newEnemy, this.Phaser.groundLayer);
            this.enemies3.push(newEnemy);
            
            anim1.destroy();
    
            this.Phaser.physics.add.collider(player, newEnemy, this.hitPlayer, null, Phaser);
    
            // this.shoot(newEnemy, Phaser.physics);
        })
        var potion = this.map.createFromObjects('Potion', 'night', { key: 'tile_castle_sprite', frame: 5 });
    
        potion.forEach(anim1 => {
            const newEnemy = this.Phaser.physics.add.sprite(anim1.x, anim1.y, 'potion');
            this.Phaser.physics.add.collider(newEnemy, this.Phaser.groundLayer);
            this.enemies4.push(newEnemy);
            
            anim1.destroy();
    
            this.Phaser.physics.add.collider(player, newEnemy, this.hitPlayer, null, Phaser);
    
            // this.shoot(newEnemy, Phaser.physics);
        })
    }
    cleanUpEnemies(){
        this.enemies.forEach((enemy, index) => {
            if(!enemy.active)
                this.enemies.splice(index, 1);
        })
    }
    shoot(enemy){
        if(this.ifOnCamera(enemy.x, enemy.y)){
            const usturoi = this.Phaser.physics.add.sprite(enemy.x, enemy.y, "usturoi");
            usturoi.body.setAllowGravity(false);
        
            if(enemy.x > player.x) {
                usturoi.body.velocity.x = -400;
            } else {
                usturoi.body.velocity.x = 400;
            }
    
            bullets.push(usturoi);
        }
    
        setTimeout(() => {
            if(enemy.active)
                this.shoot(enemy, this.Phaser.physics);
        }, Phaser.Math.FloatBetween(4, 7) * 1000)
    }
    ifOnCamera(enemyX, enemyY){
        if(player.body.x - enemyX < 400 && player.body.x - enemyX > -400)
            return 1;
        
        return 0;
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