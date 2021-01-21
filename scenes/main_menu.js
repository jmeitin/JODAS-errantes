export default class main_menu extends Phaser.Scene {
    constructor(){
        super({
            key: 'main_menu'
        })
    }

    preload(){
        this.reinicio_animaciones();
        this.input.setDefaultCursor('url(../imgs/cursor_flecha.png), pointer')
        this.load.image('bot_comenzar', 'imgs/botones/comenzar.png');
        this.load.image('bot_creditos', 'imgs/botones/creditos.png');
        this.load.image('bot_sonido', 'imgs/botones/sonido.png');
        this.load.image('fondo_menu', 'imgs/fondos/fondo_menu_ppal.png');
        this.load.audio('sound', 'music/fase1.mp3');
        this.load.audio('soundbutton', 'sounds/continue.mp3');
        this.load.image('sube_sonido','imgs/botones/sumar.png');
        this.load.image('baja_sonido','imgs/botones/restar.png');
    }

    reinicio_animaciones(){
        if(this.anims.exists('down')) this.anims.remove('down');
        if(this.anims.exists('left')) this.anims.remove('left');
        if(this.anims.exists('right')) this.anims.remove('right');
        if(this.anims.exists('up')) this.anims.remove('up');
        if(this.anims.exists('stop')) this.anims.remove('stop');
        if(this.anims.exists('sombrerodown')) this.anims.remove('sombrerodown');
        if(this.anims.exists('sombreroleft')) this.anims.remove('sombreroleft');
        if(this.anims.exists('sombreroright')) this.anims.remove('sombreroright');
        if(this.anims.exists('sombreroup')) this.anims.remove('sombreroup');
        if(this.anims.exists('stopsombrero')) this.anims.remove('stopsombrero');
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
          this.music= this.sound.add('sound', config);
          this.sound_b= this.sound.add('soundbutton', config);
          this.music.play();
        // this.cameras.main.setBounds(0, 0, 4000, 4000);
        // this.physics.world.setBounds(0, 0, 4000, 4000); 
        this.add.image(710, 400, 'fondo_menu').setScale(2);

        this.boton_comenzar = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2,"bot_comenzar");
        this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 100,"bot_sonido").setScale(0.8);
        this.boton_suma = this.add.image(this.game.renderer.width/2 + 150,this.game.renderer.height/2 + 100,"sube_sonido").setScale(2);
        this.boton_resta = this.add.image(this.game.renderer.width/2 - 150,this.game.renderer.height/2 + 100,"baja_sonido").setScale(2);
        this.boton_creditos = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 200,"bot_creditos").setScale(0.8);
        
        this.boton_comenzar.setInteractive();
        this.boton_creditos.setInteractive();
        this.boton_suma.setInteractive();
        this.boton_resta.setInteractive();

        //funcionalidad boton comenzar
        this.boton_comenzar.on('pointerover', () => { 
            this.boton_comenzar.setScale(1.1);            
        });
        
        this.boton_comenzar.on('pointerout', () => {
            this.boton_comenzar.setScale(1);
        });

        this.boton_comenzar.on("pointerdown", ()=>{
            this.sound_b.play();
            this.scene.start('fase1');
            this.music.pause();
        });

        //funcionalidad de botones para modificar el volumen de la musica
        this.boton_suma.on("pointerover",()=>{
            this.boton_suma.setScale(3);
        });
        this.boton_suma.on("pointerout", ()=>{
            this.boton_suma.setScale(2);
        });
        this.boton_resta.on("pointerover",()=>{
            this.boton_resta.setScale(3);
        });
        this.boton_resta.on("pointerout", ()=>{
            this.boton_resta.setScale(2);
        });
        this.boton_suma.on("pointerdown",()=>{
            this.music.volume += 0.1;
            this.sound_b.volume += 0.1;
        });
        this.boton_resta.on("pointerdown",()=>{
            if(this.music.volume - 0.1 <= 0) this.music.volume = 0; 
            else {
                this.music.volume -= 0.1;
                this.sound_b.volume -= 0.1;
            }
        })

        //funcionalidad boton creditos
        this.boton_creditos.on('pointerover', () => { 
            this.boton_creditos.setScale(0.9);            
        });
        
        this.boton_creditos.on('pointerout', () => {
            this.boton_creditos.setScale(0.8);
        });

        this.boton_creditos.on("pointerdown", ()=>{
            this.sound_b.play();
            console.log('joder!');
            this.music.pause();
        })
       
    }

    update(){

    }
}