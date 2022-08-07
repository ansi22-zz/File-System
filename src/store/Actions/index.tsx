import {
  ADD_FOLDER,
  DELETE_FOLDER,
  IS_CONTEXT,
  IS_INFO,
  IS_MODAL,
} from "../../utils/constants";
import {
  contextProps,
  folderProps,
  infoProps,
  modalProps,
} from "../../utils/types";

export const addFolder = (folder: folderProps) => {
  return {
    type: ADD_FOLDER,
    payload: folder,
  };
};

export const deleteFolder = (folder: folderProps) => {
  return {
    type: DELETE_FOLDER,
    payload: folder,
  };
};

export const setModal = (active: modalProps) => {
  return {
    type: IS_MODAL,
    payload: active,
  };
};

export const setInfo = (active: infoProps) => {
  return {
    type: IS_INFO,
    payload: active,
  };
};

export const setContext = (active: contextProps) => {
  return {
    type: IS_CONTEXT,
    payload: active,
  };
};
