import Persona from "../Person.js"

export default class Policia extends Persona{
    constructor(scene, x, y, type, speed){
        super(scene, x, y, type, speed);
        
        this.rangoVisual = 10;
        this.dif = 10;

        this.scene.physics.add.existing(this); //le dota de fisicas
        this.body.allowGravity = false;

        //this.trigger = trigger; //referencia al trigger
        //this.trigger.setSize(200, 200);
    }

    calcularDif (){
        this.dif = 0;
    }
    

    update(){
       //MUEVO EL PADRE SOLO
      // this.moveLeft();
       console.log("MOVER");
       
    }   




}