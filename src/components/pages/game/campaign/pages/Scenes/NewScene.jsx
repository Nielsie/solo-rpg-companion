import Box from "@mui/joy/Box";
import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../../layout/header/Master.jsx";
import {Button, Card, Input, Slider, Stack, Textarea, Typography} from "@mui/joy";
import {BackArrow} from "../../../../../layout/header/buttons/BackArrow.jsx";
import {useMemo, useState} from "react";
import {useLocation} from "wouter";
import {MYTHIC} from "../../../../../../utils/mythic/mythic.js";
import {SCENE_BUILDERS} from "../../../../../../builders/scene-builders.js";
import {
    MEANING_TABLES,
    NEW_SCENE_RESULT, NEW_SCENE_RESULT_TO_STRING,
} from "../../../../../../utils/mythic/mythic-constants.js";
import {RANDOM_EVENT_FORMATTERS} from "../../../../../../utils/formatters/random-event-formatters.js";

const NewSceneBase = props => {
    const [location, navigation] = useLocation();
    const headerProps = useMemo(() => mapHeader(), []);

    const [scene, setScene] = useState({
        ...SCENE_BUILDERS.initialScene(),
        chaosFactor: props.chaosFactor,
    });
    const [sceneResult, setSceneResult] = useState(null);
    const [inspiration, setInspiration] = useState({});

    const validate = () => {
        //todo!
        return true;
    };

    const onTitleChange = event => setScene({
        ...scene,
        title: event.target.value,
        originalTitle: event.target.value,
    });
    const onDescriptionChange = event => setScene({
        ...scene,
        description: event.target.value,
        originalDescription: event.target.value,
    });
    const onInterruptTitleChange = event => setScene({
        ...scene,
        title: event.target.value,
    });
    const onInterruptDescriptionChange = event => setScene({
        ...scene,
        description: event.target.value,
    });
    const onChaosFactorChange = (event, value) => setScene({
        ...scene,
        chaosFactor: value,
    });
    const onGoClick = () => {
        if (validate()) {
            const result = MYTHIC.startNewScene(scene.chaosFactor);
            if (result === NEW_SCENE_RESULT.NORMAL) {
                props.onNewScene(scene);
                navigation(`/game/${props.campaignId}/scenes`);
            } else {
                setScene({
                    ...scene,
                    title: result === NEW_SCENE_RESULT.ALTERED ? scene.title : '',
                    description: result === NEW_SCENE_RESULT.ALTERED ? scene.description : '',
                    sceneStatus: result,
                });
                setSceneResult(result);
            }
        }
    };

    const onInterruptClear = () => setInspiration({});
    const onInterruptRandomEvent = () => {
        const randomEvent = MYTHIC.getRandomEvent();
        setInspiration({
            ...inspiration,
            randomEvent,
        });
    };
    const onInterruptActions = () => {
        const actions = MYTHIC.rollOnMeaningTable(MEANING_TABLES.ACTIONS);
        setInspiration({
            ...inspiration,
            actions,
        });
    };
    const onInterruptDescriptions = () => {
        const descriptions = MYTHIC.rollOnMeaningTable(MEANING_TABLES.DESCRIPTIONS);
        setInspiration({
            ...inspiration,
            descriptions,
        });
    };
    const onInterruptGoClick = () => {
        props.onNewScene({
            ...scene,
            inspiration,
        });
        navigation(`/game/${props.campaignId}/scenes`);
    };

    return (
        <Master {...headerProps}>
            <Box sx={{px: 2}}>

                {!sceneResult && (
                    <Card
                        variant="outlined"
                    >
                        <Stack direction="column" spacing={3}>
                            <Box>
                                <Typography level="h4" component="h1">
                                    <b>Create a new scene</b>
                                </Typography>
                                <Typography level="body2">Write down what you expect the next scene to be.</Typography>
                            </Box>
                            <Stack direction="column" spacing={1}>
                                <Typography level="body3">Scene Title</Typography>
                                <Input onChange={onTitleChange} value={scene.title}/>
                            </Stack>
                            <Stack direction="column" spacing={1}>
                                <Typography level="body3">Expected Scene Description</Typography>
                                <Textarea color="neutral" minRows={4} onChange={onDescriptionChange} value={scene.description}/>
                            </Stack>
                            <Stack direction="column" spacing={1}>
                                <Typography level="body3">{`Chaos Factor (current: ${props.chaosFactor})`}</Typography>
                                <Slider
                                    marks
                                    min={0}
                                    max={10}
                                    valueLabelDisplay="on"
                                    variant="solid"
                                    color={scene.chaosFactor <= 3 ? 'success' : scene.chaosFactor <= 6 ? 'primary' : 'danger'}
                                    value={scene.chaosFactor}
                                    onChange={onChaosFactorChange}
                                />
                            </Stack>
                            <Button onClick={onGoClick}>Go!</Button>
                        </Stack>
                    </Card>
                )}

                {(sceneResult === NEW_SCENE_RESULT.ALTERED || sceneResult === NEW_SCENE_RESULT.INTERRUPTED) && (
                    <Stack direction={'column'} spacing={2}>
                        <Card
                            variant="outlined"
                        >
                            <Stack direction="column" spacing={3}>
                                {sceneResult === NEW_SCENE_RESULT.ALTERED && (
                                    <Box>
                                        <Typography level="h4" component="h1">
                                            <b>Scene Alteration!!</b>
                                        </Typography>
                                        <Typography level="body2">Oh no, something unexpected happened, your scene got altered with additional information. Alter your expectations and feel free to use the tools for inspiration.</Typography>
                                    </Box>
                                )}
                                {sceneResult === NEW_SCENE_RESULT.INTERRUPTED && (
                                    <Box>
                                        <Typography level="h4" component="h1">
                                            <b>Scene Interruption!!</b>
                                        </Typography>
                                        <Typography level="body2">Oh no, something unexpected happened, your scene got interrupted by another one. Create the interrupt scene, feel free to use the tools for inspiration.</Typography>
                                    </Box>
                                )}
                                <Stack direction="column" spacing={1}>
                                    <Typography level="body3">New Scene Title</Typography>
                                    <Input onChange={onInterruptTitleChange} value={scene.title}/>
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                    <Typography level="body3">{`${NEW_SCENE_RESULT_TO_STRING[sceneResult]} Description`}</Typography>
                                    <Textarea
                                        color="neutral" minRows={4}
                                        onChange={onInterruptDescriptionChange}
                                        value={scene.description}
                                    />
                                </Stack>
                                <Button onClick={onInterruptGoClick}>{`Start ${NEW_SCENE_RESULT_TO_STRING[sceneResult]}!`}</Button>
                            </Stack>
                        </Card>

                        <Card
                            variant="outlined"
                        >
                            <Stack direction="column" spacing={3}>
                                <Stack direction="row" sx={{width: '100%'}}>
                                    <Typography level="h6" component="h2">
                                        <b>Inspirational Tools</b>
                                    </Typography>
                                    <Button variant="soft" color="neutral" size="sm" sx={{ml: 'auto'}} onClick={onInterruptClear}>Clear</Button>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Button variant="solid" size="sm" onClick={onInterruptRandomEvent}>Roll Random Event</Button>
                                    <Typography level="body2" sx={{alignSelf: 'center'}}>{RANDOM_EVENT_FORMATTERS.formatRandomEvent(inspiration?.randomEvent)}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Button variant="solid" size="sm" onClick={onInterruptActions}>Roll on Actions</Button>
                                    <Typography level="body2" sx={{alignSelf: 'center'}}>{inspiration?.actions && `${inspiration?.actions?.word1} - ${inspiration?.actions?.word2}`}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Button variant="solid" size="sm" onClick={onInterruptDescriptions}>Roll on Descriptions</Button>
                                    <Typography level="body2" sx={{alignSelf: 'center'}}>{inspiration?.descriptions && `${inspiration?.descriptions?.word1} - ${inspiration?.descriptions?.word2}`}</Typography>
                                </Stack>
                            </Stack>
                        </Card>

                        <Card
                            variant="outlined"
                        >
                            <Stack direction="column" spacing={3}>
                                <Box>
                                    <Typography level="h6" component="h2">
                                        <b>{`Original Scene: ${scene.originalTitle}`}</b>
                                    </Typography>
                                    <Typography level="body2">
                                        {scene.originalDescription}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Card>
                    </Stack>
                )}

            </Box>
        </Master>
    );
};

const mapHeader = props => ({
    title: `New Scene`,
    leftButtonGroup: [() => <BackArrow/>],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
    state.mythic.chaosFactor,
    state.addScene,
]);

const mappers = (id, name, chaosFactor, addScene, ownProps) => ({
    campaignId: id,
    campaignName: name,
    chaosFactor,
    onNewScene: (newScene) => addScene(newScene),
});

export const NewScene = connectCampaign(selectors)(mappers)(NewSceneBase);