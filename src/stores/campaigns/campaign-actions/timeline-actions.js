const addEntry = set => entry => {
    set(state => ({
        timeline: [...state.timeline, entry],
    }));
};

export const timelineActions = set => ({
    addTimelineEntry: addEntry(set),
});