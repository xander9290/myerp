"use client";

import ModalConfirm from "./modal-confirm";
import { create } from "zustand";

type ModalConfirmState = {
  show: boolean;
  text: string;
  action: () => Promise<void> | void;
  confirmText?: string;
  cancelText?: string;
};

type Store = {
  modalConfirm: ModalConfirmState;
  setModalConfirm: (modalData: Partial<ModalConfirmState>) => void;
  hideModalConfirm: () => void;
};

export const useModal = create<Store>((set) => ({
  modalConfirm: {
    show: false,
    text: "",
    action: async () => {},
    confirmText: "Confirmar",
    cancelText: "Cancelar",
  },
  setModalConfirm: (modalData) =>
    set((state) => ({
      modalConfirm: {
        ...state.modalConfirm,
        ...modalData,
        show: true,
      },
    })),
  hideModalConfirm: () =>
    set((state) => ({
      modalConfirm: {
        ...state.modalConfirm,
        show: false,
      },
    })),
}));

function ModalContainer() {
  const { modalConfirm, hideModalConfirm } = useModal();
  return (
    <>
      <ModalConfirm
        show={modalConfirm.show}
        onHide={hideModalConfirm}
        action={modalConfirm.action}
        text={modalConfirm.text}
        confirmText={modalConfirm.confirmText}
        cancelText={modalConfirm.cancelText}
      />
    </>
  );
}

export default ModalContainer;

// EJEMPLO DE IMPLEMENTACIÓN

// function SomeComponent() {
//   const setModalConfirm = useStore((state) => state.setModalConfirm);

//   const handleDelete = () => {
//     setModalConfirm({
//       text: "¿Estás seguro de que quieres eliminar este elemento?",
//       action: async () => {
//         // Lógica de eliminación
//         console.log("Elemento eliminado");
//       },
//     });
//   };

//   return <button onClick={handleDelete}>Eliminar</button>;
// }
