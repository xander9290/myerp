import type { Metadata } from "next";
import "./globals.css";
import "bootswatch/dist/cerulean/bootstrap.css";
import NavBar from "@/components/nav/nav-bar";
import ModalContainer from "@/components/modals/modal-container";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export const metadata: Metadata = {
  title: "Proyecto ERP",
  description: "Proyecto ERP para futuro sistema.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="vh-100 d-flex flex-column">
        <NavBar />
        <main className="flex-grow-1">{children}</main>
        <ModalContainer />
        <ToastContainer />
      </body>
    </html>
  );
}
