"use strict";


/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const PRINCESS_ARRAY = [
  "anastasia", "ariel", "azula", "buttercup", "ciri", "consuela", "daisy",
  "entrapta", "hathaway", "jasmine", "leia", "nausicaa", "paperbag", "peach",
  "san", "serenity", "shuri", "xena"
];

const CARDS = document.getElementsByClassName('gamepiece');

let CLICK_COUNTER = 0;


//start game on load:
// document.body.addEventListener('load', startGame);
//^^ ??? do I need this? Can I just call it?

startGame();


function startGame() {

  CLICK_COUNTER = 0;
  let princesses = pickPrincesses(PRINCESS_ARRAY);
  createCards(princesses);

}


function pickPrincesses(items) {
  let princessSelection = shuffle(items).slice(0, 7);
  let princessPairs = princessSelection.concat(princessSelection);
  return shuffle(princessPairs);
}


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // "This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important."

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}


function createCards(princesses) {

  for (let i = 0; i < CARDS.length; i++) {
    let card = CARDS[i];
    card.cardValue = princesses[i];
    //assign [value] to cardface
    card.children[1].style.backgroundImage = `url(images/faces/${card.cardValue}.png)`;
    card.matched = false;


    card.addEventListener('click', handleCardClick);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.classList.add("flipped");
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.classList.remove("flipped");

}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick() {
  if (!this.matched && !this.classList.contains("selected")) {
    this.classList.add("selected");
    flipCard(this);

    CLICK_COUNTER++;
    // check turn end via click counter and call
    if (CLICK_COUNTER % 2 === 0) {
      endTurn();
    }
  }
}

//deselect cards and flip unmatched
function endTurn() {
  //check for match
  let thisTurnPair = document.querySelectorAll(".selected");
  if (thisTurnPair[0].cardValue === thisTurnPair[1].cardValue) {
    thisTurnPair.forEach(card => card.matched = true);
  } else {
    //flip back after 1 sec
    setTimeout(function () {
      for (let unmatchedCard of thisTurnPair) {
        unFlipCard(unmatchedCard);
      }
    }, 1000);
  };

  //remove .selected
  thisTurnPair.forEach(card => card.classList.remove("selected"));

  //check endgame!
  if (Array.from(CARDS).every(card => card.matched)) {
    endGame();
  }
}

function endGame() {
  //TK do something fun?

  //setTimeout to allow last card to flip first
  setTimeout(function () {
    alert(`Congratulations! You finished the game in ${CLICK_COUNTER / 2} turns!`);
    RESET_BUTTON.classList.add("selected");
  }, 1000);
}


//reset button:
const RESET_BUTTON = document.querySelector('#reset-button');

RESET_BUTTON.addEventListener("click", function () {
  if (confirm("Do you wish to restart the game?")) {

    RESET_BUTTON.classList.remove("selected");

    //flip face-up cards
    for (let card of document.querySelectorAll(".flipped")) {
      unFlipCard(card);
    }

    //Ope, don't show us those cards before flipping them!! Pesky timeout'd animations.
    setTimeout(startGame, 1000);
  }
});
