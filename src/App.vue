<template>
  <div id="app">
    <main-slide v-if="slideIndex == 0"/>
    <settings v-if="slideIndex == 1"/>
    <button v-on:click="changeSlide(0)">Main</button>
    <button v-on:click="changeSlide(1)">Settings</button>
  </div>
</template>

<script>
import MainSlide from './components/MainSlide';
import Settings from './components/Settings';

export default {
  name: 'app',
  components: {MainSlide, Settings},
  data () {
    return {
      slideIndex: 0
    };
  },

  methods: {
    changeSlide (index) {
      this.slideIndex = index;
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
