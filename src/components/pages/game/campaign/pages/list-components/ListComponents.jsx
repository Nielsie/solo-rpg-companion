import {ListItem} from "@mui/joy";

export const MuiStyledComponents = {
    Item: ({ children, ...props }) => {
        return (
            <ListItem component="div" {...props} sx={{py: 1, m: 0}}>
                {children}
            </ListItem>
        );
    },
};