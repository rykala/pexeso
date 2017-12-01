<template>
    <div>
        <div class="container-left-top">
            <button class="button restart small" @click="resetGame()"></button>
        </div>

        <div class="container-right-top">
            <button class="button end small" @click="changeSlideEvent(SlidesEnum.MAIN)"></button>
        </div>

        <div class="container top">
            <div class="game-info">
                <div class="game-info--text">
                    <span class="text-label">Time:</span> {{time}}
                </div>
                <div class="game-info--text">
                    <span class="text-label">Turns:</span> {{turns}}
                </div>
            </div>
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
                <div class="save-score">
                    <label>
                        Save score
                        <input type="text" v-model="username">
                    </label>
                </div>
                <button v-if="!saveScoreFlag" @click="saveScore()" class="newGame">Save score</button>
                <div v-if="saveScoreFlag">Score saved!</div>
            </div>
        </div>

        <div class="container bottom">
            <button @click="switchSound(!settings.sound)" :class="{muted: settings.sound}"
                    class="button sound small"></button>
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
    import SoundMixin from '../mixins/SoundMixin.js';
    import CardTypes from '../mixins/CardTypesMixin.js';

    // animals
    import bull from '../assets/pexeso/animals/bull.svg';
    import chick from '../assets/pexeso/animals/chick.svg';
    import crab from '../assets/pexeso/animals/crab.svg';
    import fox from '../assets/pexeso/animals/fox.svg';
    import hedgehog from '../assets/pexeso/animals/hedgehog.svg';
    import pig from '../assets/pexeso/animals/pig.svg';
    import tiger from '../assets/pexeso/animals/tiger.svg';
    import zebra from '../assets/pexeso/animals/zebra.svg';

    // vehicles
    import aeroplane from '../assets/pexeso/vehicles/aeroplane.svg';
    import ambulance from '../assets/pexeso/vehicles/ambulance.svg';
    import bicycle from '../assets/pexeso/vehicles/bicycle.svg';
    import bus from '../assets/pexeso/vehicles/bus.svg';
    import car from '../assets/pexeso/vehicles/car.svg';
    import cab from '../assets/pexeso/vehicles/cab.svg';
    import helicopter from '../assets/pexeso/vehicles/helicopter.svg';
    import ship from '../assets/pexeso/vehicles/ship.svg';

    // buildings
    import building1 from '../assets/pexeso/buildings/building1.svg';
    import building2 from '../assets/pexeso/buildings/building2.svg';
    import building3 from '../assets/pexeso/buildings/building3.svg';
    import building4 from '../assets/pexeso/buildings/building4.svg';
    import building5 from '../assets/pexeso/buildings/building5.svg';
    import building6 from '../assets/pexeso/buildings/building6.svg';
    import building7 from '../assets/pexeso/buildings/building7.svg';
    import building8 from '../assets/pexeso/buildings/building8.svg';

    let Cards = [];
    let animals = [
        {name: 'bull', image: bull},
        {name: 'chick', image: chick},
        {name: 'crab', image: crab},
        {name: 'fox', image: fox},
        {name: 'hedgehog', image: hedgehog},
        {name: 'pig', image: pig},
        {name: 'tiger', image: tiger},
        {name: 'zebra', image: zebra}
    ];

    let vehicles = [
        {name: 'aeroplane', image: aeroplane},
        {name: 'ambulance', image: ambulance},
        {name: 'bicycle', image: bicycle},
        {name: 'bus', image: bus},
        {name: 'car', image: car},
        {name: 'cab', image: cab},
        {name: 'helicopter', image: helicopter},
        {name: 'ship', image: ship}
    ];

    let buildings = [
        {name: 'building1', image: building1},
        {name: 'building2', image: building2},
        {name: 'building3', image: building3},
        {name: 'building4', image: building4},
        {name: 'building5', image: building5},
        {name: 'building6', image: building6},
        {name: 'building7', image: building7},
        {name: 'building8', image: building8}
    ];

    let shuffleCards = () => {
        let cards = [].concat(_.cloneDeep(Cards), _.cloneDeep(Cards));
        return _.shuffle(cards);
    };

    export default {
        mixins: [SlideMixin, SlidesEnumMixin, SoundMixin, CardTypes],

        props: ['settings', 'cardsType', 'mode'],

        data() {
            return {
                showSplash: false,
                cards: [],
                started: false,
                startTime: 0,
                turns: 0,
                flipBackTimer: null,
                timer: null,
                time: '00:00',
                score: 0,
                username: 'User1',
                saveScoreFlag: false
            };
        },

        methods: {
            saveScore() {
                this.$emit('saveScoreEvent', this.username, this.score);
                this.saveScoreFlag = true;
            },

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
                let score = 1000 - (moment().diff(this.startTime, 'seconds') - Cards.length * 5) * 3 -
                    (this.turns - Cards.length) * 5;
                this.score = Math.max(score, 0);
                this.showSplash = true;
            },

            flipCard: function(card) {
                if (card.found || card.flipped) {
                    return;
                }

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
            if (this.cardsType === this.CardTypes.ANIMALS) {
                Cards = animals;
            } else if (this.cardsType === this.CardTypes.BUILDINGS) {
                Cards = buildings;
            } else if (this.cardsType === this.CardTypes.VEHICLES) {
                Cards = vehicles;
            }
            this.resetGame();
        }
    };
</script>

<style lang="scss">
    .game-info {
        font-size: 2.5rem;
        text-transform: uppercase;
        display: flex;
        justify-items: center;
        align-items: center;
        align-self: center;
        flex-flow: row wrap;
        height: 10rem;

        &--text {
            display: inline;
            margin-right: 5rem;
            font-weight: bold;

            &:last-child {
                margin-right: 0;
            }
        }

        .text-label {
            font-size: 1.8rem;
            font-weight: normal;
        }
    }

    .button {
        &.restart {
            background-image: url('../assets/icons/reset.svg');
        }

        &.end {
            background-image: url('../assets/icons/close-black.svg');
        }
    }

    .cards {
        display: flex;
        justify-content: flex-start;
        flex-flow: column wrap;
        align-content: center;
        height: 50rem;
        margin: auto;

        .card {
            position: relative;
            display: inline-block;
            width: 10rem;
            height: 10rem;
            margin: 1em 2em;
            transition: opacity 0.5s;

            .front, .back {
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
                border: 0.5rem solid white;
                box-shadow: 5px 5px 15px 0px rgba(133, 133, 133, 1);
            }

            .back {
                background-size: 90%;
                background-position: center;
                background-repeat: no-repeat;
                font-size: 12px;

                &:hover {
                    cursor: pointer;
                }
            }

            .front {
                transform: rotateY(-180deg);
                background-size: 90%;
                background-repeat: no-repeat;
                background-position: center;
            }

            &.flipped .back, &.found .back {
                transform: rotateY(180deg);
            }

            &.flipped .front, &.found .front {
                transform: rotateY(0deg);
            }

            &.found {
                opacity: 0.3;
            }
        }
    }

    .splash {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        .overlay {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.6);
        }

        .content {
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
            color: white;
        }

        .content .title {
            font-size: 3rem;
            padding: 0.5rem;
        }

        .content .score {
            padding: 0.5em;
        }

        .content button {
            margin-top: 1.0em;
            background-color: #444;
            padding: 5px 20px;
            border-radius: 4px;
            border: 1px solid #555;
            color: White;
            font-size: 1.4em;
        }
    }
</style>
