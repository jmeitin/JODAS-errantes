import person from "../person.js"

export default class civil extends person{
    constructor(scene, x, y, type, speed, fase3, arriba_abajo_para){
        super(scene, x, y, type, speed);      
        this.timer_arriba = this.scene.time.addEvent({delay: 5000, callback:this.cambia_dir_y, callbackScope:this, loop:true});
        this.timer_derecha = this.scene.time.addEvent({delay: 5000, callback: this.cambia_dir_x, callbackScope:this, loop:true});
        this.timer_arriba.paused = true;
        this.timer_derecha.paused = true;
        
		this.scene.physics.add.existing(this); //le dota de fisicas
        this.body.allowGravity = false;   

        this.last_time=new Date().getTime();         //para que los policias no se queden parados cuando colisionen
        this.current_time = this.last_time;
           
        this.dir_x = 0;
        this.dir_y = 0;
        this.is_fase3 = fase3;

    }

    preUpdate(){
        this.move();
        this.current_time = new Date().getTime();
    }

   

    move (){
        //si ha pasado cierto tiempo cambio de dir
        if(!this.is_fase3){ //FASE 2
            console.debug("entre");
            if(this.current_time >=this.last_time + 5000){
    
                if(this.arriba_abajo){
                    this.dir_x = 0;
                    if(this.dir_y === 0) this.dir_y = 1;
                    this.timer_arriba.paused = false;
                }
                else{
                    this.dir_y = 0;
                    if(this.dir_x === 0) this.dir_x = -1;
                    this.timer_derecha.paused = false;
                }
    
                this.last_time = new Date().getTime();
               // console.log ("nuevo start");
            }
    
            if (this.dir_x > 0){
                this.move_right();
            }
            else if (this.dir_x < 0){
                this.move_left();
            }
            else if (this.dir_y > 0){
                this.move_down();
            }
            else if (this.dir_y < 0){
                this.move_up();
            }
            else {
                this.stop ();
            }
        }
        else{ //FASE 3
            this.move_up();
        }
        
    }

    cambia_dir_x(){this.dir_x=-this.dir_x;}
    cambia_dir_y(){this.dir_y=-this.dir_y;}
}