<template>
    <div id="app">
        <main-slide v-if="slideView === SlidesEnum.MAIN"
                    @changeSlideEvent="changeSlide"
                    @switchSoundEvent="switchSound"
                    :settings="settings"></main-slide>

        <settings-slide v-if="slideView === SlidesEnum.SETTINGS"
                        @changeSlideEvent="changeSlide"
                        @setSimpleModeEvent="setSimpleMode"
                        :settings="settings"></settings-slide>

        <game-slide v-if="slideView === SlidesEnum.GAME"
                    @changeSlideEvent="changeSlide"></game-slide>
    </div>
</template>

<script>
    // components
    import MainSlide from './slides/MainSlide';
    import SettingsSlide from './slides/SettingsSlide';
    import GameSlide from './slides/GameSlide';

    // mixins
    import SlidesEnumMixin from './mixins/SlidesEnumMixin.js';

    export default {
        name: 'app',
        components: {MainSlide, SettingsSlide, GameSlide},
        mixins: [SlidesEnumMixin],

        data () {
            return {
                slideView: this.SlidesEnum.MAIN,
                settings: {
                    simpleMode: false,
                    sound: true
                }
            };
        },

        methods: {
            changeSlide (slideIndex) {
                this.slideView = slideIndex;
            },

            setSimpleMode (value) {
                this.settings.simpleMode = value;
            },

            switchSound (value) {
                this.settings.sound = value;
            }
        }
    };
</script>

<style>
    html {
        height: 100%;
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

        margin: 0;
        padding: 0;

        height: 100%;

        background: #562080;
    }

</style>
