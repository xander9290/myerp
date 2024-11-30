"use client";
import FormLayout from "@/components/forms/form-layout";
import { Button } from "react-bootstrap";

function PageSalesQouts() {
  return (
    <FormLayout>
      <FormLayout.Header title="Cotización">
        <div className="flex-column">
          <h4 className="text-uppercase m-0">ej todo para soldar</h4>
          <div className="d-flex justify-content-between">
            <Button type="button" variant="info" size="sm">
              Confirmar
            </Button>
            <Button type="button" variant="info" size="sm">
              Cliente
            </Button>
          </div>
        </div>
      </FormLayout.Header>
      <FormLayout.Body>
        <h6>Formulario</h6>
      </FormLayout.Body>
    </FormLayout>
  );
}

export default PageSalesQouts;
