import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../store/Actions";
import { State } from "../../utils/types";

import "./Modal.css";

type modalProps = {
  children: React.ReactNode;
};

function Modal(props: modalProps) {
  const state = useSelector((state: State) => state);

  const modalState = state.modal["active"];

  return (
    <div className="modal88main">
      {modalState ? (
        <>
          <div className="modal">{props.children}</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Modal;
