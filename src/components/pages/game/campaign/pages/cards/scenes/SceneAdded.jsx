import {DATE_UTILS} from "../../../../../../../utils/dates.js";
import {CARD_TYPES_TO_STRING} from "../../Timeline/timeline-constants.js";
import {TextCardBase} from "../TextCard.jsx";
import {connectCampaign} from "../../../../../../../utils/zustand/connect.jsx";
import {CardContent, Divider, Typography} from "@mui/joy";
import {NEW_SCENE_RESULT_TO_STRING} from "../../../../../../../utils/mythic/mythic-constants";


const formatBody = scene => {
    return `A new scene was added to the campaign: "${scene?.title}"`;
};

const renderInnerCardContent = (entry, scene, ownProps) => () => {
    return (
        <>
            <Divider/>
            <CardContent sx={{py: 2}}>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Title:</Typography> {scene.title}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Description:</Typography> {scene.description}
                </Typography>
                <Typography level="body2" fontSize="sm">
                    <Typography fontWeight="lg">Scene Status:</Typography> {NEW_SCENE_RESULT_TO_STRING[scene.sceneStatus]}
                </Typography>
            </CardContent>
        </>
    )
};

const selectors = ownProps => state => ([
    state.timeline[ownProps.index],
    state.scenes.find(c => c.id === state.timeline[ownProps.index].sceneId),
]);

const mappers = (entry, scene, ownProps) => ({
    body: formatBody(scene),
    date: DATE_UTILS.formatDateTimeFromIso(entry.created),
    caption: CARD_TYPES_TO_STRING[entry.type],
    hideEditIcon: true,
    renderInnerCardContent: renderInnerCardContent(entry, scene, ownProps),
});

export const SceneAddedCard = connectCampaign(selectors)(mappers)(TextCardBase);