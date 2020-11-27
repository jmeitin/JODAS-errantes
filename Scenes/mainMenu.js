import button from '../UI/button.js';

export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({
            key: 'MainMenu'
        })
    }

    preload(){
        this.load.image('fondo', '../Imgs/madrid1908.jpg');
        this.load.image('banner', '../banner.jpg');
    }

    create(){
        this.cameras.main.setBounds(0, 0, 4000, 4000);
        this.physics.world.setBounds(0, 0, 4000, 4000); 
        
        //this.fondoMenu = this.add.image(700,400,'fondo').setScale(1.5);
        
        //let aButton = new button(this, 200, 200, "banner" ,"ello guvna");
        let aButton = this.add.image(350,350,"banner");
        aButton.setScale(0.8);
        aButton.setInteractive();

        aButton.on("pointerdown", ()=>{
            
            var theOtherScene=this.scene.get('main');
            theOtherScene.scene.restart();
       })
       
    }

    update(){
        // this.fondoMenu.x+= 0.1;
        // this.fondoMenu.y+=0.1;
    }
}