const xhr = new XMLHttpRequest();

xhr.open("POST", "http://invensiblemoment.lovestoblog.com/jsc/php/consulta.php");

xhr.responseType = "json";

xhr.onload = () => {
  if (xhr.readyState === xhr.DONE && xhr.status === 200) {
    constroiTabela(xhr.response);
  }
};

xhr.send();

function constroiTabela(obj) {
  const tabela = document.getElementById("tabela");

  for (let i = 0; i < obj.length; i++) {
    const linha = document.createElement("tr");

    Object.keys(obj[i]).forEach(key => {
      const coluna = document.createElement("td");

      coluna.className = "Celula";

      if (key != "id") {
        coluna.innerHTML = obj[i][key];
      } else {
        coluna.innerHTML = i + 1;
      }

      linha.appendChild(coluna);
    });

    tabela.appendChild(linha);
  }
}
