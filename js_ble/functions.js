


var up_state = false;
var down_state = false;
var left_state = false;
var right_state = false;
var z_state = false;
var z_state = false;
var noButton = true;

function send_reset() {
  servo0_state = 0;
  servo1_state = 0;
  servo2_state = 0;
}


function setMotor(_motor, direction, _power) {

}


function setOutput(_output, _power) {
}


function setServo(output, position) {
}





function allStop() {
  var data = new Uint8Array(2);
   data[0]= 213;
   data[1] = 99;
   sendData(data);
   send_reset()
}

function buttonPressed(button) {

  sendUART(button);
}

/*
document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

function keyUpHandler(keyPressed) {

  var keyPressed = String.fromCharCode(event.keyCode);


  if (keyPressed == "&") {
    up_state = false;
    sendUART("stop");
  }
  if (keyPressed == "(") {
    down_state = false;
    sendUART("stop");
  }
  if (keyPressed == "%") {
    left_state = false;
    sendUART("stop");
  }
  if (keyPressed == "'") {
    right_state = false;
    sendUART("stop");
  }
  if (keyPressed == " ") {
    space_state = false;
    sendUART("stop");
  }
  if (keyPressed == "Z") {
    z_state = false;
    sendUART("stop");
  }
  if (keyPressed == "X") {
    x_state = false;
    sendUART("stop");
  }

//noButton();
};

function keyDownHandler(keyPressed)
{
	var keyPressed = String.fromCharCode(event.keyCode);
  console.log(event.key);

if (keyPressed == "&") {
  sendUART("up");
  up_state = true;
}
if (keyPressed == "(") {
  down_state = true;
  sendUART("down");
}
if (keyPressed == "%") {
  left_state = true;
  sendUART("left");
}
if (keyPressed == "'") {
  right_state = true;
  sendUART("right");
}
if (keyPressed == " ") {
  space_state = true;
}

if (keyPressed == "Z") {
  z_state = true;
  sendUART("z");
}
if (keyPressed == "X") {
  x_state = true;
  sendUART("x");
}



}
*/