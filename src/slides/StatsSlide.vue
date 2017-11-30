<template>
    <div>
        <button @click="changeSlideEvent(SlidesEnum.MAIN)" class="button back"></button>

        <div class="container center">
            <div class="boxes-wrapper">
                <div class="box box-background--single" @click="mode = 'single'"
                     :class="{ active: mode === 'single' }">
                </div>
                <div class="box box-background--multi" @click="mode = 'multi'"
                     :class="{ active: mode === 'multi'}">
                </div>
            </div>

            <div class="table">
                <div class="head">
                    <div class="row">
                        <div class="rank">Rank</div>
                        <div class="name">Name</div>
                        <div class="score">Score</div>
                    </div>
                </div>

                <scroll-bar classes="my-scrollbar" ref="Scrollbar">
                    <div>
                        <div class="body" v-if="mode === 'single'" v-for="(player, index) in statsData.singlePlayer">
                            <div class="row" :class="{even: index % 2 === 1}">
                                <div class="rank">{{player.rank}}</div>
                                <div class="name">{{player.name}}</div>
                                <div class="score">{{player.score}}</div>
                            </div>
                        </div>

                        <div class="body" v-if="mode === 'multi'" v-for="(player, index) in statsData.multiPlayer">
                            <div class="row" :class="{even: index % 2 === 1}">
                                <div class="rank">{{player.rank}}</div>
                                <div class="name">{{player.name}}</div>
                                <div class="score">{{player.score}}</div>
                            </div>
                        </div>
                    </div>
                </scroll-bar>
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

    import ScrollBar from 'vue2-scrollbar';

    export default {
        mixins: [SlideMixin, SlidesEnumMixin, SoundMixin],

        components: {ScrollBar},

        props: ['settings', 'statsData'],

        data() {
            return {
                mode: 'single'
            };
        }
    };
</script>

<style lang="scss">
    .my-scrollbar {
        max-height: 40rem;
        min-height: 40rem;
    }

    .table {
        width: 50rem;
        box-shadow: 5px 5px 15px 0 rgba(0, 0, 0, 0.5);
        background-color: white;
        border-radius: 3rem;
        font-size: 1.4rem;
        overflow: hidden;
        text-align: center;
        padding: 0;

        .head {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 1.6rem;
            color: white;
        }

        .rank {
            width: 20%;
        }

        .name {
            width: 45%;
        }

        .score {
            width: 30%;
        }
    }

    .row > div {
        padding: 2.5rem 3rem;
        display: inline-block;
        box-sizing: border-box;

    }

    .row {
        width: 100%;
        padding: 0;
        margin: 0;
    }

    .row:nth-child(even) {
        background-color: #dddddd;
    }

    .box-background--multi {
        background-image: url('../assets/icons/multiplayer.svg');
        background-size: cover;
        background-repeat: no-repeat;
        background-color: white;
        width: 8rem !important;
        height: 8rem !important;
    }

    .box-background--single {
        background-image: url('../assets/icons/singleplayer.svg');
        background-size: cover;
        background-repeat: no-repeat;
        background-color: white;
        width: 8rem !important;
        height: 8rem !important;
    }
</style>
