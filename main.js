const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";

// Posições possíveis para vitória
let positions = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7],
];

function init(){
  selected = [];
  // Atualiza o jogador atual
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

  // Ao clicar, chama a função de novo movimento
  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove)
  });
}

init();

// Atribui ao lugar clicado, o X ou O dependendo do jogador atual
function newMove(e){
  const index = e.target.getAttribute("data-i");
  e.target.innerHTML = player;
  e.target.removeEventListener("click", newMove);
  selected[index] = player;

  setTimeout(() => {
    check();
  },[100]);

  // Intercala entre jogadores após uma jogada
  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

// Chega as posiç~eos atuais para ver se alguém ganhou ou se deu empate
function check(){
  let playerLastMove = player === "X" ? "O" : "X";

  const items = selected
    .map((item, i) => [item,i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

    for(pos of positions){
      if(pos.every((item) => items.includes(item))){
        alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
        init();
        return;
      }
    }

    if(selected.filter((item) => item).length === 9){
      alert("DEU EMPATE!")
      init();
      return;
    }
}