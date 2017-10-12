<template>
    <div id="app">
        <main-slide @changeSlideEvent="changeSlide" v-if="slideView === SlidesEnum.MAIN"/>
        <settings-slide @changeSlideEvent="changeSlide" v-if="slideView === SlidesEnum.SETTINGS"/>
        <game-slide @changeSlideEvent="changeSlide" v-if="slideView === SlidesEnum.GAME"/>
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
            slideView: this.SlidesEnum.MAIN
        };
    },

    methods: {
        changeSlide (slideIndex) {
            this.slideView = slideIndex;
        }
    }
};
</script>

<style>
</style>
