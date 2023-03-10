import Box from "@mui/joy/Box";
import {Typography} from "@mui/joy";
import {AppBar} from "./AppBar.jsx";
import {memo} from "react";

export const Header = memo(props => {
    return (
        <AppBar>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1.5,
                    width: '100%',
                }}>
                {props.mainButton && props.mainButton()}
                {props.leftButtonGroup?.map((button, index) => (
                    <Box key={index}>
                        {button(index)}
                    </Box>
                ))}
                <Typography component="h1" fontWeight="xl" sx={{width: '100%'}}>{props.title}</Typography>
                {props.rightButtonGroup?.map((button, index) => (
                    <Box key={index}>
                        {button(index)}
                    </Box>
                ))}
            </Box>
        </AppBar>
    );
});
