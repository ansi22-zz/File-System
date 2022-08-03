import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "../../utils/types";
import Tree from "../Tree/Tree";
import "./MenuBar.css";

function MenuBar() {
  const state = useSelector((state: State) => state);
  const folder = state.addedFolder;

  return (
    <div className="MenuBar11Main">
      <div className="navbarl12row">
        <Link to="/">
          <span className="navbarl12dot" id="navbarl12red"></span>
        </Link>
        <span className="navbarl12dot" id="navbarl12yellow"></span>
        <span className="navbarl12dot" id="navbarl12green"></span>
      </div>
      <span id="span">📁 {folder.name}</span>
      <div className="tree">
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
