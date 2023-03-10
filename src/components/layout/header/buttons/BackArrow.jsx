import {memo, useCallback, useState} from "react";
import {IconButton} from "@mui/joy";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const BackArrow = memo(props => {

    const goBack = () => window.history.back();
    const onClick = () => props.onClick ? props.onClick() : goBack();

    return (
        <>
            <IconButton
                variant="outlined"
                size="sm"
                onClick={onClick}
            >
                <ArrowBackIosNewIcon/>
            </IconButton>
        </>
    );
});