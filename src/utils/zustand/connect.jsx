import { shallow } from'zustand/shallow'
import {useCampaignStore} from "../../stores/campaigns/campaign-store.js";

export const connect = (useStore, selectors) => mappers => Component => props => {
    const statePicks = useStore(selectors(props), shallow);
    const mappedProps = mappers(...statePicks, props);

    return <Component {...props} {...mappedProps} />
};

export const connectCampaign = (selectors) => mappers => Component => props => {
    const statePicks = useCampaignStore(props.params?.id)(selectors(props), shallow);
    const mappedProps = mappers(...statePicks, props);

    return <Component {...props} {...mappedProps} />
};