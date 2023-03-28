import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {CARD_TYPES} from "../Timeline/timeline-constants.js";
import {TextCard} from "./TextCard.jsx";
import {FateCheckCard} from "./FateCheckCard.jsx";
import {CharacterAddedCard} from "./characters/CharacterAdded.jsx";
import {MeaningRollCard} from "./MeaningRollCard.jsx";
import {RandomEventCard} from "./RandomEventCard";
import {SceneAddedCard} from "./scenes/SceneAdded";
import {CharacterBioAddedCard} from "./characters/CharacterBioAdded";

const MasterCardBase = props => {
    switch(props.type) {
        case CARD_TYPES.TEXT: return <TextCard index={props.index}/>;
        case CARD_TYPES.FATE_CHECK: return <FateCheckCard index={props.index}/>;
        case CARD_TYPES.MEANING_ROLL: return <MeaningRollCard index={props.index}/>;
        case CARD_TYPES.RANDOM_EVENT: return <RandomEventCard index={props.index}/>;


        case CARD_TYPES.CHARACTER_ADDED: return <CharacterAddedCard index={props.index}/>;
        case CARD_TYPES.CHARACTER_BIO_ADDED: return <CharacterBioAddedCard index={props.index}/>;
        case CARD_TYPES.SCENE_ADDED: return <SceneAddedCard index={props.index}/>;
        default: return <br/>;
    }
};

const selectors = ownProps => state => ([
    state.timeline[ownProps.index].type,
]);

const mappers = (type, ownProps) => ({
    type,
});

export const MasterCard = connectCampaign(selectors)(mappers)(MasterCardBase);