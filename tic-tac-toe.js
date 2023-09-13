import { players, board, init, winningPositions } from "./settings.js";

// initializing starting "board"
init();

// DOM variables
const boardEl = document.querySelector(".board");
const resetEl = document.querySelectorAll(".btn-reset");
const itemsEl = document.querySelectorAll(".item");
const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
const modalHeading = document.querySelector(".modal-heading");

// game variables
let player1 = players[0];
let player2 = players[1];
let player1Moves = [];
let player2Moves = [];
let winner;

// function for swaping turns and styles
const playerTurn = function () {
  if (player1.turn) {
    player1.turn = false;
    player2.turn = true;
    document.querySelector(".player-1").style.opacity = 0.3;
    document.querySelector(".player-2").style.opacity = 1;
  } else {
    player1.turn = true;
    player2.turn = false;
    document.querySelector(".player-1").style.opacity = 1;
    document.querySelector(".player-2").style.opacity = 0.3;
  }
};

// function that resets everything to the initial state
const gameReset = function () {
  itemsEl.forEach((item) => {
    item.classList.remove("active");
    item.textContent = "";
  });
  init();
  player1.turn = true;
  player2.turn = false;
  player1Moves = [];
  player2Moves = [];
  winner = "";
  document.querySelector(".player-1").style.opacity = 1;
  document.querySelector(".player-2").style.opacity = 1;
};

// function that adds "X" or "O" based on which player clicked the specific tile, it also locks the tile by setting the isClicked = true, and pushing the index of the clicked tile to the moves array. Switching turns at the end.
const gameMove = function (item) {
  if (item.isClicked) return;

  if (player1.turn) {
    const currentDiv = document.querySelector(`.board__item-${item.id}`);
    currentDiv.classList.add("active");
    currentDiv.textContent = "X";

    item.isClicked = true;
    player1Moves.push(board.indexOf(item));
  } else {
    const currentDiv = document.querySelector(`.board__item-${item.id}`);
    currentDiv.classList.add("active");
    currentDiv.textContent = "O";

    item.isClicked = true;
    player2Moves.push(board.indexOf(item));
  }
  playerTurn();
};

// function that checks for a winner by finding a match between winningPostitions array and playerMoves array
const checkWinner = function () {
  winningPositions.forEach((arr) => {
    if (arr.every((element) => player1Moves.includes(element))) {
      winner = "Player 1";
    } else if (arr.every((element) => player2Moves.includes(element))) {
      winner = "Player 2";
    }
  });
};

// if all are clicked and there is no winner, it's a draw
const checkDraw = function () {
  const draw = board.filter((item) => {
    return item.isClicked === true;
  });

  if (draw.length === 9 && !winner) {
    modalHeading.textContent = "It's a draw!";
    modal.show();
  }
};

// DOM - clicking on the tiles will run the functions = playing the game. It also checks for winner
boardEl.addEventListener("click", function (e) {
  if (e.target.tagName === "DIV") {
    board.forEach((item) => {
      if (e.target.classList[0] === `board__item-${item.id}`) {
        gameMove(item);
        checkWinner();
        checkDraw();
      }
    });
    if (winner) {
      modalHeading.textContent = `The winner is: ${winner}`;
      modal.show();
    }
  }
});

// buttons that resets everything
resetEl.forEach((btn) => {
  btn.addEventListener("click", function () {
    gameReset();
  });
});
