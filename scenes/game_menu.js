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
        this.load.image('suma','imgs/botones/sumar.png');
        this.load.image('resta','imgs/botones/restar.png');
        this.load.image('bot_salir','imgs/botones/salir.png');
        this.load.image('game_menu_fondo', 'imgs/fondos/fondo_menu_game.png');
        // imagen para barra y boton de barra
    }

    create(){
        this.scene_b = this.scene.get('main');

        this.add.image(this.game.renderer.width/2,400,'game_menu_fondo');
        this.boton_continuar = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2 - 100,"bot_continuar").setScale(2);
        this.boton_salir = this.add.image(this.game.renderer.width/2,this.game.renderer.height/2 + 100, "bot_salir").setScale(2);
        this.add.image(this.game.renderer.width/2,this.game.renderer.height/2, "img_sonido");
        this.boton_suma = this.add.image(this.game.renderer.width/2 + 150,this.game.renderer.height/2,"suma").setScale(2);
        this.boton_resta = this.add.image(this.game.renderer.width/2 - 150,this.game.renderer.height/2,"resta").setScale(2);

        this.boton_continuar.setInteractive();
        this.boton_salir.setInteractive();
        this.boton_suma.setInteractive();
        this.boton_resta.setInteractive();

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
        this.boton_salir.on("pointerover",()=>{
            this.boton_salir.setScale(2.1);
        });
        this.boton_salir.on("pointerout", ()=>{
            this.boton_salir.setScale(2);
        });
        this.boton_salir.on("pointerdown", ()=>{
            this.scene.stop('main');
            this.scene.start('main_menu');
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
            this.scene_b.modificar_volumen(0.1);
        });
        this.boton_resta.on("pointerdown",()=>{
            this.scene_b.modificar_volumen(-0.1);
        })
    }

    update(){

    }
}

