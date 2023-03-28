import Box from "@mui/joy/Box";
import {withHeader} from "../../../layout/header/Master.jsx";
import {memo, useState} from "react";
import {Button, FormControl, FormLabel, Input, Option, Select, Sheet, Stack, Typography} from "@mui/joy";
import {useCampaignsStore} from "../../../../stores/campaigns/campaigns-store.js";
import {UUID} from "../../../../utils/uuid.js";
import {useLocation} from "wouter";
import {BackArrow} from "../../../layout/header/buttons/BackArrow.jsx";
import {RULESET_NAMES, RULESETS} from "../../../../constants/rulesets.js";
import {createInitialCampaign} from "../../../../stores/campaigns/initialCampaign";

const NewGameBase = memo(props => {
    const [location, setLocation] = useLocation();

    const [campaignName, setCampaignName] = useState('My Awesome Adventure');
    const [ruleSet, setRuleSet] = useState(RULESETS.MYTHIC);

    const addCampaign = useCampaignsStore((state) => state.addCampaign);

    const onCampaignNameChange = e => setCampaignName(() => e.target.value);
    const onRuleSetChange = (e, newValue) => setRuleSet(() => newValue);

    const onStartClick = () => {
        const id = UUID.generate();
        addCampaign(createInitialCampaign(id, campaignName, ruleSet));
        setLocation(`/game/${id}`);
    };

    return (
        <Box sx={{px: 2}}>
            <Sheet
                sx={{
                    width: '100%',
                    mx: 'auto', // margin left & right
                    my: 0, // margin top & bottom
                    py: 2, // padding top & bottom
                    px: 2, // padding left & right
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                variant="outlined"
            >
                <Stack direction="column" spacing={3}>
                    <Box>
                        <Typography level="h4" component="h1">
                            <b>Start a new game!</b>
                        </Typography>
                        <Typography level="body2">Fill in the information to start a new game.</Typography>
                    </Box>
                    <FormControl>
                        <FormLabel>Game Name</FormLabel>
                        <Input onChange={onCampaignNameChange} value={campaignName}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Rule System</FormLabel>
                        <Select onChange={onRuleSetChange} value={ruleSet}>
                            {Object.keys(RULESETS).map(ruleSet => (
                                <Option key={RULESETS[ruleSet]} value={RULESETS[ruleSet]}>{RULESET_NAMES[RULESETS[ruleSet]]}</Option>
                            ))}
                        </Select>
                    </FormControl>
                    <Button onClick={onStartClick}>Start your journey!</Button>
                </Stack>
            </Sheet>
        </Box>
    );
});

const mapHeader = props => ({
    title: 'Solo RPG Companion - New Game',
    leftButtonGroup: [() => <BackArrow/>],
});

export const NewGame = withHeader(mapHeader)(NewGameBase);
