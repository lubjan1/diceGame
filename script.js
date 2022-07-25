'use strict';
///////////Selecting Elements/////
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreEL0 = document.querySelector('#score--0');
const scoreEL1 = document.getElementById('score--1');
const currentEL0 = document.getElementById('current--0');
const currentEL1 = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

////Startin condition/////
const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let player = true;

const init = function () {
  let scores = [0, 0];
  let activePlayer = 0;
  let currentScore = 0;
  let player = true;

  scoreEL0.textContent = 0;
  scoreEL1.textContent = 0;
  currentEL0.textContent = 0;
  currentEL1.textContent = 0;

  diceEL.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 1generate a random number for the dice
btnRoll.addEventListener('click', function () {
  if (player) {
    let dice = Math.trunc(Math.random() * 6 + 1);

    //2 display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    //3 checking for rolling 1, is true or not,
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //swich player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (player) {
    //1 add currnet score to active player score

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2 check if players is >= 100

    if (scores[activePlayer] >= 100) {
      //finish ther game
      player = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3 switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
