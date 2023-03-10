import Box from '@mui/joy/Box';
import {Button, Typography} from "@mui/joy";
import {Link} from "wouter"
import {memo} from "react";
import {withHeader} from "../../layout/header/Master.jsx";
import FortIcon from '@mui/icons-material/Fort';

const HomeBase = memo(props => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            px: 2,
        }}>
            <Typography level="h4" component="h1">
                <b>Welcome to the Solo RPG Companion!</b>
            </Typography>
            <Link href="/game/new"><Button sx={{ mt: 1 }}>New Game</Button></Link>
            <Link href="/game/continue"><Button sx={{ mt: 1 }}>Continue Game</Button></Link>
            <Button sx={{ mt: 1 }}>Load a Game</Button>
        </Box>
    )
});

const mapHeaderProps = () => ({
    title: 'Solo RPG Companion',
    mainButton: () => <FortIcon color="primary" sx={{ fontSize: 32 }}/>,
});

export const Home = withHeader(mapHeaderProps)(HomeBase);