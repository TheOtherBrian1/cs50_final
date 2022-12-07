import React, { useState } from 'react';
import { ReactComponent as Caret  } from '../../assets/Caret.svg';
import { useRecoilState } from "recoil";
import { tableAtom } from "../../Recoil/Atoms/TableAtoms";

export default function TableTab({id}){
    const [isOpened, setIsOpened] = useState(false);
    const [tables, setTables] = useRecoilState(tableAtom);
    return (
        <>
            <div className = "w-10/12 inline-flex justify-between items-center font-sans text-white border-b-[.5px] border-[#222] m-auto py-4 leading-[0px]">
                <span className = "max-w-[200px] overflow-x-clip">
                    {tables.find((table) => table.id === id).tableName}
                </span>
                <span className = "inline-block font-mono hover:scale-110 leading-[0px]">
                    <Caret 
                        width = "12px" 
                        height = "12px" 
                        className = {`${isOpened && 'rotate-180'}`}
                        onClick={() => setIsOpened(!isOpened)}
                    />
                </span>
            </div>
            <div className = {`${isOpened ? 'block' : 'hidden'} w-full`}>
                {tables.find((table) => table.id === id).columns.map((column) => {
                    return (
                        <div key = {column.id} className = "hover:bg-[#ffffff1a] flex mx-5 px-1 py-2 whitespace-nowrap items-center justify-start w-full">
                            {column.columnName}
                        </div>
                    );
                })}
            </div>
        </>
    );
}