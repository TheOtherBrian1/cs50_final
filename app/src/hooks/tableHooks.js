import { useSetRecoilState, useRecoilState } from "recoil";
import { tableAtom } from "../Recoil/Atoms/TableAtoms";
import { useCallback } from "react";


export function useCreateTable() {
    const [tables, setTables] = useRecoilState(tableAtom);
        function addTable (position = {x:100, y:0}, tableName = null) {
            const uuid = crypto.randomUUID();
            setTables(() => 
                [
                    ...tables,
                    {
                        id: uuid,
                        position: position,
                        tableName: tableName ? tableName : "Table " + (tables.length + 1),
                        type: "DBTable",
                        columns: [
                            {
                                id: crypto.randomUUID(),
                                columnName: null,
                                dataType: ["", ""],
                                constraints: [],
                                primaryKey: false,
                                foreignKey: [],
                            },
                        ],
                    },
                ]
            );
            return uuid;
        }
    return addTable;
}

export function useUpdateTable() {
    const [tables, setTables] = useRecoilState(tableAtom);
     
    function updateTable({
            tableId, 
            columnId = null, 
            position = null, 
            tableName = null,
            type = null,
            columnName = null,
            columnDataType = null,
            columnConstraint = null,
            columnPrimaryKey = null,
            columnForeignKey = null,
        }) {
            setTables(
                () => 
                    tables.map((table) => {
                        if (table.id === tableId) {
                            return {
                                ...table,
                                position: position ? position : table.position,
                                tableName: tableName !== null ? tableName : table.tableName,
                                type: type ? type : table.type,
                                columns: !columnId ? table.columns : table.columns.map((column) => {
                                    if (columnId === column.id){
                                        console.log(columnDataType)
                                        return {
                                            ...column,
                                            columnName: columnName !== null ? columnName : column.columnName,
                                            dataType: columnDataType !== null  ? columnDataType : column.dataType,
                                            constraints: columnConstraint ? {...column.constraints, ...columnConstraint } : column.constraints,
                                            primaryKey: columnPrimaryKey ?? column.primaryKey,
                                            foreignKey: columnForeignKey ? [...column.foreignKey, columnForeignKey] : column.foreignKey,
                                        }
                                    }
                                    return column;
                                })
                            }
                        }
                        return table;
                    })
            );
        }
    return updateTable;
}
    
export function useDeleteColumnValue() {
    const [tables, setTables] = useRecoilState(tableAtom);
    function deleteFromColumn ({
            tableId, 
            columnId,
            columnName = false,
            columnDataType = false,
            columnConstraint = false,
            columnPrimaryKey = false,
            columnForeignKey = false
        }) {
            setTables(
                () => 
                    tables.map((table) => {
                        if (table.id === tableId) {
                            return {
                                ...table,
                                columns: table.columns.map((column) => {
                                    if (columnId === column.id){
                                        return {
                                            ...column,
                                            columnName: columnName ? "" : column.columnName,
                                            dataType: columnDataType ? columnDataType : column.dataType,
                                            constraints: columnConstraint ? [...column.constraints, {[columnConstraint]: false}] : column.constraints,
                                            primaryKey: columnPrimaryKey ? false : column.primaryKey,
                                            foreignKey: columnForeignKey ? column.foreignKey.filter(key=>key.columnId !== columnForeignKey.columnId) : column.foreignKey,
                                        }
                                    }
                                    return column;
                                })
                            }
                        }
                        return table;
                    })
            );
    }
    return deleteFromColumn;
}

export function useDeleteColumn() {
    const [tables, setTables] = useRecoilState(tableAtom);
        function deleteColumn (tableId, columnId) {
            setTables(
                () => 
                    tables.map((table) => {
                        if (table.id === tableId) {
                            return {
                                ...table,
                                columns: table.columns.filter(column=>column.id !== columnId)
                            }
                        }
                        return table;
                    })
            );
        }
    return deleteColumn;
}

export function useDeleteTable() {
    const [tables, setTables] = useRecoilState(tableAtom);
        function deletetable (tableId) {
            setTables(
                () => tables.filter((table) => table.id !== tableId)              
            );
        }
    return deletetable;
}
