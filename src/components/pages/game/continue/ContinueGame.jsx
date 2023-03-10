import Box from "@mui/joy/Box";
import {withHeader} from "../../../layout/header/Master.jsx";
import {memo} from "react";
import {useCampaignsStore} from "../../../../stores/campaigns/campaigns-store.js";
import {BackArrow} from "../../../layout/header/buttons/BackArrow.jsx";
import {Button, Card, Stack, Typography, Link} from "@mui/joy";
import {connect} from "../../../../utils/zustand/connect.jsx";
import {RULESET_NAMES} from "../../../../constants/rulesets.js";
import DeleteIcon from '@mui/icons-material/Delete';
import {DATE_UTILS} from "../../../../utils/dates.js";

// list all the campaigns with mui list
const ContinueGameBase = memo(props => {
    const onRemoveCampaignClick = campaignId => () => {
        props.onRemoveCampaignClick && props.onRemoveCampaignClick(campaignId);
    };

    return (
        <Stack direction="column" spacing={1} sx={{px:2}}>
            <Typography level="h4" component="h1">
                Select a campaign to continue
            </Typography>
            {props.campaigns.length === 0 && (
                <Box sx={{px: 2}}>
                    <Typography level="body2">You have no campaigns to continue. Start a new one!</Typography>
                    <Link href="/game/new"><Button sx={{mt: 1}}>New Game</Button></Link>
                </Box>
            )}
            <Box>
                {props.campaigns.map((campaign, index) => (
                    <Card key={index} variant="outlined" sx={{width: '100%', mb: 1}}>
                        <Stack direction="row" spacing={1}>
                            <Link
                                overlay
                                underline="none"
                                href={`/game/${campaign.id}`}
                                sx={{width: '100%', color: 'text.tertiary'}}
                            >
                                <Stack direction="column">
                                    <Typography level="h2" fontSize="md" sx={{mb: 0.5}}>
                                        {campaign.name}
                                    </Typography>
                                    <Typography
                                        level="body2">{`${RULESET_NAMES[campaign.ruleSet]} - ${campaign.created && DATE_UTILS.formatDateFromIso(campaign.created)}`}
                                    </Typography>
                                </Stack>
                            </Link>
                            <Button
                                variant="solid"
                                color="danger"
                                onClick={onRemoveCampaignClick(campaign.id)}
                            >
                                <DeleteIcon/>
                            </Button>
                        </Stack>
                    </Card>
                ))}
            </Box>
        </Stack>
    );
});

const mapHeader = props => ({
    title: 'Solo RPG Companion - Continue Game',
    leftButtonGroup: [() => <BackArrow/>],
});

const selectors = ownProps => state => ([
    state.campaigns,
    state.removeCampaign,
]);

const mappers = (campaigns, removeCampaign, ownProps) => ({
    campaigns,
    onRemoveCampaignClick: removeCampaign,
});

export const ContinueGame = withHeader(mapHeader)(connect(useCampaignsStore, selectors)(mappers)(ContinueGameBase));
