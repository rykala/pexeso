export default {
    methods: {
        switchSound(sound) {
            this.$emit('switchSoundEvent', sound);
        }
    }
};
