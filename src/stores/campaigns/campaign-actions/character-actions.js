const addCharacter = set => newCharacter => {
    set(state => ({
        characters: [...state.characters, newCharacter],
    }));
};

const removeCharacter = set => id => {
    set(state => ({
        characters: state.characters.filter(character => character.id !== id),
    }));
};

const editCharacter = set => newCharacterData => {
    set(state => ({
        characters: state.characters.map(character => {
            if (character.id === newCharacterData.id) {
                return { ...character, ...newCharacterData };
            }
            return character;
        }),
    }));
};

const toggleCharacterActiveness = set => (id, isActive) => {
    set(state => ({
        characters: state.characters.map(character => {
            if (character.id === id) {
                return { ...character, isActive };
            }
            return character;
        }),
    }));
};

const addBioEntry = set => (id, newBioEntry) => {
    set(state => ({
        characters: state.characters.map(character => {
            if (character.id === id) {
                return { ...character, bio: [newBioEntry, ...character.bio] };
            }
            return character;
        }),
    }));
}

export const characterActions = set => ({
    addCharacter: addCharacter(set),
    removeCharacter: removeCharacter(set),
    editCharacter: editCharacter(set),
    toggleCharacterActiveness: toggleCharacterActiveness(set),
    addBioEntry: addBioEntry(set),
});