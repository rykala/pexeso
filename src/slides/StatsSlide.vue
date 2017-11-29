<template>
    <div>
    <button @click="changeSlideEvent(SlidesEnum.MAIN)" class="button back"></button>

    <div class="container center">

    </div>

    <div class="container bottom">
        <button @click="switchSound(!settings.sound)" :class="{muted: settings.sound}"
                class="button sound small"></button>
    </div>
</div>
</template>

<script>
    // mixins
    import SlideMixin from '../mixins/SlideMixin.js';
    import SlidesEnumMixin from '../mixins/SlidesEnumMixin.js';
    import SoundMixin from '../mixins/SoundMixin.js';

    export default {
        mixins: [SlideMixin, SlidesEnumMixin, SoundMixin],

        props: ['settings']
    };
</script>

<style>
</style>
