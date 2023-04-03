import {create} from "zustand";
import {persist, createJSONStorage, devtools} from "zustand/middleware";
import localforage from "localforage";
import {MEANING_TABLES} from "../../utils/mythic/mythic-constants.js";
import {ACTIONS_PART1, ACTIONS_PART2} from "../../utils/mythic/tables/actions.js";
import {DESCRIPTIONS_PART1, DESCRIPTIONS_PART2} from "../../utils/mythic/tables/descriptions.js";
import {MYTHIC_TABLES} from "../../utils/mythic/mythic-tables.js";

export const useMythicTablesStore = create(
    persist(
        devtools(
            (set, get) => ({
                tables: {
                    [MEANING_TABLES.ACTIONS]: ACTIONS_PART1,
                    [MEANING_TABLES.ACTIONS_PART2]: ACTIONS_PART2,
                    [MEANING_TABLES.DESCRIPTIONS]: DESCRIPTIONS_PART1,
                    [MEANING_TABLES.DESCRIPTIONS_PART2]: DESCRIPTIONS_PART2,

                    //...MYTHIC_TABLES,
                },
                editTableEntry: async (table, index, entry) => {
                    set((state) => ({ tables: {
                            ...state.tables,
                            [table]: {
                                ...state.tables[table],
                                [index]: entry,
                            },
                        },
                    }));
                },
                _hasHydrated: false,
                setHasHydrated: (state) => {
                    set({
                        _hasHydrated: state,
                        //tables: {...MYTHIC_TABLES},
                    });
                },
            })),
        {
            name: 'SRC-mythic-tables',
            storage: createJSONStorage(() => localforage),
            onRehydrateStorage: () => (state) => {
                state.setHasHydrated(true);
            },
        },
    ),
);