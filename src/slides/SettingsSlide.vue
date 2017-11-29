<template>
    <div>
        <button @click="changeSlideEvent(SlidesEnum.MAIN)" class="button back"></button>

        <div class="container center">
            <div class="simple-mode" @click="setSimpleMode(!settings.simpleMode)"
                 :class="{active: settings.simpleMode}">
                Simple Mode
            </div>
            <div class="boxes-wrapper">
                <div class="box set-card-back1" @click="setCardBack(1)" :class="{ active: settings.cardBack === 1 }">
                </div>
                <div class="box set-card-back2" @click="setCardBack(2)" :class="{ active: settings.cardBack === 2 }">
                </div>
                <div class="box set-card-back3" @click="setCardBack(3)" :class="{ active: settings.cardBack === 3 }">
                </div>
            </div>

            <div class="boxes-wrapper">
                <div class="box box-background--sky" @click="setBackground(1)"
                     :class="{ active: settings.background === 1 }">
                </div>
                <div class="box box-background--paper" @click="setBackground(2)"
                     :class="{ active: settings.background === 2 }">
                </div>
                <div class="box box-background--color" @click="setBackground(3)"
                     :class="{ active: settings.background === 3 }">
                </div>
            </div>
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

        props: ['settings'],

        methods: {
            setSimpleMode(simpleMode) {
                this.$emit('setSimpleModeEvent', simpleMode);
            },

            setBackground(index) {
                this.$emit('setBackgroundEvent', index);
            },

            setCardBack(index) {
                this.$emit('setCardBackEvent', index);
            }
        }
    };
</script>

<style lang="scss">
    .simple-mode {
        border: 1rem solid white;
        border-radius: 3rem;
        font-size: 3rem;
        padding: 2rem 3.5rem;
        color: white;
        box-shadow: 5px 5px 15px 0px rgba(133, 133, 133, 1);

        transition: background-color 1s, background-size 0.2s;

        &:hover {
            cursor: pointer;
        }
    }
</style>
