<template>
    <div>
        <h1>MAIN SLIDE</h1>
        <button @click="changeSlideEvent(SlidesEnum.GAME)">START GAME</button>
        <button @click="changeSlideEvent(SlidesEnum.SETTINGS)">SETTINGS</button>
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
</style>
