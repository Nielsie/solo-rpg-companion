import {memo, useState} from "react";
import {UUID} from "../../../../../../utils/uuid.js";
import {Button, Card, IconButton, Input, Stack, Typography} from "@mui/joy";
import EditIcon from "@mui/icons-material/Edit.js";
import DeleteIcon from "@mui/icons-material/Delete.js";
import CheckIcon from "@mui/icons-material/Check.js";
import CancelIcon from "@mui/icons-material/Cancel.js";
import {RemovalDialog} from "../../../../../../components/pages/game/campaign/pages/dialogs/RemovalDialog.jsx";

export const SheetItemCard = memo(props => {
    const [isEditMode, setIsEditMode] = useState(props.isCreationMode);

    const [name, setName] = useState(props.name || '');
    const [description, setDescription] = useState(props.description || '');
    const resetEditor = () => {
        setIsEditMode(props.isCreationMode);
        setName(props.name || '');
        setDescription(props.description || '');
    };
    const onEditClick = () => setIsEditMode(true);
    const onCancelClick = () => {
        resetEditor();
    }
    const onSubmitClick = () => {
        props.onSubmit && props.onSubmit({
            id: props.id || UUID.generate(),
            name,
            description,
        });
        props.isCreationMode ? resetEditor() : setIsEditMode(false);
    };
    const onNameChange = event => setName(event.target.value);
    const onDescriptionChange = event => setDescription(event.target.value);

    // Removal
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const onRemoveClick = () => setIsRemoveDialogOpen(true);
    const onRemoveDialogClose = () => setIsRemoveDialogOpen(false);
    const onRemoveGearConfirmedClick = () => {
        props.onRemove && props.onRemove(props.id);
        onRemoveDialogClose();
    };

    return (
        <>
            <Card variant="outlined" sx={{width: '100%'}}>
                {!isEditMode && (
                    <Stack direction="row" spacing={1} sx={{justifyContent: 'space-between'}}>
                        <Stack direction="column" spacing={1}>
                            <Typography level="h2" sx={{fontSize: 'md'}}>{props.name}</Typography>
                            <Typography level="body2">{props.description}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <IconButton variant="plain" onClick={onEditClick}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton variant="plain" color="danger" sx={{ml: 'auto'}} onClick={onRemoveClick}>
                                <DeleteIcon/>
                            </IconButton>
                        </Stack>
                    </Stack>
                )}
                {isEditMode && (
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" spacing={1} sx={{justifyContent: 'space-between', alignItems: 'flex-start'}}>
                            <Stack direction="column" spacing={1} sx={{width: '100%'}}>
                                <Stack direction="column" spacing={1}>
                                    <Typography level="body3">{`${props.label} Name`}</Typography>
                                    <Input onChange={onNameChange} value={name}/>
                                </Stack>
                                <Stack direction="column" spacing={1}>
                                    <Typography level="body3">{`${props.label} Description`}</Typography>
                                    <Input onChange={onDescriptionChange} value={description}/>
                                </Stack>
                            </Stack>
                            {!props.isCreationMode && (
                                <Stack direction="row" spacing={1}>
                                    <IconButton variant="solid" color="success" onClick={onSubmitClick}>
                                        <CheckIcon/>
                                    </IconButton>
                                    <IconButton variant="solid" color="danger" sx={{ml: 'auto'}} onClick={onCancelClick}>
                                        <CancelIcon/>
                                    </IconButton>
                                </Stack>
                            )}
                        </Stack>
                        {props.isCreationMode && (
                            <Button variant="solid" color="primary" onClick={onSubmitClick}>{`Add ${props.label}`}</Button>
                        )}
                    </Stack>
                )}
            </Card>

            <RemovalDialog
                isOpen={isRemoveDialogOpen}
                onClose={onRemoveDialogClose}
                onRemoveClick={onRemoveGearConfirmedClick}
                text={`Are you sure you want to remove this ${props.label}? It will be gone forever.`}
                cancelText='Cancel'
                removalText={`Remove ${props.label}`}
            />
        </>
    );
});