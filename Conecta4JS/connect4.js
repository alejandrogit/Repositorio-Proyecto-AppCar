// connect4.js

//Nos indica si la partida está iniciada
var partidaIniciada = false;
//var conjuntoGanador = new Array(8);
//Indica a que jugador le toca tirar
var turno = 'ROJO';
var col = 0;
var fil = 0;
var jugadaEmpatada = false;

//Tablero
var tablero = [
	['X','X','X','X','X','X','X'],
	['X','X','X','X','X','X','X'],
	['X','X','X','X','X','X','X'],
	['X','X','X','X','X','X','X'],
	['X','X','X','X','X','X','X'],
	['X','X','X','X','X','X','X']
];
//Indica contador de fichas
var rojo = 0;
var azul = 0;
//Indica si existe ganador
var ganador = false;

function imprimirTablero () {
	for (var i = 0; i < tablero.length; i++) {
		console.log(tablero[i]);
	}
}

function cambioTurno() {
	if (turno == "ROJO")
		turno = "AZUL";
	else
		turno = "ROJO";

	imprimirTablero();
	console.log("-----------SIGUIENTE TIRADA------------");
	console.log(turno);
	//Muestra el turno que le va tocando
	$(".tu").empty();
	$(".tu").append("El turno es de " + turno);
}

function resetearPartida(){
	location.reload();
	partidaIniciada = false;
	document.getElementById("btn_reset").disabled = true;
}


function comenzarPartida() {

	partidaIniciada = true;
	document.getElementById("btn_comenzar").disabled = true;
	document.getElementById("btn_reset").disabled = false;
	//
	$(".tu").empty();
	$(".tu").append("El turno es de " + turno);
}

function mueveFicha(evt) {

}

function caidaFicha(evt) {

	var evento = evt;
	var valorParaArray = 'R';
	var img = "";

	if (partidaIniciada) {	
		if (turno == "ROJO") {
			img = "c4redpiece.gif";
		} else {
			img = "c4blupiece.gif";
			valorParaArray = 'A';
		}
	}else{
		return;
	}


	col = evento.target.id.split("-")[2];
	//alert(col);
	//Tenemos que comprobar en el array bidimensional en 
	//que fila debe estar

	var filaDondePoner = 6;
	var terminado = false;
	while(filaDondePoner > 0 && !terminado){
		if (tablero[filaDondePoner-1][col-1] != 'X')
			filaDondePoner--;
		else
			terminado = true;
	}

	if (terminado) {
		tablero[filaDondePoner-1][col-1] = valorParaArray;
		var idCelda = "c-"+filaDondePoner+"-"+col;
		var imagenCelda = document.getElementById(idCelda).getElementsByTagName("img")[0];
		imagenCelda.src = img;
		imagenCelda.className = "visible";

		cambioTurno();
	}


	comprobarHorizontal();
	comprobarVertical();
	comprobarDiagonalDer();
	comprobarDiagonalIzq();
	comprobarContraDiagonalIzq();
	comprobarContraDiagonalDer();
	comprobarEmpate();
}

function comprobarHorizontal() {

	
	var conjuntoGanadorRojo = [];
	var conjuntoGanadorAzul = [];

	for (var i = 0; i < 6 && !ganador; i++) {
		rojo = 0;
		azul = 0;
		//Si no se meten aquí las variables, en el caso de que en una fila los tres últimos sean de un color
		//Y la siguiente fila empieze en el mismo color, daría por ganador al color, así por cada
		//fila empieza el contador de nuevo
		for (var j = 0; j < 7 && !ganador; j++) {
			
			if (tablero[i][j] == 'A') {
				azul++;
				conjuntoGanadorAzul.push(i);
				conjuntoGanadorAzul.push(j);
			} else {
				azul = 0;
				borrar(conjuntoGanadorAzul);
			}
			
			if (tablero[i][j] == 'R') {
				rojo++;
				conjuntoGanadorRojo.push(i);
				conjuntoGanadorRojo.push(j);

			} else {
				rojo = 0;
				borrar(conjuntoGanadorRojo);
			}

			if (rojo == 4) {
				alert("Ganan las Fichas de color Rojo");
				ganador = true;
			}
			if (azul == 4) {
				alert("Ganan las Fichas de color Azul");
				ganador = true;
			}
			

			if(ganador){
				var nuevaImagen;
				var id;
				var celda;

				if(turno != "AZUL"){
					nuevaImagen = "c4blupieceWIN.gif";
					
					for(var i = 0; i < conjuntoGanadorAzul.length; i+=2){
						var fila = conjuntoGanadorAzul[i] + 1;
						var colum = conjuntoGanadorAzul[i+1] + 1;
						id = "c-" + fila + "-" + colum;
						celda = document.getElementById(id).getElementsByTagName("img")[0];
						celda.src = nuevaImagen;
					}
				}else{
					nuevaImagen = "c4redpieceWIN.gif";

					for(var i = 0; i < conjuntoGanadorRojo.length; i+=2){
						var fila1 = conjuntoGanadorRojo[i] + 1;
						var colum1 = conjuntoGanadorRojo[i+1] + 1;
						id = "c-" + fila1 + "-" + colum1;
						celda = document.getElementById(id).getElementsByTagName("img")[0];
						celda.src = nuevaImagen;
					}
				}
				textoFlotanteGanador();
			}
		}
	}
	
}

