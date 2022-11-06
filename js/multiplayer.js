const xhr = new XMLHttpRequest();

xhr.open("POST", "http://invensiblemoment.lovestoblog.com/jsc/php/queryRooms.php");

xhr.responseType = "json";

xhr.onload = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        buildTable(xhr.response);
    }
};

xhr.send();

function startRoom(nick) {
    const xhr = new XMLHttpRequest();

    const params = "channel=" + (nick + "-player2") + "&event=start&message=start";
    const url = "https://jsc-socket.glitch.me/";
    const urlGet = url + "?" + params;

	xhr.open("GET", urlGet);

	xhr.onload = () => {
		if (xhr.readyState === xhr.DONE && xhr.status === 200) {
			alert("Gooo!!!");
            localStorage.setItem("channel", nick);
            localStorage.setItem("player", 2);
            location.href = "./gameMultiplayer.html";
		} else {
			alert("Error");
		}
	};

	xhr.send();
}

function buildTable(obj) {
    const table = document.getElementById("tabela");

    for (let i = 0; i < obj.length; i++) {
        const row = document.createElement("tr");

        Object.keys(obj[i]).forEach(key => {
            const column = document.createElement("td");
            
            if (key != "id") {
                column.className = "cellClickable";
                column.innerHTML = obj[i][key];
                column.id = obj[i][key];
                column.onclick = (event) => {
                    startRoom(event.target.id);
                };
            } else {
                column.className = "cell";
                column.innerHTML = i + 1;
            }

            row.appendChild(column);
        });

        table.appendChild(row);
    }
}

function buildRoom() {
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

	butao.innerHTML = "CREATE";
	butao.style.textAlign = "center";
	butao.style.fontSize = "25px";
	butao.style.fontFamily = "consolas";
	butao.style.fontWeight = "bold";
	butao.style.width = "100px";
	butao.style.height = "30px";
	butao.style.border = "5px solid black";

	butao.onclick = function() {
		let nick = document.getElementById("entrada").value;
        insertRoom(nick);
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

function insertRoom(nick) {
	const xhr = new XMLHttpRequest();

	xhr.responseType = "json";
	xhr.open("POST", "http://invensiblemoment.lovestoblog.com/jsc/php/insertRoom.php");

	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.onload = () => {
		if (xhr.readyState === xhr.DONE && xhr.status === 200) {
			alert("Room created successfully!");
            localStorage.setItem("channel", nick);
            localStorage.setItem("player", 1);
            location.href = "./wait.html";
		} else {
			alert("Error");
		}
	};

	xhr.send("nick=" + nick);
}