import {
    AspectRatio,
    Card,
    CardOverflow,
    FormControl,
    FormLabel,
    IconButton,
    Sheet,
    Stack,
    Switch,
    Typography
} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

export const CharacterDetails = props => {

    const onEditClick = () => props.onEditClick && props.onEditClick();
    const onRemoveClick = () => props.onRemoveClick && props.onRemoveClick();

    return (
        <Card
            variant="outlined"
            sx={{width: '100%'}}
        >
            {props.imageUrl && (
                <CardOverflow>
                    <AspectRatio ratio="1">
                        <img
                            src={props.imageUrl}
                        />
                    </AspectRatio>
                </CardOverflow>
            )}
            <Stack direction="column" spacing={2} sx={{pt: (props.imageUrl ? 2 : 0)}}>
                <Stack direction="column" spacing={1}>
                    <Typography level="body3">Character Name</Typography>
                    <Typography level="h6">{props.name}</Typography>
                </Stack>
                <Stack direction="column" spacing={1}>
                    <Typography level="body3">Description</Typography>
                    <Typography level="h6">{props.description}</Typography>
                </Stack>
                <Stack direction="column" spacing={1}>
                    <Typography level="body3">Is Player Character?</Typography>
                    <Typography level="h6">{props.isPlayer ? 'Player' : 'NPC'}</Typography>
                </Stack>
                <Stack direction="column" spacing={1} sx={{flexWrap: 'wrap', alignContent: 'flex-start'}}>
                    <Typography level="body3">Is Active?</Typography>
                    <Stack direction="row" sx={{width: '100%'}}>
                        <Typography level="h6">{props.isActive ? 'Active' : 'Inactive'}</Typography>
                        <Stack direction="row" sx={{ml: 'auto'}} spacing={1}>
                            <IconButton variant="plain" onClick={onEditClick}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton variant="plain" color="danger" sx={{ml: 'auto'}} onClick={onRemoveClick}>
                                <DeleteIcon/>
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );
};