
console.log("Iniciando el servidor...");

// Variables de inicio del servidor y del Drone
var express = require("express");
var web = express();
var servidor;
var arDrone = require("ar-drone");
var hermes = arDrone.createClient();
var dirName = 'D:/JGGomez/GDG Cali/Codigo/AppDrone'
web.use(express.static('.'));

//hermes.on('navdata', console.log);

function bateria(){
	console.log("Bateria => "+ hermes.battery());

	if(hermes.battery() < 5){
		aterrizar_drone();
	}

}

function despegar_drone(){
	hermes.config("control:altitude_max", 5000);
	hermes.takeoff();
	calibrar();	
}

function calibrar(){
	hermes.stop();
	hermes.calibrate(0);
}

function irFrente(){
	hermes.front(0.5);
}

function irAtras(){
	hermes.back(0.5);
}

function subir(){
	hermes.up(0.5);
}

function bajar(){
	hermes.down(0.5);
}

function parar(){	
	calibrar();
}

function aterrizar_drone(){
	hermes.stop();
	hermes.land();
}

function animar_izq(){
	hermes.animate('flipLeft', 15);
	bateria();
}

function animar_baile(){
	hermes.animate('yawDance', 30);
	bateria();
}

function animar_prenderLeds(){
	hermes.animateLeds('redSnake', 5, 10);
	bateria();
}

function autonomo(){
	
	hermes.config("control:altitude_max", 5000);
	hermes.takeoff();

	hermes
		.after(5000, function() {
    		calibrar();
	    }).after(5000, function() {
    		this.clockwise(0.5);
	    }).after(3000, function() {
    		this.counterClockwise(1);
    	}).after(3000, function() {
    		subir();
    	}).after(5000, function() {
    		parar();
        }).after(5000, function() {
    		animar_izq();
    	}).after(5000, function() {
    		animar_izq();
    	}).after(5000, function() {
    		aterrizar_drone();
  	    });

}

servidor = web.listen(8080, function(){
	console.log('Servidor Iniciado');
});

web.get("/", function(req, resp){
	console.log("home");
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');
});

web.get("/despegar", function(req, resp){
	console.log('Opción Despegar');
	despegar_drone();
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');	
});

web.get("/aterrizar", function(req, resp){
	console.log('Opción aterrizar');
	aterrizar_drone();
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');	
});

web.get("/irfrentre", function(req, resp){
	console.log('Opción ir frente');
	irFrente();
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');	
});

web.get("/irAtras", function(req, resp){
	console.log('Opción ir atras');
	irAtras();
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');	
});

web.get("/parar", function(req, resp){
	console.log('Opción parar');
	parar();
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');	
});

web.get("/subir", function(req, resp){
	console.log('Opción subir');
	subir();
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');	
});

web.get("/bajar", function(req, resp){
	console.log('Opción bajar');
	bajar();
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');	
});

web.get("/animarIzquierda", function(req, resp){
	console.log('Opción animar izquierda');
	animar_izq();
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');	
});

web.get("/bailar", function(req, resp){
	console.log('Opción bailar');
	animar_baile();
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');	
});

web.get("/prenderleds", function(req, resp){
	console.log('Opción prenderleds');
	animar_prenderLeds();
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');	
});

web.get("/autonomo", function(req, resp){
	console.log('Opción Autonomo');
	autonomo();
	resp.sendfile(dirName + '/pages/Opcionesdrone.html');	
});



