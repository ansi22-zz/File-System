import { folderProps } from "../../utils/types";
import TreeNode from "../TreeNode/TreeNode";
import "./Tree.css";

function Tree(props: folderProps) {
  const data = props.childFolder;

  return (
    <>
      <div className="ul">
        {data.map((node: any) => {
          return (
            <>
              <TreeNode
                id={node.id}
                type={node.type}
                name={node.name}
                path={node.path}
                creator={node.creator}
                parentPath={node.parentPath}
                parentId={node.parentId}
                childFolder={node.childFolder}
                array={node.array}
              />
            </>
          );
        })}
      </div>
    </>
  );
}

export default Tree;
