import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from "./App.jsx";
import {StyledEngineProvider} from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { deepmerge } from '@mui/utils';
import {
    experimental_extendTheme as extendMuiTheme,
    shouldSkipGeneratingVar as muiShouldSkipGeneratingVar,
} from '@mui/material/styles';
import {colors} from "@mui/joy";
import {
    extendTheme as extendJoyTheme,
    CssVarsProvider,
    shouldSkipGeneratingVar as joyShouldSkipGeneratingVar,
} from '@mui/joy/styles';
import {registerSW} from "virtual:pwa-register";

const { unstable_sxConfig: muiSxConfig, ...muiTheme } = extendMuiTheme({
    // This is required to point to `var(--joy-*)` because we are using
    // `CssVarsProvider` from Joy UI.
    cssVarPrefix: 'joy',
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: colors.blue[500],
                },
                grey: colors.grey,
                error: {
                    main: colors.red[500],
                },
                info: {
                    main: colors.purple[500],
                },
                success: {
                    main: colors.green[500],
                },
                warning: {
                    main: colors.yellow[200],
                },
                common: {
                    white: '#FFF',
                    black: '#09090D',
                },
                divider: colors.grey[200],
                text: {
                    primary: colors.grey[800],
                    secondary: colors.grey[600],
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: colors.blue[600],
                },
                grey: colors.grey,
                error: {
                    main: colors.red[600],
                },
                info: {
                    main: colors.purple[600],
                },
                success: {
                    main: colors.green[600],
                },
                warning: {
                    main: colors.yellow[300],
                },
                common: {
                    white: '#FFF',
                    black: '#09090D',
                },
                divider: colors.grey[800],
                text: {
                    primary: colors.grey[100],
                    secondary: colors.grey[300],
                },
            },
        },
    },
});

const { unstable_sxConfig: joySxConfig, ...joyTheme} = extendJoyTheme();

// You can use your own `deepmerge` function.
// joyTheme will deeply merge to muiTheme.
const mergedTheme = (deepmerge(muiTheme, joyTheme));

mergedTheme.unstable_sxConfig = {
    ...muiSxConfig,
    ...joySxConfig
};

// add this to prompt for a refresh
const updateSW = registerSW({
    onNeedRefresh: () => {
        if (confirm("New content available. Reload the app?")) {
            updateSW(true);
        }
    },
    onOfflineReady: () => {
        console.log("App is ready for offline usage.");
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <CssVarsProvider
                theme={mergedTheme}
                shouldSkipGeneratingVar={(keys) =>
                    muiShouldSkipGeneratingVar(keys) || joyShouldSkipGeneratingVar(keys)
                }
            >
                <CssBaseline/>
                <App/>
            </CssVarsProvider>
        </StyledEngineProvider>
    </React.StrictMode>,);
