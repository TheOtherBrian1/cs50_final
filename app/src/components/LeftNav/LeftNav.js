import React from 'react';
import "./LeftNav.css";
import TableTab from '../TableTab/TableTab';
import { ReactComponent as Mag  } from '../../assets/Mag.svg';
import { useRecoilValue } from "recoil";
import { tableAtom } from "../../Recoil/Atoms/TableAtoms";
import { useCreateTable } from "../../hooks/tableHooks";

export default function LeftNav(){
    const tables = useRecoilValue(tableAtom);
    const addTable = useCreateTable();
    return (
        <div className = "LeftNav max-w-[240px] text-[#707070]">
            <div className = "flex justify-around items-center h-8 border-[#444444] border-b-[.5px]">
                <span>
                    <Mag />
                </span>
                <div className = "w-1/2 font-medium ">
                    <div className = "m-auto flex justify-between items-center text-sm w-2/3">
                        <span>
                            Tables
                        </span>
                        <span>
                            Code
                        </span>
                    </div>
                </div>
                <span 
                    className = "h-full inline-flex items-center mb-1 justify-center hover:scale-110 hover:mb-2 font-bold text-gray-400 text-2xl"
                    onClick = {() => addTable()}
                >
                    +
                </span>
            </div>
            <div className = "m-auto w-full flex flex-col justify-center items-start">
                <span></span>
                {tables.map((table) => (
                    <TableTab key = {table.id} id = {table.id} />
                ))}
            </div>
        </div>
    );
}