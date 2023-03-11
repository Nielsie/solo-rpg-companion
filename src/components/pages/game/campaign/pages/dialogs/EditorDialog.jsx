import {Divider, Modal, ModalDialog, Typography} from "@mui/joy";
import {EntryEditor} from "../editors/EntryEditor.jsx";
import EditIcon from '@mui/icons-material/Edit';

export const EditorDialog = props => {

    const onDialogClose = () => props.onClose && props.onClose();
    const onSubmitClick = (bioEntry) => props.onSubmitClick && props.onSubmitClick(bioEntry);
    const onRemoveClick = () => props.onRemoveClick && props.onRemoveClick();

    return (
        <Modal open={props.isOpen} onClose={onDialogClose}>
            <ModalDialog
                variant="outlined"
                role="alertdialog"
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
                sx={{width: '95%'}}
            >
                <Typography component="h2" startDecorator={<EditIcon />} id="alert-dialog-modal-title">
                    {props.caption}
                </Typography>
                <Divider sx={{mb: 1}}/>
                <EntryEditor
                    variant="plain"
                    body={props.body}
                    onSubmitClick={onSubmitClick}
                    onCancelClick={onDialogClose}
                    onRemoveClick={onRemoveClick}
                />
            </ModalDialog>
        </Modal>
    );
};