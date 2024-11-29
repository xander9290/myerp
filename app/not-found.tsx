// app/not-found.tsx
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-50 text-center">
      <h1 className="display-1 fw-bold mb-4">404</h1>
      <p className="lead text-muted mb-4">La página que buscas no existe.</p>
      <Link href="/" className="btn btn-primary px-4 py-2">
        Regresar
      </Link>
    </div>
  );
}
