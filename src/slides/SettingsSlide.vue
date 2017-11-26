<template>
    <div>
        <button @click="changeSlideEvent(SlidesEnum.MAIN)" class="button back"></button>
        <div class="simple-mode" @click="setSimpleMode(!settings.simpleMode)" :class="{active: settings.simpleMode}">Simple Mode</div>
        <div class="boxes-wrapper">
            <div class="box box-background--card">
            </div>
            <div class="box box-background--card">
            </div>
            <div class="box box-background--card active">
            </div>
        </div>

        <div class="boxes-wrapper">
            <div class="box box-background--sky">
            </div>
            <div class="box box-background--sky active">
            </div>
            <div class="box box-background--sky">
            </div>
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

    .boxes-wrapper {
        display:flex;
        flex-flow: row;
        margin: 3rem 0;
    }

    .simple-mode {
        margin-top: 6rem;
        border: 1rem solid white;
        border-radius: 3rem;
        font-size: 3rem;
        padding: 2rem 3.5rem;
        background: rgba(#fff, 0.5);

        &.active {
            border-color: #4993FF;
        }

        &:hover {
            cursor: pointer;
        }
    }

    .box {
        width: 15rem;
        height: 15rem;

        background: red;
        border: 1rem solid white;
        border-radius: 3rem;
        margin-right: 3rem;
        filter: grayscale(100%);
        transition: all 0.5s;

        &.active {
            border-color: #4993FF;
            filter: none;
        }

        &:last-child {
            margin-right: 0;
        }

        &:hover {
            cursor: pointer;
            filter: none;
        }

        &-background--sky {
            background: url("../assets/background-sky.jpg");
            background-size: cover;
        }

        &-background--card {
            background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/102308/card_backside.jpg");
            background-size: cover;
        }
    }
</style>
