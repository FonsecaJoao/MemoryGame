// Create a list that holds all of your cards
let card  = document.getElementsByClassName('card');
let cards = [...card];

// variables used in openedCard function
let openedCards = [];

// var used in enable function
let matchedCard = document.getElementsByClassName('match');

// Display the cards on the page
const deck = document.querySelector('.deck');

// variables used in startTimer function
let second = 0, minute = 0, interval;
const timer = document.querySelector('.timer');

// variables used in moveCounter
let moves = 0;
let counter = document.querySelector('.moves');

// variable for restartGame event clicker
const restartBtn = document.querySelectorAll('.restartBtn');


// @description startGame function
function startGame(){
//   - shuffle the list of cards using the provided "shuffle" method below
  var shuffleCards = shuffle(cards);
// - loop through each card and create its HTML
  for (var i = 0; i < shuffleCards.length; i++){
    [].forEach.call(shuffleCards, function(item){
//   - add each card's HTML to the page
      deck.appendChild(item);
    });
    cards[i].classList.remove('show', 'open', 'match', 'disabled', 'flash');
  }


}

document.body.onload = startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// @description event listener on all cards
// Set up the event listener for a card. If a card is clicked:
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', displayCard);
  cards[i].addEventListener('click', openedCard);
  cards[i].addEventListener('click', finishGame);
}

// @description displayCard function - on click toggle classes
function displayCard() {
  this.classList.toggle('open');
  this.classList.toggle('show');
  this.classList.toggle('disabled');
}

// @description openedCard function
// - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
function openedCard() {
  openedCards.push(this);
  let length = openedCards.length;
  moveCounter();
  if (length === 2) {
    if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
      matched();
    } else {
        unmatched();
    }
  }
}

// @description matched function
//   - if the list already has another card, check to see if the two cards match
function matched() {
//     + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  openedCards[0].classList.add('match', 'disabled', 'flash');
  openedCards[1].classList.add('match', 'disabled', 'flash');
  openedCards[0].classList.remove('show', 'open');
  openedCards[1].classList.remove('show', 'open');
  openedCards = [];
}

// @description unmatched function
//     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
function unmatched() {
  openedCards[0].classList.add('shake');
  openedCards[1].classList.add('shake');
  disable();
  setTimeout(function(){
    openedCards[0].classList.remove('show', 'open', 'shake');
    openedCards[1].classList.remove('show', 'open', 'shake');
    enable();
    openedCards = [];
  },500);
}

// @description disable cards temporarily
function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add('disabled');
  });
}

// @description disable matched cards and enable cards
function enable() {
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove('disabled');
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add('disabled');
    }
  });
}

// @description game timer
function startTimer() {
  interval = setInterval(function(){
    timer.innerHTML = minute + 'mins ' + second + 'secs';
    second++;
    if (second === 60) {
      minute++;
      second = 0;
    }
  },1000);
}

// @description move counter
//     + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
function moveCounter() {
  const three = document.getElementById('three');
  const two = document.getElementById('two');
  // increment moves and change innerHTML
  moves++;
  counter.innerHTML = moves + ' Moves';
  // startTimer on  first click
  if (moves === 1) {
    counter.innerHTML = moves + ' Move';
    startTimer();
  }
  else if (moves === 26) {
    three.remove();
  }
  else if (moves === 40) {
    two.remove();
  }
}

// @description modal function
//     + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
function finishGame() {
  const getStar = document.querySelectorAll('i.fa-star');
  const lenStar = getStar.length;
  const modalBody = document.querySelector('p.modalBody');
  const finalTime = timer.innerHTML;
  const three = document.getElementById('three');
  const two = document.getElementById('two');
  let finalPhrase = 'You made ' + moves + ' Moves' + ' in ' + finalTime + '. <br>\ ' + 'Rating: ' + lenStar + ' Stars';

  if (matchedCard.length === 16) {
    $('#myModal').modal('show');
      // if user gets 1 star adds the missing 2 stars on restart and add message to modal
    if (lenStar === 1) {
      finalPhrase = 'You made ' + moves + ' Moves' + ' in ' + finalTime + '. <br>\ ' + 'Rating: ' + lenStar + ' Star';
      modalBody.innerHTML = finalPhrase;
      $('<li><i class="fa fa-star" id="two"></i></li>').insertAfter($('i.fa-star'));
      $('<li><i class="fa fa-star" id="three"></i></li>').insertAfter($('#two'));
    }
      // if user gets 2 star adds the missing star on restart and add message to modal
    if (lenStar === 2) {
      modalBody.innerHTML = finalPhrase;
      $('<li><i class="fa fa-star" id="three"></i></li>').insertAfter($('#two'));
    } else {
      modalBody.innerHTML = finalPhrase; //adds message to modal
    }

  restartGame();
  }
}

// @description reset function
function restartGame() {

  const getStar = document.querySelectorAll('i.fa-star');
  const lenStar = getStar.length;
  // if user gets 1 star adds the missing 2 stars on restart
  if (lenStar === 1) {
    $('<li><i class="fa fa-star" id="two"></i></li>').insertAfter($('i.fa-star'));
    $('<li><i class="fa fa-star" id="three"></i></li>').insertAfter($('#two'));
  }
    // if user gets 2 star adds the missing star on restart
  if (lenStar === 2) {
    $('<li><i class="fa fa-star" id="three"></i></li>').insertAfter($('#two'));
  }

  // reset timer
  clearInterval(interval);
  second = 0;
  minute = 0;
  timer.innerHTML = minute + 'mins ' + second + 'secs';

  // reset moves
  moves = 0;
  counter.innerHTML = "";

  // empty openedCards to avoid bug issues
  openedCards = [];

  startGame();
}

// @description add event listener to each reset button
for (let i = 0; i < restartBtn.length; i++) {
  restartBtn[i].addEventListener('click', restartGame);
}
