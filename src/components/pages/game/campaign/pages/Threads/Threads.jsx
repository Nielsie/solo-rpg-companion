import Box from "@mui/joy/Box";
import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../../layout/header/Master.jsx";
import {Button, Card, Link, Typography} from "@mui/joy";
import {Virtuoso} from 'react-virtuoso';
import {MuiStyledComponents} from "../list-components/ListComponents.jsx";
import {IconMenuButton} from "../../../../../layout/header/buttons/IconMenuButton";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useMemo} from "react";
import {ThreadCard} from "./cards/ThreadCard.jsx";

const renderThreadCard = index => {
    return (
        <ThreadCard index={index} />
    );
};

const ThreadsBase = props => {
    const headerProps = useMemo(() => mapHeader(props.campaignId), [props.campaignId]);

    return (
        <Master {...headerProps}>

            {props.totalCount === 0 && (
                <Box sx={{px: 2}}>
                    <Typography level="body2">You have no threads in your campaign yet! Let's create your first one!</Typography>
                    <Link href={`/game/${props.campaignId}/threads/new`}><Button sx={{mt: 1}}>New Thread</Button></Link>
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
                            itemContent={renderThreadCard}
                            initialTopMostItemIndex={(props.totalCount || 0) - 1}
                        />
                    </Box>
                </Box>
            )}
        </Master>
    );
};

const mapHeader = campaignId => ({
    title: `Threads`,
    leftButtonGroup: [() => <IconMenuButton href={`/game/${campaignId}`} icon={<ArrowBackIosNewIcon/>}/>],
    rightButtonGroup: [
        () => <IconMenuButton href={`/game/${campaignId}/threads/new`} icon={<PersonAddIcon/>}/>,
        /*() => <ToolButton campaignId={campaignId}/>,
        () => <HamburgerMenu menuItems={defaultMenu(campaignId)}/>,*/
    ],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
    state.threads,
]);

const mappers = (id, name, threads, ownProps) => ({
    campaignId: id,
    campaignName: name,
    totalCount: threads?.length || 0,
});

export const Threads = connectCampaign(selectors)(mappers)(ThreadsBase);