import Box from "@mui/joy/Box";
import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../../layout/header/Master.jsx";
import {Button, Typography} from "@mui/joy";
import {Virtuoso} from 'react-virtuoso';
import {MuiStyledComponents} from "../list-components/ListComponents.jsx";
import {IconMenuButton} from "../../../../../layout/header/buttons/IconMenuButton";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useMemo} from "react";
import {SceneCard} from "./cards/SceneCard.jsx";
import {Link} from "wouter";

const renderSceneCard = index => {
    return (
        <SceneCard index={index} />
    );
};

const ScenesBase = props => {
    const headerProps = useMemo(() => mapHeader(props.campaignId), [props.campaignId]);

    return (
        <Master {...headerProps}>

            {props.totalCount === 0 && (
                <Box sx={{px: 2}}>
                    <Typography level="body2">You have no scenes in your campaign yet! Let's create your first one!</Typography>
                    <Link href={`/game/${props.campaignId}/scenes/new`}><Button sx={{mt: 1}}>New Scene</Button></Link>
                </Box>
            )}

            {props.totalCount > 0 && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                }}>
                    <Box sx={{px: 2, height: '100%'}}>
                        <Virtuoso
                            style={{height: '100%'}}
                            totalCount={props.totalCount}
                            components={MuiStyledComponents}
                            itemContent={renderSceneCard}
                            initialTopMostItemIndex={(props.totalCount || 0) - 1}
                        />
                    </Box>
                </Box>
            )}
        </Master>
    );
};

const mapHeader = campaignId => ({
    title: `Scenes`,
    leftButtonGroup: [() => <IconMenuButton href={`/game/${campaignId}`} icon={<ArrowBackIosNewIcon/>}/>],
    rightButtonGroup: [
        () => <IconMenuButton href={`/game/${campaignId}/scenes/new`} icon={<LibraryAddIcon/>}/>,
        /*() => <ToolButton campaignId={campaignId}/>,
        () => <HamburgerMenu menuItems={defaultMenu(campaignId)}/>,*/
    ],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
    state.scenes,
]);

const mappers = (id, name, scenes, ownProps) => ({
    campaignId: id,
    campaignName: name,
    totalCount: scenes?.length || 0,
});

export const Scenes = connectCampaign(selectors)(mappers)(ScenesBase);