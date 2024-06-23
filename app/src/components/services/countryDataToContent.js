import React, { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '../flowchart/CustomNode';

const initialNodes = [
  { id: '1', type:'custom_node', position: { x: 0, y: 400 }, data: { label: 'Find Basic Info On Country' }, hidden: true },
  { id: '2', type: 'custom_node',  position: { x: 500, y: 200 }, data: { label: 'Predict Optimal Emissions' }, hidden: true },
  { id: '3', type: 'custom_node', position: {x: 300, y: 400}, data: {label: 'Detect Similar Countries'}, hidden: true },
  {id: '4', type: 'custom_node', position: {x: 550, y: 400}, data: {label: 'Find Similar Policies'}, hidden: true },
  {id: '5', type: 'custom_node', position: {x: 800, y: 400}, data: {label: 'Summarize Similar Policies'}, hidden: true },
  {id: '6', type: 'custom_node', position: {x: 1100, y: 400}, data: {label: 'Generate Updated Policy'}, hidden: true },
  {id: '7', type: 'custom_node', position: {x: 250, y: 600}, data: {label: 'Discover Current Policies'}, hidden: true },
  {id: '8', type: 'custom_node', position: {x: 650, y: 600}, data: {label: 'Summarize Current Policies'}, hidden: true },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'step', animated: true },
  { id: 'e1-3', source: '1', target: '3', type: 'step', animated: true },
  { id: 'e3-2', source: '3', target: '2', type: 'step', animated: true },
  { id: 'e3-4', source: '3', target: '4', type: 'step', animated: true },
  { id: 'e4-5', source: '4', target: '5', type: 'step', animated: true },
  { id: 'e5-6', source: '5', target: '6', type: 'step', animated: true },
  { id: 'e1-7', source: '1', target: '7', type: 'step', animated: true },
  { id: 'e7-8', source: '7', target: '8', type: 'step', animated: true },
  { id: 'e8-6', source: '8', target: '6', type: 'step', animated: true },
  { id: 'e2-6', source: '2', target: '6', type: 'step', animated: true },
];

const custom_node = { 'custom_node': CustomNode };

function Nodes() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    initialNodes.forEach((node, index) => {
      setTimeout(() => {
        setNodes((nds) =>
          nds.map((n) => n.id === node.id ? { ...n, hidden: false } : n)
        );
      }, index * 500); // Stagger by 500ms
    });
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={custom_node}
        onNodesChange={onNodesChange}
        defaultViewport={{ x: 0, y: -100, zoom: 0.6 }}
      />
    </div>
  );
}

const countryDataToContent = (country) => {
  return (
    <div>
      <h3>Country: {country.country}</h3>
      <Nodes />
    </div>
  );
}

export default countryDataToContent;
