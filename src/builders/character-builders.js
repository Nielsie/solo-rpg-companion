import {UUID} from "../utils/uuid.js";

const buildNewCharacter = (name, description, isActive = true, bio = null, id = UUID.generate(), created = new Date()) => ({
    id,
    name,
    description,
    isActive,
    created,
    updated: created,
    bio: bio ? [{
        id: UUID.generate(),
        body: bio,
        created: new Date(),
    }] : [],
});

const buildUpdatedCharacter = (id, name, description, isActive = true, updated = new Date()) => ({
    id,
    name,
    description,
    isActive,
    updated,
});

export const CHARACTER_BUILDERS = {
    buildNewCharacter,
    buildUpdatedCharacter,
};