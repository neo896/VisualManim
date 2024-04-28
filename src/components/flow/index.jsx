import React, { useState, useRef, useCallback } from "react";
import ReactFlow, { ReactFlowProvider, Controls } from "reactflow";
import { useSnapshot } from "valtio";
import {
  store,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setNodes,
  setEdges,
} from "@/stores/index";
import { RectangleNode, TextNode } from "./nodes";
import "reactflow/dist/style.css";

// const nodeTypesObj = {
//   rectangleNode: RectangleNode,
// };
const nodes = {
  rectangleNode: RectangleNode,
  textNode: TextNode,
};

let nodeTypes;

const Flow = () => {
  const snap = useSnapshot(store);

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      nodeTypes = {
        ...nodes,
        [type]: nodes[type],
      };

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: `${type}-${Date.now()}`,
        type: type,
        position,
        data: { label: `${type} node` },
      };

      setNodes(newNode);
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
      <div className="h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={snap.nodes}
          edges={snap.edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={nodeTypes}
        >
          {/* <Background /> */}
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default Flow;
