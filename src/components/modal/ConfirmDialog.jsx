import { createPortal } from "react-dom";



export default function ConfirmDialog({ isOpen, onClose, onConfirm, message, title }) {
  if (!isOpen) return null;

  return createPortal(
    <>
    <dialog open={isOpen} onClose={onClose}>
        <form action="" onSubmit={onConfirm} method="dialog">
            <h2>{title ?? "Confirmation"}</h2>
            <p>{message ?? "Etes vous sur ?"}</p>
            <button onClick={onConfirm}>Valider</button>
            <button onClick={onClose}>Annuler</button>
        </form>
    </dialog>
  </>,
    document.body
  )
}
