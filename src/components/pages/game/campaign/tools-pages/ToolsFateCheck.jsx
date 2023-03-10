import {connectCampaign} from "../../../../../utils/zustand/connect.jsx";
import {Master} from "../../../../layout/header/Master.jsx";
import {Button, Stack, Textarea} from "@mui/joy";
import {BackArrow} from "../../../../layout/header/buttons/BackArrow.jsx";
import FormLabel from '@mui/joy/FormLabel';
import {useMemo, useState} from "react";
import {MYTHIC_ENGINE} from "../../../../../engines/mythic/mythic-engine.js";
import {WOUTER} from "../../../../../utils/wouter/wouter-extensions.js";

const ToolsFateCheckBase = props => {
    const [question, setQuestion] = useState('');
    const headerProps = useMemo(() => mapHeader(props), [props]);

    const onQuestionChange = e => setQuestion(e.target.value);

    const onProbabilityClick = (probability) => () => props.onProbabilityClick && props.onProbabilityClick(probability, question);

    return (
        <Master {...headerProps}>
            <Stack direction="column" spacing={2} sx={{px: 2}}>
                <FormLabel>Your yes/no question (Optional)</FormLabel>
                <Textarea
                    placeholder="Your yes/no question. This is optional."
                    value={question}
                    onChange={onQuestionChange}
                />
                <FormLabel>How likely is a yes?</FormLabel>
                <Stack direction="column" spacing={2} mt={2}>
                    <Button onClick={onProbabilityClick(0)}>Certain</Button>
                    <Button onClick={onProbabilityClick(1)}>Nearly Certain</Button>
                    <Button onClick={onProbabilityClick(2)}>Very Likely</Button>
                    <Button onClick={onProbabilityClick(3)}>Likely</Button>
                    <Button onClick={onProbabilityClick(4)}>50/50</Button>
                    <Button onClick={onProbabilityClick(5)}>Unlikely</Button>
                    <Button onClick={onProbabilityClick(6)}>Very Unlikely</Button>
                    <Button onClick={onProbabilityClick(7)}>Nearly Impossible</Button>
                    <Button onClick={onProbabilityClick(8)}>Impossible</Button>
                </Stack>
            </Stack>
        </Master>
    );
};

const mapHeader = props => ({
    title: `Fate Check`,
    leftButtonGroup: [() => <BackArrow />],
});

const selectors = ownProps => state => ([
    state.id,
    state.name,
]);

const mappers = (id, name, ownProps) => ({
    campaignId: id,
    campaignName: name,
    onProbabilityClick: (probability, question) => {
        MYTHIC_ENGINE.fateCheck(probability, question);
        WOUTER.navigation(`/game/${id}`, {replace: true});
    },
});

export const ToolsFateCheck = connectCampaign(selectors)(mappers)(ToolsFateCheckBase);