// Show hide Layout
selectOption = (screen) => {
  $("#default_message").hide();
  $("#numbers").hide();
  $("#cep").hide();
  $("#perfect").hide();
  $("#tabuada").hide();
  $("#" + screen).toggle();
};

// Brazilian CEP consult
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

// Verification for perfect number
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

// select operator for arithmetic table
function dropdown(operation) {
  $("#dropdown").text(`${operation}`);
}

// Arithmetic table calc
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

// IMC calc (BMI - body mass index)

function imcResult(imc){
if (imc > 40) {
  return "Obesidade grave"
} else if (imc >= 30) {
  return "Obesidade"
}else if (imc >= 25) {
  return "Sobrepeso"
}else if (imc >= 18) {
  return "normal"
}else if(imc < 18){
  return "Abaixo do peso"
}
}

$(document).ready(function () {
  $("#btn_submit").click(function () {
    $("#typeNumber").val("");
    var altura = $("#typeNumber_altura").val()
    var peso = $("#typeNumber_peso").val()
    var imc = (peso / (altura * altura)).toFixed(2)
    $("#resultado").text(imc + " " + imcResult(imc));
  });
});

const downloadFile = () => {
  const link = document.createElement("a");
  myimc = $("#resultado").text();
  const content = myimc;
  const file = new Blob([content], { type: 'text/plain' });
  link.href = URL.createObjectURL(file);
  link.download = "resultado.txt";
  link.click();
  URL.revokeObjectURL(link.href);
};