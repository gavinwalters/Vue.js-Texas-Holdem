<script>
import { objectToString, parseStringStyle } from "@vue/shared";
import Card from "./components/cards.vue";
import * as test from "./components/score test.js";
export default {
  components: {
    Card,
  },
  data() {
    return {
      ranks: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
      suits: ["♥", "♦", "♣", "♠"],
      cards: [],
      p1: [],
      p2: [],
      flop: [],
      turn: [],
      river: [],
      suitColour: {
        "♥": "red",
        "♦": "red",
        "♣": "black",
        "♠": "black",
      },
      player_total: 0,
      dealer_total: 0,
      bust: false,
      // isDisabled: { deal: false },
      isDisabled: {
        deal: true,
        flop: false,
        turn: false,
        river: false,
        showdown: false,
      },
      mouseLeaveBool: true,
    };
  },
  created() {
    this.displayInitialDeck();
  },
  methods: {
    displayInitialDeck() {
      let id = 1;
      for (let s = 0; s < 4; s++) {
        for (let r = 0; r < 13; r++) {
          let card = {
            id: id,
            rank: this.ranks[r],
            suit: this.suits[s],
          };
          this.cards.push(card);
          id++;
        }
      }
    },
    shuffleDeck() {
      // alert("Shuffle");
      for (let i = this.cards.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * i);
        let temp = this.cards[i];
        this.cards[i] = this.cards[randomIndex];
        this.cards[randomIndex] = temp;
      }
    },
    deal() {
      this.p1.push(this.cards.shift());
      this.p1.push(this.cards.shift());
      this.p2.push(this.cards.shift());
      this.p2.push(this.cards.shift());
      this.disableButton("deal");
      this.isDisabled.flop = true;
    },
    dealFlop() {
      this.flop.push(this.cards.shift());
      this.flop.push(this.cards.shift());
      this.flop.push(this.cards.shift());
      this.disableButton("flop");
      this.isDisabled.turn = true;
    },
    dealTurn() {
      this.turn.push(this.cards.shift());
      this.disableButton("turn");
      this.isDisabled.river = true;
    },
    dealRiver() {
      this.river.push(this.cards.shift());
      this.disableButton("river");
      this.isDisabled.showdown = true;
    },
    showdown() {
      this.disableButton("showdown");

      this.mouseLeaveBool = false;
      this.$refs.second[0].$el.classList.replace(
        "flipped",
        this.suitColour[this.p1[0].suit]
      );
      this.$refs.second[1].$el.classList.replace(
        "flipped",
        this.suitColour[this.p1[1].suit]
      );
      this.$refs.first[0].$el.classList.replace(
        "flipped",
        this.suitColour[this.p1[0].suit]
      );
      this.$refs.first[1].$el.classList.replace(
        "flipped",
        this.suitColour[this.p1[1].suit]
      );
      alert(this.winner());
    },

    reloadPage() {
      window.location.reload();
    },
    disableButton(s) {
      if (s === "deal") {
        this.isDisabled.deal = false;
      } else if (s === "flop") {
        this.isDisabled.flop = false;
      } else if (s === "turn") {
        this.isDisabled.turn = false;
      } else if (s === "river") {
        this.isDisabled.river = false;
      } else if (s === "showdown") {
        this.isDisabled.showdown = false;
      }
    },
    mouseOver() {
      this.$refs.first[0].$el.classList.replace(
        "flipped",
        this.suitColour[this.p1[0].suit]
      );
      this.$refs.first[1].$el.classList.replace(
        "flipped",
        this.suitColour[this.p1[1].suit]
      );
    },
    mouseLeave() {
      if (this.mouseLeaveBool == true) {
        this.$refs.first[0].$el.classList.replace(
          this.suitColour[this.p1[0].suit],
          "flipped"
        );
        this.$refs.first[1].$el.classList.replace(
          this.suitColour[this.p1[1].suit],
          "flipped"
        );
      } else {
      }
    },
    bestHand(playerHand) {
      const hand = playerHand.concat(this.flop, this.turn, this.river);
      let score;

      const best_hand = test.evaluateBestHand(hand);
      console.log(best_hand);
    },
    winner() {
      let p1Score = this.bestHand(this.p1);
      let p2Score = this.bestHand(this.p2);
      if (p1Score > p2Score) {
        return "Player 1 wins!";
      } else if (p1Score < p2Score) {
        return "Player 2 wins!";
      } else {
        return "Draw!";
      }
    },
  },
};
</script>

<template>
  <button @click="shuffleDeck">Shuffle</button>
  <button v-show="isDisabled.deal" @click="deal">Deal</button>
  <button v-show="isDisabled.flop" @click="dealFlop">Flop</button>
  <button v-show="isDisabled.turn" @click="dealTurn">Turn</button>
  <button v-show="isDisabled.river" @click="dealRiver">River</button>
  <button v-show="isDisabled.showdown" @click="showdown">Showdown</button>
  <button @click="reloadPage">Play Again</button>
  <div id="p1" @mouseleave="mouseLeave" @mouseover="mouseOver">
    <p>Player 1</p>
    <div v-for="card in p1" :key="card.id">
      <Card
        ref="first"
        :card-rank="card.rank"
        :card-suit="card.suit"
        :class="suitColour[card.suit]"
      />
    </div>
  </div>
  <div id="p2">
    <p>Player 2</p>
    <div v-for="card in p2" :key="card.id">
      <Card
        ref="second"
        :card-rank="card.rank"
        :card-suit="card.suit"
        :class="(suitColour[card.suit], { flipped: !isFlipped })"
      />
      <!-- <p>{{ p2.indexOf(card) }} = {{ card.rank }}</p> -->
    </div>
  </div>
  <div id="flop">
    <p>Flop</p>
    <div v-for="card in flop" :key="card.id">
      <Card
        :card-rank="card.rank"
        :card-suit="card.suit"
        :class="suitColour[card.suit]"
      />
    </div>

    <p>Turn</p>
    <div v-for="card in turn" :key="card.id">
      <Card
        :card-rank="card.rank"
        :card-suit="card.suit"
        :class="suitColour[card.suit]"
      />
    </div>
    <p>River</p>
    <div v-for="card in river" :key="card.id">
      <Card
        :card-rank="card.rank"
        :card-suit="card.suit"
        :class="suitColour[card.suit]"
      />
    </div>
  </div>
  <div id="deck">
    <div v-for="card in cards" :key="card.id">
      <Card
        :card-rank="card.rank"
        :card-suit="card.suit"
        :class="(suitColour[card.suit], { flipped: !isFlipped })"
      />
    </div>
    <div v-for="card in cards" :key="card.id">
      <Card
        :card-rank="card.rank"
        :card-suit="card.suit"
        :class="(suitColour[card.suit], { flipped: !isFlipped })"
      />
    </div>
  </div>
  <!-- <Card /> -->
  <!-- <Card /> -->
</template>

<style scoped>
.p2_cards:hover {
  transform: rotateY(180deg);
}
.test {
  display: none;
}
button {
  max-width: 100px;
  max-height: 25px;
}
header {
  line-height: 1.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.shuffleMedium-move {
  transition: transform 1s;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.deck {
  float: left;
  margin-right: 0.25em;
  margin-bottom: 0.25em;
}

p {
  color: aquamarine;
}

.red {
  color: #ff0000;
}

.blue {
  color: #0000ff;
}

.green {
  color: #00ff00;
}

.black {
  color: #000000;
}

/* .button {
  width: auto;
} */

@media (min-width: 1080px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
