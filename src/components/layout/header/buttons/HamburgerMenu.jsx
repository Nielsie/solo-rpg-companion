import {memo, useCallback, useState} from "react";
import {IconButton} from "@mui/joy";
import MenuIcon from '@mui/icons-material/Menu';
import {Drawer} from "@mui/material";
import Box from "@mui/joy/Box";

export const HamburgerMenu = memo(props => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onMenuClick = useCallback(() => setIsMenuOpen(true), [setIsMenuOpen]);
    const onMenuClose = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen]);
    return (
        <>
            <IconButton
                variant="outlined"
                size="sm"
                onClick={onMenuClick}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                open={isMenuOpen}
                onClose={onMenuClose}
                anchor="right"
            >
                <Box
                    sx={{width: 256}}
                >
                    {props.menuItems}
                </Box>
            </Drawer>
        </>
    );
});