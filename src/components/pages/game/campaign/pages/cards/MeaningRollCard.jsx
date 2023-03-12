import {DATE_UTILS} from "../../../../../../utils/dates.js";
import {CARD_TYPES_TO_STRING} from "../Timeline/timeline-constants.js";
import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {TextCardBase} from "./TextCard.jsx";
import {
    FATE_RESULTS_TO_STRING, MEANING_TABLES_TO_STRING,
    PROBABILITY_TO_STRING,
    RANDOM_EVENTS_TO_STRING
} from "../../../../../../utils/mythic/mythic-constants.js";
import {CardContent, Divider, Stack, Typography} from "@mui/joy";

const formatBody = entry => {
    return `You asked for a meaning on the "${MEANING_TABLES_TO_STRING[entry.result.table]}" table and got the words: "${entry?.result.word1} - ${entry?.result.word2}"`;
};

const renderInnerCardContent = (entry, ownProps) => () => {
    return (
        <>
            <Divider/>
            <CardContent sx={{py: 2}}>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Table:</Typography> {MEANING_TABLES_TO_STRING[entry.result.table]}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Word 1:</Typography> {entry.result.word1}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Word 2:</Typography> {entry.result.word2}
                </Typography>
            </CardContent>
        </>
    )
};

const selectors = ownProps => state => ([
    state.timeline[ownProps.index],
]);

const mappers = (entry, ownProps) => ({
    body: formatBody(entry),
    date: DATE_UTILS.formatDateTimeFromIso(entry.created),
    caption: CARD_TYPES_TO_STRING[entry.type],
    renderInnerCardContent: renderInnerCardContent(entry, ownProps),
    hideEditIcon: true,
});

export const MeaningRollCard = connectCampaign(selectors)(mappers)(TextCardBase);