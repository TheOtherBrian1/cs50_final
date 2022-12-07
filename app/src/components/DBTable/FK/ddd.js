import { ReactComponent as Caret  } from '../../../assets/Caret.svg';
import { ReactComponent as Mag  } from '../../../assets/Mag.svg';
import "./FK.css";
import React, {useState} from 'react';
import { tableAtom } from '../../../Recoil/Atoms/TableAtoms';
import { useRecoilState } from 'recoil';
import {CONSTRAINTS} from '../../../constants/constraints';

function filterTables(tables, tableId, columnId, filterSearch, setTables) {
    // Filters the tables to only show the ones that are not the current table
    const filteredTable = tables.map((table, ind) => {
        const searchable = (table.id !== tableId && columns.length);
        if (!searchable) 
            return <div>key = {tableId + columnId + table.tableName + ind} </div>
        // list of columns from all other tables that are not the current table
        const columns = table?.columns?.filter(column => {
            // if the column has a dataType set and matches the text fitler, add to list
            let { columnName } = column;
            columnName = columnName.toLowerCase();
            filterSearch = filterSearch.toLowerCase();
            const dataTypeExists = column.dataType !== null;
            if (dataTypeExists && columnName.includes(filterSearch)) 
                return true;
            return false;
        });
        //if the table id is the same as the table current table
        //all columns forom it should be dismissed
        //if the table has a column length of 0
        return(
            <React.Fragment key = {tableId + columnId + table.tableName + ind}>
                <h6 
                    className = "text-xs text-start w-11/12 m-auto border-b-[.5px] sticky top-0 bg-white z-20 border-[#a7a7a7] px-2 pb-1"
                >
                    {table.tableName}
                </h6>
                {
                    filterColumns(tableId, columnId, tables, table.tableName, setTables, columns)
                }
            </React.Fragment>
        )
        })
    return <h2>hhh</h2>
}

function filterColumns(tableId, columnId, tables, tableName, setTables, columns) {
    //get current FK from the table
    const table = tables.find(table => table.id === tableId);
    const activeFKs = table.columns.find(column => column.id === columnId).foreignKey; 
    return columns.map((column) => {
        const key = tableId + columnId + table.tableName + column.columnName;
        const checked = activeFKs.find(fk => fk.columnId === column.id);
        return (
            <label 
                key = {key} 
                htmlFor={key} 
                className = "hover:bg-[#0000000a] flex px-4 py-2 whitespace-nowrap items-center justify-start w-full">
                <input 
                    id = {key} type="checkbox" 
                    className="bg-gray-100 rounded border-neutral-300 border-spacing-2 scale-110" 
                    checked = {checked}
                    onChange = {e => updateStateManagement(tables, tableId, columnId, setTables, checked)}
                />
                <span className = "font-medium ml-3 text-black">{column?.columnName}</span>
            </label>
        )
    })
}

function updateStateManagement(tables, tableId, columnId, setTables, checked) {
    setTables(tables.map(table => {
        if(table.id === tableId) {
            return {
                ...table,
                columns: table.columns.map(column => {
                    if(column.id === columnId) {
                        if(checked) {
                            return {
                                ...column,
                                foreignKey: [
                                    ...column.foreignKey, {
                                        columnName: column.columnName, 
                                        tableId, 
                                        columnId
                                    }
                                ]
                            }
                        }
                        else {
                            return {
                                ...column,
                                foreignKey: column.foreignKey.filter(foreignKey => foreignKey.columnId !== column.id)
                            }
                        }
                    }
                    return column;
                })
            }
        }
        return table;
    }))
}

function removePill(setTables, tables, tableId, columnId) {
    setTables(tables.map(table => {
        if(table.id === tableId) {
            return {
                ...table,
                columns: table.columns.map(column => {
                    if(column.id === columnId) {
                        return {
                                ...column,
                                foreignKey: column.foreignKey.filter(fk => fk.columnId !== columnId)
                            }
                        }
                    return column;
                })
            }
        }
        return table;
    }))
}


