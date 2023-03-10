import {memo} from "react";
import CasinoIcon from '@mui/icons-material/Casino';
import {IconMenuButton} from "./IconMenuButton";

// just a shortcut to make adding this to pages easier
export const ToolButton = memo(props => <IconMenuButton href={`/game/${props.campaignId}/tools`} icon={<CasinoIcon/>}/>);