<template>
    <div>
        <div class="container center">
            <h1 class="header">PEXESO</h1>
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
                <button class="button help small" @click="showHelpEvent(true)"></button>
                <button v-if="!settings.simpleMode" @click="changeSlideEvent(SlidesEnum.STATS)"
                        class="button stats small"></button>
            </div>
        </div>


        <div class="container bottom">
            <button @click="changeSlideEvent(SlidesEnum.SETTINGS)" class="button settings small"></button>
            <button @click="switchSound(!settings.sound)" :class="{muted: settings.sound}"
                    class="button sound small"></button>
        </div>

        <div class="help-popup" :class="{hidden: !showHelp}">
            <div @click="showHelpEvent(false)" class="close"></div>
            <div class="text">
                Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam amet architecto at
                autem beatae dolore doloremque ea et, excepturi mollitia nam necessitatibus numquam odit quis, sapiente
                sequi tenetur unde!<br>
                Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam amet architecto at
                autem beatae dolore doloremque ea et, excepturi mollitia nam necessitatibus numquam odit quis, sapiente
                sequi tenetur unde!<br>
                Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam amet architecto at
                autem beatae dolore doloremque ea et, excepturi mollitia nam necessitatibus numquam odit quis, sapiente
                sequi tenetur unde!<br>
                Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam amet architecto at
                autem beatae dolore doloremque ea et, excepturi mollitia nam necessitatibus numquam odit quis, sapiente
                sequi tenetur unde!<br>
                Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam amet architecto at
                autem beatae dolore doloremque ea et, excepturi mollitia nam necessitatibus numquam odit quis, sapiente
                sequi tenetur unde!<br>
                Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam amet architecto at
                autem beatae dolore doloremque ea et, excepturi mollitia nam necessitatibus numquam odit quis, sapiente
                sequi tenetur unde!<br>
                Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam amet architecto at
                autem beatae dolore doloremque ea et, excepturi mollitia nam necessitatibus numquam odit quis, sapiente
                sequi tenetur unde!<br>
                Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam amet architecto at
                autem beatae dolore doloremque ea et, excepturi mollitia nam necessitatibus numquam odit quis, sapiente
                sequi tenetur unde!<br>
                Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquam amet architecto at
                autem beatae dolore doloremque ea et, excepturi mollitia nam necessitatibus numquam odit quis, sapiente
                sequi tenetur unde!<br>
            </div>
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
        props: ['settings', 'showHelp'],

        methods: {
            showHelpEvent(bool) {
                this.$emit('showHelpEvent', bool);
            }
        }
    };
</script>

<style lang="scss">
    .button {
        &.single-player {
            background-image: url('../assets/icons/singleplayer.svg');
        }

        &.multi-player {
            background-image: url('../assets/icons/multiplayer.svg');
        }

        &.settings {
            background-image: url('../assets/icons/settings.svg');;
        }

        &.stats {
            background-image: url('../assets/icons/stats.svg');
        }

        &.help {
            background-image: url('../assets/icons/help.svg');
        }

        &.sound {
            background-image: url('../assets/icons/sound.svg');

            &.muted {
                background-image: url('../assets/icons/sound-muted.svg');
            }
        }
    }

    .help-popup {
        width: 100%;
        height: 100%;
        background: white;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow:hidden;

        .text {
            color: white;
            font-size: 2rem;
            width: 50%;
            height: 80%;
            margin: 5% auto;
            overflow: auto;
        }

        &.hidden {
            display: none;
        }

        .close {
            position: absolute;
            right: 3rem;
            top: 3rem;
            width: 5rem;
            height: 5rem;
            background-image: url('../assets/icons/cancel.svg');
            background-size: cover;

            &:hover {
                cursor: pointer;
            }
        }
    }
</style>
