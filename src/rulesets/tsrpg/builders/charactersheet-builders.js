import {STATS} from "../constants/stats.js";

const initializeSheet = (characterId) => ({
    id: characterId,
    trait: {
        name: '',
        description: '',
    },
    stats: {
        [STATS.PHYSICAL]: {type: STATS.PHYSICAL, value: 0},
        [STATS.MENTAL]: {type: STATS.MENTAL, value: 0},
    },
    inventory: [],
});

export const CHARACTER_SHEET_BUILDERS = {
    initializeSheet,
};