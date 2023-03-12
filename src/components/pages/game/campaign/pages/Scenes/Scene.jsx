import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../../layout/header/Master.jsx";
import {Stack, Typography} from "@mui/joy";
import {BackArrow} from "../../../../../layout/header/buttons/BackArrow.jsx";
import {useMemo, useState} from "react";
import {useLocation} from "wouter";
import {RemovalDialog} from "../dialogs/RemovalDialog.jsx";
import {NEW_SCENE_RESULT, NEW_SCENE_RESULT_TO_STRING} from "../../../../../../utils/mythic/mythic-constants.js";
import {SceneDetails} from "./scene-details-views/SceneDetails.jsx";

const SceneBase = props => {
    const [location, navigation] = useLocation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const headerProps = useMemo(() => mapHeader(props.title), [props.title]);

    const validate = () => {
        //todo!
        return true;
    };

    const onEditClick = () => setIsEditMode(true);
    const onCancelClick = () => setIsEditMode(false);

    const onSubmitClick = (newThreadData) => {
        /*if (validate()) {
            setIsEditMode(false);
            props.onEditThread(THREAD_BUILDERS.buildUpdatedThread(props.id, newThreadData.name, newThreadData.description, newThreadData.isInProgress));
        }*/
    };

    const onRemoveClick = () => setIsRemoveDialogOpen(true);
    const onRemoveDialogClose = () => setIsRemoveDialogOpen(false);
    const onRemoveSceneConfirmedClick = () => {
        props.onRemove(props.id);
        navigation(`/game/${props.campaignId}/scenes`);
    };

    return (
        <>
            <Master {...headerProps}>
                <Stack direction="column" spacing={2} sx={{px: 2}}>
                    <Typography level="h6" component="h2">
                        <b>{props.sceneStatus === NEW_SCENE_RESULT.NORMAL ? 'Expected Scene' : NEW_SCENE_RESULT_TO_STRING[props.sceneStatus]}</b>
                    </Typography>
                    {!isEditMode && (
                        <SceneDetails
                            title={props.title}
                            description={props.description}
                            onEditClick={onEditClick}
                            onRemoveClick={onRemoveClick}
                        />
                    )}
                    {/*{isEditMode && (
                        <ThreadEditor
                            name={props.name}
                            description={props.description}
                            isInProgress={props.isInProgress}
                            onSubmitClick={onSubmitClick}
                            onCancelClick={onCancelClick}
                        />
                    )}*/}

                    {props.sceneStatus !== NEW_SCENE_RESULT.NORMAL && (
                        <>
                            <Typography level="h6" component="h2">
                                <b>Original Scene</b>
                            </Typography>
                            {!isEditMode && (
                                <SceneDetails
                                    title={props.originalTitle}
                                    description={props.originalDescription}
                                />
                            )}
                        </>
                    )}
                </Stack>
            </Master>

            <RemovalDialog
                isOpen={isRemoveDialogOpen}
                onClose={onRemoveDialogClose}
                onRemoveClick={onRemoveSceneConfirmedClick}
                text='Are you sure you want to remove this scene? All data about the scene will be lost forever.'
                cancelText='Cancel'
                removalText='Remove Scene Forever'
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
    state.scenes.find(c => c.id === ownProps.params.sceneId),
    state.editScene,
    state.removeScene,
]);

const mappers = (id, name, scene, editScene, removeScene, ownProps) => ({
    campaignId: id,
    campaignName: name,
    id: scene?.id,
    title: scene?.title,
    description: scene?.description,
    originalTitle: scene?.originalTitle,
    originalDescription: scene?.originalDescription,
    sceneStatus: scene?.sceneStatus,

    onEdit: (newScene) => editScene(newScene),
    onRemove: (id) => removeScene(id),
});

export const Scene = connectCampaign(selectors)(mappers)(SceneBase);