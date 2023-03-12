export const CARD_TYPES = {
    TEXT: 0,
    FATE_CHECK: 1,
    MEANING_ROLL: 2,


    CHARACTER_ADDED: 1001,
    CHARACTER_MODIFIED: 1002,
    CHARACTER_REMOVED: 1003,
};

export const CARD_TYPES_TO_STRING = {
    [CARD_TYPES.TEXT]: "Text",
    [CARD_TYPES.FATE_CHECK]: "Fate Check",
    [CARD_TYPES.MEANING_ROLL]: "Meaning Roll",


    [CARD_TYPES.CHARACTER_ADDED]: "Character Added",
    [CARD_TYPES.CHARACTER_MODIFIED]: "Character Modified",
    [CARD_TYPES.CHARACTER_REMOVED]: "Character Removed",
};