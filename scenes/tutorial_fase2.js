export default class tutorial_fase2 extends Phaser.Scene{
    constructor(){
        super({key:"tutorial_fase2"});   
    }

    init (data){
        this.inventario = data.inventario;   
    }

    preload(){
        this.load.image('tutorialf2', 'imgs/tutoriales/tutorialf2.png')
    }

    create(){
        //texto de tutorial cuando abres la pagina
        this.tutorialText = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2,'tutorialf2').setScale(2);
        this.tutorialText.setInteractive();

        this.tutorialText.on('pointerup', () => {
            this.scene.start('main', {inventario:this.inventario}); //fase 2
        });
    }
}