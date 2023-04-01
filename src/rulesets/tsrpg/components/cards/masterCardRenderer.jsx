import {TSRPG_CARD_TYPES} from "../../builders/tsrpg-timeline-builders.js";
import {SkillCheckCard} from "./SkillCheckCard.jsx";


export const renderer = (cardType, cardIndex) => {
    switch(cardType) {
        case TSRPG_CARD_TYPES.SKILLCHECK: return <SkillCheckCard index={cardIndex}/>;
        default: return <br/>;
    }
};