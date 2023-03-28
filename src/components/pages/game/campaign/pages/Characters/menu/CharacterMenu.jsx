import {List, ListItem, ListItemButton, ListSubheader} from "@mui/joy";
import {Link} from "wouter";
import {useCampaignStore} from "../../../../../../../stores/campaigns/campaign-store.js";
import {useEffect, useState} from "react";

export const CharacterMenu = props => {
    const ruleset = useCampaignStore(props.campaignId)((state) => state.ruleSet);
    const [menuRenderer, setMenuRenderer] = useState(() => null);

    useEffect(() => {
        const loadMenu = async () => {
            try {
                const {renderCharacterMenu} = await import(`../../../../../../../rulesets/${ruleset.toLowerCase()}/menus/characterMenu.jsx`);
                setMenuRenderer(() => renderCharacterMenu);
            } catch {
                console.warn(`No character menus found for ruleset ${ruleset}`);
            }
        }
        loadMenu();
    }, [ruleset]);

    return (
        <List
            size="sm"
        >
            <ListItem nested>
                <ListSubheader>Character</ListSubheader>
                <List>
                    <ListItem>
                        <Link href={`/game/${props.campaignId}/characters/${props.characterId}`}><ListItemButton>Basic Info</ListItemButton></Link>
                    </ListItem>
                    {menuRenderer && menuRenderer(props.campaignId, props.characterId)}
                </List>
            </ListItem>
        </List>
    );
};

/*
const rulesetCharacterMenu = (ruleset, campaignId, characterId) => {
    switch (ruleset) {
        case RULESETS.TSRPG:
            return tsrpgCharacterMenu(campaignId, characterId);
        default:
            return null;
    }
};

export const characterMenu = (campaignId, characterId) => {
    const state = useCampaignStore(campaignId).getState();

    const ruleset = state.ruleSet;

    return (
        <List
            size="sm"
        >
            <ListItem nested>
                <ListSubheader>Character</ListSubheader>
                <List>
                    <ListItem>
                        <Link href={`/game/${campaignId}/characters/${characterId}`}><ListItemButton>Basic Info</ListItemButton></Link>
                    </ListItem>
                    {rulesetCharacterMenu(ruleset, campaignId, characterId)}
                </List>
            </ListItem>
        </List>
    );
};*/
