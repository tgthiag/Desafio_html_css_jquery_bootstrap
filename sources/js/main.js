selectOption = (screen) => {
  $("#default_message").hide();
  $("#numbers").hide();
  $("#cep").hide();
  $("#perfect").hide();
  $("#tabuada").hide();
  $("#" + screen).toggle();
};

function consultarCep(event) {
  event.preventDefault();
  let cep = $("#typeCep").val().replace("-", "");
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if ("erro" in data) {
        alert("erro");
        throw new Error("CEP não encontrado");
      }
      const endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
      $("#resultCep").text(endereco);
    })
    .catch((error) => {
      console.error(`Erro ao consultar CEP: ${error}`);
      alert(`Erro ao consultar CEP: ${error}`);
    });
}

function is_perfect(number) {
  var temp = 0;
  for (var i = 1; i <= number / 2; i++) {
    if (number % i === 0) {
      temp += i;
    }
  }

  if (temp == number && temp !== 0) {
    $("#perfeito_result").text(number + " é um número perfeito");
  } else {
    $("#perfeito_result").text(number + " não é um número perfeito");
  }
}

function dropdown(operation) {
  $("#dropdown").text(`${operation}`);
}

function tabuada(number) {
  let str = "";
  let calculo = "";
  for (var i = 0; i <= 10; i++) {
    if (document.getElementById("dropdown").innerText == "+") {
      calculo = `${parseInt(number)} + ${parseInt(i)} = ${
        parseInt(number) + parseInt(i)
      }`;
    } else if (document.getElementById("dropdown").innerText == "-") {
      calculo = `${parseInt(number)} - ${parseInt(i)} = ${
        parseInt(number) - parseInt(i)
      }`;
    } else if (document.getElementById("dropdown").innerText == "x") {
      calculo = `${parseInt(number)} x ${parseInt(i)} = ${
        parseInt(number) * parseInt(i)
      }`;
    } else if (document.getElementById("dropdown").innerText == "÷") {
      calculo = `${parseInt(number)} ÷ ${parseInt(i)} = ${(
        parseInt(number) / parseInt(i)
      ).toFixed(2)}`;
    }
    str = str.concat(calculo + "\n");
  }
  if (str == number && str !== 0) {
    $("#tabuada_result").text(`${number} " é um número perfeito`);
  } else {
    $("#tabuada_result").text(`${str}`);
  }
}

let numbers = [];
$(document).ready(function () {
  $("#btn_submit").click(function () {
    numbers.push($("#typeNumber").val());
    numbers.sort((a, b) => a - b);
    $("#typeNumber").val("");
    $("#resultado").text("Dispostos em ordem: " + numbers);
  });
});

const downloadFile = () => {
  const link = document.createElement("a");
  myJson = "{" + "result" + " : " + numbers + "}";
  const content = myJson;
  const file = new Blob([content], { type: "application/json" });
  link.href = URL.createObjectURL(file);
  link.download = "resultado.txt";
  link.click();
  URL.revokeObjectURL(link.href);
};