class GameGUI{
    constructor(Phaser){
        this.Phaser = Phaser;
    }
    createHealthBar(){
        let healthBar = [];

        var healthBar1 = this.Phaser.physics.add.sprite(50, 50, 'health-vampire');
        healthBar1.displayWidth = 50;
        healthBar1.displayHeight = 50;
        healthBar1.setScrollFactor(0);
        healthBar1.body.setAllowGravity(false);
        healthBar.push(healthBar1);
        var healthBar2 = this.Phaser.physics.add.sprite(115, 50, 'health-vampire');
        healthBar2.displayWidth = 50;
        healthBar2.displayHeight = 50;
        healthBar2.setScrollFactor(0);
        healthBar2.body.setAllowGravity(false);
        healthBar.push(healthBar2);
        var healthBar3 = this.Phaser.physics.add.sprite(180, 50, 'health-vampire');
        healthBar3.displayWidth = 50;
        healthBar3.displayHeight = 50;
        healthBar3.setScrollFactor(0);
        healthBar3.body.setAllowGravity(false);
        healthBar.push(healthBar3);

        return healthBar;
    }
}