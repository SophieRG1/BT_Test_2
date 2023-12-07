const UART_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const UART_TX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const UART_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

let uBitDevice;
let rxCharacteristic;


async function connectButtonPressed() {
  try {
    console.log("Requesting Bluetooth Device...");
    uBitDevice = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: "BBC micro:bit" }],
      optionalServices: [UART_SERVICE_UUID]
    });

    uBitDevice.addEventListener('gattserverdisconnected', onDisconnected);


    console.log("Connecting to GATT Server...");
    const server = await uBitDevice.gatt.connect();

    console.log("Getting Service...");
    const service = await server.getPrimaryService(UART_SERVICE_UUID);

    console.log("Getting Characteristics...");
    const txCharacteristic = await service.getCharacteristic(
      UART_TX_CHARACTERISTIC_UUID
    );
    txCharacteristic.startNotifications();
    txCharacteristic.addEventListener(
      "characteristicvaluechanged",
      onTxCharacteristicValueChanged
    );
    rxCharacteristic = await service.getCharacteristic(
      UART_RX_CHARACTERISTIC_UUID
    );
    
    console.log(`Device ${uBitDevice.name} is connected.`);
    
    document.querySelector('.device').innerText = `${uBitDevice.name}`; //name
  
    
    
    document.getElementById('pair_microbit').classList.add("mb_connected");
  } catch (error) {
    console.log(error);
  }
}

function disconnectButtonPressed() {
  if (!uBitDevice) {return;}

  if (uBitDevice.gatt.connected) {
    uBitDevice.gatt.disconnect();
    console.log("Disconnected");
  }
}




async function sendUART(num) {

  let encoder = new TextEncoder();
  queueGattOperation(() => rxCharacteristic.writeValue(encoder.encode(num+"\n"))
      //.then(() => console.log("WRITE"))
      .catch(error => console.error('Reconnect please:', error)));
}



let queue = Promise.resolve();

function queueGattOperation(operation) {
   queue = queue.then(operation, operation);
   return queue;
}




function onTxCharacteristicValueChanged(event) {
  
  let receivedData = [];
 
  
  for (var i = 0; i < event.target.value.byteLength; i++) {
    receivedData[i] = event.target.value.getUint8(i);
  }
  
  const receivedString = String.fromCharCode.apply(null, receivedData);
  console.log(receivedString);


  if (receivedString === "SHAKE") {
    console.log("Shaken!");
  }
  
  
  var luz;
  var temp;
  var compass;
  var sound
  var a;
  var b;
  var logo;
  

  if (receivedString.startsWith("L")) {
    luz = parseInt(receivedString.substr(1));
    document.querySelector('.luzTexto').innerText = luz;
  } 
  else if (receivedString.startsWith("T")) {
    temp = parseInt(receivedString.substr(1));
    document.querySelector('.tempTexto').innerText = temp +"°";
  }
  else if (receivedString.startsWith("C")) {
    compass = parseInt(receivedString.substr(1));
    document.querySelector('.compassTexto').innerText = compass +"°";
  } 
  else if (receivedString.startsWith("S")) {
    sound = parseInt(receivedString.substr(1));
    document.querySelector('.soundTexto').innerText = sound;
  } 
  else if (receivedString.startsWith("A")) {
    a = parseInt(receivedString.substr(1));
    document.querySelector('.aTexto').innerText = a;
  } 
  else if (receivedString.startsWith("B")) {
    b = parseInt(receivedString.substr(1));
    document.querySelector('.bTexto').innerText = b;
  } 
  else if (receivedString.startsWith("P")) {
    logo = parseInt(receivedString.substr(1));
    document.querySelector('.logoTexto').innerText = logo;
  } 
  
    

}



function onDisconnected(event) {
  let device = event.target;
  console.log(`Device ${device.name} is disconnected.`);
  //document.querySelector('.device').innerText = `Device ${device.name} is disconnected.`; //device_name
  
  document.getElementById('pair_microbit').classList.remove("mb_connected");
}




