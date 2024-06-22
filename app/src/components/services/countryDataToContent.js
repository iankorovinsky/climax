import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
 
import 'reactflow/dist/style.css';
import ConnectionLine from '../flowchart/CustomLine';
import { getElements } from '../flowchart/utils';
import CustomAnimatedEdge from '../flowchart/CustomAnimatedEdge';
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 400 }, data: { label: 'Find Basic Info On Country' } },
  { id: '2', position: { x: 400, y: 400 }, data: { label: 'Summarize Existing Policy' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', animated: true }];
 
 function Nodes() {
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 

 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        
      />
    </div>
  );
}

const countryDataToContent = (country) => {
    return (
        <div>
        <h3>
            Country: {country.country}
        </h3>
       <Nodes/>
        </div>
    )
}


export default countryDataToContent