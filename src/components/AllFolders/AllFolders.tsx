import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FoldersBar from "../FoldersBar/FoldersBar";
import Home from "../Home/Home";
import { folderProps, State } from "../../utils/types";

function AllFolders() {
  const state = useSelector((state: State) => state);
  const array = state.addedFolder.array;
  const folder = state.addedFolder;

  return (
    <div>
      <div className="allroutes11Main">
        <BrowserRouter>
          <Routes>
            <>
              <Route path="/" element={<Home />} />
              <Route
                path="/root"
                element={
                  <FoldersBar
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
                }
              />

              {array.map((element: folderProps, idx: number) => {
                return (
                  <>
                    <Route
                      key={idx}
                      path={element.path}
                      element={
                        <FoldersBar
                          id={element.id}
                          type={element.type}
                          name={element.name}
                          path={element.path}
                          creator={element.creator}
                          parentPath={element.parentPath}
                          parentId={element.parentId}
                          childFolder={element.childFolder}
                          array={element.array}
                        />
                      }
                    />
                  </>
                );
              })}
            </>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    // </div>
  );
}

export default AllFolders;
