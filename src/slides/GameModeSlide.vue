<template>
    <div>
        <div class="container center">
            <h1>GAME MODE</h1>
            <button @click="changeSlideEvent(SlidesEnum.MAIN)" class="button back"></button>

            <div class="boxes-wrapper">
                <div class="box box-background--music inactive">
                </div>
                <div class="box box-background--picture active">
                </div>
                <div class="box box-background--calculator inactive">
                </div>
            </div>

            <h1>Cards</h1>
            <div class="boxes-wrapper">
                <div class="box box-background--animals" @click="startGame(CardTypes.ANIMALS)">
                </div>
                <div class="box box-background--vehicles" @click="startGame(CardTypes.VEHICLES)">
                </div>
                <div class="box box-background--buildings" @click="startGame(CardTypes.BUILDINGS)">
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
    import CardTypes from '../mixins/CardTypesMixin';

    export default {
        mixins: [SlideMixin, SlidesEnumMixin, SoundMixin, CardTypes],

        props: ['settings'],

        methods: {
            startGame(cardType) {
                this.$emit('setCardsTypeEvent', cardType);
                this.changeSlideEvent(this.SlidesEnum.GAME);
            }
        }
    };
</script>

<style lang="scss">
    .box {
        &-background--animals {
            background-image: url('../assets/pexeso/animals/koala.svg');
            background-color: white;
            background-size: 70%;
            background-repeat: no-repeat;
            background-position: 50% 50%;
        }

        &-background--vehicles {
            background-image: url('../assets/pexeso/vehicles/bicycle.svg');
            background-color: white;
            background-color: white;
            background-size: 90%;
            background-repeat: no-repeat;
            background-position: 50% 50%;
        }

        &-background--buildings {
            background-image: url('../assets/pexeso/buildings/building1.svg');
            background-color: white;
            background-color: white;
            background-size: 70%;
            background-repeat: no-repeat;
            background-position: 50% 50%;
        }

        &-background--picture {
            background-image: url('../assets/modes/picture.svg');
            background-color: white;
            background-color: white;
            background-size: 70%;
            background-repeat: no-repeat;
            background-position: 50% 50%;
        }

        &-background--music {
            background-image: url('../assets/modes/music.svg');
            background-color: white;
            background-color: white;
            background-size: 70%;
            background-repeat: no-repeat;
            background-position: 50% 50%;
        }

        &-background--calculator {
            background-image: url('../assets/modes/calculator.svg');
            background-color: white;
            background-color: white;
            background-size: 70%;
            background-repeat: no-repeat;
            background-position: 50% 50%;
        }
    }
</style>
