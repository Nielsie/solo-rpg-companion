import {BackArrow} from "../../../layout/header/buttons/BackArrow.jsx";
import {withHeader} from "../../../layout/header/Master.jsx";
import {Option, Select, Stack, Typography} from "@mui/joy";
import {useCampaignStore} from "../../../../stores/campaigns/campaign-store.js";
import {RULESET_NAMES, RULESETS} from "../../../../constants/rulesets.js";
import {useCampaignsStore} from "../../../../stores/campaigns/campaigns-store.js";

const RulesetSettingsBase = props => {
    const currentRuleSet = useCampaignStore(props.params.id)((state) => state.ruleSet);
    const changeRulesetOfCurrentCampaign = useCampaignStore(props.params.id)((state) => state.changeRuleset);
    const changeRulesetInCampaignsStore = useCampaignsStore((state) => state.changeRuleset);

    const onRuleSetChange = (e, newValue) => {
        changeRulesetOfCurrentCampaign(newValue);
        changeRulesetInCampaignsStore(props.params.id, newValue);
    };

    return (
        <Stack direction="column" spacing={2} sx={{px: 2}}>
            <Typography level="h6">
                Change ruleset (DANGER! DANGER!):
            </Typography>
            <Select onChange={onRuleSetChange} value={currentRuleSet}>
                {Object.keys(RULESETS).map(ruleSet => (
                    <Option key={RULESETS[ruleSet]} value={RULESETS[ruleSet]}>{RULESET_NAMES[RULESETS[ruleSet]]}</Option>
                ))}
            </Select>
        </Stack>
    );
};

const mapHeader = props => ({
    title: 'DANGER AREA - Ruleset Settings',
    leftButtonGroup: [() => <BackArrow/>],
});

export const RulesetSettings = withHeader(mapHeader)(RulesetSettingsBase);