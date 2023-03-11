const addThread = set => newThread => {
    set(state => ({
        threads: [...state.threads, newThread],
    }));
};

const removeThread = set => id => {
    set(state => ({
        threads: state.threads.filter(thread => thread.id !== id),
    }));
};

const editThread = set => newThreadData => {
    set(state => ({
        threads: state.threads.map(thread => {
            if (thread.id === newThreadData.id) {
                return { ...thread, ...newThreadData };
            }
            return thread;
        }),
    }));
};

const toggleThreadProgress = set => (id, isInProgress) => {
    set(state => ({
        threads: state.threads.map(thread => {
            if (thread.id === id) {
                return { ...thread, isInProgress };
            }
            return thread;
        }),
    }));
};

const addThreadNote = set => (id, newThreadNote) => {
    set(state => ({
        threads: state.threads.map(thread => {
            if (thread.id === id) {
                return { ...thread, notes: [newThreadNote, ...thread.notes] };
            }
            return thread;
        }),
    }));
};

const editThreadNote = set => (threadId, noteId, noteBody) => {
    set(state => ({
        threads: state.threads.map(thread => {
            if (thread.id === threadId) {
                return {
                    ...thread,
                    notes: thread.notes.map(note => {
                        if (note.id === noteId) {
                            return { ...note, body: noteBody };
                        }
                        return note;
                    }),
                };
            }
            return thread;
        }),
    }));
};

const removeThreadNote = set => (threadId, noteId) => {
    set(state => ({
        threads: state.threads.map(thread => {
            if (thread.id === threadId) {
                return {
                    ...thread,
                    notes: thread.notes.filter(note => note.id !== noteId),
                };
            }
            return thread;
        }),
    }));
};

export const threadActions = set => ({
    addThread: addThread(set),
    removeThread: removeThread(set),
    editThread: editThread(set),
    toggleThreadProgress: toggleThreadProgress(set),
    addThreadNote: addThreadNote(set),
    editThreadNote: editThreadNote(set),
    removeThreadNote: removeThreadNote(set),
});