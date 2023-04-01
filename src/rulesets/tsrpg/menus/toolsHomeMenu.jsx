import {Button} from "@mui/joy";
import {Link} from "wouter";

export const renderToolsMenu = (campaignId) => {
    return (
        <>
            <Link href={`/game/${campaignId}/tools/skillcheck`}><Button>Skill Check</Button></Link>
        </>
    );
};