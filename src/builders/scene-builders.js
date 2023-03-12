import {UUID} from "../utils/uuid.js";
import {NEW_SCENE_RESULT} from "../utils/mythic/mythic-constants.js";

const initialScene = {
    id: UUID.generate(),
    title: "",
    description: "",
    chaosFactor: 0,
    created: new Date(),
    updated: new Date(),
    originalTitle: "",
    originalDescription: "",
    sceneStatus: NEW_SCENE_RESULT.NORMAL,
};

const buildNewScene = (title, description, chaosFactor, id = UUID.generate(), created = new Date()) => ({
    id,
    title,
    description,
    chaosFactor,
    created,
    updated: created,
    originalTitle: title,
    originalDescription: description,
});

const buildUpdatedScene = (id, title, description, updated = new Date()) => ({
    id,
    title,
    description,
    updated,
});

export const SCENE_BUILDERS = {
    initialScene,
    buildNewScene,
    buildUpdatedScene,
};