import {Route} from "wouter";
import {CharacterSheet} from "../components/pages/Characters/CharacterSheet.jsx";

export const renderRoutes = () => {
    return (
        <>
            <Route path="/game/:id/characters/:characterId/charactersheet" component={CharacterSheet}/>
        </>
    );
};