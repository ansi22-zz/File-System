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

const foldpass = {
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
  const [images, setImages] = useState<Array<string>>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [folderpass, setFolderpass] = useState<folderProps>(foldpass);
  const [error, setError] = useState("");
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  const fetchImages = () => {
    setError("");
    const apiRoot = "https://api.unsplash.com";
    const client_id = "slCspcsGCeF8Dr6_pVCXKzpOvVL_4C7nvtbgcHJQa6Q";
    axios
      .get(
        `${apiRoot}/search/photos?query=${props.name}&client_id=${client_id}&page=${page}&per_page=20&orientation=landscape`
      )
      .then((res) => {
        setImages([...images, ...res.data.results]);
        setPage(page + 1);
        localStorage.setItem(props.name, JSON.stringify(images));
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  };
  // slCspcsGCeF8Dr6_pVCXKzpOvVL_4C7nvtbgcHJQa6Q
  useEffect(() => {
    setError("");
    fetchImages();
  }, [props.name]);

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
    setFolderpass(folder);
  };

  const folderClicked = () => {
    dispatch(setContext({ active: false }));
    setImages([]);
  };

  return (
    <div>
      <>
        {open && <ContextMenu folder={folderpass} x={points.x} y={points.y} />}
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
                <div className="grid-item">
                  {props.type === "folder" ? (
                    <>
                      <div className="right44addfolder">
                        <div className="new"> New</div>
                        <button onClick={clicked} id="right44btn">
                          +
                        </button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {folders.map((folder: folderProps, idx: number) => {
                  return (
                    <>
                      <div className="grid-item">
                        <p key={idx}>
                          <div
                            onClick={folderClicked}
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
              </div>
              {props.type == "file" ? (
                <>
                  {error.length > 0 ? (
                    <>
                      <div className="errorimg">
                        <img
                          src="/error.png"
                          alt="It's not you, It's us. Error Occured!"
                          id="img-error"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="grid-container-img">
                        <InfiniteScroll
                          dataLength={images.length}
                          next={fetchImages}
                          hasMore={hasMore}
                          loader={<p>Loading...</p>}
                          endMessage={
                            <p style={{ textAlign: "center" }}>
                              <b>Yay! You have seen it all</b>
                            </p>
                          }
                        >
                          {images.map((image: any, index: number) => {
                            const str = image.urls.thumb;
                            return (
                              <img
                                className="img"
                                key={index}
                                src={str}
                                alt="loading"
                              />
                            );
                          })}
                        </InfiniteScroll>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default FoldersBar;
