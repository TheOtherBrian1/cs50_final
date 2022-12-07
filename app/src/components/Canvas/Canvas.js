import { useCallback, useState } from 'react';
import { tableAtom } from '../../Recoil/Atoms/TableAtoms';
import { useRecoilState } from 'recoil';
import DBTable from '../DBTable/DBTable';
import ReactFlow, { 
    applyEdgeChanges, 
    applyNodeChanges, 
    Controls,
    Background,
    addEdge,
    MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';


const nodeTypes = { DBTable };
const edges = [];
export default function Canvas() {
  const [tables, setTables] = useRecoilState(tableAtom);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setTables((nds) => applyNodeChanges(changes, nds)),
    [setTables]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
      <ReactFlow
          nodes={tables}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
          <Background />
          <Controls />
        </ReactFlow>
  );
}

// const addNode = useCallback(() => {
//     setEls((els) => {
//     console.log(els);
//     return [
//       ...els,
//       {
//         id: Math.random(),
//         position: { x: 100, y: yPos.current },
//       }
//     ];
//   });
// }, []);