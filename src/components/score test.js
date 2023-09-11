let cards = [
  { rank: "A", suit: "H" },
  { rank: "K", suit: "H" },
  { rank: "Q", suit: "H" },
  { rank: "J", suit: "H" },
  { rank: "10", suit: "H" },
  { rank: "9", suit: "H" },
  { rank: "8", suit: "H" },
];

// console.log(evaluateBestHand(cards));
// export const SAMPLE = evaluateBestHand(cards);

export function evaluateBestHand(cards) {
  for (let card in cards) {
    if (card.rank == "A") {
      card.rank = 14;
    }
    if (card.rank == "K") {
      card.rank = 13;
    }
    if (card.rank == "Q") {
      card.rank = 12;
    }
    if (card.rank == "J") {
      card.rank = 11;
    }
  }
  // Create an array of all possible 5-card combinations
  const combinations = [];
  for (let i = 0; i < cards.length - 4; i++) {
    for (let j = i + 1; j < cards.length - 3; j++) {
      for (let k = j + 1; k < cards.length - 2; k++) {
        for (let l = k + 1; l < cards.length - 1; l++) {
          for (let m = l + 1; m < cards.length; m++) {
            combinations.push([
              cards[i],
              cards[j],
              cards[k],
              cards[l],
              cards[m],
            ]);
          }
        }
      }
    }
  }

  // Determine the rank of each 5-card combination
  const ranks = [];
  for (const combination of combinations) {
    // Determine the rank of the current hand
    let combinationRank = 10; // high card

    // Check if the hand is a royal flush
    if (isRoyalFlush(combination)) {
      combinationRank = 1;
      console.log("royal flush");
    }
    // Check if the hand is a straight flush
    else if (isStraightFlush(combination)) {
      combinationRank = 2;
      console.log("straight flush");
    }
    // Check if the hand is four of a kind
    else if (isFourOfAKind(combination)) {
      combinationRank = 3;
      console.log("4 of a kind");
    }
    // Check if the hand is a full house
    else if (isFullHouse(combination)) {
      combinationRank = 4;
      console.log("full house");
    }
    // Check if the hand is a flush
    else if (isFlush(combination)) {
      combinationRank = 5;
      console.log("flush");
    }
    // Check if the hand is a straight
    else if (isStraight(combination)) {
      combinationRank = 6;
      console.log("straight");
    }
    // Check if the hand is three of a kind
    else if (isThreeOfAKind(combination)) {
      combinationRank = 7;
      console.log("3 of a kind");
    }
    // Check if the hand is two pair
    else if (isTwoPair(combination)) {
      combinationRank = 8;
      console.log("2 pair");
    }
    // Check if the hand is one pair
    else if (isOnePair(combination)) {
      combinationRank = 9;
      console.log("pair");
    }

    // Add the rank to the list
    ranks.push({ hand: combination, rank: combinationRank });
  }

  // Sort the ranks in descending order
  ranks.sort((a, b) => b.rank - a.rank);

  console.log(ranks[0].rank);
  // The best hand will be the first hand in the sorted list
  return ranks[0].rank;
}

function isRoyalFlush(hand) {
  // Check if the hand is a straight flush
  if (!isStraightFlush(hand)) {
    return false;
  }
  console.log(getHighCard(hand));
  // Check if the highest card is an Ace
  if (getHighCard(hand) === "A") {
    return true; // Ace has rank 14
  }
}

function isStraightFlush(hand) {
  // Check if the hand is a straight
  if (!isStraight(hand)) {
    return false;
  }

  // Check if the hand is a flush
  return isFlush(hand);
}

function isFourOfAKind(hand) {
  // Create a map of counts for each rank
  const counts = new Map();
  for (const card of hand) {
    if (counts.has(card.rank)) {
      counts.set(card.rank, counts.get(card.rank) + 1);
    } else {
      counts.set(card.rank, 1);
    }
  }

  // Check if any rank has a count of 4
  for (const count of counts.values()) {
    if (count === 4) {
      return true;
    }
  }

  // No rank has a count of 4
  return false;
}

// Check if the hand is a full house
function isFullHouse(hand) {
  // Create a map of counts for each rank
  const counts = new Map();
  for (const card of hand) {
    if (counts.has(card.rank)) {
      counts.set(card.rank, counts.get(card.rank) + 1);
    } else {
      counts.set(card.rank, 1);
    }
  }

  // Check if there is one rank with a count of 3 and another rank with a count of 2
  let hasThreeOfAKind = false;
  let hasTwoOfAKind = false;
  for (const count of counts.values()) {
    if (count === 3) {
      hasThreeOfAKind = true;
    } else if (count === 2) {
      hasTwoOfAKind = true;
    }
  }
  return hasThreeOfAKind && hasTwoOfAKind;
}

// Check if the hand is a flush
function isFlush(hand) {
  // Check if all the cards have the same suit
  const firstSuit = hand[0].suit;
  for (const card of hand) {
    if (card.suit !== firstSuit) {
      return false;
    }
  }

  // All the cards have the same suit
  return true;
}

//check if the hand is a strraight
function isStraight(hand) {
  // Sort the cards in ascending order by rank
  hand.sort((a, b) => a.rank - b.rank);

  // Check if the ranks of the cards are sequential
  for (let i = 1; i < hand.length; i++) {
    if (hand[i].rank !== hand[i - 1].rank + 1) {
      return false;
    }
  }

  // The ranks of the cards are sequential
  return true;
}

// check if the hand is  three of a kind
function isThreeOfAKind(hand) {
  // Create a map of counts for each rank
  const counts = new Map();
  for (const card of hand) {
    if (counts.has(card.rank)) {
      counts.set(card.rank, counts.get(card.rank) + 1);
    } else {
      counts.set(card.rank, 1);
    }
  }

  // Check if any rank has a count of 3
  for (const count of counts.values()) {
    if (count === 3) {
      return true;
    }
  }

  // No rank has a count of 3
  return false;
}

// check if the hand is two ppair
function isTwoPair(hand) {
  // Create a map of counts for each rank
  const counts = new Map();
  for (const card of hand) {
    if (counts.has(card.rank)) {
      counts.set(card.rank, counts.get(card.rank) + 1);
    } else {
      counts.set(card.rank, 1);
    }
  }

  // Check if there are at least two ranks with a count of 2
  let numPairs = 0;
  for (const count of counts.values()) {
    if (count === 2) {
      numPairs++;
    }
  }
  return numPairs >= 2;
}

// check if the hand has a pair
function isOnePair(hand) {
  // Create a map of counts for each rank
  const counts = new Map();
  for (const card of hand) {
    if (counts.has(card.rank)) {
      counts.set(card.rank, counts.get(card.rank) + 1);
    } else {
      counts.set(card.rank, 1);
    }
  }

  // Check if any rank has a count of 2
  for (const count of counts.values()) {
    if (count === 2) {
      return true;
    }
  }

  // No rank has a count of 2
  return false;
}

// check high card
function getHighCard(hand) {
  // Sort the cards in descending order by rank
  hand.sort((a, b) => b.rank - a.rank);
  console.log("high card is" + hand[0].rank);
  // Return the rank of the first card
  return hand[0].rank;
}
