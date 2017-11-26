<template>
    <div>
        <button @click="changeSlideEvent(SlidesEnum.MAIN)" class="button back"></button>
        <button @click="setSimpleMode(!settings.simpleMode)" :class="{active: settings.simpleMode}">Simple Mode</button>
        <button @click="">Card back</button>
        <button>Background</button>
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
            setSimpleMode(simpleMode) {
                this.$emit('setSimpleModeEvent', simpleMode);
            }
        }
    };
</script>

<style lang="scss">
    .active {
        background: red;
    }

    .button {

    }
</style>
