import {connectCampaign} from "../../../../../../../utils/zustand/connect.jsx";
import {DATE_UTILS} from "../../../../../../../utils/dates.js";
import Box from "@mui/joy/Box";
import {AspectRatio, Avatar, Card, CardOverflow, Divider, Link as MuiLink, Stack, Switch, Typography} from "@mui/joy";
import {Link} from "wouter";
import {Image} from "../../../../../../../image-storage/components/Image.jsx";
import {ImageAvatar} from "../../../../../../../image-storage/components/ImageAvatar.jsx";

const CharacterCardBase = props => {

    const onToggleClick = (event) => props.onToggleClick && props.onToggleClick(event.target.checked);

    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                boxShadow: props.isDisabled ? 'none' : undefined,
                borderColor: props.isDisabled ? 'neutral.outlinedDisabledBorder' : undefined,
                '&:hover': {
                    boxShadow: 'md',
                    borderColor: 'neutral.outlinedHoverBorder'
                },
            }}
        >
            <Box sx={{pb: 2}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <ImageAvatar imageId={props.imageId} title={props.title}/>
                    <Link href={`/game/${props.campaignId}/characters/${props.id}`}>
                        <MuiLink
                            overlay
                            underline="none"
                        >
                            <Stack direction="column">
                                <Typography level="h2" sx={{fontSize: 'md', color: props.isDisabled ? 'neutral.outlinedDisabledColor' : undefined}}>
                                    {props.title}
                                </Typography>
                                {props.subtitle && (
                                    <Typography level="body2" sx={{mt: 0.5, color: props.isDisabled ? 'neutral.outlinedDisabledColor' : undefined}}>
                                        {props.subtitle}
                                    </Typography>
                                )}
                            </Stack>
                        </MuiLink>
                    </Link>
                    <Switch
                        checked={!props.isDisabled}
                        color="primary"
                        size="sm"
                        variant="solid"
                        sx={{ml: 'auto'}}
                        onChange={onToggleClick}
                    />
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
                    bgcolor: props.isDisabled ? 'primary.solidDisabledColor' : 'primary.50',
                }}
            >
                <Typography level="body4" sx={{fontWeight: 'md', color: props.isDisabled ? 'neutral.outlinedDisabledColor' : 'text.secondary'}}>
                    {props.caption}
                </Typography>
                <Divider orientation="vertical"/>
                <Typography level="body4" sx={{fontWeight: 'md', color: props.isDisabled ? 'neutral.outlinedDisabledColor' : 'text.secondary'}}>
                    {props.date}
                </Typography>
            </CardOverflow>
        </Card>
    )
};

const selectors = ownProps => state => ([
    state.id,
    state.characters[ownProps.index],
    state.toggleCharacterActiveness,
]);

const mappers = (id, character, toggleCharacterActiveness, ownProps) => ({
    campaignId: id,
    id: character?.id,
    title: character?.name,
    subtitle: character?.description,
    imageId: character?.imageId,
    caption: `${character?.isActive ? 'Active' : 'Inactive'} ${character.isPlayer ? 'Player' : 'NPC'}`,
    isDisabled: !(character?.isActive),
    date: DATE_UTILS.formatDateTimeFromIso(character?.created || new Date()),
    onToggleClick: (isChecked) => toggleCharacterActiveness(character?.id, isChecked),
});

export const CharacterCard = connectCampaign(selectors)(mappers)(CharacterCardBase);