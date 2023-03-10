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
import {TextCardBase} from "../cards/TextCard.jsx";
import {DATE_UTILS} from "../../../../../../utils/dates.js";

const renderBioCard = (index, entry) => {
    if (!entry) return null;

    return (
        <TextCardBase body={entry.body} date={DATE_UTILS.formatDateTimeFromIso(entry.created)} caption="Bio"/>
    );
};

const CharacterBase = props => {
    const [location, navigation] = useLocation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [bioEntry, setBioEntry] = useState('');
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const headerProps = useMemo(() => mapHeader(props.name), [props.name]);

    const validate = () => {
        //todo!
        return true;
    };

    const onEditClick = () => setIsEditMode(true);
    const onCancelClick = () => setIsEditMode(false);

    const onSubmitClick = (newCharData) => {
        if (validate()) {
            setIsEditMode(false);
            props.onEditCharacter({
                id: props.id,
                name: newCharData.name,
                description: newCharData.description,
                isActive: newCharData.isActive,
                updated: new Date(),
            });
        }
    };

    const onBioChange = event => setBioEntry(event.target.value);
    const onBioSubmitClick = () => {
        if(bioEntry) {
            props.onSubmitBioEntry(
                props.id,
                {
                    id: UUID.generate(),
                    body: bioEntry,
                    created: new Date(),
                },
            );
            setBioEntry('');
        }
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
                            isActive={props.isActive}
                            onEditClick={onEditClick}
                            onRemoveClick={onRemoveClick}
                        />
                    )}
                    {isEditMode && (
                        <CharacterEditor
                            name={props.name}
                            description={props.description}
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
                        <Stack direction="column" spacing={1}>
                            <Typography level="body3">New Bio Entry:</Typography>
                            <Textarea color="neutral" minRows={4} onChange={onBioChange} value={bioEntry} />
                            <Button variant="solid" color="primary" onClick={onBioSubmitClick}>Submit Entry</Button>
                        </Stack>
                    </Card>

                    <Virtuoso
                        useWindowScroll
                        data={props.bio}
                        components={MuiStyledComponents}
                        itemContent={renderBioCard}
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

const mapHeader = name => ({
    title: name,
    leftButtonGroup: [() => <BackArrow/>],
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
    isActive: character?.isActive,

    bio: character?.bio,

    onEditCharacter: (newCharacter) => editCharacter(newCharacter),
    onRemoveCharacter: (id) => removeCharacter(id),
    onSubmitBioEntry: (id, entry) => addBioEntry(id, entry),
});

export const Character = connectCampaign(selectors)(mappers)(CharacterBase);