// hello future bored Yazeed please add comments because I can't keep relearning what this code does 

// its your problem now future Yazeed :)) 

let ball = document.querySelector('#ball')
let dot = document.querySelector('#dot')
let topPos = 0
let speed = 0
const g = 9.81
let move= false
let cursor_x = -1;
let fall = true
let cursor_y = -1;
let color = 0
let changeColor = true
let v = [] 
let xSpeed = 0
let xPos = 0
let xRecord= []
let yRecord= []
let colors = ['red', 'blue', 'yellow', 'black', 'green', 'gray', 'pink' , 'purple', 'cyan']
let ballSize = 50
let windowHight =window.innerHeight - ballSize;
let windowWidth = window.innerWidth - ballSize;
const wallResistance = 0.8  // speed is reflected from the wall 
const framesPerSecond = 100 
const airResistance = 1 / framesPerSecond 
document.onmousemove = function(event)
{
 cursor_x = event.pageX;
 cursor_y = event.pageY;
}
ball.addEventListener("mousedown", moveBall)
ball.addEventListener("pointerup",  stopMove)

setInterval(() => {

    // updates window dimensions  remove for better performance 
     windowHight =window.innerHeight - ballSize;
     windowWidth = window.innerWidth - ballSize;
    if(move){

        ball.style['left'] =  cursor_x - 25 +'px'
        ball.style['top'] =  cursor_y -25 + 'px'
        ball.style.cursor = 'grabbing'
        xRecord.push(cursor_x - 25 ) 
        yRecord.push(cursor_y - 25 ) 
        if(xRecord.length >= 10){ 
            xRecord.shift() 
            yRecord.shift() 
            xSpeed = (xRecord[xRecord.length -1] -xRecord[0])/xRecord.length
        }
  
        if(cursor_y < 50) {
            // idk what this does but i am not going to risk it jun 17 2024
            move = false
            topPos = cursor_y 
            xPos = cursor_x - 25
        }
        
    }else{
        ball.style.cursor = 'grab'


    }
  

    if (topPos < windowHight ){
        if(xRecord.length){

            xSpeed = (xRecord[xRecord.length -1] -xRecord[0])/xRecord.length
            ySpeed = (yRecord[yRecord.length -1] - yRecord[0])/yRecord.length
            speed = speed + ySpeed
            xRecord = []
            yRecord = []
        } 

        speed = speed  + g/framesPerSecond
        if(xSpeed != 0){

            xSpeed = Math.abs(xSpeed - airResistance) * (xSpeed/Math.abs(xSpeed))
        }
        changeColor = true
        topPos+= speed
        xPos+= xSpeed
        ball.style['top'] = topPos + 'px'
        // if the ball is not hitting a wall 
        if(xPos < windowWidth && xPos > 0){
            ball.style['left'] =  xPos + 'px'
        }else if(xPos <=  0){
            // if the ball hits the left wall 
            xSpeed = xSpeed  * -1 * wallResistance
            speed = speed * wallResistance
            ball.style['left'] = '1px'
            xPos=   1 

         }else{ 
            // ball hits the right wall

            xSpeed = xSpeed * -1 * wallResistance // 0.8 is wall resistance 
            speed = speed * wallResistance
            xPos=  windowWidth - 1 
            ball.style['left'] = windowWidth - 1 +'px'

         }

         // to point at the ball if it is above the screen 
         if(topPos < 0){
            dot.style.display = 'block'
            dot.style.left = xPos+ 'px'
        } else{ 
            dot.style.display = 'none'
        }

         
    }
    else{
        // if it hits the floor 
        if( !move ){
        
            speed =  speed * -1 * 0.5    
            xSpeed = xSpeed  * wallResistance

            if( Math.abs(speed) > 0.3  ){
                // slows down the speed on impact
                
                topPos = windowHight -1 
                ball.style['top'] = topPos + 'px'

            }else{

            // makes the ball stop if it reaches slow speeds instead of going forever
                speed = 0    

            }
        }
       
        if(changeColor){ 
            // changes the color if the ball hits the floor
            color += 1 
            if(color >= colors.length){ 
                color = 0
            }
            ball.style['background-color'] = colors[color]
                changeColor = false
        }

    }

    // refreshing elements 
    document.body.appendChild(dot)
    document.body.appendChild(ball);

}, 1000/framesPerSecond);

function moveBall(e) {
    move = true
    fall = false

}

function stopMove() {
    move= false 
    topPos =cursor_y 
    xPos = cursor_x - 25
}