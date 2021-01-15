import person from "../person.js"

export default class civil extends person{
    constructor(scene, x, y, type, speed){
        super(scene, x, y, type, speed);       
		this.scene.physics.add.existing(this); //le dota de fisicas
        this.body.allowGravity = false;   

        this.last_time=new Date().getTime();         //para que los policias no se queden parados cuando colisionen
        this.current_time = this.last_time;
        this.posiblesdir=[{x:1, y:0}, {x:0, y:-1}, {x:-1, y:0}, {x:0, y:1}];
           
        this.dir_x = 1; //dir inicial
        this.dir_y = 0;
    }

    preUpdate(){
        this.move();
        this.current_time = new Date().getTime();
    }

   

    move (){
        //si ha pasado cierto tiempo cambio de dir
        if(this.current_time >=this.last_time + 20000){
            this.exc_ama.setAlpha(0);
            this.exc_roja.setAlpha(0);
            this.rango_per.setAlpha(0);

            this.i = this.get_random_int(0, 4);
            this.a = this.posiblesdir[this.i].x;
            this.b = this.posiblesdir[this.i].y;
   
            while (this.dir_x == this. a && this.dir_y == this.b){
                this.i=this.get_random_int(0, 4);
                this.a = this.posiblesdir[this.i].x;
                this.b = this.posiblesdir[this.i].y;
            }
            this.dir_x = this.a;
            this.dir_y = this.b;

            this.last_time = new Date().getTime();
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
}