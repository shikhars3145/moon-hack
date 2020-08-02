import React, { useMemo } from "react";
import style from "./Modal.module.scss";

type ModalProps = {
  show: boolean,
  hide: () => void,
  children?: React.ReactNode
};

function Modal({ children, show, hide }: ModalProps) {
  const containerClassName = useMemo(() => {
    const classes = [style.container];
    if (!show) {
      classes.push(style.hidden);
    }
    return classes.join(" ");
  }, [show]);
  return (
    <div className={containerClassName}>
      <div className={style.modal}>
        {children}
        <hr />
        <button onClick={hide}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
