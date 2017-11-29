<template>
    <div id="app" :class="[backgroundStyle, cardBackStyle]">
        <main-slide class="slide" v-if="slideView === SlidesEnum.MAIN"
                    @changeSlideEvent="changeSlide"
                    @switchSoundEvent="switchSound"
                    @showHelpEvent="showHelpPopup"
                    :settings="settings"
                    :showHelp="showHelp"></main-slide>

        <settings-slide class="slide" v-if="slideView === SlidesEnum.SETTINGS"
                        @changeSlideEvent="changeSlide"
                        @setSimpleModeEvent="setSimpleMode"
                        @setBackgroundEvent="setBackground"
                        @setCardBackEvent="setCardBack"
                        @switchSoundEvent="switchSound"
                        :settings="settings"></settings-slide>

        <stats-slide class="slide" v-if="slideView === SlidesEnum.STATS"
                     @changeSlideEvent="changeSlide"
                     @switchSoundEvent="switchSound"
                     :settings="settings"></stats-slide>

        <game-mode-slide class="slide" v-if="slideView === SlidesEnum.GAME_MODE"
                         @setCardsTypeEvent="setCardsType"
                         @changeSlideEvent="changeSlide"
                         @switchSoundEvent="switchSound"
                         :settings="settings"></game-mode-slide>

        <game-slide class="slide" v-if="slideView === SlidesEnum.GAME" @switchSoundEvent="switchSound"
                    @changeSlideEvent="changeSlide" :cardsType="cardsType"
                    :settings="settings"></game-slide>
    </div>
</template>

<script>
    /* eslint-disable space-before-function-paren */

    // components
    import MainSlide from './slides/MainSlide';
    import SettingsSlide from './slides/SettingsSlide';
    import GameSlide from './slides/GameSlide';
    import GameModeSlide from './slides/GameModeSlide';
    import StatsSlide from './slides/StatsSlide';

    // mixins
    import SlidesEnumMixin from './mixins/SlidesEnumMixin.js';
    import CardTypesMixin from './mixins/CardTypesMixin.js';

    export default {
        name: 'app',
        components: {MainSlide, SettingsSlide, GameSlide, GameModeSlide, StatsSlide},
        mixins: [SlidesEnumMixin, CardTypesMixin],

        data() {
            return {
                slideView: this.SlidesEnum.MAIN,
                cardsType: this.CardTypes.ANIMALS,
                settings: {
                    simpleMode: false,
                    sound: true,
                    background: 1,
                    cardBack: 1
                },
                showHelp: false
            };
        },

        computed: {
            backgroundStyle: function () {
                return {
                    background1: this.settings.background === 1,
                    background2: this.settings.background === 2,
                    background3: this.settings.background === 3
                };
            },

            cardBackStyle: function () {
                return {
                    cardBack1: this.settings.cardBack === 1,
                    cardBack2: this.settings.cardBack === 2,
                    cardBack3: this.settings.cardBack === 3
                };
            }
        },

        methods: {
            changeSlide(slideIndex) {
                this.slideView = slideIndex;
            },

            setSimpleMode(value) {
                this.settings.simpleMode = value;
            },

            switchSound(value) {
                this.settings.sound = value;
            },

            setBackground(index) {
                this.settings.background = index;
            },

            setCardBack(index) {
                this.settings.cardBack = index;
            },

            showHelpPopup(bool) {
                this.showHelp = bool;
            },

            setCardsType(cardType) {
                this.cardsType = cardType;
            }
        }
    };
</script>

