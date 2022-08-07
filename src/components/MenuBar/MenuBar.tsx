import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "../../utils/types";
import Tree from "../Tree/Tree";
import "./MenuBar.css";

function MenuBar() {
  const state = useSelector((state: State) => state);
  const folder = state.addedFolder;

  return (
    <div className="menuBar11Main">
      <div className="menuBar11row">
        <Link to="/">
          <span className="menuBar11dot" id="menuBar11red"></span>
        </Link>
        <span className="menuBar11dot" id="menuBar11yellow"></span>
        <span className="menuBar11dot" id="menuBar11green"></span>
      </div>
      <span id="menuBar11span">📁 {folder.name}</span>
      <div className="menuBar11tree">
        <Tree
          id={folder.id}
          type={folder.type}
          name={folder.name}
          path={folder.path}
          creator={folder.creator}
          parentPath={folder.parentPath}
          parentId={folder.parentId}
          childFolder={folder.childFolder}
          array={folder.array}
        />
      </div>
    </div>
  );
}

export default MenuBar;
