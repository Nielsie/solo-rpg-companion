import Box from "@mui/joy/Box";
import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../../layout/header/Master.jsx";
import {HamburgerMenu} from "../../../../../layout/header/buttons/HamburgerMenu.jsx";
import {defaultMenu} from "../../../../../layout/header/menus/defaultMenu.jsx";
import {IconButton, Sheet, Stack} from "@mui/joy";
import CasinoIcon from '@mui/icons-material/Casino';
import {ToolButton} from "../../../../../layout/header/buttons/ToolButton.jsx";
import {Virtuoso} from 'react-virtuoso';
import {MuiStyledComponents} from "../list-components/ListComponents.jsx";
import {MasterCard} from "../cards/MasterCard.jsx";
import {useMemo} from "react";

const renderTimeLineCard = index => {
    return (
        <MasterCard index={index} />
    );
};

const TimelineBase = props => {
    const headerProps = useMemo(() => mapHeader(props), [props]);

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
                    />
                </Box>

                <Box>
                    <Sheet
                        elevation={3}
                        variant="soft"
                        color="primary"
                    >
                        <Stack direction="row">
                            <IconButton variant="plain">
                                <CasinoIcon/>
                            </IconButton>
                        </Stack>
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
]);

const mappers = (id, name, timeline, ownProps) => ({
    campaignId: id,
    campaignName: name,
    totalCount: timeline?.length || 0,
});

export const Timeline = connectCampaign(selectors)(mappers)(TimelineBase);