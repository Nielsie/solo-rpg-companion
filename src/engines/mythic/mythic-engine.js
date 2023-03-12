import {useCampaignStore} from "../../stores/campaigns/campaign-store.js";
import {MYTHIC} from "../../utils/mythic/mythic.js";
import {UUID} from "../../utils/uuid.js";
import {CARD_TYPES} from "../../components/pages/game/campaign/pages/Timeline/timeline-constants.js";
import {MYTHIC_TABLES} from "../../utils/mythic/mythic-tables.js";
import {MEANING_TABLES} from "../../utils/mythic/mythic-constants.js";
import {DICE} from "../../utils/dice.js";

const fateCheck = (probability, question) => {
    const campaign = useCampaignStore();
    const chaosFactor = campaign.getState().mythic.chaosFactor;
    const result = MYTHIC.fateCheck(probability, chaosFactor);

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

const tableRoll = (table) => {
    const campaign = useCampaignStore();
    const result = MYTHIC.rollOnMeaningTable(table);

    const newEntry = {
        id: UUID.generate(),
        created: new Date(),
        type: CARD_TYPES.MEANING_ROLL,
        result,
    };
    campaign.getState().addTimelineEntry(newEntry);
};

export const MYTHIC_ENGINE = {
    fateCheck,
    tableRoll,
};