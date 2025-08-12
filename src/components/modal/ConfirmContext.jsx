import  ConfirmDialog  from "./ConfirmDialog.jsx";
import { useRef, useState, useContext, createContext, useCallback } from "react";

const defaultFunction = (p) => Promise.resolve(true);

const defaultValue = {
    confirmRef: {
        current: defaultFunction
    }
}

const ConfirmContext = createContext(defaultValue);

export function ConfirmContextProvider({ children }) {
    const confirmRef = useRef(defaultFunction);

    return (
        <ConfirmContext.Provider value={{ confirmRef }}>
            {children}
            <ConfirmDialogWithContext />
        </ConfirmContext.Provider>
    );
}

function ConfirmDialogWithContext() {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState({});
  const resolveRef = useRef(() => {});
  const { confirmRef } = useContext(ConfirmContext);
    confirmRef.current = (props) => {
        return new Promise((resolve) => {
            setProps(props);
            setOpen(true);
            resolveRef.current = resolve;
        });
    };


  return <ConfirmDialog onConfirm={() => {resolveRef.current(true); setOpen(false)}} onClose={() => {resolveRef.current(false); setOpen(false)}} isOpen={open} {...props} />;
}

export function useConfirm() {
    const { confirmRef } = useContext(ConfirmContext);
    return {
        confirm: useCallback(
            (p) => {
                return confirmRef.current(p);
            },
            [confirmRef]
        )
    }
}