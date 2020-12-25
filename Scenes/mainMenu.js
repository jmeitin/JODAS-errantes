export default class MainMenu extends Phaser.Scene {
    constructor(){
        super({
            key: 'MainMenu'
        })
    }

    preload(){

        this.load.image('botComenzar', '../Imgs/Botones/comenzar.png');
        this.load.image('botCreditos', '../Imgs/Botones/creditos.png');
        this.load.image('botSonido', '../Imgs/Botones/sonido.png');
        this.load.image('fondoMenu', '../Imgs/Fondos/fondoMenuPpal.png');
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
        this.add.image(700, 400, 'fondoMenu').setScale(2);

        var botonComenzar = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2,"botComenzar");
        var botonSonido = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 100,"botSonido").setScale(0.8);
        var botonCreditos = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 200,"botCreditos").setScale(0.8);
        
        botonComenzar.setInteractive();
        botonSonido.setInteractive();
        botonCreditos.setInteractive();

        //funcionalidad boton comenzar
        botonComenzar.on('pointerover', () => { 
            botonComenzar.setScale(1.1);            
        });
        
        botonComenzar.on('pointerout', () => {
            botonComenzar.setScale(1);
        });

        botonComenzar.on("pointerdown", ()=>{
            sound.play();
            var theOtherScene=this.scene.start('fase1');
            music.pause();
        });

        //funcionalidad boton sonido
        botonSonido.on('pointerover', () => { 
            botonSonido.setScale(0.9);            
        });
        
        botonSonido.on('pointerout', () => {
            botonSonido.setScale(0.8);
        });

        botonSonido.on("pointerdown", ()=>{
            sound.play();
            console.log('joder!');
            music.pause();
        })

        //funcionalidad boton creditos
        botonCreditos.on('pointerover', () => { 
            botonCreditos.setScale(0.9);            
        });
        
        botonCreditos.on('pointerout', () => {
            botonCreditos.setScale(0.8);
        });

        botonCreditos.on("pointerdown", ()=>{
            sound.play();
            console.log('joder!');
            music.pause();
        })
       
    }

    update(){

    }
}