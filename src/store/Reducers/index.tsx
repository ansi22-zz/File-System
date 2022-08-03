import { AnyAction, combineReducers } from "redux";
import { addFolder, deleteFolder } from "../../utils/helpers";

// initial state of folder
const initialFolderState = {
  id: "101",
  type: "folder",
  name: "root",
  path: "/root",
  creator: "ritika",
  parentPath: null,
  parentId: null,
  childFolder: [],
  array: [],
};

const initialModalState = {
  active: false,
};

const initialInfoState = {
  active: false,
};

const initialContextState = {
  active: false,
};

// folder addition
const folderAddedReducer = (folder = initialFolderState, action: AnyAction) => {
  if (action.type == "ADD_FOLDER") {
    const newFolder = action.payload;
    addFolder(folder, newFolder);
    return { ...folder, newFolder };
  } else if (action.type == "DELETE_FOLDER") {
    return deleteFolder(folder, action.payload);
  }
  return folder;
};

// Modal show
const modalReducer = (active = initialModalState, action: AnyAction) => {
  if (action.type == "IS_MODAL") {
    console.log(action.payload);
    return action.payload;
  }
  return active;
};

const infoReducer = (active = initialInfoState, action: AnyAction) => {
  if (action.type == "IS_INFO") {
    console.log(action.payload);
    return action.payload;
  }
  return active;
};

const contextReducer = (active = initialContextState, action: AnyAction) => {
  if (action.type == "IS_CONTEXT") {
    console.log(action.payload);
    return action.payload;
  }
  return active;
};
//combine reducers
const reducers = combineReducers({
  addedFolder: folderAddedReducer,
  modal: modalReducer,
  info: infoReducer,
  context: contextReducer,
});

export default reducers;
