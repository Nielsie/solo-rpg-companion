import {Button, IconButton, Stack, Textarea, Typography} from "@mui/joy";
import {useState} from "react";
import CheckIcon from "@mui/icons-material/Check.js";
import CancelIcon from "@mui/icons-material/Cancel.js";
import DeleteIcon from '@mui/icons-material/Delete';

export const EntryEditor = props => {
    const [entry, setEntry] = useState(props.body || '');

    const onEntryChange = event => setEntry(event.target.value);
    const onCancelClick = () => props.onCancelClick && props.onCancelClick();
    const onEntrySubmitClick = () => {
        entry && props.onSubmitClick && props.onSubmitClick(entry);
        setEntry('');
    };
    const onEntryRemoveClick = () => props.onRemoveClick && props.onRemoveClick();

    return (
        <Stack direction="column" spacing={1} sx={{width: '100%'}}>
            {props.caption && (<Typography level="body3">{props.caption}</Typography>)}
            <Textarea color="neutral" minRows={4} onChange={onEntryChange} value={entry}/>
            {props.body ? (
                <Stack direction="row" spacing={1}>
                    <IconButton variant="solid" color="danger" onClick={onEntryRemoveClick} sx={{mr: 'auto'}}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton variant="solid" color="success" onClick={onEntrySubmitClick} sx={{ml: 'auto'}}>
                        <CheckIcon/>
                    </IconButton>
                    <IconButton variant="solid" color="danger" onClick={onCancelClick} sx={{ml: 'auto'}}>
                        <CancelIcon/>
                    </IconButton>
                </Stack>
            ) : (
                <Button variant="solid" color="primary" onClick={onEntrySubmitClick}>Submit Entry</Button>
            )}
        </Stack>
    );
};