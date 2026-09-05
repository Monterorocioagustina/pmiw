//mis variables(los arreglos y las imagenes) 
let rigby=[];  
let mordecai=[]; 
let villano=[]; 
let fondo; 
let piso; 
let titulo;  
 
//rigby moviendose 
let frameRigby= 0; 
let velocidadRigby= 4; 
let xRigby= -120; 
 
//mordecai moviendose 
let frameMordecai= 0; 
let velocidadMordecai= 4; 
let xMordecai= -220; 
 
//villano moviendose 
let frameVillano= 0; 
let velocidadVillano= 10; 
let xVillano= -130; 
let movimientoVillano= 1; 
let estadoVillano= 0; 
let tiempoVillano= 0; 
 
//fondo y piso moviendose 
let xFondo= 0; 
let xPiso= 0; 
let movimientoFondo= 0; 
let movimientoPiso= 0; 
 
//titulo moviendose 
let tamTitulo= 20; 
let apareceTitulo= false; 
let yTitulo= 180; 
let finTiempo= 0; 
let esperaFinal= 0;
 
//se reinicia automaticamente
let inicioAnimacion= 0; 

//imagenes  
function preload() { 
  rigby[0]= loadImage("data/rigby-1.png"); 
  rigby[1]= loadImage("data/rigby-2.png"); 
  rigby[2]= loadImage("data/rigby-3.png"); 
  rigby[3]= loadImage("data/rigby-4.png"); 
  // 
  mordecai[0]= loadImage("data/mordecai-1.png"); 
  mordecai[1]= loadImage("data/mordecai-2.png"); 
  mordecai[2]= loadImage("data/mordecai-3.png"); 
  mordecai[3]= loadImage("data/mordecai-4.png"); 
  mordecai[4]= loadImage("data/mordecai-5.png"); 
  mordecai[5]= loadImage("data/mordecai-6.png");  
  // 
  villano[0]= loadImage("data/villano-1.png"); 
  villano[1]= loadImage("data/villano-2.png");  
  // 
  fondo= loadImage("data/fondo.jpeg"); 
  piso= loadImage("data/piso.png"); 
  titulo= loadImage("data/titulo.png"); 
} 
function setup() { 
  createCanvas(800,600); 
  inicioAnimacion= frameCount; 
} 
//funcio con parametros
function mostrarPersonaje(personaje, frame, x, y, ancho, alto){
  image(personaje[frame],x,y,ancho,alto);
}
//funcion con parametros y retorno
function cambiarFrame(frame, cantidad){
  frame= frame + 1;
  if (frame>= cantidad){
    frame= 0;
  }
  return frame;
}
function draw() {     
  //fondo y piso 
  background(255); 
  image(fondo,xFondo,-40,800,480); 
  image(fondo,xFondo+800,-40,800,480);   
  if (xRigby>= -80){ 
    movimientoFondo= movimientoFondo + 0.02; 
    if (movimientoFondo> 2){ 
      movimientoFondo= 2; 
    } 
    xFondo= xFondo - movimientoFondo; 
  } 
  if (xFondo<= -800){ 
    xFondo= 0; 
  } 
  // 
  image(piso,xPiso,240,800,360); 
  image(piso,xPiso+800,240,800,360); 
  if (xRigby>= -80){ 
    movimientoPiso= movimientoPiso + 0.04; 
    if (movimientoPiso > 4){ 
      movimientoPiso= 4; 
    } 
    xPiso= xPiso - movimientoPiso; 
  } 
  if (xPiso<= -800){ 
    xPiso= 0; 
  } 
  //personaje villano: (cambios de su cara y de su movimiento);
  for (let i=0; i<villano.length; i++){
    if (estadoVillano<= 1 && i==0){
      mostrarPersonaje(villano,i,xVillano,350,130,160);
    }
    if (estadoVillano==2 && i==1){
      mostrarPersonaje(villano,i,xVillano,350,130,160);
    }
  }
  if (estadoVillano == 0){ 
    if (xMordecai>= 200){ 
      xVillano= xVillano + movimientoVillano; 
    }  
    if (xVillano>= 180){ 
      estadoVillano= 1; 
      tiempoVillano= 0; 
    } 
  } 
  if (estadoVillano == 1){ 
    tiempoVillano= tiempoVillano + 1; 
    if (tiempoVillano> 60){ 
      estadoVillano= 2; 
    } 
  } 
  if (estadoVillano == 2){ 
    xVillano= xVillano + movimientoVillano; 
  } 
  //personaje de rigby  
  if (xRigby>= -80){ 
    if (frameCount % velocidadRigby == 0) { 
      frameRigby= cambiarFrame(frameRigby,rigby.length);
    } 
  } 
  mostrarPersonaje(rigby,frameRigby,xRigby,400,110,70); 
  if (frameCount - inicioAnimacion> 120){ 
    xRigby= xRigby + 1; 
  } 
  //personaje de mordecai 
  if (xMordecai>= -100){ 
    if (frameCount % velocidadMordecai == 0) { 
      frameMordecai= cambiarFrame(frameMordecai,mordecai.length);
    } 
  } 
  mostrarPersonaje(mordecai,frameMordecai,xMordecai,400,110,120); 
  if (frameCount - inicioAnimacion> 120){ 
    xMordecai= xMordecai + 1; 
  } 
  //titulo: (su aparicion y como va cambiando de tamaño);
  if (xMordecai>= 300){ 
    apareceTitulo= true; 
  } 
  if (apareceTitulo == true){ 
    if (xVillano< 800){ 
       tamTitulo= tamTitulo + 4; 
       if (tamTitulo> 500){ 
        tamTitulo= 500; 
      } 
    } 
    if (xVillano>= 800){ 
      finTiempo= finTiempo + 1; 
    } 
    if (finTiempo>= 60){  
      if (yTitulo< 300){ 
        yTitulo= yTitulo + 2; 
      } 
      if (tamTitulo< 750){ 
        tamTitulo= tamTitulo + 5; 
      } 
    }
    image(titulo, 400-tamTitulo/2, 
          yTitulo-tamTitulo/4, 
          tamTitulo, 
          tamTitulo/2); 
  } 
  if (tamTitulo>= 750 && yTitulo>= 300){
    esperaFinal= esperaFinal + 1;
  }
  // se reinicia automaticamente (vuelve todo a su primer valor);
  if (esperaFinal>= 150){
    xRigby= -120; 
    xMordecai= -220; 
    xVillano= -130; 
    frameRigby= 0; 
    frameMordecai= 0; 
    frameVillano= 0; 
    xFondo= 0; 
    xPiso= 0; 
    movimientoFondo= 0; 
    movimientoPiso= 0; 
    estadoVillano= 0; 
    tiempoVillano= 0; 
    movimientoVillano= 1; 
    tamTitulo= 20; 
    apareceTitulo= false; 
    yTitulo= 180; 
    finTiempo= 0;
    esperaFinal= 0;
    inicioAnimacion= frameCount; 
  }
}
