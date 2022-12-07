import "./Constraints.css";

import {CONSTRAINTS} from '../../../constants/constraints';

import { ReactComponent as Caret  } from '../../../assets/Caret.svg';
import Pill from '../../../elements/Pill/Pill';

import React, {useState, useCallback} from 'react';

import { useRecoilValue } from 'recoil';
import { useUpdateTable } from '../../../hooks/tableHooks';
import { tableSelector } from '../../../Recoil/Selectors/tableSelector';

 function Constraints({tableId, columnId}) {
    const [displayDropDown, setDisplayDropDown] = useState(false);
    const {constraints} = useRecoilValue(tableSelector({tableId, columnId, columnValues: ["constraints"]})).column
    const updateTable = useUpdateTable();
    return(
        <div  className = "rounded-sm mx-2 flex items-center justify-start w-full min-w-16 relative bg-black h-8">
            <div className = {`DBSelect flex items-center min-w-16 nowheel overflow-x-auto py-1 h-8 px-3 w-24 content-center justify-between z-10 bg-[#cccccc10] ${Object.values(constraints).filter(isActive=>isActive).length ? null : "cursor-pointer"}`}
                onClick = {()=>{
                            //When the display box is empty, clicking it will display the dropdown
                            const displayDropDownIfEmpty = !Object.values(constraints).filter(val=>val).length;
                            if (displayDropDownIfEmpty) 
                                setDisplayDropDown(!displayDropDown);
                            }
                }
            >
                {
                    // display pill for each constraint
                    // constraints are split into [constraintText, isActive]
                    Object.entries(constraints)
                        .map(([constraintText, isActive], ind) => {
                                if(isActive)
                                    return (
                                    <Pill 
                                        text = {constraintText}
                                        key = {columnId + constraintText + tableId + "pill"} 
                                        isActive = {isActive}
                                        classes = {"constraint" + ind}
                                        clickHandler = {() => updateTable({tableId, columnId, columnConstraint: {[constraintText]: false}})}
                                    />)
                                else return null;
                            }
                        )
                }
            </div>
            {displayDropDown && 
                <div className = "absolute shadow-xl flex flex-col items-start top-8 left-0 rounded-md py-2 bg-white z-40">
                    {
                        CONSTRAINTS.map((constraint, index) =>
                            <label   
                                key = {columnId + constraint + "dropdown"} 
                                htmlFor={columnId + constraint} 
                                className = "cursor-pointer hover:bg-[#0000000a] flex px-4 py-2 whitespace-nowrap items-center justify-start w-full"
                            >
                                <input 
                                    id = {columnId + constraint} 
                                    type="checkbox" 
                                    checked = { constraints[constraint] }
                                    className="bg-gray-100 h-full rounded border-neutral-300 border-spacing-2 scale-110"
                                    onChange = {(e) => {
                                        updateTable({tableId, columnId, columnConstraint: {[constraint]: e.target.checked}})}
                                    }
                                />
                                <span className = "font-medium ml-3">{constraint}</span>
                            </label>
                        )
                    }
                    <label htmlFor='2' className = "group hover:bg-[#0000000a] flex px-4 py-2 whitespace-nowrap items-center justify-between w-full relative">
                        <span className = "font-medium">DEFAULT</span>
                        <Caret className = "rotate-[270deg]" width = "12px" height={12}/>
                        <div className = "hidden shadow-xl focus-within:flex group-hover:flex justify-center items-center group-hover:absolute top-0 left-full w-48 h-10 bg-[#F5F5F5]">
                            <label htmlFor="default">
                                <input 
                                    list="default" 
                                    placeholder = "value..." 
                                    id="default" 
                                    className = "text-black w-11/12 px-2 outline-none border-b-[.75px] border-[#767676] hover:border-b-2 hover:border-[#111] border-solid focus:border-[#3b65d8]" 
                                    onChange = {(e) => updateTable({tableId, columnId, columnConstraint: {DEFAULT: e.target.value}})}
                                />
                                <datalist className = "appearance-none">
                                    <option value="DATE()" />
                                </datalist>
                            </label>
                        </div>
                    </label>   
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

export default React.memo(Constraints);




// function pillXClickHandler(tables, setTables, activeConstraints, tableId, columnId) {
//     return activeConstraints.map((constraint, index) => {
//         return !constraint[1]? null : 
//             <div key = { constraint[0] + columnId + tableId} className = {`rounded-full ${"constraint" + index} leading-none px-2 mr-2 flex justify-center items-center max-w-96`}>
//                 <span 
//                     className = "whitespace-nowrap leading-none p-1 text-white">{constraint[0]}
//                 </span>
//                 <span 
//                     className = "ml-2 relative justify-center items-center cursor-pointer hover:scale-[1.2] hover:bg-[#bbb] border-[#ffffff23] border-[1px] leading-none p-1 rounded-full bg-[#aaaaaa] h-3 w-3"
//                     onClick = {()=>
//                         setTables(tables.map(table => {
//                             if(table.id === tableId) {
//                                 return {
//                                     ...table,
//                                     columns: table.columns.map(column => {
//                                         if(column.id === columnId) {
//                                             return {
//                                                 ...column,
//                                                 constraints: {
//                                                     ...column.constraints,
//                                                     [constraint[0]]: false
//                                                 }  
//                                             }
//                                         }
//                                         return column;
//                                     })
//                                 }
//                             }
//                             return table;
//                         }))
//                     }
//                 >
//                     <div className = "absolute top-[1px] left-[4px] h-2 rounded-md rotate-45 w-[2px] bg-white" />
//                     <div className = "absolute top-[1px] left-[4px] h-2 rounded-md rotate-[315deg] w-[2px] bg-white" />
//                 </span>
//             </div>
//     })
// }

// function listConstraintOptions(CONSTRAINTS, setTables, tables, tableId, columnId){
//     return CONSTRAINTS.map((constraint, index) =>                         
//     <label   
//          key = {columnId + constraint} htmlFor={columnId + constraint} className = "cursor-pointer hover:bg-[#0000000a] flex px-4 py-2 whitespace-nowrap items-center justify-start w-full">
//         <input 
//             id = {columnId + constraint} 
//             type="checkbox" 
//             checked = {tables.find(table => table.id === tableId).columns.find(column => column.id === columnId).constraints[constraint]}
//             className="bg-gray-100 h-full rounded border-neutral-300 border-spacing-2 scale-110"
//             onChange = {(e) => {
//                 setTables(tables.map(table => {
//                     if(table.id === tableId) {
//                         return {
//                             ...table,
//                             columns: table.columns.map(column => {
//                                 if(column.id === columnId) {
//                                     return {
//                                         ...column,
//                                         constraints: {
//                                             ...column.constraints,
//                                             [constraint]: e.target.checked
//                                         }  
//                                     }
//                                 }
//                                 return column;
//                             })
//                         }
//                     }
//                     return table;
//                 }))
//             }}
//         />
//         <span className = "font-medium ml-3">{constraint}</span>
//     </label>
// )}

// function handleDefaultChange(e, tables, tableId, columnId) {
//     tables.map(table => {
//         if(table.id === tableId) {
//             return {
//                 ...table,
//                 columns: table.columns.map(column => {
//                     if(column.id === columnId) {
//                         return {
//                             ...column,
//                             constraints: {
//                                 ...column.constraints,
//                                 DEFAULT: e.target.value
//                             }
//                         }
//                     }
//                     return column;
//                 })
//             }
//         }
//         return table;
//     })
// }