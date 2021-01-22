export default class tutorial_fase3 extends Phaser.Scene{
    constructor(){
        super({key:"tutorial_fase3"});   

        this.pulsado = false;
    }

    init (data){
        this.inventario = data.inventario;   
    }

    preload(){
        this.load.image('tutorialf3', 'imgs/tutoriales/tutorialf3.png')
    }

    create(){
        //texto de tutorial cuando abres la pagina
        this.tutorialText = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2,'tutorialf3').setScale(2);
        this.tutorialText.setInteractive();

        this.tutorialText.on('pointerup', () => {
            this.scene.start('fase3', {inventario:this.inventario}); //fase 3
            
        });
    }
}