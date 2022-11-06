function toInt(texto) {
	let aux = texto.replace(/[^0-9]/g, '');
	return parseInt(aux);
}

function startGame() {
	const janela = document.createElement("div");

	janela.style.display = "flex";
	janela.style.position = "fixed";
	janela.style.left = 0;
	janela.style.top = 0;
	janela.style.right = 0;
	janela.style.bottom = 0;
	janela.style.alignItems = "center";
	janela.style.justifyContent = "center";

	const caixa = document.createElement("div");

	caixa.style.height = "30%";
	caixa.style.width = "20%";
	caixa.style.display = "flex";
	caixa.style.flexDirection = "column";
	caixa.style.justifyContent = "space-around";
	caixa.style.alignItems = "center";
	caixa.style.backgroundColor = "white";
	caixa.style.border = "5px solid black";

	const texto = document.createElement("div");

	texto.innerHTML = "NICK";
	texto.style.textAlign = "center";
	texto.style.fontFamily = "consolas";
	texto.style.fontSize = "20px";
	texto.style.fontWeight = "bold";

	const entrada = document.createElement("input");

	entrada.id = "entrada";
	entrada.style.height = "30px";
	entrada.style.margin = "0px 10px";

	const butao = document.createElement("div");

	butao.innerHTML = "GO!";
	butao.style.textAlign = "center";
	butao.style.fontSize = "25px";
	butao.style.fontFamily = "consolas";
	butao.style.fontWeight = "bold";
	butao.style.width = "100px";
	butao.style.height = "30px";
	butao.style.border = "5px solid black";

	butao.onclick = function() {
		let nick = document.getElementById("entrada").value;

		localStorage.setItem("nick", nick);

		location.href = "./game.html";
	}

	butao.onmouseover = function() {
		this.style.color = "white";
		this.style.cursor = "pointer";
		this.style.backgroundColor = "black";
	};

	butao.onmouseout = function() {
		this.style.color = "black";
		this.style.cursor = "pointer";
		this.style.backgroundColor = "white";
	}

	caixa.appendChild(texto);
	caixa.appendChild(entrada);
	caixa.appendChild(butao);

	janela.appendChild(caixa);

	document.getElementById("tela").appendChild(janela);
}

function exibirRank() {
	location.href = "./rank.html";
}

function multiplayer() {
    location.href = "./multiplayer.html";
}
