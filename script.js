'use strict'
 
//selecting elements 
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.remove('hidden');
 
const scores = [0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


//Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
        //generating a random dice roll
        const dice = Math.trunc(Math.random()*6)+1;
    
        //display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
    
        //check for rolled 1
        if(dice !== 1){
            //switch to next player
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function(){
    if(playing){
        //add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
    
        //check if player's score is >= 100
        if(scores[activePlayer] >= 100){
            // finish the game 
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }else{
            //switch to next player
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click',function(){
    currentScore = 0;
    playing = true;
    diceEl.classList.add('hidden');
    for(let i=0; i<scores.length;i++){
        scores[i] = 0;
        document.getElementById(`current--${i}`).textContent = scores[i];
        document.getElementById(`score--${i}`).textContent = scores[i];
    }    
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
})