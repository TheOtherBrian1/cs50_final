import { ReactComponent as Caret  } from '../../../assets/Caret.svg';
import { ReactComponent as Mag  } from '../../../assets/Mag.svg';
import "./FK.css";
import React, {useState} from 'react';
import {useDeleteColumnValue, useUpdateTable} from '../../../hooks/tableHooks'
import Pill from '../../../elements/Pill/Pill';
import { useRecoilValue } from 'recoil';
import {tableAtom} from '../../../Recoil/Atoms/TableAtoms';
import { tableSelector } from '../../../Recoil/Selectors/tableSelector';

/*
    foreignkey = {
        columnId: 1,
        tableId: 1,
        columnName: "id",
    }
*/

export default function FK({tableId, columnId}) {
    const [displayDropDown, setDisplayDropDown] = useState(false);
    const [filterSearchInput, setFilterSearchInput] = useState("");
    const {foreignKey = [], dataType = []} = useRecoilValue(tableSelector({tableId, columnId, columnValues: ["foreignKey", "dataType"]})).column
    console.log(foreignKey, dataType);
    const deleteColumnValue = useDeleteColumnValue();
    const updateTable = useUpdateTable();
    const tables = useRecoilValue(tableAtom);
    return(
        <div 
            className = "rounded-sm mx-2 flex items-center justify-start w-full min-w-16 relative bg-black h-8"
        >
            <div className = {`DISPLAY_PILL DBSelect flex items-center min-w-16 nowheel overflow-x-auto py-1 h-8 px-3 ${"w-24"} content-center justify-between z-10 bg-[#cccccc10] ${foreignKey.length? null:"cursor-pointer"}`}
                onClick={() => {
                    if(foreignKey.length === 0)
                        setDisplayDropDown(!displayDropDown)
                }}
            >
                {foreignKey.map((foreignKey, index) => {
                    return !foreignKey.columnName? null : 
                        <Pill 
                            text = {foreignKey.columnName} 
                            clickHandler = {()=>deleteColumnValue({tableId, columnId, columnForeignKey: foreignKey})}
                            classes = {"fk" + index} 
                        />
                })}
            </div>
            {displayDropDown && 
                <div className = "absolute shadow-xl flex flex-col items-start top-8 left-0 rounded-md pb-2 bg-white">
                    <div className = "shadow-xl focus-within:flex group-hover:flex justify-center items-center group-hover:absolute top-0 left-full w-48 h-12 bg-[#F5F5F5]">
                        <label htmlFor="searchFK" className = " SEARCH_COLUMNS px-2 mx-2 mt-2 mb-3 bg-white flex justify-start items-center border-b-[.75px] border-[#767676] hover:border-b-2 hover:border-[#111] border-solid focus-within:border-[#3b65d8]">
                            <Mag />
                            <input 
                                value = {filterSearchInput}
                                onChange = {(e) => setFilterSearchInput(e.target.value)}
                                placeholder = "field" id="searchFK" className = "w-11/12 px-2 outline-none group" />
                        </label>

                        <div className = "absolute w-full shadow-xl flex flex-col items-start top-10 left-0 rounded-b-md pb-2 bg-white">
                            <div className = "SORT_FOREIGN_KEYS px-4 mb-2 flex items-center h-6 w-full bg-[#7676760a]">
                                <div className = "group/sort float-left flex justify-center items-center text-slate-400 hover:text-slate-800 text-sm">
                                    sort 
                                    <Caret className = "ml-2 group-hover/sort:mt-1 stroke-slate-400 fill-slate-400" width = "6px" height={6}/>
                                </div>
                            </div>
                            <div className = "DISPLAY_POTENTIAL_FOREIGN_KEYS nowheel overflow-y-auto w-full max-h-64">
                                {
                                    tables.map((table, ind) => {
                                        //Skips displaying column options from the same table
                                        if (table.id === tableId ) return null;
                                        return (
                                            <React.Fragment key = {tableId + columnId + table.tableName + ind}>
                                                <h6 
                                                    className = "text-xs text-start w-11/12 m-auto border-b-[.5px] sticky top-0 bg-white z-20 border-[#a7a7a7] px-2 pb-1"
                                                >
                                                    {table.tableName}
                                                </h6>
                                                {
                                                    table.columns.filter(col=>col.columnName.includes(filterSearchInput)).map((column, index) => 
                                                        <label 
                                                            key = {tableId + columnId + table.tableName + ind + column.columnName + index} 
                                                            htmlFor={tableId + columnId + table.tableName + ind + column.columnName + index} 
                                                            className = "hover:bg-[#0000000a] flex px-4 py-2 whitespace-nowrap items-center justify-start w-full">
                                                            <input 
                                                                id = {tableId + columnId + table.tableName + ind + column.columnName + index} 
                                                                type="checkbox" 
                                                                className="bg-gray-100 rounded border-neutral-300 border-spacing-2 scale-110" 
                                                                checked = {tables.find(table => table.id === foreignKey.tableId)?.columns.find(column => column.id === foreignKey.columnId)}
                                                                onChange = {e => {
                                                                    const checked = e.target.checked;
                                                                    if (checked)
                                                                        updateTable({
                                                                            tableId, 
                                                                            columnId, 
                                                                            columnForeignKey: {
                                                                                tableId: table.id, 
                                                                                columnName: column.columnName, 
                                                                                columnId: column.id
                                                                            }
                                                                        })
                                                                    else {
                                                                        console.log(tableId, columnId, foreignKey, "HELLO JESUS")
                                                                        deleteColumnValue({tableId, columnId, columnForeignKey: {
                                                                            tableId: table.id, 
                                                                            columnName: column.columnName, 
                                                                            columnId: column.id
                                                                        }})
                                                                    }
                                                                }}
                                                            />
                                                            <span className = "font-medium ml-3 text-black">{column?.columnName}</span>
                                                        </label>
                                                    )
                                                }
                                            </React.Fragment>
                                        )
                                    })
                                }
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
