import {Button, Divider, Modal, ModalDialog, Typography} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded.js";
import Box from "@mui/joy/Box";

export const RemovalDialog = props => {

    const onRemoveDialogClose = () => props.onClose && props.onClose();
    const onRemoveConfirmedClick = () => props.onRemoveClick && props.onRemoveClick();

    return (
        <Modal open={props.isOpen} onClose={onRemoveDialogClose}>
            <ModalDialog
                variant="outlined"
                role="alertdialog"
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
            >
                <Typography component="h2" startDecorator={<WarningRoundedIcon />}  id="alert-dialog-modal-title">
                    Confirmation
                </Typography>
                <Divider />
                <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
                    {props.text}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                    <Button variant="plain" color="neutral" onClick={onRemoveDialogClose}>
                        {props.cancelText || 'Cancel'}
                    </Button>
                    <Button variant="solid" color="danger" onClick={onRemoveConfirmedClick}>
                        {props.removalText || 'Remove'}
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
};