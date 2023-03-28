import Box from "@mui/joy/Box";
import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../../layout/header/Master.jsx";
import {HamburgerMenu} from "../../../../../layout/header/buttons/HamburgerMenu.jsx";
import {defaultMenu} from "../../../../../layout/header/menus/defaultMenu.jsx";
import {Button, IconButton, Input, Sheet, Stack} from "@mui/joy";
import CasinoIcon from '@mui/icons-material/Casino';
import {ToolButton} from "../../../../../layout/header/buttons/ToolButton.jsx";
import {Virtuoso} from 'react-virtuoso';
import {MuiStyledComponents} from "../list-components/ListComponents.jsx";
import {MasterCard} from "../cards/MasterCard.jsx";
import {useMemo, useState} from "react";
import MessageIcon from '@mui/icons-material/Message';
import {TIMELINE_BUILDERS} from "../../../../../../builders/timeline-builders.js";

const renderTimeLineCard = index => {
    return (
        <MasterCard index={index} />
    );
};

const TimelineBase = props => {
    const headerProps = useMemo(() => mapHeader(props), [props]);
    const [freeTextMessage, setFreeTextMessage] = useState('');

    const onMessageChange = (event) => setFreeTextMessage(event.target.value);
    const onMessageSubmitClick = () => {
        props.onMessageSubmitClick && props.onMessageSubmitClick(freeTextMessage);
        setFreeTextMessage('');
    };

    return (
        <Master {...headerProps}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            }}>
                {/*<Box sx={{px: 2}}>
                    Timeline for {props.campaignName}
                </Box>*/}

                <Box sx={{px: 2, height: '100%'}}>
                    <Virtuoso
                        style={{height: '100%'}}
                        totalCount={props.totalCount}
                        components={MuiStyledComponents}
                        itemContent={renderTimeLineCard}
                        initialTopMostItemIndex={(props.totalCount || 0) - 1}
                        followOutput={'auto'}
                    />
                </Box>

                <Box>
                    <Sheet
                        elevation={3}
                        variant="soft"
                        color="primary"
                        sx={{p: 1}}
                    >
                        <Input
                            startDecorator={<MessageIcon />}
                            endDecorator={<Button onClick={onMessageSubmitClick}>Submit Message</Button>}
                            onChange={onMessageChange}
                            value={freeTextMessage}
                        />
                    </Sheet>
                </Box>
            </Box>
        </Master>
    );
};

const mapHeader = props => ({
    title: props.campaignName,
    rightButtonGroup: [
        () => <ToolButton campaignId={props.campaignId}/>,
        () => <HamburgerMenu menuItems={defaultMenu(props.campaignId)}/>,
    ],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
    state.timeline,
    state.addTimelineEntry,
]);

const mappers = (id, name, timeline, addTimelineEntry, ownProps) => ({
    campaignId: id,
    campaignName: name,
    totalCount: timeline?.length || 0,
    onMessageSubmitClick: (message) => addTimelineEntry(TIMELINE_BUILDERS.freeTextMessage(message)),
});

export const Timeline = connectCampaign(selectors)(mappers)(TimelineBase);