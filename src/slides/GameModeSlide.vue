<template>
    <div>
        <h1>GAME MODE SLIDE</h1>
        <button @click="changeSlideEvent(SlidesEnum.MAIN)" class="button back"></button>
        <button @click="changeSlideEvent(SlidesEnum.GAME)">HRAT</button>
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
