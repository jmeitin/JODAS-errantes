export default class end_menu extends Phaser.Scene{
    constructor(){
        super({key:"end_menu"});
        this.bool_victoria;
        this.score;
        this.suicidio;
    }

    init(data){
        this.bool_victoria = data.vic;
        this.score = data.score;
        this.suicidio = data.sui;
    }

    preload(){
        if(this.bool_victoria){
            this.load.image('fondo_menu_final','imgs/fondos/victoria.png');
        }
        else{
            this.load.image('fondo_menu_final','imgs/fondos/derrota.png');
        }
        if(this.suicidio) {
            this.load.audio('suicidio','sounds/suicidio.mp3');
            this.load.image('suicidio_texto','imgs/fondos/suicidio_texto.png');
        }
        this.load.image('continue','imgs/botones/continuar.png');
    }

    create(){
        if(this.suicidio){
            const config = {
                mute: false,
                volume: 0.2,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
              };
              let music = this.sound.add('suicidio',config);
              music.play();
              this.timer2 = this.time.addEvent({delay:9000, callback:this.mensaje_suicidio, callbackScope:this,repeat:0});
              this.timer = this.time.addEvent({delay:12000, callback: this.set_scene, callbackScope:this, repeat:0});
        }
        else this.set_scene();
    }

    update(){

    }

    mensaje_suicidio(){
        this.cameras.main.fadeIn(1000);
        this.mensaje = this.add.image(710,400,'suicidio_texto');
    }

    set_scene(){
        if(this.mensaje != undefined) this.mensaje.destroy(false);
        this.cameras.main.fadeIn(100);
        this.add.image(710,400,'fondo_menu_final').setScale(1.5);

        this.add.text(500,650,"Puntuacion: " + this.score).setFontSize(50);
        this.boton_continuar = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2 + 200,"continue").setScale(3);
        this.boton_continuar.setInteractive();
        this.boton_continuar.on("pointerover",()=>{
            this.boton_continuar.setScale(3.1);
        });
        this.boton_continuar.on("pointerout",()=>{
            this.boton_continuar.setScale(3);
        });
        this.boton_continuar.on("pointerdown",()=>{
            this.scene.start('main_menu');
        });
    }
}