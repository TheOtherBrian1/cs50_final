import { selectorFamily } from "recoil";
import { tableAtom } from "../Atoms/TableAtoms";

export const tableSelector = selectorFamily({
    key: 'tableSelector',
    get: ({tableId, tableValues = [], columnId = null, columnValues = []}) => ({get}) => {
        const tables = get(tableAtom);
        const table = tables.find((table) => table.id === tableId);
        const values = {
            table: {},
            column: {},
        };

        for (const key of tableValues) {
            values.table[key] = table[key];
        }

        if (columnId) {
            const column = table.columns.find((column) => column.id === columnId);
            for (const key of columnValues) {
                values.column[key] = column[key];
            }
        }
        if (!tableValues.length && !columnValues.length) {
            return table;
        }
        return values;
    }
  });