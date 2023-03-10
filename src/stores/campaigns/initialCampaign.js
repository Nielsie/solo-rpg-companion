import {CARD_TYPES} from "../../components/pages/game/campaign/pages/Timeline/timeline-constants.js";
import {UUID} from "../../utils/uuid.js";

export const createInitialCampaign = (id, campaignName, ruleSet) => ({
    id,
    name: campaignName,
    created: new Date(),
    ruleSet,

    mythic: {
        chaosFactor: 5,
    },

    timeline: [{
        id: UUID.generate(),
        created: new Date(),
        type: CARD_TYPES.TEXT,
        body: `Your adventure '${campaignName}' begins here! Enjoy!`,
    }],

    characters: [],
});