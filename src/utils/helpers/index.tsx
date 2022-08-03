import { folderProps } from "../types";

// add folder
export const addFolder = (folder: folderProps, newFolder: folderProps) => {
  if (folder.path === newFolder.parentPath) {
    folder.childFolder.push(newFolder);
  }
  if (folder.name == "root") {
    folder.array.push(newFolder);
  }
  for (let i = 0; i < folder.childFolder.length; i++) {
    addFolder(folder.childFolder[i], newFolder);
  }
};

// delete folder
export const deleteFolder = (folder: folderProps, newFolder: folderProps) => {
  if (folder.name == "root") {
    for (let i = 0; i < folder.array.length; i++) {
      if (folder.array[i].path == newFolder.path) {
        const index = folder.array.indexOf(folder.array[i]);
        if (index > -1) {
          folder.array.splice(index, 1);
        }
        break;
      }
    }
  }
  if (folder.path === newFolder.parentPath) {
    for (let i = 0; i < folder.childFolder.length; i++) {
      if (folder.childFolder[i].path == newFolder.path) {
        const index = folder.childFolder.indexOf(folder.childFolder[i]);
        if (index > -1) {
          folder.childFolder.splice(index, 1);
        }
        break;
      }
    }
  }
  for (let i = 0; i < folder.childFolder.length; i++) {
    deleteFolder(folder.childFolder[i], newFolder);
  }
};
