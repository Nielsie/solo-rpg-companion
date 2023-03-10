import Box from "@mui/joy/Box";
import {useCallback} from "react";
import {Modal, Sheet} from "@mui/joy";

export const Drawer = props => {
    const onClose = useCallback(() => props.onClose && props.onClose(), [props.onClose]);

    return (
        <Modal
            open={props.open}
            layout="fullscreen"
        >
            <Box
                sx={{position: 'fixed', zIndex: 1200, width: '100%', height: '100%'}}
            >
                <Box
                    role="button"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: (theme) =>
                            `rgba(${theme.vars.palette.neutral.darkChannel} / 0.8)`,
                    }}
                />
                <Sheet
                    sx={{
                        minWidth: 256,
                        width: 'max-content',
                        height: '100%',
                        p: 2,
                        boxShadow: 'lg',
                        bgcolor: 'background.surface',
                    }}
                >
                    {props.children}
                </Sheet>
            </Box>
        </Modal>
    );
};
