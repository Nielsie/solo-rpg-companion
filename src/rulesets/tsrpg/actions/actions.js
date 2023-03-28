import {CHARACTER_SHEET_BUILDERS} from "../builders/charactersheet-builders.js";

const returnNewSheet = (state, current, newSheet) => ({
    characterSheets: current
        ? state.characterSheets.map(sheet => sheet.id === newSheet.id ? newSheet : sheet)
        : [...(state.characterSheets || []), newSheet],
});

const editCharacterSheetTrait = set => (sheetId, newTrait) => {
    set(state => {
        const current = (state.characterSheets || []).find(sheet => sheet.id === sheetId);
        const newSheet = {
            ...(current ? current : CHARACTER_SHEET_BUILDERS.initializeSheet(sheetId)),
            trait: newTrait,
        };
        return returnNewSheet(state, current, newSheet);
    });
};

const editCharacterSheetStat = set => (sheetId, newStat) => {
    set(state => {
        const current = (state.characterSheets || []).find(sheet => sheet.id === sheetId);
        const newSheet = {
            ...(current ? current : CHARACTER_SHEET_BUILDERS.initializeSheet(sheetId)),
            stats: {
                ...current?.stats,
                [newStat.type]: newStat,
            },
        };

        return returnNewSheet(state, current, newSheet);
    });
};

const addCharacterSheetInventory = set => (sheetId, newGear) => {
    set(state => {
        const current = (state.characterSheets || []).find(sheet => sheet.id === sheetId);
        const newSheet = {
            ...(current ? current : CHARACTER_SHEET_BUILDERS.initializeSheet(sheetId)),
            inventory: [...current.inventory, newGear],
        };

        return returnNewSheet(state, current, newSheet);
    });
};

const editCharacterSheetInventory = set => (sheetId, newGear) => {
    set(state => {
        const current = (state.characterSheets || []).find(sheet => sheet.id === sheetId);

        if (!current) return;

        const newSheet = {
            ...current,
            inventory: current.inventory.map(gear => gear.id === newGear.id ? newGear : gear),
        };

        return returnNewSheet(state, current, newSheet);
    });
};

const removeCharacterSheetInventory = set => (sheetId, gearId) => {
    set(state => {
        const current = (state.characterSheets || []).find(sheet => sheet.id === sheetId);

        if (!current) return;

        const newSheet = {
            ...current,
            inventory: current.inventory.filter(gear => gear.id !== gearId),
        };

        return returnNewSheet(state, current, newSheet);
    });
};

export const actions = set => ({
    editCharacterSheetTrait: editCharacterSheetTrait(set),
    editCharacterSheetStat: editCharacterSheetStat(set),
    addCharacterSheetInventory: addCharacterSheetInventory(set),
    editCharacterSheetInventory: editCharacterSheetInventory(set),
    removeCharacterSheetInventory: removeCharacterSheetInventory(set),
});