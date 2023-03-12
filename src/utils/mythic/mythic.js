import {fateMatrix} from "./fate-matrix.js";
import {DICE} from "../dice.js";
import {
    FATE_RESULTS,
    FATE_RESULTS_TO_STRING,
    MEANING_TABLES,
    NEW_SCENE_RESULT,
    PROBABILITY_TO_STRING
} from "./mythic-constants.js";
import {getRandomEventMatrix} from "./random-event-matrix.js";
import {MYTHIC_TABLES} from "./mythic-tables.js";
import {useCampaignStore} from "../../stores/campaigns/campaign-store.js";

const fateCheck = (probability, chaosFactor) => {
    console.log(`FATECHECK -- Probability: ${PROBABILITY_TO_STRING[probability]} - Chaosfactor: ${chaosFactor}`);
    const fateItem = fateMatrix[probability][chaosFactor - 1];
    const roll = DICE.d100();
    console.log(`FATECHECK -- rolled: ${roll}`);
    const isRandomEventPotential = roll % 11 === 0;
    const isRandomEvent = isRandomEventPotential && (roll / 11) <= chaosFactor;

    let fateResult = FATE_RESULTS.NO;
    if (roll <= fateItem.ey) fateResult = FATE_RESULTS.EXCEPTIONAL_YES;
    if (roll >= fateItem.en) fateResult = FATE_RESULTS.EXCEPTIONAL_NO;
    if (roll <= fateItem.y) fateResult = FATE_RESULTS.YES;

    console.log(`FATECHECK -- Result: ${FATE_RESULTS_TO_STRING[fateResult]} - isRandomEvent: ${isRandomEvent}`);

    return {
        fateResult,
        isRandomEvent,
    };
};

const getRandomEvent = () => {
    const campaign = useCampaignStore();
    const state = campaign.getState();
    const characters = state.characters;
    const threads = state.threads;

    const roll = DICE.d100();
    const event = getRandomEventMatrix()[roll];
    return {
        event,
        character: characters[DICE.random(0, characters.length - 1)],
        thread: threads[DICE.random(0, threads.length - 1)],
    };
};

const rollOnMeaningTable = (table) => {
    let table1 = MYTHIC_TABLES[table];
    let table2 = MYTHIC_TABLES[table];
    const roll1 = DICE.d100();
    const roll2 = DICE.d100();

    if (table === MEANING_TABLES.ACTIONS) {
        table2 = MYTHIC_TABLES[MEANING_TABLES.ACTIONS_PART2];
    } else if (table === MEANING_TABLES.DESCRIPTIONS) {
        table2 = MYTHIC_TABLES[MEANING_TABLES.DESCRIPTIONS_PART2];
    }

    return {
        table,
        word1: table1[roll1],
        word2: table2[roll2],
    };
};

const startNewScene = (chaosFactor) => {
    const roll = DICE.d10();

    return roll > chaosFactor ? NEW_SCENE_RESULT.NORMAL : roll % 2 === 0 ? NEW_SCENE_RESULT.INTERRUPTED : NEW_SCENE_RESULT.ALTERED;
};

export const MYTHIC = {
    fateCheck,
    getRandomEvent,
    rollOnMeaningTable,
    startNewScene,
};