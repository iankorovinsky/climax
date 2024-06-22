// CustomNode.js
import React from 'react';
import { Handle } from 'reactflow';

const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid black', borderRadius: '5px', background: 'grey' }}>

      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
            <p>
        {data.label}
      </p>
      <Handle
        type="source"
        position="right"
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default CustomNode;
