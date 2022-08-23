const palavrasValidas = ["ARROZ", "amora", "teste"];
const palavraDoDia = "ARROZ";
let linha = 1;
let entrada = [];

const ouvinteDeTeclas = (event) => {
  let char = event.key.toUpperCase();
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
  } else if (char == "ENTER" && entrada.length >= 5) {
    validarEntrada();
    entrada.splice(0, entrada.length);
    linha += 1;
    return;
  } else if (char == "BACKSPACE") {
    entrada.pop();
    console.log(entrada);
    apagarLetra();
    return;
  } else if (char == "ENTER") {
    return null;
  }

  if (entrada.length < 5) {
    entrada.push(char);
    console.log(entrada);
    exibeLetra(char);
  }
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

function validarEntrada() {
  let posicao = 0;

  for (letra of palavraDoDia) {
    if (letra == entrada[posicao]) {
      let el = document.getElementById(`l1c${posicao + 1}`);
      el.classList.add("fullcorrect");
    } else if (palavraDoDia.includes(entrada[posicao])) {
      let el = document.getElementById(`l1c${posicao + 1}`);
      el.classList.add("correct");
    } else {
      let el = document.getElementById(`l1c${posicao + 1}`);
      el.classList.add("incorrect");
    }

    posicao++;
  }

  let resultado =
    entrada[0] + entrada[1] + entrada[2] + entrada[3] + entrada[4];
  console.log("validar se " + resultado + " é igual " + palavraDoDia);

  // let i = 0;

  // for (let letra of resultado) {
  //   if (palavraDoDia[i] == letra) {
  //     letra.classList.add("fullcorrect");
  //     buttonNewClass(letra.textContent, "fullcorrect");
  //   } else if (palavraDoDia.includes(letra)) {
  //     letra.classList.add("correct");
  //     buttonNewClass(letra.textContent, "correct");
  //   } else {
  //     let elId = `l${linha}c${i}`;
  //     let el = document.getElementById(elId);
  //     el.classList.add("incorrect");
  //     buttonNewClass(letra.textContent, "incorrect");
  //   }
  //   i++;
  // }

  //   for (let i = 1; i < 6; i++) {
  //     //CERTO?
  //     if (resultado[i - 1] == palavraDoDia[i - 1]) {
  //       let elId = `l${linha}c${i}`;
  //       let el = document.getElementById(elId);
  //       el.classList.add("fullcorrect");
  //     }
  //     //MEICERTO
  //     else if (
  //       palavraDoDia.includes(resultado[i - 1]) &&
  //       resultado[i - 1] != palavraDoDia[i - 1]
  //     ) {
  //       let elId = `l${linha}c${i}`;
  //       let el = document.getElementById(elId);
  //       el.classList.add("correct");
  //     } else {
  //       let elId = `l${linha}c${i}`;
  //       let el = document.getElementById(elId);
  //       el.classList.add("incorrect");
  //     }
  //   }

  //verifica se ganhou
  if (resultado == palavraDoDia) {
    window.alert("GANHOUUUUU");
    linha = 13;
  }

  //verifica se o usuário acabou com as tentativas
  if (linha == 6) {
    window.alert(
      `não sabe, não sabe, vai ter que aprender. a palavra era: ${palavraDoDia}`
    );
  }
}

document.body.addEventListener("keydown", ouvinteDeTeclas);
