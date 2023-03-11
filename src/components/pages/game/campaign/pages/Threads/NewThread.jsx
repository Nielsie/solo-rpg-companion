import Box from "@mui/joy/Box";
import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../../layout/header/Master.jsx";
import {Button, FormControl, FormLabel, Input, Sheet, Stack, Typography} from "@mui/joy";
import {BackArrow} from "../../../../../layout/header/buttons/BackArrow.jsx";
import {useMemo, useState} from "react";
import {useLocation} from "wouter";
import {CHARACTER_BUILDERS} from "../../../../../../builders/character-builders.js";
import {THREAD_BUILDERS} from "../../../../../../builders/thread-builders.js";

const NewThreadBase = props => {
    const [location, navigation] = useLocation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [note, setNote] = useState('');
    const headerProps = useMemo(() => mapHeader(props), [props]);

    const validate = () => {
        //todo!
        return true;
    };

    const onNameChange = event => setName(event.target.value);
    const onDescriptionChange = event => setDescription(event.target.value);
    const onNoteChange = event => setNote(event.target.value);
    const onSubmitClick = () => {
        if (validate()) {
            props.onNewThread(THREAD_BUILDERS.buildNewThread(name, description, true, note));
            navigation(`/game/${props.campaignId}/threads`);
        }
    };

    return (
        <Master {...headerProps}>
            <Box sx={{px: 2}}>
                <Sheet
                    sx={{
                        width: '100%',
                        mx: 'auto', // margin left & right
                        my: 0, // margin top & bottom
                        py: 2, // padding top & bottom
                        px: 2, // padding left & right
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                >
                    <Stack direction="column" spacing={3}>
                        <Box>
                            <Typography level="h4" component="h1">
                                <b>Create a new thread</b>
                            </Typography>
                            <Typography level="body2">Fill in the information of the new thread which you want to track in your adventure.</Typography>
                        </Box>
                        <FormControl>
                            <FormLabel>Thread Name</FormLabel>
                            <Input onChange={onNameChange} value={name}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description (keep it short)</FormLabel>
                            <Input onChange={onDescriptionChange} value={description}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>First Note Entry (optional, but here you can elaborate more on the Thread)</FormLabel>
                            <Input onChange={onNoteChange} value={note}/>
                        </FormControl>
                        <Button onClick={onSubmitClick}>Create!</Button>
                    </Stack>
                </Sheet>
            </Box>
        </Master>
    );
};

const mapHeader = props => ({
    title: `New Thread`,
    leftButtonGroup: [() => <BackArrow/>],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
    state.addThread,
]);

const mappers = (id, name, addThread, ownProps) => ({
    campaignId: id,
    campaignName: name,
    onNewThread: (newThread) => addThread(newThread),
});

export const NewThread = connectCampaign(selectors)(mappers)(NewThreadBase);