import {List, ListItem, ListItemButton, ListSubheader} from "@mui/joy";
import {Link} from "wouter";

export const defaultMenu = (campaignId) => {
    return (
        <List
            size="sm"
        >
            <ListItem nested>
                <ListSubheader>Campaign</ListSubheader>
                <List>
                    <ListItem>
                        <Link href={`/game/${campaignId}`}><ListItemButton>Timeline</ListItemButton></Link>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>Player</ListItemButton>
                    </ListItem>
                    <ListItem>
                        <Link href={`/game/${campaignId}/scenes`}><ListItemButton>Scenes</ListItemButton></Link>
                    </ListItem>
                    <ListItem>
                        <Link href={`/game/${campaignId}/characters`}><ListItemButton>Characters</ListItemButton></Link>
                    </ListItem>
                    {/*<ListItem>
                        <ListItemButton>Mobs</ListItemButton>
                    </ListItem>*/}
                    <ListItem>
                        <Link href={`/game/${campaignId}/threads`}><ListItemButton>Threads</ListItemButton></Link>
                    </ListItem>
                    {/*<ListItem>
                        <ListItemButton>Combat Tracker</ListItemButton>
                    </ListItem>*/}
                </List>
            </ListItem>
            <ListItem nested>
                <ListSubheader>App</ListSubheader>
                <List>
                    <ListItem>
                        <Link href="/"><ListItemButton>Home</ListItemButton></Link>
                    </ListItem>
                </List>
            </ListItem>
        </List>
    );
};