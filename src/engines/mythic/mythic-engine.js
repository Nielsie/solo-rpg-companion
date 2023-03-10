import {useCampaignStore} from "../../stores/campaigns/campaign-store.js";
import {MYTHIC} from "../../utils/mythic/mythic.js";
import {FATE_RESULTS_TO_STRING, RANDOM_EVENTS_TO_STRING} from "../../utils/mythic/mythic-constants.js";
import {UUID} from "../../utils/uuid.js";
import {CARD_TYPES} from "../../components/pages/game/campaign/pages/Timeline/timeline-constants.js";

const fateCheck = (probability, question) => {
    const campaign = useCampaignStore();
    const chaosFactor = campaign.getState().mythic.chaosFactor;
    const result = MYTHIC.fateCheck(probability, chaosFactor);

    /*let body = question ? `${question} - The answer is '${FATE_RESULTS_TO_STRING[result.fateResult]}'.` :
        `You asked a question, the answer is '${FATE_RESULTS_TO_STRING[result.fateResult]}'.`;
    if (result.isRandomEvent) {
        const randomEvent = MYTHIC.getRandomEvent();
        body += ` Oh no! A '${RANDOM_EVENTS_TO_STRING[randomEvent.event]}' has happened as well.`;
    }*/

    if (result.isRandomEvent) {
        result.randomEvent = MYTHIC.getRandomEvent();
    }

    const newEntry = {
        id: UUID.generate(),
        created: new Date(),
        type: CARD_TYPES.FATE_CHECK,
        probability,
        chaosFactor,
        question,
        result,
    };
    campaign.getState().addTimelineEntry(newEntry);
};

export const MYTHIC_ENGINE = {
    fateCheck,
};