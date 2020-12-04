import Sprites from "../sprites.js";

export default class button extends Sprites{
    constructor(scene, x, y, type, text){
        super(scene, x, y, type);
        this.buttonText = text;
 
    }

    createButton(){
        // creating button element  
        var button = document.createElement('BUTTON');
        // creating text to be 
        //displayed on button 
        var text = document.createTextNode("Button"); 
          
        // appending text to button 
        button.appendChild(text); 
    }
}