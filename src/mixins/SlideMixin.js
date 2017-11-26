export default {
    methods: {
        changeSlideEvent(slideIndex) {
            this.$emit('changeSlideEvent', slideIndex);
        }
    }
};
