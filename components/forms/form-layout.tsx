import { Button, Form } from "react-bootstrap";

type FormLayoutProps = {
  children?: React.ReactNode;
  title?: string;
  action?: () => void;
};

function FormLayout({ children, action }: FormLayoutProps) {
  return (
    <Form onSubmit={action} className="card h-100">
      {children}
    </Form>
  );
}

function Header({ children, title }: FormLayoutProps) {
  return (
    <div className="card-header d-flex">
      <div className="flex-column">
        <h5 className="card-title">{title}</h5>
        <Button type="submit" size="sm">
          Guardar
        </Button>
      </div>
      <div className="d-flex justify-content-around ms-5">{children}</div>
    </div>
  );
}

function Body({ children }: FormLayoutProps) {
  return <div className="card-body">{children}</div>;
}

function Footer({ children }: FormLayoutProps) {
  return <div className="card-footer d-flex">{children}</div>;
}

// Asignamos los subcomponentes al componente principal
FormLayout.Header = Header;
FormLayout.Body = Body;
FormLayout.Footer = Footer;

export default FormLayout;
