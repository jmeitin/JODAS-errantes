export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({
            key: 'phase1'
        })
    }

    preload(){
        //this.load.image('fondo', '../Imgs/madrid1908.jpg');
        //this.load.image('banner', '../banner.jpg');
        this.load.image('fondo', '../Imgs/Planks/plank1.png');
    }

    create(){
        this.cameras.main.setBounds(0, 0, 4000, 4000);
        this.physics.world.setBounds(0, 0, 4000, 4000); 
        this.add.image(300, 300, 'fondo').setScale(20);
        
        // this.add.image(300, 300, 'fondo').setScale(20);
        // this.add.image(1000, 500, 'fondo').setScale(20);

        
        
    }

    update(){

    }
}