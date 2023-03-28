export const loadRuleset = async (set, get) => {
    const ruleset = get().ruleSet;
    try {
        const {actions} = await import(`../../../../rulesets/${ruleset.toLowerCase()}/actions/actions.js`);
        set(() => ({...actions(set)}));
    } catch (e) {
        console.warn(`No actions found for ruleset ${ruleset}`);
    }
};