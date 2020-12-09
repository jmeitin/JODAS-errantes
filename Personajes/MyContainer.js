export default class MyContainerextends extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        // ...
        this.x = x;
        this.y = y;

        this.scene.physics.add.existing(this); //
    }
    // ...

    // preUpdate(time, delta) {}

    update(){
        //this.calcularDif();
        
        this.x-=1;
        //console.log('HOLLLLLA');
       
    }   
}