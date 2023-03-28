import {DATE_UTILS} from "../../../../../../utils/dates.js";
import {CARD_TYPES_TO_STRING} from "../Timeline/timeline-constants.js";
import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {TextCardBase} from "./TextCard.jsx";
import {
    FATE_RESULTS_TO_STRING,
    PROBABILITY_TO_STRING,
} from "../../../../../../utils/mythic/mythic-constants.js";
import {CardContent, Divider, Typography} from "@mui/joy";
import {RANDOM_EVENT_FORMATTERS} from "../../../../../../utils/formatters/random-event-formatters.js";

const formatBody = entry => {
    let body = entry.question ? `${entry.question} - The answer is '${FATE_RESULTS_TO_STRING[entry.result.fateResult]}'.` :
        `You asked a question, the answer is '${FATE_RESULTS_TO_STRING[entry.result.fateResult]}'.`;
    if (entry.result.randomEvent) {
        body += ` Oh no! A '${RANDOM_EVENT_FORMATTERS.formatRandomEvent(entry.result.randomEvent)}' has happened as well.`;
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
                    <Typography fontWeight="lg">Chaos Factor:</Typography> {entry.chaosFactor}
                </Typography>
                {entry.result.randomEvent && (
                    <>
                        <Typography level="body2" fontSize="sm">
                            <Typography fontWeight="lg">Random Event:</Typography> {RANDOM_EVENT_FORMATTERS.formatRandomEvent(entry.result.randomEvent, false, false)}
                        </Typography>
                        {entry.result.randomEvent?.character && (
                            <>
                                <Typography level="body2" fontSize="sm">
                                    <Typography fontWeight="lg">Character:</Typography> {entry.result.randomEvent?.character.name}
                                </Typography>
                            </>
                        )}
                        {entry.result.randomEvent?.thread && (
                            <>
                                <Typography level="body2" fontSize="sm">
                                    <Typography fontWeight="lg">Thread:</Typography> {entry.result.randomEvent?.thread.name}
                                </Typography>
                            </>
                        )}
                    </>
                )}
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