export default class main_menu extends Phaser.Scene {
    constructor(){
        super({
            key: 'main_menu'
        })
    }

    preload(){

        this.load.image('bot_comenzar', 'imgs/botones/comenzar.png');
        this.load.image('bot_creditos', 'imgs/botones/creditos.png');
        this.load.image('bot_sonido', 'imgs/botones/sonido.png');
        this.load.image('fondo_menu', 'imgs/fondos/fondo_menu_ppal.png');
        this.load.audio('sound', 'music/fase1.mp3');
        this.load.audio('soundbutton', 'sounds/continue.mp3');
    }

    create(){
        const config = {
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }; 
          let music=this.sound.add('sound', config);
          let sound=this.sound.add('soundbutton', config);
          music.play();
        // this.cameras.main.setBounds(0, 0, 4000, 4000);
        // this.physics.world.setBounds(0, 0, 4000, 4000); 
        this.add.image(710, 400, 'fondo_menu').setScale(2);

        this.boton_comenzar = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2,"bot_comenzar");
        this.boton_sonido = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 100,"bot_sonido").setScale(0.8);
        this.boton_creditos = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 200,"bot_creditos").setScale(0.8);
        
        this.boton_comenzar.setInteractive();
        this.boton_sonido.setInteractive();
        this.boton_creditos.setInteractive();

        //funcionalidad boton comenzar
        this.boton_comenzar.on('pointerover', () => { 
            this.boton_comenzar.setScale(1.1);            
        });
        
        this.boton_comenzar.on('pointerout', () => {
            this.boton_comenzar.setScale(1);
        });

        this.boton_comenzar.on("pointerdown", ()=>{
            sound.play();
            this.scene.start('fase1');
            music.pause();
        });

        //funcionalidad boton sonido
        this.boton_sonido.on('pointerover', () => { 
            this.boton_sonido.setScale(0.9);            
        });
        
        this.boton_sonido.on('pointerout', () => {
            this.boton_sonido.setScale(0.8);
        });

        this.boton_sonido.on("pointerdown", ()=>{
            sound.play();
            console.log('joder!');
            music.pause();
        })

        //funcionalidad boton creditos
        this.boton_creditos.on('pointerover', () => { 
            this.boton_creditos.setScale(0.9);            
        });
        
        this.boton_creditos.on('pointerout', () => {
            this.boton_creditos.setScale(0.8);
        });

        this.boton_creditos.on("pointerdown", ()=>{
            sound.play();
            console.log('joder!');
            music.pause();
        })
       
    }

    update(){

    }
}