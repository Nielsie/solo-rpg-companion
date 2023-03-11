import {UUID} from "../utils/uuid.js";
import {CARD_TYPES} from "../components/pages/game/campaign/pages/Timeline/timeline-constants.js";

const characterAdded = (newCharacter) => ({
    id: UUID.generate(),
    created: new Date(),
    type: CARD_TYPES.CHARACTER_ADDED,
    characterId: newCharacter.id,
});

export const TIMELINE_BUILDERS = {
    characterAdded,
};