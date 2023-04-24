import {ListItemButton} from "@mui/joy";
import {useCampaignStore} from "../../../../stores/campaigns/campaign-store.js";
import { saveAs } from 'file-saver';

export const ExportCampaignButton = props => {

    const onExportClick = () => {
        const campaign = useCampaignStore(props.campaignId).getState();
        const data = JSON.stringify(campaign);
        const blob = new Blob([data], {type: 'application/json'});
        saveAs(blob, `campaign-${campaign.id}.json`);
    };

    return (
        <ListItemButton onClick={onExportClick}>{props.label || 'Export Campaign'}</ListItemButton>
    );
};