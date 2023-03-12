import {connectCampaign} from "../../../../../../../utils/zustand/connect.jsx";
import {DATE_UTILS} from "../../../../../../../utils/dates.js";
import Box from "@mui/joy/Box";
import {Card, CardOverflow, Divider, Link as MuiLink, Typography} from "@mui/joy";
import {Link} from "wouter";
import {NEW_SCENE_RESULT_TO_STRING} from "../../../../../../../utils/mythic/mythic-constants";

const SceneCardBase = props => {

    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                '&:hover': {
                    boxShadow: 'md',
                    borderColor: 'neutral.outlinedHoverBorder'
                },
            }}
        >
            <Box sx={{pb: 2}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Link href={`/game/${props.campaignId}/scenes/${props.id}`}>
                        <MuiLink
                            overlay
                            underline="none"
                        >
                            <Typography level="h2" sx={{fontSize: 'md'}}>
                                {props.title}
                            </Typography>
                        </MuiLink>
                    </Link>
                </Box>
            </Box>
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
            </CardOverflow>
        </Card>
    )
};

const selectors = ownProps => state => ([
    state.id,
    state.scenes[ownProps.index],
]);

const mappers = (id, scene, ownProps) => ({
    campaignId: id,
    id: scene?.id,
    title: scene?.title,
    caption: NEW_SCENE_RESULT_TO_STRING[scene?.sceneStatus],
    date: DATE_UTILS.formatDateTimeFromIso(scene?.created || new Date()),
});

export const SceneCard = connectCampaign(selectors)(mappers)(SceneCardBase);