import {connectCampaign} from "../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../layout/header/Master.jsx";
import {Button, Stack} from "@mui/joy";
import {BackArrow} from "../../../../layout/header/buttons/BackArrow.jsx";
import FormLabel from '@mui/joy/FormLabel';
import {useMemo} from "react";
import {MYTHIC_ENGINE} from "../../../../../engines/mythic/mythic-engine.js";
import {WOUTER} from "../../../../../utils/wouter/wouter-extensions.js";

const ToolsMeaningRollsBase = props => {
    const headerProps = useMemo(() => mapHeader(), []);

    const onTableClick = (table) => () => props.onTableClick && props.onTableClick(table);

    return (
        <Master {...headerProps}>
            <Stack direction="column" spacing={2} sx={{px: 2}}>
                <FormLabel>On which table do you want to roll?</FormLabel>
                <Stack direction="column" spacing={2} mt={2}>
                    <Button onClick={onTableClick(0)}>Meaning Tables: Actions</Button>
                    <Button onClick={onTableClick(1)}>Meaning Tables: Descriptions</Button>
                    <Button onClick={onTableClick(2)}>Meaning Tables: Elements - Adventure Tone</Button>
                    <Button onClick={onTableClick(3)}>Meaning Tables: Elements - Alien Species</Button>
                    <Button onClick={onTableClick(4)}>Meaning Tables: Elements - Animal Actions</Button>
                    <Button onClick={onTableClick(5)}>Meaning Tables: Elements - Army Descriptors</Button>
                    <Button onClick={onTableClick(6)}>Meaning Tables: Elements - Cavern Descriptors</Button>
                    <Button onClick={onTableClick(7)}>Meaning Tables: Elements - Characters</Button>
                    <Button onClick={onTableClick(8)}>Meaning Tables: Elements - Character Actions - Combat</Button>
                    <Button onClick={onTableClick(9)}>Meaning Tables: Elements - Character Actions - General</Button>
                    <Button onClick={onTableClick(10)}>Meaning Tables: Elements - Character Appearance</Button>
                    <Button onClick={onTableClick(11)}>Meaning Tables: Elements - Character Background</Button>
                    <Button onClick={onTableClick(12)}>Meaning Tables: Elements - Character Conversations</Button>
                    <Button onClick={onTableClick(13)}>Meaning Tables: Elements - Character Descriptors</Button>
                    <Button onClick={onTableClick(14)}>Meaning Tables: Elements - Character Identity</Button>
                    <Button onClick={onTableClick(15)}>Meaning Tables: Elements - Character Motivations</Button>
                    <Button onClick={onTableClick(16)}>Meaning Tables: Elements - Character Personality</Button>
                    <Button onClick={onTableClick(17)}>Meaning Tables: Elements - Character Skills</Button>
                    <Button onClick={onTableClick(18)}>Meaning Tables: Elements - Character Traits & Flaws</Button>
                    <Button onClick={onTableClick(19)}>Meaning Tables: Elements - City Descriptors</Button>
                    <Button onClick={onTableClick(20)}>Meaning Tables: Elements - Civilization Descriptors</Button>
                    <Button onClick={onTableClick(21)}>Meaning Tables: Elements - Creature Abilities</Button>
                    <Button onClick={onTableClick(22)}>Meaning Tables: Elements - Creature Descriptors</Button>
                    <Button onClick={onTableClick(23)}>Meaning Tables: Elements - Cryptic Message</Button>
                    <Button onClick={onTableClick(24)}>Meaning Tables: Elements - Curses</Button>
                    <Button onClick={onTableClick(25)}>Meaning Tables: Elements - Domicile Descriptors</Button>
                    <Button onClick={onTableClick(26)}>Meaning Tables: Elements - Dungeon Descriptors</Button>
                    <Button onClick={onTableClick(27)}>Meaning Tables: Elements - Dungeon Traps</Button>
                    <Button onClick={onTableClick(28)}>Meaning Tables: Elements - Forest Descriptors</Button>
                    <Button onClick={onTableClick(29)}>Meaning Tables: Elements - Gods</Button>
                    <Button onClick={onTableClick(30)}>Meaning Tables: Elements - Legends</Button>
                    <Button onClick={onTableClick(31)}>Meaning Tables: Elements - Locations</Button>
                    <Button onClick={onTableClick(32)}>Meaning Tables: Elements - Magic Item Descriptors</Button>
                    <Button onClick={onTableClick(33)}>Meaning Tables: Elements - Mutation Descriptors</Button>
                    <Button onClick={onTableClick(34)}>Meaning Tables: Elements - Names</Button>
                    <Button onClick={onTableClick(35)}>Meaning Tables: Elements - Noble House</Button>
                    <Button onClick={onTableClick(36)}>Meaning Tables: Elements - Objects</Button>
                    <Button onClick={onTableClick(37)}>Meaning Tables: Elements - Plot Twists</Button>
                    <Button onClick={onTableClick(38)}>Meaning Tables: Elements - Powers</Button>
                    <Button onClick={onTableClick(39)}>Meaning Tables: Elements - Scavenging Results</Button>
                    <Button onClick={onTableClick(40)}>Meaning Tables: Elements - Smells</Button>
                    <Button onClick={onTableClick(41)}>Meaning Tables: Elements - Sounds</Button>
                    <Button onClick={onTableClick(42)}>Meaning Tables: Elements - Spell Effects</Button>
                    <Button onClick={onTableClick(43)}>Meaning Tables: Elements - Starship Descriptors</Button>
                    <Button onClick={onTableClick(44)}>Meaning Tables: Elements - Terrain Descriptors</Button>
                    <Button onClick={onTableClick(45)}>Meaning Tables: Elements - Undead Descriptors</Button>
                    <Button onClick={onTableClick(46)}>Meaning Tables: Elements - Vision & Dreams</Button>
                </Stack>
            </Stack>
        </Master>
    );
};

const mapHeader = props => ({
    title: `Meaning Table Rolls`,
    leftButtonGroup: [() => <BackArrow />],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
]);

const mappers = (id, name, ownProps) => ({
    campaignId: id,
    campaignName: name,
    onTableClick: (table) => {
        MYTHIC_ENGINE.tableRoll(table);
        WOUTER.navigation(`/game/${id}`, {replace: true});
    },
});

export const ToolsMeaningRolls = connectCampaign(selectors)(mappers)(ToolsMeaningRollsBase);