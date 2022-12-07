import "./DataTypes.css";

import {dataTypes as dataTypesList} from '../../../constants/dataTypes';

import { useState } from 'react';

import { useRecoilValue } from 'recoil';
import { tableSelector } from '../../../Recoil/Selectors/tableSelector';
import { useUpdateTable } from '../../../hooks/tableHooks';



export default function DataTypes({tableId, columnId}) {
    const [input, setInput] = useState(null);
    const [displayDropDown, setDisplayDropDown] = useState(false);
    const [selectedDataCategory = "", selectedDataType = ""] = useRecoilValue(tableSelector({tableId, columnId, columnValues: ["dataType"]})).column.dataType
    const updateTable = useUpdateTable();
    console.log(selectedDataCategory, selectedDataType, "MILK\n\n")
    return(
        <div className = "DBSelect input m-auto relative">
            <div className = {`${selectedDataCategory || "text-white"} rounded-sm mx-2 flex items-center justify-around relative bg-black h-8 w-28`}>
                <input 
                    onFocus={() => setDisplayDropDown(true)}
                    value = {input ?? ""}
                    className = {`${ selectedDataCategory || "text-white" } text-ellipsis w-full h-full bg-transparent`}
                    placeholder = "INT..."
                    onChange = {(e) => setInput(e.target.value)}
                />
                {
                    !displayDropDown && !input?
                        <div 
                            className = "relative cursor-pointer hover:scale-150 w-2 h-2 inline-block bg-[#D82400] rounded-sm rotate-45"
                            onClick = {() => setDisplayDropDown(!displayDropDown)}
                        >
                            <div className = "absolute bottom-1 right-1 w-1 h-1 bg-black" />
                        </div>
                        :
                        <span 
                            onClick = {() => {
                                updateTable({tableId, columnId, columnDataType: ["", ""]})
                                if(!input)
                                    setDisplayDropDown(!displayDropDown);
                                else
                                    setInput("");
                            }}

                            className = "top-[2px] bottom-0 right-1 cursor-pointer ml-2 relative justify-center items-center hover:scale-[1.2] hover:bg-[#bbb] border-[#ffffff23] border-[1px] leading-none p-1 rounded-full bg-[#aaaaaa] h-3 w-3">
                            <div className = "absolute top-[1px] left-[4px] h-2 rounded-md rotate-45 w-[2px] bg-white" />
                            <div className = "absolute top-[1px] left-[4px] h-2 rounded-md rotate-[315deg] w-[2px] bg-white" />
                        </span>
                }
            </div>
            <div className = {`${displayDropDown?"absolute":"hidden"} left-0 right-0 max-h-96 w-[220px] bg-black nowheel overflow-y-scroll z-30`}>
                {dataTypesList.mysql.map((dataType, ind) => {
                    return(
                        <div 
                            label = {tableId + columnId + "dataType" + ind}
                            key = {tableId + columnId + "dataType" + ind}
                        >
                            <h3 className = "bg-slate-900 py-2 pl-3 text-white text-left text-xl font-bold">{Object.keys(dataType)[0]}</h3>
                            {dataType[Object.keys(dataType)[0]].sort((a,b)=>a.localeCompare(b)).map((type, ind) => {
                                if(!input || type.includes(input.toUpperCase()))
                                    return(
                                        <label 
                                            key = {`${tableId + type + ind}`} 
                                            onClick = {() => {
                                                setInput(type)
                                                updateTable({tableId, columnId, columnDataType: [Object.keys(dataType)[0], type]})
                                                setDisplayDropDown(false);
                                            }}
                                            className = "hover:bg-[#ffffff0a] flex px-4 py-2 whitespace-nowrap items-center justify-start w-full"
                                        >
                                            <span className = {`${Object.keys(dataType)[0]} DBSelected px-4`} value = {type}>{type}</span>
                                        </label>
                                    )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}






// function generateDataTypeOptions(text, tableId, setTables, tables, setText, setDisplayDropDown) {
//     return dataTypes.mysql.map((dataType) => {
//         return(
//             <div label = {Object.keys(dataType)}>
//                 <h3 className = "bg-slate-900 py-2 pl-3 text-white text-left text-xl font-bold">{Object.keys(dataType)}</h3>
//                 {dataType[Object.keys(dataType)[0]].sort((a,b)=>a.localeCompare(b)).map((type) => {
//                     if(!text || type.includes(text.toUpperCase()))
//                         return(
//                             <label 
//                                 key = {`${tableId + type}`} 
//                                 onClick = {() => {
//                                     setTables(tables.map(table => {
//                                         if(table.id === tableId) {
//                                             setText(type);
//                                             return {
//                                                 ...table,
//                                                 dataType: [type, Object.keys(dataType)]
//                                             }
//                                         }
//                                         return table;
//                                     }));
//                                     setDisplayDropDown(false);
//                                 }}
//                                 className = "hover:bg-[#ffffff0a] flex px-4 py-2 whitespace-nowrap items-center justify-start w-full"
//                             >
//                                 <span className = {`${Object.keys(dataType)} DBSelected px-4`} value = {type}>{type}</span>
//                             </label>
//                         )
//                 })}
//             </div>
//         )
//     })
// }