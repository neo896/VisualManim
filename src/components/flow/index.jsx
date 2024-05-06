import React, { useState, useRef, useCallback, useMemo } from "react";
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
import nodesProps from "./nodes/data";
import { Command } from "@tauri-apps/api/shell";
import { v4 as uuidv4 } from "uuid";
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

  const onSave = useCallback(async () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      console.log(JSON.stringify(flow));
      // localStorage.setItem(flowKey, JSON.stringify(flow));
    }
    // const command = Command.sidecar("python/python", ["--version"]);
    // const output = await command.execute();
    // console.log(output);
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

      let data = {};
      nodesProps.forEach((node) => {
        if (node.type === type) {
          data.props = { ...node.props };
        }
      });
      const uuid = uuidv4();
      data.props.id = uuid;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: uuid,
        type: type,
        position,
        data,
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
