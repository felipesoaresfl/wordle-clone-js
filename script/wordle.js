const palavrasValidas = [
  "ARROZ",
  "ERRAR",
  "VERDE",
  "PENTA",
  "BRASA",
  "AMORA",
  "PORCO",
  "VASCO",
  "CALVO",
  "TROPA",
  "MISSA",
  "FESTA",
  "OSSOS",
];

const palavraDoDia = "FESTA";

let fimDeJogo = false;
let linha = 1;
let entrada = [];
let resultado = "";

const trataTecla = (tecla) => {
  if (fimDeJogo) {
    return;
  }

  let char = tecla.toUpperCase();
  let alfabeto = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "ENTER",
    "BACKSPACE",
  ];

  if (!alfabeto.includes(char)) {
    console.log("tecla inválida", char);
    return null;
  }

  if (char == "ENTER") {
    if (entrada.length == 5) {
      resultado = gerarPalavra();
      validarEntrada();
    }
    return;
  }

  if (char == "BACKSPACE") {
    entrada.pop();
    console.log(entrada);
    apagarLetra();
    document.getElementById("invalidar").innerHTML = "";
    return;
  }

  if (entrada.length < 5 && char != "ENTER") {
    entrada.push(char);
    console.log(entrada);
    exibeLetra(char);
  }
};

const ouvinteDeTeclas = (evento) => {
  trataTecla(evento.key);
};

function apagarLetra() {
  let elId = `l${linha}c${entrada.length + 1}`;

  const el = document.getElementById(elId);
  el.textContent = "";
}

function exibeLetra(char) {
  let elId = `l${linha}c${entrada.length}`;

  const el = document.getElementById(elId);
  el.textContent = char;
}

function gerarPalavra() {
  console.log(entrada[0] + entrada[1] + entrada[2] + entrada[3] + entrada[4]);
  return entrada[0] + entrada[1] + entrada[2] + entrada[3] + entrada[4];
  // console.log("validar se " + resultado + " é igual " + palavraDoDia);
}

function checaResultado(resultado) {
  //verifica se o usuário acabou com as tentativas
  if (linha == 6) {
    fimDeJogo = true;
    window.alert(
      `não sabe, não sabe, vai ter que aprender. a palavra era: ${palavraDoDia}`
    );
    return;
  }
  if (resultado == palavraDoDia) {
    //soltaRojao()
    fimDeJogo = true;
    window.alert("GANHOUUUUU");
  } else {
    linha += 1;
    entrada = [];
  }
  return;
}

const pintarTeclas = (letraEntrada, estado) => {
  let teclas = document.querySelectorAll(".tecla");
  for (tecla of teclas) {
    if (letraEntrada == tecla.textContent) {
      if (estado === "correto") {
        tecla.classList.add("correct");
      } else if (estado === "contem") {
        tecla.classList.add("contain");
      } else if (estado === "incorreto") {
        tecla.classList.add("incorrect");
      }
    }
  }
};

function validarEntrada() {
  //invalida a entrada
  if (!palavrasValidas.includes(resultado)) {
    document.getElementById("invalidar").innerHTML = "Palavra inválida";
    return;
  }

  let palavraDoDiaTeste = palavraDoDia.split("");
  let estado;

  for (let letra in palavraDoDia) {
    let posicao = document.getElementById(`l${linha}c${parseInt(letra) + 1}`);
    if (palavraDoDia[letra] == entrada[letra]) {
      posicao.classList.add("correct");
      estado = "correto";
      pintarTeclas(entrada[letra], estado);
      let el = palavraDoDia[letra];
      palavraDoDiaTeste.splice(palavraDoDiaTeste.indexOf(el), 1);
    }
  }
  for (let letra in palavraDoDia) {
    let posicao = document.getElementById(`l${linha}c${parseInt(letra) + 1}`);
    if (palavraDoDiaTeste.includes(entrada[letra])) {
      posicao.classList.add("contain");
      estado = "contem";
      pintarTeclas(entrada[letra], estado);
      palavraDoDiaTeste.splice(parseInt(letra) + 1, 1);
    } else {
      posicao.classList.add("incorrect");
      estado = "incorreto";
      pintarTeclas(entrada[letra], estado);
    }
  }
  checaResultado(resultado);
}

document.body.addEventListener("keydown", ouvinteDeTeclas);

document.querySelectorAll(".tecla").forEach((el) => {
  el.addEventListener("click", function (el) {
    let letra = el.srcElement.textContent;
    if (letra == "") {
      letra = "BACKSPACE";
    }
    trataTecla(letra);
  });
});
