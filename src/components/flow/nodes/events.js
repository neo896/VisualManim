import { updateNodeData } from "@/stores/index";

const nodesProps = [
    {
        "type": "rectangleNode",
        "props": {
            "color": "#FFFFFF",
            "width": 4.0,
            "height": 2.0,
            "grid_xstep": 0.0,
            "grid_ystep": 0.0
        },
        "events": {
            "onColorChange": (value, hex) => {
                updateNodeData("rectangleNode", {color: hex});
            }
        }
    }
]

export default nodesProps;