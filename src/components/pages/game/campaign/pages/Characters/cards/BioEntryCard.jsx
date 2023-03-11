import {DATE_UTILS} from "../../../../../../../utils/dates.js";
import {connectCampaign} from "../../../../../../../utils/zustand/connect.jsx";
import {TextCardBase} from "../../cards/TextCard.jsx";
import {EditorDialog} from "../../dialogs/EditorDialog.jsx";
import {useState} from "react";

const EditableBioCardBase = props => {
    const [isBioEditorOpen, setIsBioEditorOpen] = useState(false);

    const onBioEditorClose = () => setIsBioEditorOpen(false);
    const onBioEditorOpenClick = () => setIsBioEditorOpen(true);
    const onBioEntrySubmitClick = (body) => {
        props.onEditBioEntry && props.onEditBioEntry(props.characterId, props.bioId, body);
        onBioEditorClose();
    };
    const onRemoveClick = () => {
        props.removeBioEntry && props.removeBioEntry(props.characterId, props.bioId);
        onBioEditorClose();
    };

    return (
        <>
            <TextCardBase
                caption={props.caption}
                body={props.body}
                date={props.date}
                onEditClick={onBioEditorOpenClick}
            />

            <EditorDialog
                isOpen={isBioEditorOpen}
                onClose={onBioEditorClose}
                onSubmitClick={onBioEntrySubmitClick}
                onRemoveClick={onRemoveClick}
                body={props.body}
                caption="Edit Bio Entry"
            />
        </>
    );
};


const selectors = ownProps => state => ([
    state.characters.find(character => character.id === ownProps.characterId)?.bio[ownProps.bioIndex],
    state.editBioEntry,
    state.removeBioEntry,
]);

const mappers = (bioEntry, editBioEntry, removeBioEntry, ownProps) => ({
    bioId: bioEntry?.id,
    body: bioEntry?.body,
    date: bioEntry ? DATE_UTILS.formatDateTimeFromIso(bioEntry.created) : '',
    caption: 'Bio',
    onEditBioEntry: (characterId, bioId, body) => editBioEntry(characterId, bioId, body),
    removeBioEntry: (characterId, bioId) => removeBioEntry(characterId, bioId),
});

export const BioEntryCard = connectCampaign(selectors)(mappers)(EditableBioCardBase);