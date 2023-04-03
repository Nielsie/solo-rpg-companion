import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../../layout/header/Master.jsx";
import {Button, Card, Input, Stack, Textarea, Typography} from "@mui/joy";
import {BackArrow} from "../../../../../layout/header/buttons/BackArrow.jsx";
import {useMemo, useState} from "react";
import {useLocation} from "wouter";
import {CharacterDetails} from "./CharacterDetailsViews/CharacterDetails";
import {CharacterEditor} from "./CharacterDetailsViews/CharacterEditor.jsx";
import {RemovalDialog} from "../dialogs/RemovalDialog.jsx";
import {UUID} from "../../../../../../utils/uuid.js";
import {MuiStyledComponents} from "../list-components/ListComponents.jsx";
import {Virtuoso} from "react-virtuoso";
import {CHARACTER_BUILDERS} from "../../../../../../builders/character-builders.js";
import {EntryEditor} from "../editors/EntryEditor.jsx";
import {BioEntryCard} from "./cards/BioEntryCard.jsx";
import {HamburgerMenu} from "../../../../../layout/header/buttons/HamburgerMenu.jsx";
import {CharacterMenu} from "./menu/CharacterMenu.jsx";
import {IconMenuButton} from "../../../../../layout/header/buttons/IconMenuButton.jsx";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew.js";

const renderBioCard = (characterId) => (index) => {
    return (
        <BioEntryCard characterId={characterId} bioIndex={index}/>
    );
};

const CharacterBase = props => {
    const [location, navigation] = useLocation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const headerProps = useMemo(() => mapHeader(props.name, props.campaignId, props.id), [props.name, props.campaignId, props.id]);

    const validate = () => {
        //todo!
        return true;
    };

    const onEditClick = () => setIsEditMode(true);
    const onCancelClick = () => setIsEditMode(false);

    const onSubmitClick = (newCharData) => {
        if (validate()) {
            setIsEditMode(false);
            props.onEditCharacter(CHARACTER_BUILDERS.buildUpdatedCharacter(
                props.id,
                newCharData.name,
                newCharData.description,
                newCharData.imageUrl,
                newCharData.isPlayer,
                newCharData.isActive,
            ));
        }
    };

    const onBioSubmitClick = (body) => {
        props.onSubmitBioEntry(
            props.id,
            {
                id: UUID.generate(),
                body,
                created: new Date(),
            },
        );
    };

    const onRemoveClick = () => setIsRemoveDialogOpen(true);
    const onRemoveDialogClose = () => setIsRemoveDialogOpen(false);
    const onRemoveCharacterConfirmedClick = () => {
        props.onRemoveCharacter(props.id);
        navigation(`/game/${props.campaignId}/characters`);
    }

    return (
        <>
            <Master {...headerProps}>
                <Stack direction="column" spacing={2} sx={{px: 2}}>

                    {!isEditMode && (
                        <CharacterDetails
                            name={props.name}
                            description={props.description}
                            imageUrl={props.imageUrl}
                            isPlayer={props.isPlayer}
                            isActive={props.isActive}
                            onEditClick={onEditClick}
                            onRemoveClick={onRemoveClick}
                        />
                    )}
                    {isEditMode && (
                        <CharacterEditor
                            name={props.name}
                            description={props.description}
                            imageUrl={props.imageUrl}
                            isPlayer={props.isPlayer}
                            isActive={props.isActive}
                            onSubmitClick={onSubmitClick}
                            onCancelClick={onCancelClick}
                        />
                    )}

                    <Typography level="h6">Bio:</Typography>
                    <Card
                        variant="outlined"
                        sx={{width: '100%'}}
                    >
                        <EntryEditor caption="New Bio Entry:" onSubmitClick={onBioSubmitClick}/>
                    </Card>
                    <Virtuoso
                        style={{ height: 100 }}
                        useWindowScroll
                        totalCount={props.bio.length || 0}
                        components={MuiStyledComponents}
                        itemContent={renderBioCard(props.id)}
                    />

                </Stack>
            </Master>

            <RemovalDialog
                isOpen={isRemoveDialogOpen}
                onClose={onRemoveDialogClose}
                onRemoveClick={onRemoveCharacterConfirmedClick}
                text='Are you sure you want to remove this character and all of its notes? We recommend you deactivate it instead.'
                cancelText='Cancel'
                removalText='Remove Character'
            />
        </>
    );
};

const mapHeader = (name, campaignId, characterId) => ({
    title: name,
    leftButtonGroup: [() => <IconMenuButton href={`/game/${campaignId}/characters`} icon={<ArrowBackIosNewIcon/>}/>],
    rightButtonGroup: [
        () => <HamburgerMenu renderItems={() => (<CharacterMenu campaignId={campaignId} characterId={characterId}/>)}/>,
    ],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
    state.characters.find(c => c.id === ownProps.params.characterId),
    state.editCharacter,
    state.removeCharacter,
    state.addBioEntry,
]);

const mappers = (id, name, character, editCharacter, removeCharacter, addBioEntry, ownProps) => ({
    campaignId: id,
    campaignName: name,
    id: character?.id,
    name: character?.name,
    description: character?.description,
    imageUrl: character?.imageUrl,
    isPlayer: character?.isPlayer,
    isActive: character?.isActive,

    bio: character?.bio,

    onEditCharacter: (newCharacter) => editCharacter(newCharacter),
    onRemoveCharacter: (id) => removeCharacter(id),
    onSubmitBioEntry: (id, entry) => addBioEntry(id, entry),
});

export const Character = connectCampaign(selectors)(mappers)(CharacterBase);