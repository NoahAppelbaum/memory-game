"use strict";


/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple", "aquamarine", "yellow",
  "red", "blue", "green", "orange", "purple", "aquamarine", "yellow"
];

const CARDS = document.getElementsByClassName('gamepiece');

let CLICK_COUNTER = 0;


//start game on load:
// document.body.addEventListener('load', startGame);
//^^ ??? do I need this? Can I just call it?

startGame();


function startGame() {

  CLICK_COUNTER = 0;
  let colors = shuffle(COLORS);
  createCards(colors);

}





/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {

  for (let i = 0; i < CARDS.length; i++) {
    let card = CARDS[i];
    card.cardValue = colors[i];
    card.matched = false;

    //TEST
    card.innerText = card.cardValue;

    card.addEventListener('click', handleCardClick);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick() {
  if (!this.matched && !this.classList.contains("selected")) {
    this.classList.add("selected", "flipped"); //use flipCard method?

    // ***TK Temporary test: (better w/ flipCard method??)
    this.style.backgroundColor = this.cardValue;

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
    thisTurnPair.forEach(card => card.classList.remove("flipped")); //use unFlip method?
    //***See above re: better method? TK */
    thisTurnPair.forEach(card => card.style.backgroundColor = "transparent");
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

  alert(`Congratulations! You finished the game in ${CLICK_COUNTER / 2} turns!`);
}
