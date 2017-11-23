<template>
    <div>
        <h1>GAME SLIDE</h1>
        <button @click="changeSlideEvent(SlidesEnum.MAIN)">Vzdat hru</button>
    </div>
</template>

<script>
// mixins
import SlideMixin from '../mixins/SlideMixin.js';
import SlidesEnumMixin from '../mixins/SlidesEnumMixin.js';

export default {
    mixins: [SlideMixin, SlidesEnumMixin]
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
</style>
