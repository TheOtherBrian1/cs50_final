import "./DBTable.css";

import ColumnTitle from './ColumnTitle/ColumnTitle';
import DataTypes from './DataTypes/DataTypes';
import Constraints from './Constraints/Constraints';
import PrimaryKey from './PrimaryKey/PrimaryKey';
import FK from './FK/FK';
import ModifyColumn from './ModifyColumn/ModifyColumn';

import ReactFlow, { 
    Handle, 
    Position,
} from 'reactflow';

import { useRecoilValue } from 'recoil';
import { useUpdateTable } from '../../hooks/tableHooks';
import { tableSelector } from "../../Recoil/Selectors/tableSelector";

const handleStyle = { left: 10 };


export default function DBTable({id}) {
    const table = useRecoilValue(tableSelector({tableId: id}))
    const updateTable = useUpdateTable();
    return(
        <>
            <Handle type="target" position={Position.Left} />
            <div className = "DBTable border-none inline-flex flex-col rounded-t-lg rounded-b-sm">
                <header className = "DBHeader h-10 min-w-[360px] title rounded-t-lg">
                    <input 
                        className = "DBTitle text-ellipsis h-full rounded-t-lg w-full bg-[#4B4C4E] text-white input"
                        placeholder = "Table Name"
                        value = {table?.tableName || ""} 
                        onChange = {(e) => updateTable({tableId: id, tableName: e.target.value})}
                    />
                </header>
                <table className="mb-3">
                    <thead>
                        <tr className = "DBCategories">
                            <th className = "">Column Name</th>
                            <th className = " ">Data Type</th>
                            <th className = " ">Constraints</th>
                            <th className = "w-24 px-2">PK</th>
                            <th className = " ">FK</th>
                            <th className = " ">Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.columns.map((column) => {
                            return (
                                <tr key = {column.id}>
                                    <td className = "relative"><ColumnTitle tableId={id} columnId={column.id} /></td>
                                    <td className = ""><DataTypes tableId = {id} columnId = {column.id} /></td>
                                    <td className = "relative"><Constraints tableId = {id} columnId = {column.id} /></td>
                                    <td className = "w-24 px-2"><PrimaryKey tableId = {id} columnId = {column.id} /></td>
                                    <td className = ""><FK tableId = {id} columnId = {column.id} /></td>
                                    <td className = ""><ModifyColumn tableId = {id} columnId = {column.id} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Handle type="source" position="right" id={id} />
        </>
    )
}
