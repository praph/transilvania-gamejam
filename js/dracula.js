class Dracula{
    constructor(Phaser, map){
        this.Phaser = Phaser;
        this.map = map;
        
        this.lifes = 3;
        this.sunTolerance = 1000;
        this.generatePotions();

        this.nightDuration = 5;

        // this.startNight = this.startNight.bind(this);
    }
    create(){

    }
    update(){

    }

    /**
     * get lifes
     */
    getLifes(){
        return this.lifes;
    }
    
    /**
     * generate potions and bind them
     */
    generatePotions(){
        var potions = this.map.createFromObjects('Potion', 'night', { key: 'tile_castle_sprite', frame: 5 });
    
        potions.forEach(anim1 => {
            const potion = this.Phaser.physics.add.sprite(anim1.x, anim1.y, 'potion');
            this.Phaser.physics.add.collider(potion, this.Phaser.groundLayer);
            
            anim1.destroy();
    
            this.Phaser.physics.add.collider(player, potion, this.potionCollision.bind(this), null, Phaser);
        })
    }

    potionCollision(player, potion){
        potion.destroy();
        // debugger;
        this.startNight(this.nightDuration);
    }
    /**
     * start night
     */
    startNight(time){
        if(time < 1){

            return;
        }
            
        console.log('start night ' + time);
        
        setTimeout(() => {
            time--;
            this.startNight(time);
        }, 1000)

        potion.destroy();
    }

    /**
     * tolerance to sun
     */
    getTolerance(){
        return this.sunTolerance / 10;
    }
    decreaseTolerance(){
        this.sunTolerance = this.sunTolerance - 3;
    }
    increaseTolerance(){
        if(this.sunTolerance < 1000)
           this.sunTolerance = this.sunTolerance + 9;
    }
}