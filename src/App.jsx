import Box from '@mui/joy/Box';
import {Route, Switch} from "wouter";
import {Home} from "./components/pages/home/Home.jsx";
import {NewGame} from "./components/pages/game/new/NewGame.jsx";
import {useCampaignsStore} from "./stores/campaigns/campaigns-store.js";
import {Campaign} from "./components/pages/game/campaign/Campaign.jsx";
import {ContinueGame} from "./components/pages/game/continue/ContinueGame.jsx";

export const App = () => {
    const hasHydrated = useCampaignsStore(state => state._hasHydrated);

    if (!hasHydrated) {
        return <p>Loading...</p>
    }

    return (
        <Box sx={{height: '100%'}}>
            <Switch>
                <Route path="/" component={Home} />

                <Route path="/game/new" component={NewGame} />
                <Route path="/game/continue" component={ContinueGame} />
                <Route path="/game/:id" component={Campaign} />
                <Route path="/game/:id/:rest*" component={Campaign} />
            </Switch>
        </Box>
    );
};
