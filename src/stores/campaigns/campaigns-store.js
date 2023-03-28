import {create} from "zustand";
import {persist, createJSONStorage, devtools} from "zustand/middleware";
import localforage from "localforage";
import {useCampaignStore} from "./campaign-store.js";

export const useCampaignsStore = create(
    persist(
        devtools(
        (set, get) => ({
            campaigns: [],
            addCampaign: async (newCampaign) => {
                set((state) => ({ campaigns: [...state.campaigns, newCampaign] }));
                useCampaignStore(newCampaign.id).setState({
                    ...newCampaign,
                });
            },
            removeCampaign: async (campaignId) => {
                set((state) => ({ campaigns: state.campaigns.filter((campaign) => campaign.id !== campaignId) }));
                await localforage.removeItem(`SRC-campaign-${campaignId}`);
            },
            changeRuleset: (campaignId, newRuleset) => {
                set((state) => ({
                    campaigns: state.campaigns.map((campaign) => {
                        if (campaign.id === campaignId) {
                            campaign.ruleSet = newRuleset;
                        }
                        return campaign;
                    }),
                }));
            },
            _hasHydrated: false,
            setHasHydrated: (state) => {
                set({
                    _hasHydrated: state,
                });
            },
        })),
        {
            name: 'SRC-campaign-storage',
            storage: createJSONStorage(() => localforage),
            onRehydrateStorage: () => (state) => {
                state.setHasHydrated(true);
            },
        },
    ),
);