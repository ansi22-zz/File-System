import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import { folderProps, modalProps, State } from "../../utils/types";
import { setContext, setInfo, setModal } from "../../store/Actions";
import AddFolder from "../../common/AddFolder/AddFolder";
import HamBurger from "../../common/HamBurger/HamBurger";
import Modal from "../../common/Modal/Modal";
import ContextMenu from "../ContextMenu/ContextMenu";
import MenuBar from "../MenuBar/MenuBar";
import Nav from "../Nav/Nav";

import "./FolderBar.css";

const st = {
  id: "",
  type: "",
  name: "",
  path: "",
  creator: "",
  parentPath: null,
  parentId: null,
  childFolder: [],
  array: [],
};

function FoldersBar(props: folderProps) {
  const state = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalState = state.modal.active;
  const folders = props.childFolder;
  const info = state.info.active;

  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [f, setF] = useState<folderProps>(st);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);
  const [show, setShow] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  const fetchImages = () => {
    setImages([]);
    setPage(1);
    const apiRoot = "https://api.unsplash.com";
    const client_id = "4iPu1kFa5nn1uwWHrpR7RviSdsf7XuS1iCIMT0Ed8IY";
    axios
      .get(
        `${apiRoot}/search/photos?client_id=${client_id}&query=${props.name}&page=${page}`
      )
      .then((res) => setImages([...res.data.results]));
    setPage(page + 1);
  };

  useEffect(() => {
    setImages([]);
    setPage(1);
    fetchImages();
  }, [props.name]);
  // https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}

  useEffect(() => {
    const handleClick = () => setShow(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const clicked = () => {
    const status: modalProps = {
      active: true,
    };
    dispatch(setModal(status));
  };

  const handleClicked = (id: any) => {
    navigate(`${id}`);
  };

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  const rightClick = (
    e: React.MouseEvent<HTMLDivElement>,
    folder: folderProps
  ) => {
    dispatch(setContext({ active: true }));
    setPoints({ x: e.pageX, y: e.pageY });
    setOpen(true);
    setF(folder);
  };

  return (
    <div>
      <>
        {open && <ContextMenu folder={f} x={points.x} y={points.y} />}
        <div className="foldersBar11main">
          <div className="foldersBar11MenuBar">
            <MenuBar />
          </div>

          <div className="foldersBar11FoldersBar">
            {isDesktop ? (
              <></>
            ) : (
              <>
                <div
                  className="btn"
                  onClick={() => dispatch(setInfo({ active: true }))}
                >
                  <img className="imgham" src="/menu-bar.png" alt="" />
                </div>
                {info ? (
                  <>
                    <HamBurger />
                  </>
                ) : (
                  <></>
                )}
              </>
            )}

            <div className="nav">
              <Nav
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
            </div>
            <div className="right44addfolder">
              New&nbsp;&nbsp;
              <button onClick={clicked} id="right44btn">
                +
              </button>
            </div>
            <div className="content">
              {modalState ? (
                <>
                  <Modal
                    children={
                      <AddFolder
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
                    }
                  />
                </>
              ) : (
                <></>
              )}
              <div className="grid-container">
                {folders.map((folder: folderProps, idx: number) => {
                  return (
                    <>
                      <div className="grid-item">
                        <p key={idx}>
                          <div
                            onClick={() =>
                              dispatch(setContext({ active: false }))
                            }
                            onContextMenu={(e) => rightClick(e, folder)}
                            onDoubleClick={() => handleClicked(folder.name)}
                            className="folders"
                          >
                            {folder.type == "file" ? (
                              <>
                                <img
                                  id="right44file"
                                  src="/file.png"
                                  alt="folder"
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  id="right44folder"
                                  src="/folder.png"
                                  alt="folder"
                                />
                              </>
                            )}

                            {folder.name}
                          </div>
                        </p>
                      </div>
                    </>
                  );
                })}
                {props.name == "root" ? (
                  <></>
                ) : (
                  <>
                    {props.type == "folder" ? (
                      <>
                        <InfiniteScroll
                          dataLength={images.length}
                          next={fetchImages}
                          hasMore={hasMore}
                          loader={<p>Load more...</p>}
                          endMessage={
                            <p style={{ textAlign: "center" }}>
                              <b>Yay! You have seen it all</b>
                            </p>
                          }
                        >
                          {images.map((image: any, index: number) => {
                            const str = image.urls.thumb;
                            return (
                              <div className="grid-item">
                                <img
                                  className=" img"
                                  key={index}
                                  src={str}
                                  alt="loading"
                                />
                              </div>
                            );
                          })}
                        </InfiniteScroll>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default FoldersBar;
