<template>
  <div class="card" @click="flipCard" :class="{ flipped: isFlipped }">
    <div class="back"></div>
    <div class="face">
      <div class="suit top">{{ cardSuit }}</div>
      <div class="rank">{{ cardRank }}</div>
      <div class="suit bottom">{{ cardSuit }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardSuit: String,
    cardRank: String,
    cardColor: String,
  },
  data() {
    return {
      isFlipped: false,
    };
  },
  methods: {
    flipCard() {
      if (this.isFlipped == false) {
        this.isFlipped = true;
      } else {
        this.isFlipped = false;
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  width: 70px;
  height: 100px;
  margin-bottom: 0.25rem;
  background-color: #f8f8f8;
  transform-style: preserve-3d;
  transition: transform 1s;
}

.card.flipped {
  transform: rotateY(180deg);
}

.face,
.back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateX(0);
}

.face {
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.back {
  background-color: blue;
  background-image: url("../assets/Reverso_baraja_española_rojo.svg");
  background-position: center;
  background-size: auto;
  transform: rotateY(180deg);
}

.suit {
  width: 100%;
  display: flex;
  flex-direction: column;
  column-gap: 0px;
}

.top {
  grid-column: 1;
  text-align: center;
}

.rank {
  align-self: center;
  text-align: center;
}

.bottom {
  grid-column: 3;
  text-align: center;
  transform: rotate(180deg);
}
</style>
