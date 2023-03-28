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
import {Threads} from "./pages/Threads/Threads.jsx";
import {NewThread} from "./pages/Threads/NewThread.jsx";
import {Thread} from "./pages/Threads/Thread.jsx";
import {ToolsMeaningRolls} from "./tools-pages/ToolsMeaningRolls.jsx";
import {Scenes} from "./pages/Scenes/Scenes.jsx";
import {NewScene} from "./pages/Scenes/NewScene.jsx";
import {Scene} from "./pages/Scenes/Scene.jsx";
import {useEffect, useState} from "react";
import {RulesetSettings} from "../../debug/ruleset/Ruleset.jsx";

const mapHeader = props => ({
    title: useCampaignStore(props.params.id).getState().name,
    mainButton: () => <HamburgerMenu menuItems={defaultMenu()}/>
});

export const Campaign = props => {
    const hasHydrated = useCampaignStore(props.params.id)(state => state._hasHydrated);
    const ruleset = useCampaignStore(props.campaignId)((state) => state.ruleSet);
    const [routesRenderer, setRoutesRenderer] = useState(() => null);

    useEffect(() => {
        const loadRoutes = async () => {
            try {
                const {renderRoutes} = await import(`../../../../rulesets/${ruleset.toLowerCase()}/routes/renderRoutes.jsx`);
                setRoutesRenderer(() => renderRoutes);
            } catch {
                console.warn(`No routes found for ruleset ${ruleset}`);
            }
        }
        if (hasHydrated) {
            loadRoutes();
        }
    }, [hasHydrated, ruleset]);

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

            <Route path="/game/:id/threads" component={Threads}/>
            <Route path="/game/:id/threads/new" component={NewThread}/>
            <Route path="/game/:id/threads/:threadId" component={Thread}/>

            <Route path="/game/:id/scenes" component={Scenes}/>
            <Route path="/game/:id/scenes/new" component={NewScene}/>
            <Route path="/game/:id/scenes/:sceneId" component={Scene}/>

            <Route path="/game/:id/tools" component={ToolsHome}/>
            <Route path="/game/:id/tools/fatecheck" component={ToolsFateCheck}/>
            <Route path="/game/:id/tools/meaningrolls" component={ToolsMeaningRolls}/>


            <Route path="/game/:id/debug/ruleset" component={RulesetSettings} />

            {routesRenderer && routesRenderer()}

        </Switch>
    );
};
