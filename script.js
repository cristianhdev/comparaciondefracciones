let juego_actual = 0;

let sliders = ['slide-1', 'slide-2']
let audios_sond = ['Audio1', '', 'Audio2']

let presentacion_slide = 0
let audio;
let audioOvers;
let audiosBotonesOver;
let path_sound = './public/sounds/'
let contadorEjercicios=0



function init() {
	document.body.addEventListener('keyup', presentacionteclado, false)
	document.getElementById('siguiente').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('siguiente').addEventListener('mouseout', btnSoundOut, false)
	document.getElementById('atras').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('atras').addEventListener('mouseout', btnSoundOut, false)
	document.getElementById('atrasFracciones').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('atrasFracciones').addEventListener('mouseout', btnSoundOut, false)
	document.getElementById('siguienteFraccion').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('siguienteFraccion').addEventListener('mouseout', btnSoundOut, false)
	document.getElementById('limpiar').addEventListener('mouseover', btnSoundOver, false)
	document.getElementById('limpiar').addEventListener('mouseout', btnSoundOut, false)
	
	cargarAudio();
}



function btnSoundOver() {
	audioOvers = new Audio(`${path_sound}61.mp3`);
	audioOvers.play();
}

function btnSoundOut() {
	audioOvers.pause();
}

function presentacionteclado(e) {


	if (e.keyCode == 39) {

		siguiente()
	}

	if (e.keyCode == 37) {
		if (getCurrentSlider() == 0 || getCurrentSlider() == 2) {

		} else {
			atras()
		}

	}


	if (e.keyCode == 13 && presentacion_slide == sliders.length - 1) {
		comprobar()
	}


}

function cargarAudio(loop = false) {
	if (audios_sond[presentacion_slide] != null || audios_sond[presentacion_slide] != undefined) {
		audio = new Audio(`${path_sound}${audios_sond[presentacion_slide]}.mp3`);
		audio.loop = loop
		audio.mute=true;
	}

}

function changeSound(new_sond) {
	audio.src = `${path_sound}${new_sond}.mp3`;
	audio.pause();
	audio.load();
	audio.play();
	audio.addEventListener('ended', function () {

	});
}


function presentacion() {
	if (presentacion_slide == 0) {
		document.getElementById('siguiente').style.display = "inline-block"
		document.getElementById('atras').style.visibility = "hidden"
		//document.getElementById('visubility').style.display = "inline-block"

	} else if (presentacion_slide == sliders.length - 1) {
		document.getElementById('siguiente').style.display = "none"
		//document.getElementById('atras').style.display = "none"
		document.getElementById('atras').style.visibility = "visible"
		document.getElementById('siguiente').style.display = "none"
		//changeSound(audios_sond[presentacion_slide])
	} else {
		document.getElementById('siguiente').style.display = "inline-block"
		document.getElementById('atras').style.visibility = "visible"
		document.getElementById('actividad').style.display = "none"

	}
	/* console.log(`slide-${presentacion_slide}`);*/
}


function siguiente() {
	if (presentacion_slide == sliders.length - 1) {
	} else {
		presentacion_slide++
		document.getElementById(sliders[presentacion_slide - 1]).style.display = "none"
		document.getElementById(sliders[presentacion_slide]).style.display = "block"
		audioOvers = new Audio(`${path_sound}60.mp3`);
		audioOvers.play();
		presentacion()
		limpiar()
	}
}

function atras() {
	presentacion_slide--
	document.getElementById(sliders[presentacion_slide + 1]).style.display = "none"
	document.getElementById(sliders[presentacion_slide]).style.display = "block"
	audioOvers = new Audio(`${path_sound}60.mp3`);
	audioOvers.play();
	presentacion()
	limpiar()
}

function getCurrentSlider() {
	return presentacion_slide
}

function ReiniciarActividad() {

}


function operador(operador) {

	let mensaje = document.querySelector('.recuadro-mensaje')
	mensaje.style.visibility='visible'
	let tiempo;
	let inputs = document.querySelectorAll('.input')
	let valores = []

	inputs.forEach((element) => {
		valores.push(element.value)
	})


	if (valores.includes("")) {
		mensaje.style.display = 'block'
		mensaje.innerHTML = 'Faltan datos'
		tiempo=setTimeout(() => {
			mensaje.style.display = 'none'
			ocultarOperadores()
		}, 1200);
	} else {
		mensaje.style.display = 'none'
		mensaje.innerHTML = ''
		let division1 = Number(valores[0]) / Number(valores[2])
		let division2 = Number(valores[1]) / Number(valores[3])

		console.log(division1)
		console.log(division2)

		if (division1 > division2) {
			if (operador === '>') {
				mensaje.style.display = 'block'
				mensaje.innerHTML = '!Es Correcto!'
			} else {
				mensaje.style.display = 'block'
				mensaje.innerHTML = 'Datos incorrectos!'
			}
		} else if (division1 < division2) {
			if (operador === '<') {
				mensaje.style.display = 'block'
				mensaje.innerHTML = '!Es Correcto!'
			} else {
				mensaje.style.display = 'block'
				mensaje.innerHTML = 'Datos incorrectos!'
			}
		} else {
			if (operador === '=') {
				mensaje.style.display = 'block'
				mensaje.innerHTML = '!Es Correcto!'
			} else {
				mensaje.style.display = 'block'
				mensaje.innerHTML = 'Datos incorrectos!'
			}
		}

		tiempo=setTimeout(() => {
			mensaje.style.display = 'none'
			ocultarOperadores()
		}, 1500);
	}
}

function mostrarOperadores() {
	document.querySelector('#interrogacion').style.display = 'none'
	document.querySelector('#mayor-que').style.display = 'block'
	document.querySelector('#menor-que').style.display = 'block'
	document.querySelector('#igual-que').style.display = 'block'
}

function ocultarOperadores(){
	document.querySelector('#interrogacion').style.display = 'block'
	document.querySelector('#mayor-que').style.display = 'none'
	document.querySelector('#menor-que').style.display = 'none'
	document.querySelector('#igual-que').style.display = 'none'
}

function fraccionesAleatorias(){
	//Creamos  un array con numeros aleatorios.
	let temporal = []
	for (let i = 1; i < 21; i++) {
		temporal = [...temporal, i]
	}

	//Organizamos de forma aleatoria un array.
	temporal.sort(() => Math.random() - 0.5)
	let numerosNuevos=[]
	for (let index = 0; index < 4; index++) {
		numerosNuevos.push(temporal[index])
	}
	contadorEjercicios++
	document.querySelector('#contadorEjercicios').innerHTML=contadorEjercicios
	document.querySelector("#atrasFracciones").style.visibility='visible'
	document.querySelector("#atrasFracciones").style.display='block'
	document.querySelector("#limpiar").style.display='none'
	CargarInputs(numerosNuevos)
}

function limpiar(){
	let inputs = document.querySelectorAll('.input')
	

	inputs.forEach((element) => {
		element.value=''
	})
}

function CargarInputs(elementosAleatorios){
	let inputs = document.querySelectorAll('.input')
	

	inputs.forEach((element,index) => {
		element.value=elementosAleatorios[index]
	})
}

function atrasFracciones(){
	contadorEjercicios=0
	document.querySelector('#contadorEjercicios').innerHTML=''
	document.querySelector("#atrasFracciones").style.visibility='hidden'
	document.querySelector("#atrasFracciones").style.display='none'
	document.querySelector("#limpiar").style.display='block'
	limpiar()
}