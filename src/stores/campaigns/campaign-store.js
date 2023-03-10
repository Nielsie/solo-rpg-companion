import {create} from "zustand";
import {persist, createJSONStorage, devtools} from "zustand/middleware";
import localforage from "localforage";
import {timelineActions} from "./campaign-actions/timeline-actions.js";
import {characterActions} from "./campaign-actions/character-actions.js";

// this is a bit of a hack, this keeps the current campaignId cached in memory, so we don't have to retrieve it from the url all the time
let currentId = null;

const cache = {};

export const useCampaignStore = (id) => {
    let campaignId = id || currentId;
    currentId = campaignId;

    if (cache[campaignId]) {
        return cache[campaignId];
    }

    const newCampaign = create(
        persist(
            devtools(
                (set, get) => ({
                    // actions
                    ...timelineActions(set),
                    ...characterActions(set),

                    // safe defaults
                    characters: [],

                    _hasHydrated: false,
                    setHasHydrated: (state) => {
                        set({
                            _hasHydrated: state,
                        });
                    },
                })),
            {
                name: `SRC-campaign-${campaignId}`,
                storage: createJSONStorage(() => localforage),
                onRehydrateStorage: () => (state) => {
                    state.setHasHydrated(true);
                },
            },
        ),
    );

    cache[campaignId] = newCampaign;
    return newCampaign;
};