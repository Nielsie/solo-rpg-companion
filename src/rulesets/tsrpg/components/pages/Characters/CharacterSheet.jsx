import {useCallback, useMemo} from "react";
import {BackArrow} from "../../../../../components/layout/header/buttons/BackArrow.jsx";
import {HamburgerMenu} from "../../../../../components/layout/header/buttons/HamburgerMenu.jsx";
import {CharacterMenu} from "../../../../../components/pages/game/campaign/pages/Characters/menu/CharacterMenu.jsx";
import {connectCampaign} from "../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../../components/layout/header/Master.jsx";
import {Avatar, Box, Card, Stack, Typography} from "@mui/joy";
import {STATS} from "../../../constants/stats.js";
import {SheetItemCard} from "./Cards/SheetItemCard.jsx";
import {SheetStatCard} from "./Cards/SheetStatCard.jsx";
import {IconMenuButton} from "../../../../../components/layout/header/buttons/IconMenuButton.jsx";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew.js";

const CharacterSheetBase = props => {
    const headerProps = useMemo(() => mapHeader(props.name, props.campaignId, props.characterId), [props.name, props.campaignId, props.characterId]);

    const onEditCharacterSheetStat = (newStat) => props.onEditCharacterSheetStat && props.onEditCharacterSheetStat(newStat);
    const onStatChange = (type, isIncrement) => () => {
        const stat = props.stats?.find(stat => stat.type === type);
        onEditCharacterSheetStat({
            type,
            value: isIncrement ? (stat.value || 0) + 1 : (stat.value || 0) - 1,
        });
    };

    const onEditTrait = useCallback(newTrait => props.onEditCharacterSheetTrait && props.onEditCharacterSheetTrait(newTrait), [props.name]);
    const onRemoveTrait = useCallback(traitId => props.onEditCharacterSheetTrait && props.onEditCharacterSheetTrait({
        name: 'None',
        description: 'N/A',
    }), [props.name]);

    const onEditGear = useCallback(newGear => props.onEditCharacterSheetInventory && props.onEditCharacterSheetInventory(newGear), [props.name]);
    const onAddGear = useCallback(newGear => props.onAddCharacterSheetInventory && props.onAddCharacterSheetInventory(newGear), [props.name]);
    const onRemoveGear = useCallback(gearId => props.onRemoveCharacterSheetInventory && props.onRemoveCharacterSheetInventory(gearId), [props.name]);

    return (
        <Master {...headerProps}>
            <Stack direction="column" spacing={2} sx={{px: 2, pb: 2}}>

                <Card variant="solid" color="primary" sx={{width: '100%'}} invertedColors>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Avatar alt={props.name} src={props.imageUrl} sx={{mr: 2, borderRadius: 'sm'}} >{props.name[0]}</Avatar>
                        <Stack direction="column">
                            <Typography level="h2" sx={{fontSize: 'md'}}>
                                {props.name}
                            </Typography>
                            {props.description && (
                                <Typography level="body2" sx={{mt: 0.5}}>
                                    {props.description}
                                </Typography>
                            )}
                        </Stack>
                        <Avatar sx={{ml: 'auto', borderRadius: 'sm'}} >{props.stats?.reduce((sum, stat) => sum + stat.value, 0)}</Avatar>
                    </Box>
                </Card>

                <Typography level="h6">
                    Trait:
                </Typography>
                <SheetItemCard
                    name={props.trait.name}
                    description={props.trait.description}
                    label="Trait"
                    onSubmit={onEditTrait}
                    onRemove={onRemoveTrait}
                />

                <Typography level="h6">
                    Stats:
                </Typography>
                {props.stats.map(stat => <SheetStatCard key={stat.type} type={stat.type} value={stat.value} onStatChange={onStatChange}/>)}

                <Typography level="h6">
                    Inventory:
                </Typography>
                {props.inventory?.map(gear => (
                    <SheetItemCard
                        key={gear.id}
                        id={gear.id}
                        name={gear.name}
                        description={gear.description}
                        label="Gear"
                        onSubmit={onEditGear}
                        onRemove={onRemoveGear}
                    />
                ))}
                <SheetItemCard
                    isCreationMode
                    label="Gear"
                    onSubmit={onAddGear}
                />

            </Stack>
        </Master>
    );
};

const mapHeader = (name, campaignId, characterId) => ({
    title: `Character Sheet - ${name}`,
    leftButtonGroup: [() => <IconMenuButton href={`/game/${campaignId}/characters`} icon={<ArrowBackIosNewIcon/>}/>],
    rightButtonGroup: [
        () => <HamburgerMenu renderItems={() => (<CharacterMenu campaignId={campaignId} characterId={characterId}/>)}/>,
    ],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
    state.characters.find(c => c.id === ownProps.params.characterId),
    state.characterSheets?.find(s => s.id === ownProps.params.characterId),

    state.editCharacterSheetTrait,
    state.editCharacterSheetStat,
    state.addCharacterSheetInventory,
    state.editCharacterSheetInventory,
    state.removeCharacterSheetInventory,
]);

const mapTrait = (characterSheet) => ({
    name: characterSheet?.trait?.name || 'None',
    description: characterSheet?.trait?.description || 'N/A',
});

const mapStats = (characterSheet) => {
    return Object.keys(STATS).map(stat => {
        const characterStat = characterSheet?.stats[stat];
        return characterStat ? characterStat : {type: stat, value: 0};
    });
};

const mappers = (id, name, character, characterSheet,
                 editCharacterSheetTrait,
                 editCharacterSheetStat, addCharacterSheetInventory,
                 editCharacterSheetInventory, removeCharacterSheetInventory,
                 ownProps) => ({
    campaignId: id,
    campaignName: name,
    characterId: character?.id,
    name: character?.name,
    description: character?.description,
    imageUrl: character?.imageUrl,
    trait: mapTrait(characterSheet),
    stats: mapStats(characterSheet),
    inventory: characterSheet?.inventory,

    onEditCharacterSheetTrait: (newTrait) => editCharacterSheetTrait(character?.id, newTrait),
    onEditCharacterSheetStat: (newStat) => editCharacterSheetStat(character?.id, newStat),
    onAddCharacterSheetInventory: (newGear) => addCharacterSheetInventory(character?.id, newGear),
    onEditCharacterSheetInventory: (newGear) => editCharacterSheetInventory(character?.id, newGear),
    onRemoveCharacterSheetInventory: (gearId) => removeCharacterSheetInventory(character?.id, gearId),
});

export const CharacterSheet = connectCampaign(selectors)(mappers)(CharacterSheetBase);