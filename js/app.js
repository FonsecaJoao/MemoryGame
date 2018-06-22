// Create a list that holds all of your cards
let card  = document.getElementsByClassName("card");
let cards = [...card];
let openedCards = [];
let matchedCard = document.getElementsByClassName("match");

// Display the cards on the page
const deck = document.querySelector(".deck");

document.body.onload = startGame();

function startGame(){
//   - shuffle the list of cards using the provided "shuffle" method below
  var shuffleCards = shuffle(cards);
// - loop through each card and create its HTML
  for (var i = 0; i < shuffleCards.length; i++){
    [].forEach.call(shuffleCards, function(item){
//   - add each card's HTML to the page
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
}

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

// Set up the event listener for a card. If a card is clicked:
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', displayCard);
  cards[i].addEventListener('click', openedCard);
}

function displayCard() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
}

// - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
function openedCard() {
  openedCards.push(this);
  let length = openedCards.length;
  if (length === 2) {
    if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
      matched();
    } else {
        unmatched();
    }
  }
}

//   - if the list already has another card, check to see if the two cards match
function matched() {
//     + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");
  openedCards = [];
}
//     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
function unmatched() {
  disable();
  setTimeout(function(){
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    enable();
    openedCards = [];
  },400);
}

function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add("disabled");
  });
}

function enable() {
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove("disabled");
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

//     + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
//     + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
