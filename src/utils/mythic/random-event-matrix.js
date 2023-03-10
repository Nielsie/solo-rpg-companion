import {RANDOM_EVENTS} from "./mythic-constants.js";

let randomEventMatrix = null;

/*
1-5 Remote Event
6-10 Ambiguous Event
11-20 New NPC
21-40 NPC Action
41-45 NPC Negative
46-50 NPC Positive
51-55 Move Toward A Thread
56-65 Move Away From A Thread
66-70 Close A Thread
71-80 PC Negative
81-85 PC Positive
86-100 Current Context
 */

export const getRandomEventMatrix = () => {
    if (randomEventMatrix) {
        return randomEventMatrix;
    }

    randomEventMatrix = [];
    for(let i = 1; i < 101; i++) {
        if (i <= 5)
            randomEventMatrix[i] = RANDOM_EVENTS.REMOTE_EVENT;
        else if (i <= 10)
            randomEventMatrix[i] = RANDOM_EVENTS.AMBIGUOUS_EVENT;
        else if (i <= 20)
            randomEventMatrix[i] = RANDOM_EVENTS.NEW_NPC;
        else if (i <= 40)
            randomEventMatrix[i] = RANDOM_EVENTS.NPC_ACTION;
        else if (i <= 45)
            randomEventMatrix[i] = RANDOM_EVENTS.NPC_NEGATIVE;
        else if (i <= 50)
            randomEventMatrix[i] = RANDOM_EVENTS.NPC_POSITIVE;
        else if (i <= 55)
            randomEventMatrix[i] = RANDOM_EVENTS.MOVE_TOWARDS_THREAD;
        else if (i <= 65)
            randomEventMatrix[i] = RANDOM_EVENTS.MOVE_AWAY_FORM_THREAD;
        else if (i <= 70)
            randomEventMatrix[i] = RANDOM_EVENTS.CLOSE_A_THREAD;
        else if (i <= 80)
            randomEventMatrix[i] = RANDOM_EVENTS.PC_NEGATIVE;
        else if (i <= 85)
            randomEventMatrix[i] = RANDOM_EVENTS.PC_POSITIVE;
        else if (i <= 100)
            randomEventMatrix[i] = RANDOM_EVENTS.CURRENT_CONTEXT;
    }

    return randomEventMatrix;
};