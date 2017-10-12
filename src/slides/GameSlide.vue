<template>
    <div>
        <h1>GAME SLIDE</h1>
        <button @click="changeSlideEvent(SlidesEnum.MAIN)">Back to main slide</button>
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
