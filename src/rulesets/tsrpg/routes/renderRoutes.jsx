import {Route} from "wouter";
import {CharacterSheet} from "../components/pages/Characters/CharacterSheet.jsx";
import {ToolsSkillCheck} from "../components/pages/tools-pages/ToolsSkillCheck.jsx";

export const renderRoutes = () => {
    return (
        <>
            <Route path="/game/:id/characters/:characterId/charactersheet" component={CharacterSheet}/>

            <Route path="/game/:id/tools/skillcheck" component={ToolsSkillCheck}/>
        </>
    );
};