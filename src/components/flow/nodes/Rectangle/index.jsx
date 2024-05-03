import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { ColorPicker } from "antd";
import { InputNumber, Divider } from "@douyinfe/semi-ui";
import { RectangleSvg } from "@/components/svg";

const RectangleNode = ({ data }) => {
  return (
    <div className="px-2 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex items-center justify-start gap-3">
        <div className="rounded-xl w-8 h-8 flex justify-center items-center bg-gray-100">
          <RectangleSvg width="16" height="16" />
        </div>
        <div className="text-gray-500">Rectangle</div>
      </div>
      <Divider margin="14px" />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-start gap-10">
          <div>color</div>
          <ColorPicker
            value={data.props.color}
            onChange={data.events.onColorChange}
          />
        </div>
        <div className="flex items-center justify-start gap-2">
          <div>width</div>
          <InputNumber size="small" />
        </div>
        <div className="flex items-center justify-start gap-2">
          <div>height</div>
          <InputNumber size="small" />
        </div>
        <div className="flex items-center justify-start gap-2">
          <div>grid_xstep </div>
          <InputNumber size="small" />
        </div>
        <div className="flex items-center justify-start gap-2">
          <div>grid_ystep </div>
          <InputNumber size="small" />
        </div>
      </div>
      <Handle type="source" id="animation" position={Position.Right} />
    </div>
  );
};

export default RectangleNode;
