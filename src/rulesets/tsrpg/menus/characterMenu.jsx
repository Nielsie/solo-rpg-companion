import {ListItem, ListItemButton} from "@mui/joy";
import {Link} from "wouter";

export const renderCharacterMenu = (campaignId, characterId) => {
    return (
        <ListItem>
            <Link href={`/game/${campaignId}/characters/${characterId}/charactersheet`}><ListItemButton>Character Sheet</ListItemButton></Link>
        </ListItem>
    );
};