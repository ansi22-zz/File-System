export type folderProps = {
  id: string;
  type: string;
  name: string;
  path: string;
  creator: string;
  parentPath: string | null;
  parentId: string | null;
  childFolder: Array<any>;
  array: Array<any>;
};

export type modalProps = {
  active: boolean;
};

export type infoProps = {
  active: boolean;
};

export type contextProps = {
  active: boolean;
};

export type State = {
  addedFolder: folderProps;
  modal: modalProps;
  info: infoProps;
  context: contextProps;
};
