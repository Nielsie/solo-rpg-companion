export const FATE_RESULTS = {
    EXCEPTIONAL_YES: 2,
    YES: 1,
    NO: 0,
    EXCEPTIONAL_NO: -1,
};

export const FATE_RESULTS_TO_STRING = {
    [FATE_RESULTS.EXCEPTIONAL_YES]: 'Exceptional Yes',
    [FATE_RESULTS.YES]: 'Yes',
    [FATE_RESULTS.NO]: 'No',
    [FATE_RESULTS.EXCEPTIONAL_NO]: 'Exceptional No',
};

export const PROBABILITY_TO_STRING = {
    [0]: 'Certain',
    [1]: 'Nearly Certain',
    [2]: 'Very Likely',
    [3]: 'Likely',
    [4]: 'Even Chance',
    [5]: 'Unlikely',
    [6]: 'Very Unlikely',
    [7]: 'Nearly Impossible',
    [8]: 'Impossible',
};

export const RANDOM_EVENTS = {
    REMOTE_EVENT: 0,
    AMBIGUOUS_EVENT: 1,
    NEW_NPC: 2,
    NPC_ACTION: 3,
    NPC_NEGATIVE: 4,
    NPC_POSITIVE: 5,
    MOVE_TOWARDS_THREAD: 6,
    MOVE_AWAY_FORM_THREAD: 7,
    CLOSE_A_THREAD: 8,
    PC_NEGATIVE: 9,
    PC_POSITIVE: 10,
    CURRENT_CONTEXT: 11,
};

export const RANDOM_EVENTS_TO_STRING = {
    [RANDOM_EVENTS.REMOTE_EVENT]: 'Remote Event',
    [RANDOM_EVENTS.AMBIGUOUS_EVENT]: 'Ambiguous Event',
    [RANDOM_EVENTS.NEW_NPC]: 'New NPC Event',
    [RANDOM_EVENTS.NPC_ACTION]: 'NPC Action Event',
    [RANDOM_EVENTS.NPC_NEGATIVE]: 'NPC Negative Event',
    [RANDOM_EVENTS.NPC_POSITIVE]: 'NPC Positive Event',
    [RANDOM_EVENTS.MOVE_TOWARDS_THREAD]: 'Move Towards A Thread Event',
    [RANDOM_EVENTS.MOVE_AWAY_FORM_THREAD]: 'Move Away From A Thread Event',
    [RANDOM_EVENTS.CLOSE_A_THREAD]: 'Close A Thread Event',
    [RANDOM_EVENTS.PC_NEGATIVE]: 'PC Negative Event',
    [RANDOM_EVENTS.PC_POSITIVE]: 'PC Positive Event',
    [RANDOM_EVENTS.CURRENT_CONTEXT]: 'Current Context Event',
};