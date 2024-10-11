"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let correntScore = 0;
let turn = 0;
const scores = [0, 0];

const start = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
};

const swith = () => {
  document.getElementById(`current--${turn}`).textContent = 0;
  turn = turn === 0 ? 1 : 0;
  correntScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove("hidden");

  if (dice !== 1) {
    correntScore += dice;
    document.getElementById(`current--${turn}`).textContent = correntScore;
  } else {
    swith();
  }
});

btnHold.addEventListener("click", () => {
  scores[turn] += correntScore;
  document.getElementById(`score--${turn}`).textContent = scores[turn];
  if (scores[turn] >= 100) {
    document.querySelector(`.player--${turn}`).classList.add("player--winner");
    btnHold.disabled = true;
    btnRoll.disabled = true;
    diceEl.classList.add("hidden");
  } else swith();
});

btnNew.addEventListener("click", () => {
  document.querySelector(`.player--${turn}`).classList.remove("player--winner");
  start();
  swith();
  scores[0] = 0;
  scores[1] = 0;
  btnHold.disabled = false;
  btnRoll.disabled = false;
});

start();
