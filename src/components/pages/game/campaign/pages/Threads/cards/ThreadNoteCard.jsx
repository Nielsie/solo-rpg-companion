import {DATE_UTILS} from "../../../../../../../utils/dates.js";
import {connectCampaign} from "../../../../../../../utils/zustand/connect.jsx";
import {TextCardBase} from "../../cards/TextCard.jsx";
import {EditorDialog} from "../../dialogs/EditorDialog.jsx";
import {useState} from "react";

const EditableThreadNoteCardBase = props => {
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const onNoteEditorClose = () => setIsEditorOpen(false);
    const onNoteEditorOpenClick = () => setIsEditorOpen(true);
    const onThreadNoteSubmitClick = (body) => {
        props.onEditThreadNote && props.onEditThreadNote(props.threadId, props.noteId, body);
        onNoteEditorClose();
    };
    const onRemoveClick = () => {
        props.removeThreadNote && props.removeThreadNote(props.threadId, props.noteId);
        onNoteEditorClose();
    };

    return (
        <>
            <TextCardBase
                caption={props.caption}
                body={props.body}
                date={props.date}
                onEditClick={onNoteEditorOpenClick}
            />

            <EditorDialog
                isOpen={isEditorOpen}
                onClose={onNoteEditorClose}
                onSubmitClick={onThreadNoteSubmitClick}
                onRemoveClick={onRemoveClick}
                body={props.body}
                caption="Edit Thread Note"
            />
        </>
    );
};


const selectors = ownProps => state => ([
    state.threads.find(thread => thread.id === ownProps.threadId)?.notes[ownProps.noteIndex],
    state.editThreadNote,
    state.removeThreadNote,
]);

const mappers = (threadNote, editThreadNote, removeThreadNote, ownProps) => ({
    noteId: threadNote?.id,
    body: threadNote?.body,
    date: threadNote ? DATE_UTILS.formatDateTimeFromIso(threadNote.created) : '',
    caption: 'Thread Note',
    onEditThreadNote: (threadId, noteId, body) => editThreadNote(threadId, noteId, body),
    removeThreadNote: (threadId, noteId) => removeThreadNote(threadId, noteId),
});

export const ThreadNoteCard = connectCampaign(selectors)(mappers)(EditableThreadNoteCardBase);