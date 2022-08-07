import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { State, folderProps } from "../../utils/types";

import "./Nav.css";

function Nav(props: folderProps) {
  const state = useSelector((state: State) => state);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [show, setShow] = useState<boolean>(true);

  const str = props.path;
  const aa = state.addedFolder.array;
  let patharray = [];
  patharray = str.split("/");
  patharray.shift();

  const breadcrumbClicked = (value: string) => {
    if (value === "root") {
      navigate(`${"/root"}`);
    }
    aa.map((element: folderProps) => {
      if (element.name === value) {
        navigate(`${element.path}`);
      }
    });
  };

  const clicked = (name: string) => {
    setShow(false);
    setQuery(name);
    aa.map((e: folderProps) => {
      if (e.name === name) {
        setQuery("");
        navigate(`${e.path}`);
      }
    });
  };

  const clickedd = (value: string) => {
    setShow(true);
    setQuery(value);
  };

  return (
    <div className="nav11main">
      <div className="nav11navleft">
        <>
          &nbsp;&nbsp;
          <button className="nav11rightbtn" onClick={() => navigate(-1)}>
            &lt;
          </button>
          &nbsp;&nbsp;
          <button className="nav11rightbtn" onClick={() => navigate(1)}>
            &gt;
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div className="nav11scroll">
            {patharray.map((element: string) => {
              return (
                <>
                  &gt;
                  <button
                    className="nav11breadcrumbs"
                    onClick={() => breadcrumbClicked(element)}
                  >
                    {element}
                  </button>
                </>
              );
            })}
          </div>
        </>
      </div>
      <div className="nav11navright">
        <div className="nav11search">
          <>
            <input
              type="search"
              placeholder="search 🔎"
              onChange={(e) => {
                clickedd(e.target.value);
              }}
              value={query}
              id="nav11search"
            />
            {console.log(show)}
            {query.length > 0 && show ? (
              <>
                {" "}
                <div className="nav11grid">
                  <>
                    {aa
                      .filter((element: folderProps) =>
                        element.name.toLowerCase().includes(query)
                      )
                      .map((element: folderProps) => {
                        return (
                          <>
                            {
                              <div
                                onClick={() => {
                                  clicked(element.name);
                                }}
                                className="nav11check"
                              >
                                {element.name}
                              </div>
                            }
                          </>
                        );
                      })}
                    {aa.filter((element: folderProps) =>
                      element.name.toLowerCase().includes(query)
                    ).length === 0 ? (
                      <>
                        <div className="nav11check">not found</div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default Nav;
