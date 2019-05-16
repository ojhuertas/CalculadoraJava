var calculadora = {
	
	visor: document.getElementById("display"),
	valorpantalla: "0",
	operacion: "",
	Valor1: 0,
	Valor2: 0,
	Valor3: 0,
	resultado: 0,
	teclaIgual: false,
	
	init: (function(){
		this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
	}),
	
	asignarEventosFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoreducirBoton;
			x[i].onmouseleave = this.eventonormalBoton;
		};
	},

	eventoreducirBoton: function(event){
		calculadora.reducirBoton(event.target);
	},

	eventonormalBoton: function(event){
		calculadora.aumentarBoton(event.target);
	},
	
	reducirBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},
	
	aumentarBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},
	
	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresarNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresarNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresarNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresarNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresarNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresarNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresarNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresarNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresarNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresarNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarpantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresarDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresarOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresarOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresarOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresarOperacion("+");});
	},
	
	borrarpantalla: function(){ 

	    this.valorpantalla = "0";
		this.operacion = "";
		this.Valor1 = 0;
		this.Valor2 = 0;
		this.resultado = 0;
		this.Operación = "";
		this.teclaIgual = false;
		this.Valor3 = 0;
		this.updatepantalla();
	},
	
	cambiarSigno: function(){
		if (this.valorpantalla !="0") {
			var aux;
			if (this.valorpantalla.charAt(0)=="-") {
				aux = this.valorpantalla.slice(1);
			}	else {
				aux = "-" + this.valorpantalla;
			}
		this.valorpantalla = "";
		this.valorpantalla = aux;
		this.updatepantalla();
		}
	},
	
	ingresarDecimal: function(){
		if (this.valorpantalla.indexOf(".")== -1) {
			if (this.valorpantalla == ""){
				this.valorpantalla = this.valorpantalla + "0.";
			} else {
				this.valorpantalla = this.valorpantalla + ".";
			}
			this.updatepantalla();
		}
	},
	
	ingresarNumero: function(valor){
		if (this.valorpantalla.length < 8) {
		
			if (this.valorpantalla=="0") {
				this.valorpantalla = "";
				this.valorpantalla = this.valorpantalla + valor;
			} else {
				this.valorpantalla = this.valorpantalla + valor;
			}
		this.updatepantalla();
		}
	},
	
	ingresarOperacion: function(oper){
		this.Valor1 = parseFloat(this.valorpantalla);
		this.valorpantalla = "";
		this.operacion = oper;
		this.teclaIgual = false;
		this.updatepantalla();
	},
	
	verResultado: function(){

		if(!this.Igual){ 
			this.Valor2 = parseFloat(this.valorpantalla);
			this.Valor3 = this.Valor2;
			this.realizarOperacion(this.Valor1, this.Valor2, this.operacion);
		
		} else {
			this.realizarOperacion(this.Valor1, this.Valor2, this.operacion);
		}
	
		this.Valor1 = this.resultado;
		this.valorpantalla = "";
	
		if (this.resultado.toString().length < 9){
			this.valorpantalla = this.resultado.toString();
		} else {
			this.valorpantalla = this.resultado.toString().slice(0,8) + "...";
		}
	
		this.teclaIgual = true;		
		this.updatepantalla();
	
	},
	
	realizarOperacion: function(Valor1, Valor2, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(Valor1 + Valor2);
			break;
			case "-": 
				this.resultado = eval(Valor1 - Valor2);
			break;
			case "*": 
				this.resultado = eval(Valor1 * Valor2);
			break;
			case "/": 
				this.resultado = eval(Valor1 / Valor2);
			break;
			}
	},
	
	updatepantalla: function(){
		this.visor.innerHTML = this.valorpantalla;
	}
	
};

calculadora.init();