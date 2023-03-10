import {Header} from "./Header.jsx";
import Box from "@mui/joy/Box";
import {Stack} from "@mui/joy";

export const Master = props => {
    return (
        <Stack direction="column" spacing={2} sx={{height: '100%'}}>
            <Header
                mainButton={props.mainButton}
                leftButtonGroup={props.leftButtonGroup}
                title={props.title}
                rightButtonGroup={props.rightButtonGroup}
            />
            {props.children}
        </Stack>
    )
};

export const withHeader = (headerProps) => (Component) => props => {
    return (
        <Master {...headerProps(props)}>
            <Component {...props}/>
        </Master>
    );
};
