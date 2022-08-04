import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFolder, setContext } from "../../store/Actions";
import { folderProps, State } from "../../utils/types";
import "./ContextMenu.css";

function ContextMenu(props: menu) {
  console.log(props.x);
  const state = useSelector((state: State) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const array = state.addedFolder.array;
  const context = state.context.active;
  const [showinfo, setShowinfo] = useState<boolean>(false);
  const openHandle = () => {
    dispatch(setContext({ active: false }));
    array.map((element: folderProps) => {
      if (element.path == props.folder?.path) {
        navigate(`${element.path}`);
      }
    });
  };
  const infoHandle = () => {
    dispatch(setContext({ active: false }));
    setShowinfo(true);
  };
  const deleteHandle = () => {
    dispatch(setContext({ active: false }));
    array.map((element: folderProps) => {
      if (element.path == props.folder?.path) {
        dispatch(deleteFolder(props.folder));
      }
    });
  };
  return (
    <>
      {showinfo ? (
        <>
          <div className="bg">
            <div className="showinfo">
              <div onClick={() => setShowinfo(false)} className="btnv">
                X
              </div>
              File/Folder Information
              <br />
              <br />
              <div className="infor">
                <div className="id"> Name: {props.folder?.name}</div>
                <div className="id">
                  Creator's Name: {props.folder?.creator}
                </div>
                <div className="id">Size: 20MB</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {context ? (
        <>
          <div className="bg">
            <div className="context" style={{ left: props.x, top: props.y }}>
              <div className="green" onClick={openHandle}>
                Open
              </div>
              <div className="yellow" onClick={infoHandle}>
                Info
              </div>
              <div className="red" onClick={deleteHandle}>
                Delete
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ContextMenu;

type menu = {
  folder: folderProps;
  x: number;
  y: number;
};
