const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
  if(document.querySelectorAll('.flip').length == 12){
	 setTimeout(() => {
    		endGame('Great Job.\n');
  		}, 500);
  	}

}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function endGame(msg){
	document.querySelector('.timer').remove();
	cards.forEach(card => card.removeEventListener('click', flipCard));
	alert(msg+'Hit refresh to Play again.');
}



function startTimer() {
  var duration = 60*2,
    display = document.querySelector('#time');
   
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
             endGame('Time Up. Game Over.\n');
        }
    }, 1000);

}

window.onload=function(){
cards.forEach(card => card.addEventListener('click', flipCard));
alert("The objective of the game is to match pairs.\n1. Click on a card to flip it over.\n2. If you select two cards which do not match up to make a pair, they will flip back over again.\n3. Try to remember where the different characters are so that you can make a match.\n4. The game finishes when you have matched all the pairs.\n\nLet us Start the Battle!");
startTimer() ;
}
