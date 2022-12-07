import { tableAtom } from '../../../Recoil/Atoms/TableAtoms';
import { useRecoilValue } from 'recoil';
import {useUpdateTable} from '../../../hooks/tableHooks';
import { tableSelector } from '../../../Recoil/Selectors/tableSelector';

export default function ColumnTitle({tableId, columnId}) {
    const values = useRecoilValue(tableSelector({tableId, columnId, columnValues: ["columnName"]}))
    const updateTable = useUpdateTable();
    return(
        <input className = "DBInput input absolute" placeholder="username..." 
            value = {values.column.columnName ?? ""}
            onChange = {(e) => {
                updateTable({tableId, columnId, columnName: e.target.value});
            }}
        />
    )
}

