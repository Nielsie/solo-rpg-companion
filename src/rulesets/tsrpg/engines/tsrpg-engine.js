import {DICE} from "../../../utils/dice.js";

const doChallenge = challenge => {
    const dmNumber = DICE.random(1, challenge.difficulty);
    const result = (Math.abs(dmNumber - challenge.guess)) <= challenge.statBonus;

    console.log(`TSRPG Challenge - dmNumber: ${dmNumber}, guess: ${challenge.guess}, statBonus: ${challenge.statBonus}, result: ${result ? 'SUCCESS' : 'FAILURE'}`);

    return {
        result,
        dmNumber,
    };
};

export const TSRPG = {
    doChallenge,
};