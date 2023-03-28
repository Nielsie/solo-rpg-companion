import {RANDOM_EVENTS, RANDOM_EVENTS_TO_STRING} from "../mythic/mythic-constants.js";

const formatRandomEvent = (randomEvent, showCharacter = true, showThread = true) => {
    if (!randomEvent) return '';

    const eventStr = RANDOM_EVENTS_TO_STRING[randomEvent.event];
    if (showCharacter && randomEvent.character && (
        randomEvent.event === RANDOM_EVENTS.NPC_ACTION
        || randomEvent.event === RANDOM_EVENTS.NPC_POSITIVE
        || randomEvent.event === RANDOM_EVENTS.NPC_NEGATIVE
    )) {
        return `${eventStr} (${randomEvent.character.name} - ${randomEvent.character.description})`;
    }

    if (showThread && randomEvent.thread && (
        randomEvent.event === RANDOM_EVENTS.CLOSE_A_THREAD
        || randomEvent.event === RANDOM_EVENTS.MOVE_AWAY_FORM_THREAD
        || randomEvent.event === RANDOM_EVENTS.MOVE_TOWARDS_THREAD
    )) {
        return `${eventStr} (${randomEvent.thread.name})`;
    }
    return eventStr;
};

export const RANDOM_EVENT_FORMATTERS = {
    formatRandomEvent,
};