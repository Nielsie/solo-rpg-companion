import {memo} from "react";
import {Card, IconButton, Input, Stack, Typography} from "@mui/joy";
import {STATS_TO_STRING} from "../../../../constants/stats.js";
import RemoveIcon from "@mui/icons-material/Remove.js";
import AddIcon from "@mui/icons-material/Add.js";

export const SheetStatCard = memo(props => {
    return (
        <Card variant="outlined" sx={{width: '100%'}}>
            <Stack direction="column" spacing={2}>
                <Typography level="h6">{STATS_TO_STRING[props.type]}</Typography>
                <Stack direction="row" spacing={1}>
                    <IconButton variant="solid" sx={{width: 64, height: 64}} onClick={props.onStatChange(props.type, false)}><RemoveIcon sx={{fontSize: 64}}/></IconButton>
                    <Input sx={{width: 'auto'}} value={props.value}/>
                    <IconButton variant="solid" sx={{width: 64, height: 64}} onClick={props.onStatChange(props.type, true)}><AddIcon sx={{fontSize: 64}}/></IconButton>
                </Stack>
            </Stack>
        </Card>
    );
});