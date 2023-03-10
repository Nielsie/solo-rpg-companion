import {DATE_UTILS} from "../../../../../../utils/dates.js";
import {CARD_TYPES_TO_STRING} from "../Timeline/timeline-constants.js";
import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {TextCardBase} from "./TextCard.jsx";
import {
    FATE_RESULTS_TO_STRING,
    PROBABILITY_TO_STRING,
    RANDOM_EVENTS_TO_STRING
} from "../../../../../../utils/mythic/mythic-constants.js";
import {CardContent, Divider, Stack, Typography} from "@mui/joy";

const formatBody = entry => {
    let body = entry.question ? `${entry.question} - The answer is '${FATE_RESULTS_TO_STRING[entry.result.fateResult]}'.` :
        `You asked a question, the answer is '${FATE_RESULTS_TO_STRING[entry.result.fateResult]}'.`;
    if (entry.result.randomEvent) {
        body += ` Oh no! A '${RANDOM_EVENTS_TO_STRING[entry.result.randomEvent.event]}' has happened as well.`;
    }

    return body;
};

const renderInnerCardContent = (entry, ownProps) => () => {
    return (
        <>
            <Divider/>
            <CardContent sx={{py: 2}}>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Question:</Typography> {entry.question || 'N/A'}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Probability:</Typography> {PROBABILITY_TO_STRING[entry.probability]}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Chaosfactor:</Typography> {entry.chaosFactor}
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
});

export const FateCheckCard = connectCampaign(selectors)(mappers)(TextCardBase);