function comprobarVertical(){
	
	rojo = 0;
	azul = 0;
	var columnaElegida = Number(col);
	var conjuntoGanadorRojo = [];
	var conjuntoGanadorAzul = [];


	for (var i = 5; i > 0 && !ganador; i--) {

			if (tablero[i][columnaElegida-1] == 'A') {
				azul++;
				conjuntoGanadorAzul.push(i);
				conjuntoGanadorAzul.push(columnaElegida-1);
			} else {
				azul = 0;
				borrar(conjuntoGanadorAzul);
			}
			
			if (tablero[i][columnaElegida-1] == 'R') {
				rojo++;
				conjuntoGanadorRojo.push(i);
				conjuntoGanadorRojo.push(columnaElegida-1);
			} else {
				rojo = 0;
				borrar(conjuntoGanadorRojo);
			}

			if (rojo == 4) {
				alert("Ganan las Fichas de color Rojo");
				ganador = true;
				console.log(conjuntoGanadorRojo);
			}
			if (azul == 4) {
				alert("Ganan las Fichas de color Azul");
				ganador = true;
				console.log(conjuntoGanadorAzul);
			}
			if(ganador){
				var nuevaImagen;
				var id;
				var celda;

				if(turno != "AZUL"){
					nuevaImagen = "c4blupieceWIN.gif";
					
					for(var i = 0; i < conjuntoGanadorAzul.length; i+=2){
						var fila = conjuntoGanadorAzul[i] + 1;
						var colum = conjuntoGanadorAzul[i+1] + 1;
						id = "c-" + fila + "-" + colum;
						celda = document.getElementById(id).getElementsByTagName("img")[0];
						celda.src = nuevaImagen;
					}
				}else{
					nuevaImagen = "c4redpieceWIN.gif";

					for(var i = 0; i < conjuntoGanadorRojo.length; i+=2){
						var fila1 = conjuntoGanadorRojo[i] + 1;
						var colum1 = conjuntoGanadorRojo[i+1] + 1;
						id = "c-" + fila1 + "-" + colum1;
						celda = document.getElementById(id).getElementsByTagName("img")[0];
						celda.src = nuevaImagen;
					}
				}
				textoFlotanteGanador();
			}
	}
}


function comprobarDiagonalIzq(){
	//Comprueba desde tablero[0][3] a tablero[3][0]
	//Comprueba desde tablero[0][4] a tablero[4][0]
	//Comprueba desde tablero[0][5] a tablero[5][0]
	rojo = 0;
	azul = 0;
	var columna;
	var contador = 0;
	var ganador = false;


	while(contador < 3){
		columna = 3;
		columna = columna + contador;
		for (var i = 0; columna >= 0; i++) {
			rojo = 0;
			azul = 0;

			if(tablero[i][columna] == 'R'){
			rojo++;

			}else{
			rojo = 0;
			}


			if(tablero[i][columna] == 'A'){
				azul++;
			}else{
				azul = 0;
			}

			if (rojo == 4) {
					alert("Ganan las Fichas de color Rojo");
					ganador = true;
				}
			if (azul == 4) {
					alert("Ganan las Fichas de color Azul");
					ganador = true;
				}
		columna--;

		//if(ganador)
		//		terminarPartida();
		}

		contador++;
	}



}

	function comprobarDiagonalDer(){
	//Comprueba desde tablero[0][6] a tablero[5][1]
	//Comprueba desde tablero[1][6] a tablero[5][2]
	//Comprueba desde tablero[2][6] a tablero[5][3]

	var rojo = 0;
	var azul = 0;
	var columna;
	var contador = 0;
	var ganador = false;

	while(contador < 3){
		columna = 1;
		columna = columna + contador;
		for (var fila = 0; columna <= 6; columna++) {
			rojo = 0;
			azul = 0;

			if(tablero[fila][columna] == 'R'){
			rojo++;

			}else{
			rojo = 0;
			}


			if(tablero[fila][columna] == 'A'){
				azul++;
			}else{
				azul = 0;
			}

			if (rojo == 4) {
					alert("Ganan las Fichas de color Rojo");
					ganador = true;
				}
			if (azul == 4) {
					alert("Ganan las Fichas de color Azul");
					ganador = true;
				}

			//if(ganador)
			//	terminarPartida();
			
			fila++;
		}
		contador++;
	}
}


