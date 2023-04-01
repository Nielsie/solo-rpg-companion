import {IconButton, Input, Stack} from "@mui/joy";
import RemoveIcon from "@mui/icons-material/Remove.js";
import AddIcon from "@mui/icons-material/Add.js";

export const InputStat = props => {
    const onStatChange = (isIncrement) => e => props.onChange && props.onChange(isIncrement ? props.value + 1 : props.value - 1);
    const onDirectChange = e => props.onChange && props.onChange(parseInt(e.target.value));

    const size = props.size || 64;

    return (
        <Stack direction="row" spacing={1}>
            <IconButton
                variant="solid"
                sx={{width: size + 16, height: size}}
                onClick={onStatChange(false)}
            >
                <RemoveIcon sx={{fontSize: size}}/>
            </IconButton>
            <Input fullWidth value={props.value} onChange={onDirectChange}/>
            <IconButton
                variant="solid"
                sx={{width: size + 16, height: size}}
                onClick={onStatChange(true)}
            >
                <AddIcon sx={{fontSize: size}}/>
            </IconButton>
        </Stack>
    )
};