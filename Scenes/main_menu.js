export default class main_menu extends Phaser.Scene {
    constructor(){
        super({
            key: 'main_menu'
        })
    }

    preload(){

        this.load.image('bot_comenzar', '../imgs/botones/comenzar.png');
        this.load.image('bot_creditos', '../imgs/botones/creditos.png');
        this.load.image('bot_sonido', '../imgs/botones/sonido.png');
        this.load.image('fondo_menu', '../imgs/fondos/fondo_menu_ppal.png');
        this.load.audio('sound', '../music/fase1.mp3');
        this.load.audio('soundbutton', '../sounds/continue.mp3');
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
        this.add.image(700, 400, 'fondo_menu').setScale(2);

        var boton_comenzar = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2,"bot_comenzar");
        var boton_sonido = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 100,"bot_sonido").setScale(0.8);
        var boton_creditos = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 200,"bot_creditos").setScale(0.8);
        
        boton_comenzar.setInteractive();
        boton_sonido.setInteractive();
        boton_creditos.setInteractive();

        //funcionalidad boton comenzar
        boton_comenzar.on('pointerover', () => { 
            boton_comenzar.setScale(1.1);            
        });
        
        boton_comenzar.on('pointerout', () => {
            boton_comenzar.setScale(1);
        });

        boton_comenzar.on("pointerdown", ()=>{
            sound.play();
            var the_other_scene=this.scene.start('fase1');
            music.pause();
        });

        //funcionalidad boton sonido
        boton_sonido.on('pointerover', () => { 
            boton_sonido.setScale(0.9);            
        });
        
        boton_sonido.on('pointerout', () => {
            boton_sonido.setScale(0.8);
        });

        boton_sonido.on("pointerdown", ()=>{
            sound.play();
            console.log('joder!');
            music.pause();
        })

        //funcionalidad boton creditos
        boton_creditos.on('pointerover', () => { 
            boton_creditos.setScale(0.9);            
        });
        
        boton_creditos.on('pointerout', () => {
            boton_creditos.setScale(0.8);
        });

        boton_creditos.on("pointerdown", ()=>{
            sound.play();
            console.log('joder!');
            music.pause();
        })
       
    }

    update(){

    }
}