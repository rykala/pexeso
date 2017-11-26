<template>
    <div>
        <button @click="changeSlideEvent(SlidesEnum.MAIN)">Vzdat hru</button>

        <div class="info">
            <div><span class="label">Time:</span><span class="value">{{time}} </span></div>
            <div><span class="label">Turns:</span><span class="value">{{turns}} </span></div>
        </div>
        <div class="cards">
            <div v-for="card in cards" :class="{ flipped: card.flipped, found: card.found }" @click="flipCard(card)"
                 class="card">
                <div class="back"></div>
                <div :style="{ backgroundImage: 'url(' + card.image + ')' }" class="front"></div>
            </div>
        </div>
        <div v-if="showSplash" class="splash">
            <div class="overlay"></div>
            <div class="content">
                <div class="title">You won!</div>
                <div class="score">Score: {{ score }}</div>
                <button @click="resetGame()" class="newGame">New game</button>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-return-assign */

    // mixins
    import SlideMixin from '../mixins/SlideMixin.js';
    import SlidesEnumMixin from '../mixins/SlidesEnumMixin.js';
    import _ from 'lodash';
    import moment from 'moment';

    let CardTypes = [
        {name: 'vue', image: 'https://vuejs.org/images/logo.png'},
        {name: 'express', image: 'https://coligo.io/images/express.svg'},
        {
            name: 'mongo',
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png'
        },
        {name: 'nodejs', image: 'https://worldvectorlogo.com/logos/nodejs-icon.svg'},
        {
            name: 'webpack',
            image: 'https://camo.githubusercontent.com/66747a6e05a799aec9c6e04a3e721ca567748e8b/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313336353838312f313931383337332f32653035373166612d376462632d313165332d383436352d3839356632393164343366652e706e67'
        },
        {name: 'babel', image: 'https://babeljs.io/images/logo.svg'}
        // { name: "jade", image: "http://jade-lang.com/style/jade-logo-header.svg" },
    ];

    let shuffleCards = () => {
        let cards = [].concat(_.cloneDeep(CardTypes), _.cloneDeep(CardTypes));
        return _.shuffle(cards);
    };

    export default {
        mixins: [SlideMixin, SlidesEnumMixin],

        data() {
            return {
                showSplash: false,
                cards: [],
                started: false,
                startTime: 0,
                turns: 0,
                flipBackTimer: null,
                timer: null,
                time: '--:--',
                score: 0
            };
        },

        methods: {
            resetGame() {
                this.showSplash = false;
                let cards = shuffleCards();
                this.turns = 0;
                this.score = 0;
                this.started = false;
                this.startTime = 0;

                _.each(cards, (card) => {
                    card.flipped = false;
                    card.found = false;
                });

                this.cards = cards;
            },

            flippedCards() {
                return _.filter(this.cards, card => card.flipped);
            },

            sameFlippedCard() {
                let flippedCards = this.flippedCards();
                if (flippedCards.length === 2) {
                    if (flippedCards[0].name === flippedCards[1].name) {
                        return true;
                    }
                }
            },

            setCardFounds() {
                _.each(this.cards, (card) => {
                    if (card.flipped) {
                        card.found = true;
                    }
                });
            },

            checkAllFound() {
                let foundCards = _.filter(this.cards, card => card.found);
                if (foundCards.length === this.cards.length) {
                    return true;
                }
            },

            startGame() {
                this.started = true;
                this.startTime = moment();

                this.timer = setInterval(() => {
                    this.time = moment(moment().diff(this.startTime)).format('mm:ss');
                }, 1000);
            },

            finishGame() {
                this.started = false;
                clearInterval(this.timer);
                let score = 1000 - (moment().diff(this.startTime, 'seconds') - CardTypes.length * 5) * 3 -
                    (this.turns - CardTypes.length) * 5;
                this.score = Math.max(score, 0);
                this.showSplash = true;
            },

            flipCard: function(card) {
                if (card.found || card.flipped) return;

                if (!this.started) {
                    this.startGame();
                }

                let flipCount = this.flippedCards().length;
                if (flipCount === 0) {
                    card.flipped = !card.flipped;
                } else if (flipCount === 1) {
                    card.flipped = !card.flipped;
                    this.turns += 1;

                    if (this.sameFlippedCard()) {
                        // Match!
                        this.flipBackTimer = setTimeout(() => {
                            this.clearFlipBackTimer();
                            this.setCardFounds();
                            this.clearFlips();

                            if (this.checkAllFound()) {
                                this.finishGame();
                            }
                        }, 200);
                    } else {
                        // Wrong match
                        this.flipBackTimer = setTimeout(() => {
                            this.clearFlipBackTimer();
                            this.clearFlips();
                        }, 1000);
                    }
                }
            },

            clearFlips() {
                _.map(this.cards, card => card.flipped = false);
            },

            clearFlipBackTimer() {
                clearTimeout(this.flipBackTimer);
                this.flipBackTimer = null;
            }
        },

        created() {
            this.resetGame();
        }
    };
</script>

<style scoped>
    .gameSlide {
        height: 100%;
        widht: 100%;
        position: relative;
    }

    .gameSlide__main-header {
        position: absolute;
        right: 50%;
        top: 50%;
    }

    .info {
        text-align: center;
        padding-bottom: 1em;
        border-bottom: 1px solid #555;
    }

    .info > div {
        display: inline-block;
        width: 200px;
    }

    .info > div .label {
        margin-right: 5px;
    }

    .info > div .value {
        font-weight: bold;
    }

    .cards .card {
        position: relative;
        display: inline-block;
        width: 10rem;
        height: 10rem;
        margin: 1em 2em;
        transition: opacity 0.5s;
    }

    .cards .card .front, .cards .card .back {
        border-radius: 5px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: White;
        backface-visibility: hidden;
        transform: translateZ(0);
        transition: transform 0.6s;
        transform-style: preserve-3d;
    }

    .cards .card .back {
        background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/102308/card_backside.jpg");
        background-size: 90%;
        background-position: center;
        background-repeat: no-repeat;
        font-size: 12px;
    }

    .cards .card .front {
        transform: rotateY(-180deg);
        background-size: 90%;
        background-repeat: no-repeat;
        background-position: center;
    }

    .cards .card.flipped .back, .cards .card.found .back {
        transform: rotateY(180deg);
    }

    .cards .card.flipped .front, .cards .card.found .front {
        transform: rotateY(0deg);
    }

    .cards .card.found {
        opacity: 0.3;
    }

    .splash {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .splash .overlay {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .splash .content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 400px;
        height: 200px;
        margin: auto;
        text-align: center;
        background-color: rgba(51, 51, 51, 0.9);
        border-radius: 10px;
        box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.8);
        padding: 1em;
    }

    .splash .content .title {
        font-size: 1.8em;
        padding: 0.5em;
    }

    .splash .content .score {
        padding: 0.5em;
    }

    .splash .content button {
        margin-top: 1.0em;
        background-color: #444;
        padding: 5px 20px;
        border-radius: 4px;
        border: 1px solid #555;
        color: White;
        font-size: 1.4em;
    }
</style>
