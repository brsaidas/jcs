alert("MOVE: W-A-S-D | ATK: SpaceBar or E or K | F11 full screen");

let score = 0, life = 3;
let x = (window.screen.width / 2.0) - 50, y = (window.screen.height / 2.0) - 50, pulo = 50;
let cntInitG = 0, cntEndG = 0;
let cntInitY = 0, cntEndY = 0;
let fimDeJogo = 0;
let quantidadeTiros = 0;

let keys = ['w', 'a', 's', 'd', 'k', 'e', ' '];
let map = {w: 0, a: 0, s: 0, d: 0, k: 0, e: 0, space: 0};

const ptrAtualizaTela = setInterval(atualizaTela, 50);
const ptrCriaBlocoVerde = setInterval(criarBlocoVerde, 1000);

function getRandom(max) {
	return Math.floor(Math.random() * max + 1);
}

function toInt(texto) {
	let aux = texto.replace(/[^0-9]/g, '');
	return parseInt(aux);
}

function intercecao(x11, y11, x12, y12, x21, y21, x22, y22) {
	if (((x11 <= x21 && x21 <= x12) || (x11 <= x22 && x22 <= x12)) && ((y11 <= y21 && y21 <= y12) || (y11 <= y22 && y22 <= y12))) {
		return true;
	} else {
		return false;
	}
}

function validKey(key) {
	for (let i = 0; i < keys.length; i++) {
		if (keys[i] == key) {
			return true;
		}
	}
	return false;
}

function handleKeyDown(e) {
	if (validKey(e.key)) {
		if (e.key == ' ') {
			map.space = 1;
		} else {
			map[e.key] = 1;
		}
	}
}

function handleKeyUp(e) {
	if (validKey(e.key)) {
		if (e.key == ' ') {
			map.space = 0;
		} else {
			map[e.key] = 0;
		}
	}
}

function movimento() {
	if (map.w == 1) {
		y -= pulo;
	
		if (y <= 85) {
			y = 85;
		}	
	}
	
	if (map.a == 1) {
		x -= pulo;
		
		if (x <= 0) {
			x = 0;
		}
	}
	
	if (map.d == 1) {
		x += pulo;
		
		if (window.screen.width - 100 <= x) {
			x = window.screen.width - 108;
		}
	}
	
	if (map.s == 1) {
		y += pulo;
	
		if (window.screen.height - 158 <= y) {
			y = window.screen.height - 158;
		}
	}
	
	if (map.k == 1 || map.e == 1 || map.space == 1) {
		if (quantidadeTiros <= 10) {
			criarBlocoAmarelo();
			quantidadeTiros++;
		}
	}
}

function criarBlocoAmarelo() {
	const divBlocoAmarelo = document.createElement("div");

	divBlocoAmarelo.id = "Y" + cntEndY++;
	divBlocoAmarelo.style.height = "70px";
	divBlocoAmarelo.style.width = "35px";
	divBlocoAmarelo.style.backgroundImage = 'url("./src/tiro.webp")';
	divBlocoAmarelo.style.backgroundSize = "cover";
	divBlocoAmarelo.style.position = "fixed";
	divBlocoAmarelo.style.marginLeft = x + 35 + "px";
	divBlocoAmarelo.style.marginTop = y - 75 + "px";

	document.getElementById("tela").appendChild(divBlocoAmarelo);
}

function criarBlocoVerde() {
	if (fimDeJogo) {
		clearInterval(ptrCriaBlocoVerde);
		return;
	}

	const divBlocoVerde = document.createElement("div");

	let x = getRandom(window.screen.width);

	divBlocoVerde.id = "G" + cntEndG++;
	divBlocoVerde.style.width = "50px";
	divBlocoVerde.style.height = "50px";
	divBlocoVerde.style.position = "fixed";
	divBlocoVerde.style.backgroundImage = 'url("./src/meteoro.webp")';
	divBlocoVerde.style.backgroundSize = "cover";
	divBlocoVerde.style.marginLeft = (x + "px");
	divBlocoVerde.style.marginTop = "0px";

	document.getElementById("tela").appendChild(divBlocoVerde);
}

