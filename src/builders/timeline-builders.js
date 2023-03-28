import {UUID} from "../utils/uuid.js";
import {CARD_TYPES} from "../components/pages/game/campaign/pages/Timeline/timeline-constants.js";

const freeTextMessage = message => ({
    id: UUID.generate(),
    created: new Date(),
    type: CARD_TYPES.TEXT,
    body: message,
})

const characterAdded = (newCharacter) => ({
    id: UUID.generate(),
    created: new Date(),
    type: CARD_TYPES.CHARACTER_ADDED,
    characterId: newCharacter.id,
});

const characterBioAdded = (characterId, newBio) => ({
    id: UUID.generate(),
    created: new Date(),
    type: CARD_TYPES.CHARACTER_BIO_ADDED,
    characterId,
    bioId: newBio.id,
});

const sceneAdded = (newScene) => ({
    id: UUID.generate(),
    created: new Date(),
    type: CARD_TYPES.SCENE_ADDED,
    sceneId: newScene.id,
});

export const TIMELINE_BUILDERS = {
    freeTextMessage,
    characterAdded,
    characterBioAdded,
    sceneAdded,
};