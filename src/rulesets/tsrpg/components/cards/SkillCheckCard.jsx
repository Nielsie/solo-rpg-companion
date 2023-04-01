import {DATE_UTILS} from "../../../../utils/dates.js";
import {connectCampaign} from "../../../../utils/zustand/connect.jsx";
import {TextCardBase} from "../../../../components/pages/game/campaign/pages/cards/TextCard.jsx";
import {TSRPG_CARD_TYPES_TO_STRING} from "../../builders/tsrpg-timeline-builders.js";
import {CardContent, Divider, Typography} from "@mui/joy";
import {STATS_TO_STRING} from "../../constants/stats";

const formatBody = (entry, character) => {
    const challenge = entry.challenge;
    const result = entry.result;

    return `${character.name} ${result.result ? 'succeeded' : 'failed'} the challenge${challenge.description ? ` '${challenge.description}'` : ''}!`;
};

const renderInnerCardContent = (entry, ownProps) => () => {
    return (
        <>
            <Divider/>
            <CardContent sx={{py: 2}}>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Challenge:</Typography> {entry.challenge.description || 'N/A'}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Result:</Typography> {entry.result.result ? 'Success' : 'Failure'}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Difficulty:</Typography> {entry.challenge.difficulty}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Stat:</Typography> {STATS_TO_STRING[entry.challenge.stat] || ''}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">DMs Number:</Typography> {entry.result.dmNumber}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Guess:</Typography> {entry.challenge.guess}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Stat Bonus:</Typography> {entry.challenge.statBonus}
                </Typography>
            </CardContent>
        </>
    )
};

const selectors = ownProps => state => ([
    state.timeline[ownProps.index],
    state.characters.find(c => c.id === state.timeline[ownProps.index]?.challenge?.characterId) || {},
]);

const mappers = (entry, character, ownProps) => ({
    body: formatBody(entry, character),
    date: DATE_UTILS.formatDateTimeFromIso(entry.created),
    caption: TSRPG_CARD_TYPES_TO_STRING[entry.type],
    hideEditIcon: true,
    renderInnerCardContent: renderInnerCardContent(entry, ownProps),
});

export const SkillCheckCard = connectCampaign(selectors)(mappers)(TextCardBase);