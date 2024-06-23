import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
 
import 'reactflow/dist/style.css';
import CustomNode from '../flowchart/CustomNode';

 
const initialNodes = [
  { id: '1', type:'custom_node', position: { x: 0, y: 400 }, data: { label: 'Find Basic Info On Country' } },
  { id: '2', type: 'custom_node',  position: { x: 200, y: 200 }, data: { label: 'Predict Optimal Emissions' } },
  { id: '3', type: 'custom_node', position: {x: 200, y: 400}, data: {label: 'Detect Similar Countries'}},
  {id: '4', type: 'custom_node', position: {x: 600, y: 400}, data: {label: 'Find Similar Policies'}},
  {id: '5', type: 'custom_node', position: {x: 900, y: 400}, data: {label: 'Summarize Similar Policies'}},
  {id: '6', type: 'custom_node', position: {x: 1000, y: 400}, data: {label: 'Generate Updated Policy'}},
  {id: '7', type: 'custom_node', position: {x: 250, y: 800}, data: {label: 'Discover Current Policies'}},
  {id: '8', type: 'custom_node', position: {x: 650, y: 800}, data: {label: 'Summarize Current Policies'}},
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true},
    {id: 'e1-3', source: '1', target: '3', animated: true},
    {id: 'e3-2', source: '3', target: '2', animated: true},
    {id: 'e3-4', source: '3', target: '4', animated: true},
    {id: 'e4-5', source: '4', target: '5', animated: true},
    {id: 'e5-6', source: '5', target: '6', animated: true},
    {id: 'e1-7', source: '1', target: '7', animated: true},
    {id: 'e7-8', source: '7', target: '8', animated: true},
    {id: 'e8-6', source: '8', target: '6', animated: true},
    {id: 'e2-6', source: '2', target: '6', animated: true},
    


];
const custom_node = {'custom_node': CustomNode};
 function Nodes() {
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const initialTransform = [0, 0, 1.5]
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={custom_node}
        onNodesChange={onNodesChange}
        fitView={true}

        //defaultViewport={{ x: 600, y: 600, zoom: 0.2 }} // Change zoom level her
        
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