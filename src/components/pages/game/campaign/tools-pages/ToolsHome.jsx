import Box from "@mui/joy/Box";
import {connectCampaign} from "../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../layout/header/Master.jsx";
import {Button, Stack, Typography} from "@mui/joy";
import {BackArrow} from "../../../../layout/header/buttons/BackArrow.jsx";
import {useLocation} from "wouter";
import {useMemo} from "react";

const ToolsHomeBase = props => {
    const [location, setLocation] = useLocation();
    const headerProps = useMemo(() => mapHeader(props), [props]);

    const onFateCheckClick = () => setLocation(`/game/${props.campaignId}/tools/fatecheck`);

    return (
        <Master {...headerProps}>
            <Box sx={{px: 2}}>
                <Typography level="h6">
                    What do you want to do?
                </Typography>
                <Stack direction="column" spacing={2} mt={2}>
                    <Button onClick={onFateCheckClick}>Fate Check</Button>
                    <Button>Action/Description/Element Roll</Button>
                    <Button>Start New Scene</Button>
                    <Button>Skill Check</Button>
                    <Button>Roll Dice</Button>
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