import Box from "@mui/joy/Box";
import {connectCampaign} from "../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../layout/header/Master.jsx";
import {Button, Stack, Typography} from "@mui/joy";
import {BackArrow} from "../../../../layout/header/buttons/BackArrow.jsx";
import {Link, useLocation} from "wouter";
import {useMemo} from "react";
import {MYTHIC_ENGINE} from "../../../../../engines/mythic/mythic-engine.js";

const ToolsHomeBase = props => {
    const [location, navigation] = useLocation();
    const headerProps = useMemo(() => mapHeader(props), [props.campaignName]);

    const onRandomEventClick = () => {
        MYTHIC_ENGINE.randomEvent();
        navigation(`/game/${props.campaignId}`);
    }

    return (
        <Master {...headerProps}>
            <Box sx={{px: 2}}>
                <Typography level="h6">
                    What do you want to do?
                </Typography>
                <Stack direction="column" spacing={2} mt={2}>
                    <Link href={`/game/${props.campaignId}/tools/fatecheck`}><Button>Fate Check</Button></Link>
                    <Link href={`/game/${props.campaignId}/tools/meaningrolls`}><Button>Action/Description/Element Roll</Button></Link>
                    <Button onClick={onRandomEventClick}>Random Event</Button>
                    <Link href={`/game/${props.campaignId}/scenes/new`}><Button>Start New Scene</Button></Link>
                    <Button>Roll Dice</Button>
                    <Button>Skill Check</Button>
                </Stack>
            </Box>
        </Master>
    );
};

const mapHeader = props => ({
    title: props.campaignName,
    leftButtonGroup: [() => <BackArrow />],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
]);

const mappers = (id, name, ownProps) => ({
    campaignId: id,
    campaignName: name,
});

export const ToolsHome = connectCampaign(selectors)(mappers)(ToolsHomeBase);