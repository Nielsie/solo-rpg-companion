import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {CARD_TYPES} from "../Timeline/timeline-constants.js";
import {TextCard} from "./TextCard.jsx";
import {FateCheckCard} from "./FateCheckCard.jsx";
import {CharacterAddedCard} from "./characters/CharacterAdded.jsx";
import {MeaningRollCard} from "./MeaningRollCard.jsx";
import {RandomEventCard} from "./RandomEventCard";
import {SceneAddedCard} from "./scenes/SceneAdded";
import {CharacterBioAddedCard} from "./characters/CharacterBioAdded";
import {useEffect, useState} from "react";

let CACHE = null;

const MasterCardBase = props => {
    const [masterCardRenderer, setMasterCardRenderer] = useState(() => null);

    useEffect(() => {
        const loadRenderer = async () => {
            if (!CACHE) {
                try {
                    const {renderer} = await import(`../../../../../../rulesets/${props.ruleset.toLowerCase()}/components/cards/masterCardRenderer.jsx`);
                    CACHE = renderer;
                } catch {
                    CACHE = () => <br/>;
                    console.warn(`No mastercards found for ruleset ${props.ruleset}`);
                }
            }
            setMasterCardRenderer(() => CACHE);
        }
        loadRenderer();
    }, [props.ruleset]);

    switch(props.type) {
        case CARD_TYPES.TEXT: return <TextCard index={props.index}/>;
        case CARD_TYPES.FATE_CHECK: return <FateCheckCard index={props.index}/>;
        case CARD_TYPES.MEANING_ROLL: return <MeaningRollCard index={props.index}/>;
        case CARD_TYPES.RANDOM_EVENT: return <RandomEventCard index={props.index}/>;


        case CARD_TYPES.CHARACTER_ADDED: return <CharacterAddedCard index={props.index}/>;
        case CARD_TYPES.CHARACTER_BIO_ADDED: return <CharacterBioAddedCard index={props.index}/>;
        case CARD_TYPES.SCENE_ADDED: return <SceneAddedCard index={props.index}/>;
        default: {
            if (masterCardRenderer) return masterCardRenderer(props.type, props.index);
            return <br/>;
        }
    }
};

const selectors = ownProps => state => ([
    state.timeline[ownProps.index].type,
    state.ruleSet,
]);

const mappers = (type, ruleset, ownProps) => ({
    type,
    ruleset,
});

export const MasterCard = connectCampaign(selectors)(mappers)(MasterCardBase);