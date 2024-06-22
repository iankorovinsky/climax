import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
 
import 'reactflow/dist/style.css';
import CustomNode from '../flowchart/CustomNode';

 
const initialNodes = [
  { id: '1', type:'custom_node', position: { x: 0, y: 400 }, data: { label: 'Find Basic Info On Country' } },
  { id: '2', type: 'custom_node',  position: { x: 400, y: 400 }, data: { label: 'Summarize Existing Policy' } },
  { id: '3', type: 'custom_node', position: {x: 400, y: 600}, data: {label: 'Estimate Goals'}},
  {id: '4', type: 'custom_node', position: {x: 400, y: 200}, data: {label: 'Search Other Policies'}},
  {id: '5', type: 'custom_node', position: {x: 800, y: 400}, data: {label: 'Generate Updated Policy'}}
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    {id: 'e1-3', source: '1', target: '3', animated: true},
    {id: 'e1-4', source: '1', target: '4', animated: true},
    {id: 'e2-5', source: '2', target: '5', animated: true},
    {id: 'e3-5', source: '3', target: '5', animated: true},
    {id: 'e4-5', source: '4', target: '5', animated: true},


];
 
 function Nodes() {
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 

 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{'custom_node': CustomNode}}
        onNodesChange={onNodesChange}
        
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