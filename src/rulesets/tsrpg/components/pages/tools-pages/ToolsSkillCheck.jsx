import {
    AspectRatio,
    Avatar,
    Button,
    Card,
    FormControl,
    Grid, IconButton,
    Input, ListDivider, ListItemDecorator, Modal, ModalDialog,
    Option,
    Select,
    Stack,
    Switch,
    Typography
} from "@mui/joy";
import {BackArrow} from "../../../../../components/layout/header/buttons/BackArrow.jsx";
import {useMemo, useState, Fragment} from "react";
import {Master} from "../../../../../components/layout/header/Master.jsx";
import {connectCampaign} from "../../../../../utils/zustand/connect.jsx";
import {STATS, STATS_TO_STRING} from "../../../constants/stats.js";
import {InputStat} from "../../../../../components/layout/inputs/InputStat.jsx";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {CharacterSheet} from "../Characters/CharacterSheet";
import {TSRPG} from "../../../engines/tsrpg-engine.js";
import {TSRPG_TIMELINE_BUILDERS} from "../../../builders/tsrpg-timeline-builders.js";
import {useLocation} from "wouter";
import {Image} from "../../../../../image-storage/components/Image.jsx";

const ToolsSkillCheckBase = props => {
    const [location, navigation] = useLocation();
    const headerProps = useMemo(() => mapHeader(props.campaignName), [props.campaignName]);

    const [characterId, setCharacterId] = useState(props.characters[0]?.id);
    const onCharacterChange = (e, newValue) => setCharacterId(newValue);

    const [stat, setStat] = useState(STATS.PHYSICAL);
    const onStatChange = event => setStat(event.target.checked ? STATS.MENTAL : STATS.PHYSICAL);
    const [bonus, setBonus] = useState(0);
    const onBonusChange = newValue => setBonus(newValue);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const onSheetClick = () => setIsSheetOpen(true);
    const onSheetBack = () => setIsSheetOpen(false);


    const [difficulty, setDifficulty] = useState(10);
    const onDifficultyChange = e => setDifficulty(e.target.value);
    const onDifficultyClick = newValue => e => setDifficulty(newValue);
    const [description, setDescription] = useState('');
    const onDescriptionChange = e => setDescription(e.target.value);

    const [guess, setGuess] = useState(1);
    const onGuessChange = newValue => setGuess(newValue);

    const onSubmitClick = () => props.onSubmitClick && props.onSubmitClick({
        statBonus: Math.max(character?.sheet?.stats[stat]?.value + bonus, 0),
        guess: guess > 0 ? guess : 1,
        difficulty: difficulty > 0 ? difficulty : 5,
        description,
        characterId,
        stat,
    }, navigation);

    const character = props.characters.find(c => c.id === characterId) || {};
    const sheetHeaderProps = useMemo(() => mapSheetHeader(character.name, onSheetBack), [character]);

    return (
        <>
            <Master {...headerProps}>
                <Stack direction="column" sx={{px: 2, pb: 2}} spacing={2}>
                    <Card variant="outlined">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography level="h6">Challenge</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Switch
                                    color="primary"
                                    startDecorator={<Typography level="h6" fontSize="md">Physical</Typography>}
                                    endDecorator={<Typography level="h6" fontSize="md">Mental</Typography>}
                                    sx={{display: 'flex', justifyContent: 'center'}}
                                    checked={stat === STATS.MENTAL}
                                    onChange={onStatChange}
                                />
                            </Grid>
                            <Grid item xs={6}><Button variant="solid" onClick={onDifficultyClick(5)} sx={{width: '100%'}} color={difficulty === 5 ? 'success' : 'primary'}>Easy (5)</Button></Grid>
                            <Grid item xs={6}><Button variant="solid" onClick={onDifficultyClick(10)} sx={{width: '100%'}} color={difficulty === 10 ? 'success' : 'primary'}>Moderate (10)</Button></Grid>
                            <Grid item xs={6}><Button variant="solid" onClick={onDifficultyClick(15)} sx={{width: '100%'}} color={difficulty === 15 ? 'success' : 'primary'}>Hard (15)</Button></Grid>
                            <Grid item xs={6}><Button variant="solid" onClick={onDifficultyClick(20)} sx={{width: '100%'}} color={difficulty === 20 ? 'success' : 'primary'}>Very Hard (20)</Button></Grid>
                            <Grid item xs={6}><Button variant="solid" onClick={onDifficultyClick(30)} sx={{width: '100%'}} color={difficulty === 30 ? 'success' : 'primary'}>Extremely Hard (30)</Button></Grid>
                            <Grid item xs={6}><Button variant="solid" onClick={onDifficultyClick(100)} sx={{width: '100%'}} color={difficulty === 100 ? 'success' : 'primary'}>Impossible (100)</Button></Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
                                    <Typography level="h6" fontSize="md">Difficulty:</Typography>
                                    <Input fullWidth value={difficulty} onChange={onDifficultyChange}></Input>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="column" spacing={1}>
                                    <Typography level="h6" fontSize="md">Description <Typography level="body4">(optional)</Typography>:</Typography>
                                    <Input fullWidth value={description} onChange={onDescriptionChange}></Input>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Card>

                    <Stack direction="row" spacing={1}>
                        <FormControl sx={{width: '100%'}}>
                            <Select onChange={onCharacterChange} value={characterId}>
                                {props.characters.map(character => (
                                    <Fragment key={character.id}>
                                        <Option value={character.id}>
                                            <ListItemDecorator>
                                                <Avatar alt={character.name} sx={{mr: 2, borderRadius: 'sm'}}>
                                                    <AspectRatio ratio="1" sx={{width: '100%'}}><Image id={character.imageId} width={52}/></AspectRatio>
                                                </Avatar>
                                            </ListItemDecorator>
                                            <Typography level="body2">{character.name}</Typography>
                                        </Option>
                                        <ListDivider role="none" inset="startContent" />
                                    </Fragment>
                                ))}
                            </Select>
                        </FormControl>
                        <IconButton onClick={onSheetClick}>
                            <OpenInNewIcon />
                        </IconButton>
                    </Stack>

                    <Card variant="outlined">
                        <Stack direction="column" spacing={2}>
                            {character?.sheet?.trait?.description && (
                                <Typography level="h6" fontSize="md">{`Trait (${character?.sheet?.trait?.name}): `}<Typography level="body2">{character?.sheet?.trait?.description || ' '}</Typography></Typography>
                            )}
                            <Typography level="h6" fontSize="md">{`Base ${STATS_TO_STRING[stat]} stat is: ${character?.sheet?.stats[stat]?.value}`}</Typography>
                            <Stack direction="column" spacing={1}>
                                <Typography level="h6" fontSize="md">Bonus to apply:</Typography>
                                <InputStat value={bonus} onChange={onBonusChange} />
                            </Stack>
                        </Stack>
                    </Card>

                    <Card variant="outlined">
                        <Stack direction="column" spacing={1}>
                            <Typography level="h6">{`Guess a number between 1 and ${difficulty}:`}</Typography>
                            <InputStat value={guess} onChange={onGuessChange} />
                            <Typography level="h6" fontSize="md">{`Total stat for challenge: ${character?.sheet?.stats[stat]?.value + bonus}`}</Typography>
                            <Button onClick={onSubmitClick}>Submit Guess</Button>
                        </Stack>
                    </Card>

                </Stack>
            </Master>

            <Modal open={isSheetOpen} sx={{p: 0}}>
                <ModalDialog layout="fullscreen" sx={{p: 0, overflow: 'scroll'}}>
                    <CharacterSheet
                        characterId={characterId}
                        headerProps={sheetHeaderProps}
                        params={{campaignId: props.campaignId, characterId: characterId}}
                    />
                </ModalDialog>
            </Modal>
        </>
    );
};

const mapHeader = campaignName => ({
    title: campaignName,
    leftButtonGroup: [() => <BackArrow />],
});

const mapSheetHeader = (name, onBackClick) => ({
    title: `Character Sheet - ${name}`,
    leftButtonGroup: [() => <BackArrow onClick={onBackClick}/>],
    rightButtonGroup: [],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
    state.characters,
    state.characterSheets,

    state.addTimelineEntry,
]);

const mappers = (id, name, characters, characterSheets, addTimelineEntry, ownProps) => ({
    campaignId: id,
    campaignName: name,
    characters: characters
        .filter(character => characterSheets.find(sheet => sheet.id === character.id))
        .map(character => ({
            id: character.id,
            name: `${character.name}${character.description && ` (${character.description})`}`,
            imageId: character.imageId,
            sheet: characterSheets.find(sheet => sheet.id === character.id)
        })),

    onSubmitClick: (challenge, navigation) => {
        const result = TSRPG.doChallenge(challenge);
        addTimelineEntry(TSRPG_TIMELINE_BUILDERS.skillCheckResult(challenge, result));
        navigation(`/game/${id}`);
    },
});
export const ToolsSkillCheck = connectCampaign(selectors)(mappers)(ToolsSkillCheckBase);