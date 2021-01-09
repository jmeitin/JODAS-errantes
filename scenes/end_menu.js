export default class end_menu extends Phaser.Scene{
    constructor(){
        super({key:"end_menu"});
        this.bool_victoria;
    }

    init(data){
        this.bool_victoria = data.bool_victoria;
    }

    preload(){
        if(this.bool_victoria){
            this.load.image('fondo_menu_final','imgs/fondos/victoria.png');
        }
        else{
            this.load.image('fondo_menu_final','imgs/fondos/derrota.png');
        }
        this.load.image('continue','imgs/botones/continuar.png');
    }

    create(){
        this.add.image(710,400,'fondo_menu_final').setScale(1.5);

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

    update(){

    }
}