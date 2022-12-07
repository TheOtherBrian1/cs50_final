import { useRecoilValue } from 'recoil';
import { useUpdateTable } from '../../../hooks/tableHooks';
import { tableSelector } from '../../../Recoil/Selectors/tableSelector';

export default function PrimaryKey({tableId, columnId}) {
    const {primaryKey} = useRecoilValue(tableSelector({tableId, columnId, columnValues: ["primaryKey"]})).column;
    const updateTable = useUpdateTable();
    return(
        <div
            onClick = {()=>updateTable({tableId, columnId, columnPrimaryKey: !primaryKey})}
            className = {`mx-auto cursor-pointer hover:scale-110 text-white text-center flex justify-center items-center rounded-full w-7 h-7 ${primaryKey?"bg-[#905426]":"bg-[#855b3c69]"}`}>
            PK
        </div>
    )
}
