import {Card, IconButton, Stack, Typography} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

export const SceneDetails = props => {

    const onEditClick = () => props.onEditClick && props.onEditClick();
    const onRemoveClick = () => props.onRemoveClick && props.onRemoveClick();

    return (
        <Card
            variant="outlined"
            sx={{width: '100%'}}
        >
            <Stack direction="column" spacing={2}>
                <Stack direction="column" spacing={1}>
                    <Typography level="body3">Scene Title</Typography>
                    <Typography level="h6">{props.title}</Typography>
                </Stack>
                <Stack direction="column" spacing={1}>
                    <Typography level="body3">Description</Typography>
                    <Typography level="h6">{props.description}</Typography>
                </Stack>
                <Stack direction="column" spacing={1} sx={{flexWrap: 'wrap', alignContent: 'flex-start'}}>
                    <Stack direction="row" sx={{width: '100%'}}>
                        <Stack direction="row" sx={{ml: 'auto'}} spacing={1}>
                            {props.onEditClick && (
                                <IconButton variant="plain" onClick={onEditClick}>
                                    <EditIcon/>
                                </IconButton>
                            )}
                            {props.onRemoveClick && (
                                <IconButton variant="plain" color="danger" sx={{ml: 'auto'}} onClick={onRemoveClick}>
                                    <DeleteIcon/>
                                </IconButton>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );
};