function comprobarContraDiagonalIzq(){
	//Comprueba desde tablero[0][0] a tablero[5][5]
	//Comprueba desde tablero[1][0] a tablero[5][4]
	//Comprueba desde tablero[2][0] a tablero[5][3]
	rojo = 0;
	azul = 0;
	var fila;
	var columna;
	var contador = 0;
	var ganador = false;


	while(contador < 3){
		fila = 0;
		fila += contador;
		for (columna = 0; fila <= 5; fila++) {
			rojo = 0;
			azul = 0;

			if(tablero[fila][columna] == 'R'){
			rojo++;

			}else{
			rojo = 0;
			}


			if(tablero[fila][columna] == 'A'){
				azul++;
			}else{
				azul = 0;
			}

			if (rojo == 4) {
					alert("Ganan las Fichas de color Rojo");
					ganador = true;
				}
			if (azul == 4) {
					alert("Ganan las Fichas de color Azul");
					ganador = true;
				}
			//if(ganador)
			//	terminarPartida();

		columna++;
		}

		contador++;
	}
}

	function comprobarContraDiagonalDer(){
	//Comprueba desde tablero[0][1] a tablero[5][6]
	//Comprueba desde tablero[0][2] a tablero[4][6]
	//Comprueba desde tablero[0][3] a tablero[3][6]

	var rojo = 0;
	var azul = 0;
	var columna;
	var contador = 0;
	var ganador = false;

	while(contador < 3){
		columna = 1;
		columna = columna + contador;
		for (var fila = 5; columna <= 6; columna++) {
			rojo = 0;
			azul = 0;

			if(tablero[fila][columna] == 'R'){
			rojo++;

			}else{
			rojo = 0;
			}


			if(tablero[fila][columna] == 'A'){
				azul++;
			}else{
				azul = 0;
			}

			if (rojo == 4) {
					alert("Ganan las Fichas de color Rojo");
					ganador = true;
				}
			if (azul == 4) {
					alert("Ganan las Fichas de color Azul");
					ganador = true;
				}
			//if(ganador)
			//	terminarPartida();

		fila--;
		}
		contador++;
	}
}


function comprobarEmpate(){
//Preguntar a Luismi como sería más fácil con JQuery
var contador = 0;
	for (var i = 0; i < tablero.length; i++) {
		
		for (var j = 0; j < tablero[i].length; j++) {
			if(tablero[i][j]=="X"){
				contador++;
			}
		}
	}

	if(contador == 0){
		jugadaEmpatada = true;
		$(".tu").empty();
		$(".tu").append("¡¡Es un EMPATE!!");
	}
}


function borrar(array){
    for(var i = array.length - 1; i>=0 ; i--){
            array.splice(i,1);
    }
}



function textoFlotanteGanador(){

	$(".tu").empty();
	if(turno == "AZUL")
		$(".tu").append("¡¡Ha ganado ROJO!!");
	else
		$(".tu").append("¡¡Ha ganado AZUL!!");
		
}


window.onload = function() {
	alert("Pincha en el botón a Jugar!!!");

	//Manejador de click sobre el boton de inicio de la partida
	document.getElementById("btn_comenzar").onclick = comenzarPartida;
	document.getElementById("btn_reset").onclick = resetearPartida;

	//Asignacion de los manejadores para los eventos de paso
	//de raton y click sobre las celdas de la tabla

	var filas = document.getElementsByTagName("tr");

	for(var i = 0; i < filas.length; i++) {
		var celdas = filas[i].getElementsByTagName("td");
		for(var j = 0; j < celdas.length; j++) {
			celdas[j].onclick = caidaFicha;
			celdas[j].onmousemove = mueveFicha;
		}
	}
	imprimirTablero();

};



/*
(function initAnimation(){
			// in case the game was reset, do not recurse
			if( board.quatro.length ){
				for( i=4; i--; ){
					o = o == 1 ? 0.3 : 1;
					cells.animate({ opacity:o }, 180, "easeInQuad");
				}
				setTimeout( initAnimation, 1500 );
			}
		})();
*/