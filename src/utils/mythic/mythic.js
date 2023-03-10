import {fateMatrix} from "./fate-matrix.js";
import {DICE} from "../dice.js";
import {FATE_RESULTS, FATE_RESULTS_TO_STRING, PROBABILITY_TO_STRING} from "./mythic-constants.js";
import {getRandomEventMatrix} from "./random-event-matrix.js";

const fateCheck = (probability, chaosFactor) => {
    console.log(`FATECHECK -- Probability: ${PROBABILITY_TO_STRING[probability]} - Chaosfactor: ${chaosFactor}`);
    const fateItem = fateMatrix[probability][chaosFactor - 1];
    const roll = DICE.d100();
    console.log(`FATECHECK -- rolled: ${roll}`);
    const isRandomEventPotential = roll % 11 === 0;
    const isRandomEvent = isRandomEventPotential && (roll / 11) <= chaosFactor;

    let fateResult = FATE_RESULTS.NO;
    if (roll <= fateItem.ey) fateResult = FATE_RESULTS.EXCEPTIONAL_YES;
    if (roll >= fateItem.en) fateResult =  FATE_RESULTS.EXCEPTIONAL_NO;
    if (roll <= fateItem.y) fateResult =  FATE_RESULTS.YES;

    console.log(`FATECHECK -- Result: ${FATE_RESULTS_TO_STRING[fateResult]} - isRandomEvent: ${isRandomEvent}`);

    return {
        fateResult,
        isRandomEvent,
    };
};

const getRandomEvent = () => {
    const roll = DICE.d100();
    const event = getRandomEventMatrix()[roll];
    return {
        event,
    };
};

export const MYTHIC = {
    fateCheck,
    getRandomEvent,
};