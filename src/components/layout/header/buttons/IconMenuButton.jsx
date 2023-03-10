import {memo} from "react";
import {IconButton} from "@mui/joy";
import CasinoIcon from '@mui/icons-material/Casino';
import {Link, useLocation} from "wouter";

export const IconMenuButton = memo(props => {
    return (
        <Link href={props.href}>
            <IconButton
                variant="outlined"
                size="sm"
            >
                {props.icon}
            </IconButton>
        </Link>
    );
});