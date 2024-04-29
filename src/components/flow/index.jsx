import React, { useState, useRef, useCallback } from "react";
import ReactFlow, { ReactFlowProvider, Controls, Panel } from "reactflow";
import { useSnapshot } from "valtio";
import {
  store,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setNodes,
} from "@/stores/index";
import { RectangleNode, TextNode, FadeInNode } from "./nodes";
import "reactflow/dist/style.css";

const nodes = {
  rectangleNode: RectangleNode,
  textNode: TextNode,
  fadeInNode: FadeInNode,
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

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      console.log(JSON.stringify(flow));
      // localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

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
          <Panel position="top-right">
            <button onClick={onSave}>save</button>
          </Panel>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default Flow;
