export default class MyContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, speed, children) {
        super(scene, x, y, children);
        // ...
        this.x = x;
        this.y = y;
        this.speed = speed;
       // this.speed = speed;

        this.scene.physics.add.existing(this); //
    }
   

    // preUpdate(time, delta) {}

    update(){
        //this.calcularDif();
        //this.update();
        //this.x-=speed;
       // this.x -= 1;
        console.log('Container');

       
    }   
}