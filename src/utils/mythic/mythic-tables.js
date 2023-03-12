import {MEANING_TABLES} from "./mythic-constants.js";
import {ACTIONS_PART1, ACTIONS_PART2} from "./tables/actions.js";
import {DESCRIPTIONS_PART1, DESCRIPTIONS_PART2} from "./tables/descriptions.js";


export const MYTHIC_TABLES = {
    [MEANING_TABLES.ACTIONS]: ACTIONS_PART1,
    [MEANING_TABLES.ACTIONS_PART2]: ACTIONS_PART2,
    [MEANING_TABLES.DESCRIPTIONS]: DESCRIPTIONS_PART1,
    [MEANING_TABLES.DESCRIPTIONS_PART2]: DESCRIPTIONS_PART2,
};