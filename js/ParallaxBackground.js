class ParallaxBackground{
    constructor(Phaser, map){
        this.Phaser = Phaser;
        this.map = map;

        this.speed = {
            background1: 1.6,
            background2: 1.3,
            background3: 0.9,
        }
    }
    create(){
        this.Phaser.background1 = this.Phaser.add.tileSprite(400, 300, this.map.widthInPixels*2, 600, 'background-1').setDepth(-5);
        this.Phaser.background2 = this.Phaser.add.tileSprite(400, 300, this.map.widthInPixels*2, 600, 'background-2').setDepth(-5);
        this.Phaser.background3 = this.Phaser.add.tileSprite(400, 300, this.map.widthInPixels*2, 600, 'background-3').setDepth(-5);
    }
    update(){

    }
    tileLeft(){
        this.Phaser.background1.tilePositionX -= this.speed.background1;
        this.Phaser.background2.tilePositionX -= this.speed.background2;
        this.Phaser.background3.tilePositionX -= this.speed.background3;
    }
    tileRight(){
        this.Phaser.background1.tilePositionX += this.speed.background1;
        this.Phaser.background2.tilePositionX += this.speed.background2;
        this.Phaser.background3.tilePositionX += this.speed.background3;
    }
}