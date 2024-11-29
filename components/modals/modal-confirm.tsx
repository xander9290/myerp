import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

type Props = {
  show: boolean;
  onHide: () => void;
  text: string;
  action: () => Promise<void> | void; // Permitir acciones asíncronas
  confirmText?: string; // Texto personalizado para el botón de confirmar
  cancelText?: string; // Texto personalizado para el botón de cancelar
};

function ModalConfirm({
  show,
  onHide,
  text,
  action,
  confirmText = "Aceptar", // Texto por defecto
  cancelText = "Cerrar", // Texto por defecto
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAction = async () => {
    setLoading(true); // Mostrar spinner durante la acción
    try {
      await action(); // Ejecutar acción (puede ser async)
    } finally {
      setLoading(false); // Ocultar spinner después de la acción
      onHide(); // Cerrar modal
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      backdrop="static"
      keyboard={false}
      centered
      animation
    >
      <Modal.Header closeButton aria-label="Cerrar">
        <Modal.Title>Confirmar la acción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={loading}
          size="sm"
        >
          {cancelText}
        </Button>
        <Button
          variant="primary"
          onClick={handleAction}
          disabled={loading}
          size="sm"
        >
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            confirmText
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirm;
