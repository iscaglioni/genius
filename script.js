let main = document.createElement("main");
document.body.appendChild(main);

let titulo = document.createElement("h1");
main.appendChild(titulo);
titulo.innerHTML = `GENIUS <sup> ® </sup>`;
//"GENIUS®" <sup> 2 </sup>;
let container = document.createElement("div");
container.setAttribute("id", "container");
main.appendChild(container);

const cores = ["verde", "vermelho", "amarela", "azul"];
const arrayFrases = [
  "Bem-vindo!",
  "Observe a sequência",
  "Agora é a sua vez, Repita a sequência!",
  "Acertou, Observe a próxima sequência!",
];

let arrayJogo = [];
let arrayResposta = [];
let record = 0;

cores.forEach((index) => {
  let botao = document.createElement("div");
  botao.setAttribute("class", "caixa " + index);
  container.appendChild(botao);
  botao.addEventListener("click", RegistrarClickCadaCor);
});

let caixaMensagem = document.createElement("div");
caixaMensagem.setAttribute("class", "caixa-mensagem");
container.appendChild(caixaMensagem);

const modal = document.createElement("section");
modal.classList.add("modal");
caixaMensagem.appendChild(modal);
modal.innerText = `${arrayFrases[0]}`;

let BotaoIniciar = document.createElement("button");
BotaoIniciar.innerText = "Começar";
caixaMensagem.appendChild(BotaoIniciar);
BotaoIniciar.addEventListener("click", comecaJogo);

function RegistrarClickCadaCor(event) {
  let corClicada = event.target.className.slice(6);
  let corClicadaEfeito = [corClicada];
  piscaCoresNaTela(corClicadaEfeito);
  resposta(corClicada);
}

function resposta(corClicada) {
  arrayResposta.push(corClicada);
  if (arrayResposta.length === arrayJogo.length) {
    if (arrayResposta.every((element, index) => element === arrayJogo[index])) {
      setTimeout(() => {
        continuaJogo();
      }, 200);
    } else {
      let pontuacao = arrayJogo.length - 1;
      if (pontuacao > record) {
        record = pontuacao;
      }
      terminaJogo(pontuacao, record);
    }
  }
}

function continuaJogo() {
  arrayResposta = [];
  arrayJogo.push(GeraCorAleatoria());
  modal.innerText = `${arrayFrases[3]}`;

  setTimeout(() => {
    piscaCoresNaTela(arrayJogo);
  }, 1000);
}

function terminaJogo(pontuacao, record) {
  if (pontuacao < 0) {
    pontuacao = 0;
  }

  modal.innerHTML = `
    <h3>Errou!!!!</h3>
    <p>Sua Pontuação foi de: ${pontuacao}</p>
    <p>O Record atual é de: ${record}</p>
    <button id = 'botao-reiniciar' class='botao-reiniciar'>Jogar novamente</button>
  `;
  modal.setAttribute("id", "_errado");
  botaoReiniciarJogo = document.getElementById("botao-reiniciar");
  botaoReiniciarJogo.addEventListener("click", comecaJogo);
  arrayJogo = [];
  arrayResposta = [];
}

function GeraCorAleatoria() {
  let casaCor = Math.floor(Math.random() * 4);
  return cores[casaCor];
}

function comecaJogo() {
  caixaMensagem.innerHTML = "";
  caixaMensagem.appendChild(modal);
  if (document.getElementById("botao-reiniciar")) {
    let botaoReinicia = document.getElementById("botao-reiniciar");
    botaoReinicia.classList.remove("botao-reiniciar");
  }
  modal.removeAttribute("id", "_errado");

  arrayJogo.push(GeraCorAleatoria());
  modal.innerText = `${arrayFrases[1]}`;

  setTimeout(() => {
    piscaCoresNaTela(arrayJogo);
  }, 1000);
}

function piscaCoresNaTela(arrayJogo) {
  arrayJogo.forEach((element, index) => adicionaCorNaTela(element, index));
}

function adicionaCorNaTela(element, index) {
  setTimeout(() => {
    let botaoAleatorio = document.querySelector(`.${element}`);
    botaoAleatorio.setAttribute("id", `${element}`);
    RemoveCorNaTela(element);
    if (index === arrayJogo.length - 1) {
      modal.innerText = `${arrayFrases[2]}`;
    }
  }, index * 900);
}

function RemoveCorNaTela(element) {
  setTimeout(() => {
    let botaoAleatorio = document.querySelector(`.${element}`);
    botaoAleatorio.removeAttribute("id");
  }, 250);
}

//<--------------------------------------------------------------------

/* const removeModal = document.querySelector(".removerModal");

const showModal = () => {
  modal.classList.remove("hidden");
};

const hiddenModal = () => {
  modal.classList.add("hidden");
};

removeModal.addEventListener("click", hiddenModal);
 */
