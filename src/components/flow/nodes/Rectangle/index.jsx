import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { ColorPicker } from "antd";
import { InputNumber, Divider } from "@douyinfe/semi-ui";
import { RectangleSvg } from "@/components/svg";

const RectangleNode = ({ data }) => {
  const [color, setColor] = useState("#1677ff");

  return (
    <div className="px-2 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      {/* <div className="flex items-center">
        <div className="flex flex-col items-center">
          <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
            <RectangleSvg width="16" height="16" />
          </div>
          <div className="text-gray-500 mt-2">Rectangle</div>
        </div>
        <div className="flex">
          <div>color</div>
          <ColorPicker value={color} onChange={setColor} />
        </div>
        <div className="flex">
          <div>width</div>
          <InputNumber size="small" className="w-1/2" />
        </div>
        <div className="flex">
          <div>height</div>
          <InputNumber size="small" className="w-1/2" />
        </div>
      </div> */}
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
          <ColorPicker value={color} onChange={setColor} />
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
