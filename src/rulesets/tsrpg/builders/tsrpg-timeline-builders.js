import {UUID} from "../../../utils/uuid.js";

export const TSRPG_CARD_TYPES = {
    SKILLCHECK: 'SKILLCHECK',
};

export const TSRPG_CARD_TYPES_TO_STRING = {
    [TSRPG_CARD_TYPES.SKILLCHECK]: 'Skillcheck',
};

const skillCheckResult = (challenge, result) => ({
    id: UUID.generate(),
    created: new Date(),
    type: TSRPG_CARD_TYPES.SKILLCHECK,
    challenge,
    result,
});

export const TSRPG_TIMELINE_BUILDERS = {
    skillCheckResult,
};