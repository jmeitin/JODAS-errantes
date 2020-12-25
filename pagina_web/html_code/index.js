//canvas.height = innerHeight //canvas no esta definido
class player {
  constructor(x,y,radius,color){
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }
  
  draw(){
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
  }
}
const player = new player(100,100,30, 'blue')
//player.draw()