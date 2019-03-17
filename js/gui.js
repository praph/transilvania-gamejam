class GameGUI{
    constructor(Phaser){
        this.Phaser = Phaser;

        this.toleranceBar;
        this.healthBar = [];
    }
    createHealthBar(){
        let healthBar = [];

        var healthBar1 = this.Phaser.physics.add.sprite(50, 50, 'health-vampire');
        healthBar1.displayWidth = 50;
        healthBar1.displayHeight = 50;
        healthBar1.setScrollFactor(0);
        healthBar1.body.setAllowGravity(false);
        this.healthBar.push(healthBar1);
        var healthBar2 = this.Phaser.physics.add.sprite(115, 50, 'health-vampire');
        healthBar2.displayWidth = 50;
        healthBar2.displayHeight = 50;
        healthBar2.setScrollFactor(0);
        healthBar2.body.setAllowGravity(false);
        this.healthBar.push(healthBar2);
        var healthBar3 = this.Phaser.physics.add.sprite(180, 50, 'health-vampire');
        healthBar3.displayWidth = 50;
        healthBar3.displayHeight = 50;
        healthBar3.setScrollFactor(0);
        healthBar3.body.setAllowGravity(false);
        this.healthBar.push(healthBar3);

        return this.healthBar;
    }
    updateHealthBar(lifes){
        if(lifes === 1){
            this.healthBar[0].setAlpha(1)
            this.healthBar[1].setAlpha(0)
            this.healthBar[2].setAlpha(0)
        }
        if(lifes === 2){
            this.healthBar[0].setAlpha(1)
            this.healthBar[1].setAlpha(1)
            this.healthBar[2].setAlpha(0)
        }
        if(lifes === 3){
            this.healthBar[0].setAlpha(1)
            this.healthBar[1].setAlpha(1)
            this.healthBar[2].setAlpha(1)
        }
    }
    createToleranceBar(){
        var toleranceBar = this.Phaser.physics.add.sprite(400, 50, 'tolerance-placeholder');
        toleranceBar.setOrigin(0, 0);
        toleranceBar.displayWidth = 350;
        toleranceBar.setScrollFactor(0);
        toleranceBar.body.setAllowGravity(false);
        // 
        this.toleranceBar = this.Phaser.physics.add.sprite(400, 50, 'tolerance-inside');
        this.toleranceBar.setOrigin(0, 0);
        this.toleranceBar.displayWidth = 150;
        this.toleranceBar.setScrollFactor(0);
        this.toleranceBar.body.setAllowGravity(false);
    }
    updateToleranceBar(percent){
        this.toleranceBar.displayWidth = percent * 350 / 100;
    }
}