export default function FK({tableId, columnId}) {
    console.log(columnId, tableId, "COLUMNID1");
    const [tables, setTables] = useRecoilState(tableAtom); 
    const [displayDropDown, setDisplayDropDown] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");
    const dataType = tables.find(table => table.id === tableId).columns.find(column => column.id === columnId).dataType;
    const activeFKs = tables.find(table=> table.id === tableId).columns.find(column => column.id === columnId).foreignKey; 
    return(
        <div 
            className = "rounded-sm mx-2 flex items-center justify-start w-full min-w-16 relative bg-black h-8"
        >
            <div className = {`DBSelect flex items-center min-w-16 nowheel overflow-x-auto py-1 h-8 px-3 ${"w-24"} content-center justify-between z-10 bg-[#cccccc10] ${activeFKs.filter(a=>a[1]).length? null:"cursor-pointer"}`}
                onClick={() => {
                    if(activeFKs.length === 0)
                        setDisplayDropDown(!displayDropDown)
                }}
            >
                {activeFKs.map((foreignKey, index) => {
                    return !foreignKey.columnName? null : 
                        <div key = { foreignKey.columnName + columnId + tableId} className = {`rounded-full ${"fk" + index} leading-none px-2 mr-2 flex justify-center items-center max-w-96`}>
                            <span 
                                className = "whitespace-nowrap leading-none p-1 text-white">{foreignKey.columnName}
                            </span>
                            <span 
                                className = "ml-2 relative justify-center items-center cursor-pointer hover:scale-[1.2] hover:bg-[#bbb] border-[#ffffff23] border-[1px] leading-none p-1 rounded-full bg-[#aaaaaa] h-3 w-3"
                                onClick = {()=>removePill(setTables, tables, tableId, columnId)}
                            >
                                <div className = "absolute top-[1px] left-[4px] h-2 rounded-md rotate-45 w-[2px] bg-white" />
                                <div className = "absolute top-[1px] left-[4px] h-2 rounded-md rotate-[315deg] w-[2px] bg-white" />
                            </span>
                        </div>
                })}
            </div>
            {displayDropDown && 
                <div className = "absolute shadow-xl flex flex-col items-start top-8 left-0 rounded-md pb-2 bg-white">
                    <div className = "shadow-xl focus-within:flex group-hover:flex justify-center items-center group-hover:absolute top-0 left-full w-48 h-12 bg-[#F5F5F5]">
                        <label htmlFor="duck" className = "px-2 mx-2 mt-2 mb-3 bg-white flex justify-start items-center border-b-[.75px] border-[#767676] hover:border-b-2 hover:border-[#111] border-solid focus-within:border-[#3b65d8]">
                            <Mag />
                            <input 
                                value = {filterSearch}
                                onChange = {(e) => setFilterSearch(e.target.value)}
                                placeholder = "field" id="duck" className = "w-11/12 px-2 outline-none group" />
                        </label>

                        <div className = "absolute w-full shadow-xl flex flex-col items-start top-10 left-0 rounded-b-md pb-2 bg-white">
                            <div className = "px-4 mb-2 flex items-center h-6 w-full bg-[#7676760a]">
                                <div className = "group/sort float-left flex justify-center items-center text-slate-400 hover:text-slate-800 text-sm">
                                    sort 
                                    <Caret className = "ml-2 group-hover/sort:mt-1 stroke-slate-400 fill-slate-400" width = "6px" height={6}/>
                                </div>
                            </div>
                            <div 
                                className = "nowheel overflow-y-auto w-full max-h-64"
                                onScroll={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {filterTables(tables, tableId, columnId, filterSearch, setTables)}
                            </div>
                        </div>
                    </div>
                </div> 
            }
                    <div 
                        className = {`cursor-pointer hover:scale-150 w-2 h-2 inline-block bg-[#D82400] ml-2 rounded-sm ${displayDropDown? " rotate-[225deg]":"rotate-45"}`}
                        onClick = {() => setDisplayDropDown(!displayDropDown)}
                    >
                        <div className = "absolute bottom-1 right-1 w-1 h-1 bg-black" />
                    </div>
        </div>
    )
}
