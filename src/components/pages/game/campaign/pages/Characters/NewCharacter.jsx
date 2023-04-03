import Box from "@mui/joy/Box";
import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../../layout/header/Master.jsx";
import {Button, FormControl, FormLabel, Input, Sheet, Stack, Switch, Typography} from "@mui/joy";
import {BackArrow} from "../../../../../layout/header/buttons/BackArrow.jsx";
import {useMemo, useState} from "react";
import {useLocation} from "wouter";
import {CHARACTER_BUILDERS} from "../../../../../../builders/character-builders.js";

const NewCharacterBase = props => {
    const [location, navigation] = useLocation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPlayer, setIsPlayer] = useState(false);
    const [bio, setBio] = useState('');
    const headerProps = useMemo(() => mapHeader(props), [props]);

    const validate = () => {
        //todo!
        return true;
    };

    const onNameChange = event => setName(event.target.value);
    const onDescriptionChange = event => setDescription(event.target.value);
    const onIsPlayerToggleClick = event => setIsPlayer(event.target.checked);
    const onBioChange = event => setBio(event.target.value);
    const onSubmitClick = () => {
        if (validate()) {
            props.onNewCharacter(CHARACTER_BUILDERS.buildNewCharacter(name, description, isPlayer, true, bio));
            navigation(`/game/${props.campaignId}/characters`);
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
                                <b>Create a new character</b>
                            </Typography>
                            <Typography level="body2">Fill in the information of the new character (or object, location
                                or event) which you want to track in your adventure.</Typography>
                        </Box>
                        <FormControl>
                            <FormLabel>Character Name</FormLabel>
                            <Input onChange={onNameChange} value={name}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description (something short like: 'My old mentor')</FormLabel>
                            <Input onChange={onDescriptionChange} value={description}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Is this a NPC or Player Character?</FormLabel>
                            <Stack direction="row" sx={{mt: 1}}>
                                <Switch
                                    checked={isPlayer}
                                    color="primary"
                                    variant="solid"
                                    startDecorator={<Typography level="body2">NPC</Typography>}
                                    endDecorator={<Typography level="body2">Player</Typography>}
                                    onChange={onIsPlayerToggleClick}
                                />
                            </Stack>
                        </FormControl>
                        <FormControl>
                            <FormLabel>First Bio Entry (optional)</FormLabel>
                            <Input onChange={onBioChange} value={bio}/>
                        </FormControl>
                        <Button onClick={onSubmitClick}>Create!</Button>
                    </Stack>
                </Sheet>
            </Box>
        </Master>
    );
};

const mapHeader = props => ({
    title: `New Character`,
    leftButtonGroup: [() => <BackArrow/>],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
    state.addCharacter,
]);

const mappers = (id, name, addCharacter, ownProps) => ({
    campaignId: id,
    campaignName: name,
    onNewCharacter: (newCharacter) => addCharacter(newCharacter),
});

export const NewCharacter = connectCampaign(selectors)(mappers)(NewCharacterBase);