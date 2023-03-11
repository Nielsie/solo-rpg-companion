import {DATE_UTILS} from "../../../../../../../utils/dates.js";
import {CARD_TYPES_TO_STRING} from "../../Timeline/timeline-constants.js";
import {TextCardBase} from "../TextCard.jsx";
import {connectCampaign} from "../../../../../../../utils/zustand/connect.jsx";


const formatBody = character => {
    return `A new character was added to the campaign: "${character?.name}"`;
};

/*const renderInnerCardContent = (entry, ownProps) => () => {
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
};*/

const selectors = ownProps => state => ([
    state.timeline[ownProps.index],
    state.characters.find(c => c.id === state.timeline[ownProps.index].characterId),
]);

const mappers = (entry, character, ownProps) => ({
    body: formatBody(character),
    date: DATE_UTILS.formatDateTimeFromIso(entry.created),
    caption: CARD_TYPES_TO_STRING[entry.type],
    hideEditIcon: true,
    //renderInnerCardContent: renderInnerCardContent(entry, ownProps),
});

export const CharacterAddedCard = connectCampaign(selectors)(mappers)(TextCardBase);