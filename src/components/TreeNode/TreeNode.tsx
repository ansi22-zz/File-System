import { useState } from "react";
import { folderProps } from "../../utils/types";

import Tree from "../Tree/Tree";
import "./TreeNode.css";

function TreeNode(props: folderProps) {
  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  return (
    <>
      <div onClick={handleClick} style={{ marginBottom: "1px" }}>
        {props.type == "folder" ? (
          <>
            {" "}
            <span>📁 {props.name}</span>
          </>
        ) : (
          <>
            {" "}
            <span>📄 {props.name}</span>
          </>
        )}

        {/* 📄 */}
      </div>

      <div className="ul">
        {showChildren && (
          <Tree
            id={props.id}
            type={props.type}
            name={props.name}
            path={props.path}
            creator={props.creator}
            parentPath={props.parentPath}
            parentId={props.parentId}
            childFolder={props.childFolder}
            array={props.array}
          />
        )}
      </div>
    </>
  );
}

export default TreeNode;
