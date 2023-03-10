import {Card, FormControl, FormLabel, IconButton, Input, Sheet, Stack, Switch, Typography} from "@mui/joy";
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import {useState} from "react";

export const CharacterEditor = props => {
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [isActive, setIsActive] = useState(props.isActive);

    const onNameChange = event => setName(event.target.value);
    const onDescriptionChange = event => setDescription(event.target.value);
    const onToggleClick = event => setIsActive(event.target.checked);

    const onSubmitClick = () => props.onSubmitClick && props.onSubmitClick({
        name,
        description,
        isActive,
    });
    const onCancelClick = () => props.onCancelClick && props.onCancelClick();

    return (
        <Card
            variant="outlined"
            sx={{width: '100%'}}
        >
            <Stack direction="column" spacing={2}>
                <Stack direction="column" spacing={1}>
                    <Typography level="body3">Character Name</Typography>
                    <Input onChange={onNameChange} value={name}/>
                </Stack>
                <Stack direction="column" spacing={1}>
                    <Typography level="body3">Description</Typography>
                    <Input onChange={onDescriptionChange} value={description}/>
                </Stack>
                <Stack direction="column" spacing={1} sx={{flexWrap: 'wrap', alignContent: 'flex-start'}}>
                    <Typography level="body3">Is Active?</Typography>
                    <Stack direction="row" sx={{width: '100%'}}>
                        <Switch
                            checked={isActive}
                            color="primary"
                            size="sm"
                            variant="solid"
                            onChange={onToggleClick}
                        />
                        <Stack direction="row" sx={{ml: 'auto'}} spacing={1}>
                            <IconButton variant="solid" color="success" onClick={onSubmitClick}>
                                <CheckIcon/>
                            </IconButton>
                            <IconButton variant="solid" color="danger" sx={{ml: 'auto'}} onClick={onCancelClick}>
                                <CancelIcon/>
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );
};