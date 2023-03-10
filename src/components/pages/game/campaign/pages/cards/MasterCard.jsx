import {connectCampaign} from "../../../../../../utils/zustand/connect.jsx";
import {CARD_TYPES} from "../Timeline/timeline-constants.js";
import {TextCard} from "./TextCard.jsx";
import {FateCheckCard} from "./FateCheckCard.jsx";

const MasterCardBase = props => {
    switch(props.type) {
        case CARD_TYPES.TEXT: return <TextCard index={props.index}/>;
        case CARD_TYPES.FATE_CHECK: return <FateCheckCard index={props.index}/>;
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