import {UUID} from "../utils/uuid.js";

const buildNewCharacter = (name, description, isPlayer = false, isActive = true, bio = null, imageUrl = null, id = UUID.generate(), created = new Date()) => ({
    id,
    name,
    description,
    imageUrl,
    isPlayer,
    isActive,
    created,
    updated: created,
    bio: bio ? [{
        id: UUID.generate(),
        body: bio,
        created: new Date(),
    }] : [],
});

const buildUpdatedCharacter = (id, name, description, imageUrl, isPlayer = false, isActive = true, updated = new Date()) => ({
    id,
    name,
    description,
    imageUrl,
    isPlayer,
    isActive,
    updated,
});

export const CHARACTER_BUILDERS = {
    buildNewCharacter,
    buildUpdatedCharacter,
};