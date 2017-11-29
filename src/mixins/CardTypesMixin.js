import {CardTypes} from '../models/Enums.js';

export default {
    beforeCreate() {
        this.CardTypes = CardTypes;
    }
};
