<template>
    <div>
        <div class="container top">
            <h1 class="header">PEXESO</h1>
        </div>

        <!--SIMPLE-->
        <button v-if="settings.simpleMode" @click="changeSlideEvent(SlidesEnum.GAME)"
                class="button single-player"></button>

        <!--NORMAL-->
        <div class="container game-buttons">
            <div v-if="!settings.simpleMode" @click="changeSlideEvent(SlidesEnum.GAME_MODE)"
                 class="button single-player"></div>
            <div v-if="!settings.simpleMode" @click="changeSlideEvent(SlidesEnum.GAME_MODE)"
                 class="button multi-player"></div>
        </div>

        <div class="container second-row">
            <button class="button help small"></button>
            <button v-if="!settings.simpleMode" @click="changeSlideEvent(SlidesEnum.SETTINGS)"
                    class="button stats small"></button>
        </div>

        <div class="container bottom">
            <button @click="changeSlideEvent(SlidesEnum.SETTINGS)" class="button settings small"></button>
            <!--<button @click="switchSound(!settings.sound)" :class="{active: settings.sound}">ZVUK</button>-->
        </div>
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
            switchSound(sound) {
                this.$emit('switchSoundEvent', sound);
            }
        }
    };
</script>

<style lang="scss">
    .active {
        background: red;
    }

    .button {
        &.single-player {
            background-image: url('../assets/singleplayer.svg');
        }

        &.multi-player {
            background-image: url('../assets/multiplayer.svg');
        }

        &.settings {
            background-image: url('../assets/settings.svg');;
        }

        &.stats {
            background-image: url('../assets/stats.svg');
        }

        &.help {
            background-image: url('../assets/help.svg');
        }
    }

    .container {
        display: flex;

        &.game-buttons {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        &.second-row {
            justify-content: space-between;
            width: 35%;
        }

        &.top {
            margin-bottom: auto;
            padding-top: 5%;
        }

        &.bottom {
            width: 100%;
            margin-top: auto;
            padding-bottom: 1%;
        }
    }
</style>
