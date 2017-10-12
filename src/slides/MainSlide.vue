<template>
    <div class="hello">
        <h1>MAIN</h1>
        <button @click="changeSlideEvent(SlidesEnum.SETTINGS)">Back to main slide</button>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
