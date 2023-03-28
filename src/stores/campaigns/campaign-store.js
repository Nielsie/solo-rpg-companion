import {create} from "zustand";
import {persist, createJSONStorage, devtools} from "zustand/middleware";
import localforage from "localforage";
import {timelineActions} from "./campaign-actions/timeline-actions.js";
import {characterActions} from "./campaign-actions/character-actions.js";
import {threadActions} from "./campaign-actions/thread-actions.js";
import {sceneActions} from "./campaign-actions/scene-actions.js";
import {loadRuleset} from "./campaign-actions/rulesets/rulesetLoader.js";
import {debugActions} from "./campaign-actions/debug-actions.js";

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
                    ...threadActions(set),
                    ...sceneActions(set),
                    ...debugActions(set),

                    // safe defaults
                    characters: [],
                    threads: [],
                    scenes: [],

                    _hasHydrated: false,
                    setHasHydrated: async (state) => {
                        set({
                            loadRuleset: async () => loadRuleset(set, get),
                            _hasHydrated: false,
                        });
                        await get().loadRuleset();
                        console.log('Ruleset actions have finished loading');
                        set({
                            _hasHydrated: state,
                        });
                    },
                }), { name, store: `campaign-store-${id}` }),
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