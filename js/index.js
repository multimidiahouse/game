// JavaScript Document
var index = {
	BLOCO: new Object(),
	CANVAS: new Object(),
	PONTOS: new Number(),
	BACKGROUND: new Object(),
	FRAME: new Number(),
	initialize: function() {
		//Settings of Player
		index.BLOCO = document.getElementById('bloco');
		index.BLOCO.style.left = "20%";
		index.BLOCO.style.top = "60%";
		
		//Settings of Scene
		index.CANVAS = document.getElementById('canvas');
		index.CANVAS.style.backgroundPositionX = '0px';
		index.CANVAS.style.backgroundPositionY = '100%';
		
		//Settings of Frame
		index.FRAME = 0;
		
		//Call Background
		this.animateBackground();
		
		//Call Events
		this.events();
	},
	animateBackground: function() {
		index.BACKGROUND = setInterval(function(){
			index.FRAME++;
			index.CANVAS.style.backgroundPositionX = '-'+index.FRAME+"px";
		}, 5);
	},
	events: function() {
		document.addEventListener("keydown", function(e){
			if(e.keyCode == 38)
				index.commands.pular();
		});
		document.addEventListener('click', function(){
			index.commands.pular();
		});
		
		setInterval(function(){ 
			index.createPontos(); 
		}, /*Math.floor(Math.random() * 10) * 100*/ 5000);
	},
	createPontos: function() {
		var left = 95;
		var top = 45;
		var caixas = document.getElementsByClassName('caixa');

		if(caixas.length == 0)
		{
			var caixa = document.createElement('div');
			caixa.className = 'caixa';
			caixa.style.left = left+"%";
			caixa.style.top = top+"%";
			document.getElementById('canvas').appendChild(caixa);
			
			var velocidade = Math.floor(Math.random() * 50);
			var pontuacao = setInterval(function(){
				if(index.BLOCO.style.top == caixa.style.top && index.BLOCO.style.left == caixa.style.left)
				{
					index.PONTOS++;
					caixas[0].parentNode.removeChild(caixas[0]);
					clearInterval(pontuacao);
				}
				else
				{
					caixa.style.left = left+"%";
					left--;
					if(left<=0)
					{
						caixas[0].parentNode.removeChild(caixas[0]);
						clearInterval(pontuacao);
					}
				}
				document.getElementById('pontos').innerHTML = index.PONTOS;
				
			}, velocidade);
		}
	},
	commands: {
		pular: function() {
			index.BLOCO.style.top = "45%";
			setTimeout(function(){
				index.BLOCO.style.top = "60%";
			}, 500);
		}
	}
}