function atualizaTela() {
	if (fimDeJogo) {
		clearInterval(ptrAtualizaTela);
		return;
	}

    movimento();

	//Atualiza Bloco Vermelho
	const blocoVermelho = document.getElementById("blocoVermelho");

	blocoVermelho.style.marginLeft = (x + "px");
	blocoVermelho.style.marginTop = (y + "px");

	for (let i = cntInitG; i <= cntEndG - 1; i++) {
		if (document.getElementById("G" + i) === null) continue;

		let g = document.getElementById("G" + i);

		let x11 = toInt(g.style.marginLeft), y11 = toInt(g.style.marginTop), x12 = x11 + 50, y12 = y11 + 50;
		let x21 = x, y21 = y, x22 = x21 + 100, y22 = y21 + 100;

		if (intercecao(x11, y11, x12, y12, x21, y21, x22, y22) || intercecao(x21, y21, x22, y22, x11, y11, x12, y12)) {
			if (life == 0) {
				fimDeJogo = 1;

				let	nick = localStorage.getItem("nick");

                if (score > 0) {
				    inseriBanco(nick, score);
                } else {
                    alert("Pontuacao muito baixa para entrar no rank, tente novamente...");
                    location.href = "./index.html"
                }

				//alert("Game Over " + nick + " - Ponturcao: " + score);
			} else {
				life--;
				g.remove();
			}
		}
	}

    for (let i = cntInitY; i <= cntEndY - 1; i++) {
		if (document.getElementById("Y" + i) === null) continue;

		let g = document.getElementById("Y" + i);

		let x11 = toInt(g.style.marginLeft), y11 = toInt(g.style.marginTop), x12 = x11 + 50, y12 = y11 + 50;
		let x21 = x, y21 = y, x22 = x21 + 100, y22 = y21 + 100;

		if (intercecao(x11, y11, x12, y12, x21, y21, x22, y22) || intercecao(x21, y21, x22, y22, x11, y11, x12, y12)) {
			if (life == 0) {
				fimDeJogo = 1;

				let	nick = localStorage.getItem("nick");

                if (score > 0) {
				    inseriBanco(nick, score);
                } else {
                    alert("Pontuacao muito baixa para entrar no rank, tente novamente...");
                    location.href = "./index.html"
                }

				//alert("Game Over " + nick + " - Ponturcao: " + score);
			} else {
				life--;
				g.remove();
                quantidadeTiros--;
			}
		}
	}

	document.getElementById("life").innerHTML = "LIFE: " + life;

	for (let i = cntInitG; i <= cntEndG - 1; i++) {
		for (let j = cntInitY; j <= cntEndY - 1; j++) {
			if (document.getElementById("G" + i) === null) continue;
			if (document.getElementById("Y" + j) === null) continue;

			let g = document.getElementById("G" + i);
			let y = document.getElementById("Y" + j);

			let x11 = toInt(g.style.marginLeft), y11 = toInt(g.style.marginTop), x12 = x11 + 50, y12 = y11 + 50;
			let x21 = toInt(y.style.marginLeft), y21 = toInt(y.style.marginTop), x22 = x21 + 35, y22 = y21 + 70;

			if (intercecao(x11, y11, x12, y12, x21, y21, x22, y22) || intercecao(x21, y21, x22, y22, x11, y11, x12, y12)) {
				g.remove();
				y.remove();
                quantidadeTiros--;
				score += 10;
			}
		}
	}

	document.getElementById("score").innerHTML = "SCORE: " + score;

	//Atualiza Blocos Verdes
	for (let i = cntInitG; i <= cntEndG - 1; i++) {
		if (document.getElementById("G" + i) === null) {
            if (i == cntInitG) {
                cntEndG++;
            }
            
            continue;
        }

		let aux = document.getElementById("G" + i).style.marginTop;

		let marginTop = toInt(aux);

		if (marginTop >= window.screen.height) {
			document.getElementById("G" + i).remove();
			continue;
		}

		document.getElementById("G" + i).style.marginTop = marginTop + 5 + "px";
	}

	//Atualiza Blocos Amarelos
	for (let i = cntInitY; i <= cntEndY - 1; i++) {
		if (document.getElementById("Y" + i) === null) {
			if (i == cntInitY) {
				cntInitY++;
			}

            continue;
		}

		let aux = document.getElementById("Y" + i).style.marginTop;

		let marginTop = toInt(aux);

		if (marginTop <= 5) {
			document.getElementById("Y" + i).remove();
            quantidadeTiros--;
			continue;
		}

		document.getElementById("Y" + i).style.marginTop = marginTop - 5 + "px";
	}
}

function inseriBanco(nick, score) {
	const xhr = new XMLHttpRequest();

	xhr.responseType = "json";
	xhr.open("POST", "http://invensiblemoment.lovestoblog.com/jsc/php/inseri.php");

	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.onload = () => {
		if (xhr.readyState === xhr.DONE && xhr.status === 200) {
			//alert("Pontuacao Gravada");
			location.href = "./index.html"
		} else {
			//alert("readyState: " + xhr.readyState + ", status: " + xhr.status);
		}
	};

	xhr.send("nick=" + nick + "&score=" + score);
}
