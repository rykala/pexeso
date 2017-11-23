<template>
    <div>
        <h1>MAIN SLIDE</h1>

        <!--SIMPLE-->
        <button v-if="settings.simpleMode" @click="changeSlideEvent(SlidesEnum.GAME)">START</button>

        <!--NORMAL-->
        <button v-if="!settings.simpleMode" @click="changeSlideEvent(SlidesEnum.GAME_MODE)">SINGLE</button>
        <button v-if="!settings.simpleMode" @click="changeSlideEvent(SlidesEnum.GAME_MODE)">MULTI</button>
        <br>
        <button>NAPOVEDA</button>
        <button v-if="!settings.simpleMode" @click="changeSlideEvent(SlidesEnum.SETTINGS)">ZEBRICEK</button>
        <br>
        <button @click="changeSlideEvent(SlidesEnum.SETTINGS)">NASTAVENI</button>
        <button @click="switchSound(!settings.sound)" :class="{active: settings.sound}">ZVUK</button>
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
            switchSound (sound) {
                this.$emit('switchSoundEvent', sound);
            }
        }
    };
</script>

<style scoped>
    .active {
        background: red;
    }
</style>
