import {BackArrow} from "../../../layout/header/buttons/BackArrow.jsx";
import {withHeader} from "../../../layout/header/Master.jsx";
import {connect} from "../../../../utils/zustand/connect.jsx";
import {useMythicTablesStore} from "../../../../stores/mythic/tables.js";
import {FormControl, FormLabel, Input, Option, Select, Stack, Typography} from "@mui/joy";
import {MEANING_TABLES, MEANING_TABLES_TO_STRING} from "../../../../utils/mythic/mythic-constants.js";
import {useState} from "react";

const rangeTo100 = Array.from(Array(100).keys());

export const MythicTablesEditorBase = props => {
    const [currentTable, setCurrentTable] = useState(MEANING_TABLES.ACTIONS);

    const onTableChange = (e, newValue) => setCurrentTable(newValue);
    const onEntryChanged = (index) => (event) => props.onEditTableEntry && props.onEditTableEntry(currentTable, index, event.target.value);

    const getEntry = (table, index) => props.tables[currentTable] && props.tables[currentTable][index] || '';

    return (
        <Stack direction="column" spacing={2} sx={{px: 2, width: '100%'}}>
            <Stack direction="row" spacing={1} sx={{width: '100%'}}>
                <FormControl sx={{width: '100%'}}>
                    <FormLabel>Table</FormLabel>
                    <Select
                        onChange={onTableChange}
                        value={currentTable}
                        sx={{width: '100%'}}
                    >
                        {Object.keys(MEANING_TABLES).map(t => (
                            <Option key={MEANING_TABLES[t]} value={MEANING_TABLES[t]}>{MEANING_TABLES_TO_STRING[MEANING_TABLES[t]]}</Option>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            {rangeTo100.map(i => (
                <Stack key={i} direction="row" spacing={1} sx={{alignItems: 'center'}}>
                    <Typography level="h6">{`${i + 1}:`}</Typography>
                    <Input onChange={onEntryChanged(i+1)} sx={{width: '100%'}} value={getEntry(currentTable, i+1)}/>
                </Stack>
            ))}
        </Stack>
    );
};

const mapHeader = props => ({
    title: 'Solo RPG Companion - Edit Mythic Tables',
    leftButtonGroup: [() => <BackArrow/>],
});

const selectors = ownProps => state => ([
    state.tables,
    state.editTableEntry,
]);

const mappers = (tables, editTableEntry, ownProps) => ({
    tables,
    onEditTableEntry: editTableEntry,
});

export const MythicTablesEditor = withHeader(mapHeader)(connect(useMythicTablesStore, selectors)(mappers)(MythicTablesEditorBase));