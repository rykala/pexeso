<template>
    <div id="app">
        <main-slide class="slide" v-if="slideView === SlidesEnum.MAIN"
                    @changeSlideEvent="changeSlide"
                    @switchSoundEvent="switchSound"
                    :settings="settings"></main-slide>

        <settings-slide class="slide" v-if="slideView === SlidesEnum.SETTINGS"
                        @changeSlideEvent="changeSlide"
                        @setSimpleModeEvent="setSimpleMode"
                        :settings="settings"></settings-slide>

        <game-mode-slide class="slide" v-if="slideView === SlidesEnum.GAME_MODE"
                         @changeSlideEvent="changeSlide"></game-mode-slide>

        <game-slide class="slide" v-if="slideView === SlidesEnum.GAME" @changeSlideEvent="changeSlide"></game-slide>
    </div>
</template>

<script>
    // components
    import MainSlide from './slides/MainSlide';
    import SettingsSlide from './slides/SettingsSlide';
    import GameSlide from './slides/GameSlide';
    import GameModeSlide from './slides/GameModeSlide';

    // mixins
    import SlidesEnumMixin from './mixins/SlidesEnumMixin.js';

    export default {
        name: 'app',
        components: {MainSlide, SettingsSlide, GameSlide, GameModeSlide},
        mixins: [SlidesEnumMixin],

        data() {
            return {
                slideView: this.SlidesEnum.MAIN,
                settings: {
                    simpleMode: false,
                    sound: true
                }
            };
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

        background: url('./assets/background.jpg');
        background-size: cover;

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
            border: 0.3rem solid black;
            background-color: rgba(#fff, 0.3);
            border-radius: 20%;
            padding: 1rem;
            margin: 1rem;

            transition: background-color 1s, background-size 0.2s;

            &:hover {
                cursor: pointer;
                background-color: rgba($primary, 1);
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
                width: 7rem!important;
                height: 7rem!important;

                background-image: url('./assets/back.svg');
                background-color: transparent!important;
                border: none!important;

                position: absolute;
                top: 1rem;
                left: 1rem;
            }
        }
    }

</style>
