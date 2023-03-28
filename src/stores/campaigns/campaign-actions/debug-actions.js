const changeRuleset = set => newRuleset => {
    set(state => ({
        ruleSet: newRuleset,
    }));
};

export const debugActions = set => ({
    changeRuleset: changeRuleset(set),
});