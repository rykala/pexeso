import {SlidesEnum, GameModes} from '../models/Enums.js';

export default {
    beforeCreate() {
        this.SlidesEnum = SlidesEnum;
        this.GameModes = GameModes;
    }
};
