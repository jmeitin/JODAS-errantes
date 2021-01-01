export default class gameobject extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, type){

        super(scene, x, y, type);
		scene.add.existing(this);
		scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(false);
        this.body.enable = true;
        
		this.x = x;
        this.y = y;

    }
    
    
}