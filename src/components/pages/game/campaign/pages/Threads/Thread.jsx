import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../../layout/header/Master.jsx";
import {Card, Stack, Typography} from "@mui/joy";
import {BackArrow} from "../../../../../layout/header/buttons/BackArrow.jsx";
import {useMemo, useState} from "react";
import {useLocation} from "wouter";
import {RemovalDialog} from "../dialogs/RemovalDialog.jsx";
import {UUID} from "../../../../../../utils/uuid.js";
import {MuiStyledComponents} from "../list-components/ListComponents.jsx";
import {Virtuoso} from "react-virtuoso";
import {EntryEditor} from "../editors/EntryEditor.jsx";
import {ThreadNoteCard} from "./cards/ThreadNoteCard.jsx";
import {ThreadDetails} from "./thread-details-views/ThreadDetails";
import {ThreadEditor} from "./thread-details-views/ThreadEditor";
import {THREAD_BUILDERS} from "../../../../../../builders/thread-builders.js";

const renderThreadNoteCard = (threadId) => (index) => {
    return (
        <ThreadNoteCard threadId={threadId} noteIndex={index}/>
    );
};

const ThreadBase = props => {
    const [location, navigation] = useLocation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const headerProps = useMemo(() => mapHeader(props.name), [props.name]);

    const validate = () => {
        //todo!
        return true;
    };

    const onEditClick = () => setIsEditMode(true);
    const onCancelClick = () => setIsEditMode(false);

    const onSubmitClick = (newThreadData) => {
        if (validate()) {
            setIsEditMode(false);
            props.onEditThread(THREAD_BUILDERS.buildUpdatedThread(props.id, newThreadData.name, newThreadData.description, newThreadData.isInProgress));
        }
    };

    const onThreadNoteSubmitClick = (body) => {
        props.onSubmitThreadNote(
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
    const onRemoveThreadConfirmedClick = () => {
        props.onRemoveThread(props.id);
        navigation(`/game/${props.campaignId}/threads`);
    };

    return (
        <>
            <Master {...headerProps}>
                <Stack direction="column" spacing={2} sx={{px: 2}}>

                    {!isEditMode && (
                        <ThreadDetails
                            name={props.name}
                            description={props.description}
                            isInProgress={props.isInProgress}
                            onEditClick={onEditClick}
                            onRemoveClick={onRemoveClick}
                        />
                    )}
                    {isEditMode && (
                        <ThreadEditor
                            name={props.name}
                            description={props.description}
                            isInProgress={props.isInProgress}
                            onSubmitClick={onSubmitClick}
                            onCancelClick={onCancelClick}
                        />
                    )}

                    <Typography level="h6">Thread Notes:</Typography>
                    <Card
                        variant="outlined"
                        sx={{width: '100%'}}
                    >
                        <EntryEditor caption="New Thread Note:" onSubmitClick={onThreadNoteSubmitClick}/>
                    </Card>
                    <Virtuoso
                        useWindowScroll
                        totalCount={props.notes.length || 0}
                        components={MuiStyledComponents}
                        itemContent={renderThreadNoteCard(props.id)}
                    />

                </Stack>
            </Master>

            <RemovalDialog
                isOpen={isRemoveDialogOpen}
                onClose={onRemoveDialogClose}
                onRemoveClick={onRemoveThreadConfirmedClick}
                text='Are you sure you want to remove this thread and all of its notes? We recommend you change its progress instead.'
                cancelText='Cancel'
                removalText='Remove Thread'
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
    state.threads.find(c => c.id === ownProps.params.threadId),
    state.editThread,
    state.removeThread,
    state.addThreadNote,
]);

const mappers = (id, name, thread, editThread, removeThread, addThreadNote, ownProps) => ({
    campaignId: id,
    campaignName: name,
    id: thread?.id,
    name: thread?.name,
    description: thread?.description,
    isInProgress: thread?.isInProgress,

    notes: thread?.notes,

    onEditThread: (newCharacter) => editThread(newCharacter),
    onRemoveThread: (id) => removeThread(id),
    onSubmitThreadNote: (id, entry) => addThreadNote(id, entry),
});

export const Thread = connectCampaign(selectors)(mappers)(ThreadBase);