export default class creditos extends Phaser.Scene{
    constructor(){
        super({key:"creditos"});   
    }

    init (data){
        this.inventario = data.inventario;   
    }

    preload(){
        this.load.image('creditos', 'imgs/tutoriales/creditos.png')
    }

    create(){

        this.creditos = this.add.image(this.game.renderer.width/2, this.game.renderer.height + 800,'creditos').setScale(2);
        this.creditos.setInteractive();

        this.creditos.on('pointerdown', () => {
            this.scene.start('main_menu');
        });
    }

    update(){
        this.creditos.y--;

        if(this.creditos.y <= -700){
            this.scene.start('main_menu');
        }
    }
}