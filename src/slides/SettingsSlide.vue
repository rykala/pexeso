<template>
    <div>
        <h1>SETTINGS SLIDE</h1>
        <button @click="changeSlideEvent(SlidesEnum.MAIN)">Back to main slide</button>
        <button @click="setSimpleMode(!settings.simpleMode)" :class="{active: settings.simpleMode}">Simple Mode</button>
    </div>
</template>

<script>
// mixins
import SlideMixin from '../mixins/SlideMixin.js';
import SlidesEnumMixin from '../mixins/SlidesEnumMixin.js';

export default {
    mixins: [SlideMixin, SlidesEnumMixin],

    props: ['settings'],

    methods: {
        setSimpleMode (simpleMode) {
            this.$emit('setSimpleModeEvent', simpleMode);
        }
    }
};
</script>

<style scoped>
    .active {
        background: red;
    }
</style>
