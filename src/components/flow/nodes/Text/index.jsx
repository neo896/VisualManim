import React from "react";
import { Handle, Position } from "reactflow";
import { TextSvg } from "@/components/svg";

const TextNode = ({ data, isConnectable }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex items-center">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          <TextSvg width="16" height="16" />
        </div>
        <div className="text-gray-500 ml-2">Animation</div>
      </div>
      <Handle
        type="target"
        id="animation"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default TextNode;
