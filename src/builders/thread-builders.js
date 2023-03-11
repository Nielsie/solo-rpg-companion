import {UUID} from "../utils/uuid.js";

const buildNewThread = (name, description, isInProgress = true, note = null, id = UUID.generate(), created = new Date()) => ({
    id,
    name,
    description,
    isInProgress,
    created,
    updated: created,
    notes: note ? [{
        id: UUID.generate(),
        body: note,
        created: new Date(),
    }] : [],
});

const buildUpdatedThread = (id, name, description, isInProgress = true, updated = new Date()) => ({
    id,
    name,
    description,
    isInProgress,
    updated,
});

export const THREAD_BUILDERS = {
    buildNewThread,
    buildUpdatedThread,
};