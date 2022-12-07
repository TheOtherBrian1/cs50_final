import { tableAtom } from '../../../Recoil/Atoms/TableAtoms';
import { useRecoilState } from 'recoil';
import "./ModifyColumn.css";
import { ReactComponent as Trash  } from '../../../assets/Trash.svg';
import { ReactComponent as Plus  } from '../../../assets/Plus.svg';
import { useState } from 'react';

const createColumn = ()=>({
    id: crypto.randomUUID() ,
    columnName: "",
    dataType: ["", ""],
    constraints: 
        {
            "NOT NULL": false,
            "UNIQUE": false,
            "INC": false,
            "DEFAULT": null
        },
    primaryKey: false,
    foreignKey: [],
});

export default function ModifyColumn({tableId, columnId}) {
    const [tables, setTables] = useRecoilState(tableAtom);
    const [show, setShow] = useState(false);
    return(
        <div className = "relative">
            <div 
                onClick={() => setShow(!show)}
                className = {`${show && "rotate-180"} cursor-pointer hover:scale-110 p-3 m-auto h-7 w-7 justify-center items-center flex bg-[#1414ec] rounded-full relative`}
            >
                <div className = " rotate-180 mt-[3px] triangle" />
            </div>
            {show && (
                <div className = "absolute rounded-md top-8 right-[-9px] z-10 p-4 w-20 bg-white">
                    <div className = "flex justify-between">
                        <Trash 
                            className = "hover:scale-110 cursor-pointer"
                            onClick = {() => {
                                setTables(tables.map(table => {
                                    if(table.id === tableId) {
                                        return {
                                            ...table,
                                            columns: table.columns.filter(column => column.id !== columnId) 
                                        }
                                    }
                                    return table;
                                }))
                            }}
                        />
                        <Plus 
                            className = "hover:scale-110 cursor-pointer"
                            onClick = {() => {
                                setTables(tables.map(table => {
                                    if(table.id === tableId) {
                                        return {
                                            ...table,
                                            columns: [
                                                ...table.columns,
                                                createColumn()
                                            ]
                                        }
                                    }
                                    return table;
                                }))
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
