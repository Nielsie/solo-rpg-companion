import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {CARD_TYPES, CARD_TYPES_TO_STRING} from "../Timeline/timeline-constants.js";
import {Card, CardContent, CardOverflow, Divider, IconButton, Stack, Typography} from "@mui/joy";
import {DATE_UTILS} from "../../../../../../utils/dates";
import Box from "@mui/joy/Box";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EditIcon from '@mui/icons-material/Edit';
import {Collapse} from "@mui/material";
import {useState} from "react";

export const TextCardBase = props => {
    const [isExpanded, setIsExpanded] = useState(false);

    const onExpandClicked = () => setIsExpanded(!isExpanded);

    return (
        <Card variant="outlined" sx={{width: '100%'}}>
            <Box sx={{pb: 2}}>
                <Typography level="h4" fontSize="sm">
                    {props.body}
                </Typography>
            </Box>
            {props.renderInnerCardContent && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    {props.renderInnerCardContent()}
                </Collapse>
            )}
            <Divider/>
            <CardOverflow
                variant="soft"
                sx={{
                    display: 'flex',
                    gap: 1.5,
                    py: 1.5,
                    px: 'var(--Card-padding)',
                    bgcolor: 'primary.50',
                }}
            >
                <Typography level="body4" sx={{fontWeight: 'md', color: 'text.secondary'}}>
                    {props.caption}
                </Typography>
                <Divider orientation="vertical"/>
                <Typography level="body4" sx={{fontWeight: 'md', color: 'text.secondary'}}>
                    {props.date}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ml: 'auto'}}>
                    <Divider orientation="vertical"/>
                    <IconButton variant="plain" size="12">
                        <EditIcon/>
                    </IconButton>
                    {props.renderInnerCardContent && (
                        <>
                            <Divider orientation="vertical"/>
                            <IconButton variant="plain" size="12" onClick={onExpandClicked}>
                                {!isExpanded ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
                            </IconButton>
                        </>
                    )}
                </Stack>
            </CardOverflow>
        </Card>
    )
};

const selectors = ownProps => state => ([
    state.timeline[ownProps.index],
]);

const mappers = (entry, ownProps) => ({
    body: entry.body,
    date: DATE_UTILS.formatDateTimeFromIso(entry.created),
    caption: CARD_TYPES_TO_STRING[entry.type],
});

export const TextCard = connectCampaign(selectors)(mappers)(TextCardBase);