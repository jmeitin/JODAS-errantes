export default class game_menu extends Phaser.Scene{
    //mejor un array de los sonidos que haya y asi se pueden bajar todos a la vez
    constructor(){
        super({
            key: "game_menu"
        })
    }

    preload(){
        this.load.image('bot_continuar','imgs/botones/continuar.png');
        this.load.image('img_sonido','imgs/botones/sonido.png');
        this.load.image('bot_salir','imgs/botones/salir.png');

        this.load.image('fondo_menu', 'imgs/fondos/fondo_menu_ppal.png');
        // imagen para barra y boton de barra
    }

    create(){

        this.add.image(710,400,'fondo_menu');

        this.boton_continuar = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2,"bot_continuar").setScale(2);
        this.boton_salir = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 200, "bot_salir");
        this.imagen_sonido = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 100, "img_sonido");

        this.boton_continuar.setInteractive();
        this.boton_salir.setInteractive();

        //funcionalidad de boton continuar
        this.boton_continuar.on("pointerover",()=>{
            this.boton_continuar.setScale(2.1);
        });
        this.boton_continuar.on("pointerout", ()=>{
            this.boton_continuar.setScale(2);
        });
        this.boton_continuar.on("pointerdown", ()=>{
            this.scene.resume('main');
            this.scene.stop();
        });

//funcionalidad de boton de salir
//cosa de musica
    }

    update(){

    }
}