<style lang="scss">
    $primary: #7FCDFF;

    html {
        height: 100%;
        font-size: 10px;
        font-family: "Droid Sans Mono", serif;
    }

    body {
        margin: 0;
        padding: 0;

        width: 100%;
        height: 100%;
    }

    h1 {
        margin: 0;
        padding: 0;
    }

    #app {
        display: flex;
        justify-content: space-around;

        margin: 0;
        padding: 0;

        height: 100%;
        background-size: cover;

        .boxes-wrapper {
            display: flex;
            flex-flow: row;
            margin: 3rem 0;
        }

        .box {

            &-background--sky {
                background: url("./assets/background-sky.jpg");
                background-size: cover;
            }

            &-background--paper {
                background: url("./assets/background-paper.jpg");
                background-size: cover;
            }

            &-background--color {
                background: url("./assets/background-color.jpg");
                background-size: cover;
            }
        }

        &.cardBack1 {
            background-color: #9370DB;

            .header {
                color: white;
            }

            .card .back {
                background-color: rgba(#9370DB, 1);
            }

            .help-popup {
                background-color: rgba(#9370DB, 0.9);
            }

            .button, .simple-mode {
                background-color: rgba(#9370DB, 0.7);

                &:hover {
                    background-color: rgba(#9370DB, 1);
                }
            }

            .simple-mode.active {
                background-color: rgba(#9370DB, 1);
            }

            .active {
                border-color: #9370DB;
            }
        }

        &.cardBack2 {
            background-color: #5acd59;

            .card .back {
                background-color: rgba(#5ACD59, 1);
            }

            .help-popup {
                background-color: rgba(#5ACD59, 0.9);
            }

            .button, .simple-mode {
                background-color: rgba(#5ACD59, 0.7);

                &:hover {
                    background-color: rgba(#5ACD59, 1);
                }
            }

            .simple-mode.active {
                background-color: rgba(#5ACD59, 1);
            }

            .active {
                border-color: #5ACD59;
            }
        }

        &.cardBack3 {
            background-color: #1E90FF;

            .card .back {
                background-color: rgba(#1E90FF, 1);
            }

            .help-popup {
                background-color: rgba(#1E90FF, 0.9);
            }

            .button, .simple-mode {
                background-color: rgba(#1E90FF, 0.7);

                &:hover {
                    background-color: rgba(#1E90FF, 1);
                }
            }

            .simple-mode.active {
                background-color: rgba(#1E90FF, 1);
            }

            .active {
                border-color: #1E90FF;
            }
        }

        .set-card-back1 {
            background-color: rgba(#9370DB, 1);
        }

        .set-card-back2 {
            background-color: rgba(#5ACD59, 1);
        }

        .set-card-back3 {
            background-color: rgba(#1E90FF, 1);
        }

        .box {
            width: 15rem;
            height: 15rem;

            border: 1rem solid white;
            border-radius: 3rem;
            margin-right: 3rem;
            transition: all 0.5s;
            box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.5);

            &.inactive {
                filter: grayscale(100%);

                &:hover {
                    cursor: not-allowed;
                    filter: grayscale(100%);
                }
            }

            &:last-child {
                margin-right: 0;
            }

            &:hover {
                cursor: pointer;
                filter: none;
            }
        }

        &.background1 {
            background-image: url('assets/background-sky.jpg');
        }

        &.background2 {
            background-image: url('assets/background-paper.jpg');
        }

        &.background3 {
            background-image: url('assets/background-color.jpg');
        }

        .slide {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .header {
            font-size: 10rem;
        }

        .button {
            width: 10rem;
            height: 10rem;
            background-repeat: no-repeat;
            background-size: cover;
            padding: 1rem;
            margin: 1rem;
            border: 0.6rem solid white;
            border-radius: 3rem;
            box-shadow: 5px 5px 15px 0px rgba(133, 133, 133, 1);

            transition: background-color 1s, background-size 0.2s;

            &:hover {
                cursor: pointer;
            }

            &.small {
                width: 8rem;
                height: 8rem;
                padding: 0.8rem;
                background-size: 50%;
                background-position: 50% 50%;

                &:hover {
                    background-size: 55%;
                }
            }

            &.back {
                width: 7rem !important;
                height: 7rem !important;

                background-image: url('assets/icons/back.svg');
                background-color: transparent !important;
                border: none !important;
                box-shadow: none !important;

                position: absolute;
                top: 1rem;
                left: 1rem;
            }
        }

        .container {
            display: flex;
            justify-items: center;
            align-items: center;
            flex-flow: column wrap;

            &.game-buttons {
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: space-between;
            }

            &.second-row {
                flex-flow: row wrap;
                justify-content: space-between;
            }

            &.center {
                margin: auto auto;
            }

            &.bottom {
                display: block;
                position: absolute;
                width: 100%;
                margin-top: auto;
                left: 0;
                bottom: 0;
            }
        }
    }

</style>
