import {Master} from "../../../layout/header/Master.jsx";
import {HamburgerMenu} from "../../../layout/header/buttons/HamburgerMenu.jsx";
import {defaultMenu} from "../../../layout/header/menus/defaultMenu.jsx";
import {useCampaignStore} from "../../../../stores/campaigns/campaign-store.js";
import {Route, Switch} from "wouter";
import {Timeline} from "./pages/Timeline/Timeline.jsx";
import {ToolsHome} from "./tools-pages/ToolsHome.jsx";
import {ToolsFateCheck} from "./tools-pages/ToolsFateCheck.jsx";
import {Characters} from "./pages/Characters/Characters.jsx";
import {NewCharacter} from "./pages/Characters/NewCharacter";
import {Character} from "./pages/Characters/Character.jsx";

const mapHeader = props => ({
    title: useCampaignStore(props.params.id).getState().name,
    mainButton: () => <HamburgerMenu menuItems={defaultMenu()}/>
});

export const Campaign = props => {
    const hasHydrated = useCampaignStore(props.params.id)(state => state._hasHydrated);

    if (!hasHydrated) return (
        <Master {...mapHeader(props)}>
            <p>Loading...</p>
        </Master>
    );

    return (
        <Switch>
            <Route path="/game/:id" component={Timeline}/>

            <Route path="/game/:id/characters" component={Characters}/>
            <Route path="/game/:id/characters/new" component={NewCharacter}/>
            <Route path="/game/:id/characters/:characterId" component={Character}/>

            <Route path="/game/:id/tools" component={ToolsHome}/>
            <Route path="/game/:id/tools/fatecheck" component={ToolsFateCheck}/>
        </Switch>
    );
};