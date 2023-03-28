import {UUID} from "../utils/uuid.js";

const buildNewCharacter = (name, description, isActive = true, bio = null, imageUrl = null, id = UUID.generate(), created = new Date()) => ({
    id,
    name,
    description,
    imageUrl, //https://drive.google.com/uc?id=1GhyOVegzGt_ABW7z7EETwAbP_K_UusMz
    isActive,
    created,
    updated: created,
    bio: bio ? [{
        id: UUID.generate(),
        body: bio,
        created: new Date(),
    }] : [],
});

const buildUpdatedCharacter = (id, name, description, imageUrl, isActive = true, updated = new Date()) => ({
    id,
    name,
    description,
    imageUrl,
    isActive,
    updated,
});

export const CHARACTER_BUILDERS = {
    buildNewCharacter,
    buildUpdatedCharacter,
};