import SlidesEnum from '../models/Enums.js';

export default {
    beforeCreate() {
        this.SlidesEnum = SlidesEnum;
    }
};
