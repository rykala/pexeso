<template>
    <div id="app">
        <main-slide @changeSlideEvent="changeSlide" v-if="slideView === SlidesEnum.MAIN"/>
        <settings @changeSlideEvent="changeSlide" v-if="slideView === SlidesEnum.SETTINGS"/>
    </div>
</template>

<script>
// components
import MainSlide from './slides/MainSlide';
import Settings from './slides/SettingsSlide';

// mixins
import SlidesEnumMixin from './mixins/SlidesEnumMixin.js';

export default {
    name: 'app',
    components: {MainSlide, Settings},
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
