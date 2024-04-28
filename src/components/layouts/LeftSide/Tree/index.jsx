import React from "react";
import {
  UncontrolledTreeEnvironment,
  StaticTreeDataProvider,
  Tree,
} from "react-complex-tree";
import "react-complex-tree/lib/style-modern.css";

const shortTreeTemplate = {
  root: {
    container: {
      item0: null,
      item1: null,
      item2: null,
      item3: {
        inner0: null,
        inner1: null,
        inner2: null,
        inner3: null,
      },
      item4: null,
      item5: null,
    },
  },
  root2: {},
};

const readTemplate = (template, data = { items: {} }) => {
  for (const [key, value] of Object.entries(template)) {
    data.items[key] = {
      index: key,
      canMove: true,
      isFolder: value !== null,
      children: value !== null ? Object.keys(value) : undefined,
      data: key,
      canRename: true,
    };

    if (value !== null) {
      readTemplate(value, data);
    }
  }
  return data;
};

const longTree = readTemplate(shortTreeTemplate);
const dataProvider = new StaticTreeDataProvider(
  longTree.items,
  (item, data) => ({
    ...longTree,
    data,
  })
);

const ScenTree = () => {
  return (
    <UncontrolledTreeEnvironment
      dataProvider={dataProvider}
      getItemTitle={(item) => item.data}
      viewState={{}}
      onRenameItem={(item, name) => console.log(name)}
      canDragAndDrop={true}
      canReorderItems={true}
      canDropOnFolder={true}
      canDropOnNonFolder={true}
    >
      <Tree
        renderTreeContainer={({ containerProps, info, children }) => {
          return (
            <div
              {...containerProps}
              style={{ ...containerProps.style, height: "100%" }}
              onDragStart={(event) => onDragStart(event, "input")}
            >
              {children}
            </div>
          );
        }}
        treeId="tree-1"
        rootItem="root"
        treeLabel="Tree Example"
      />
    </UncontrolledTreeEnvironment>
  );
};

export default ScenTree;
