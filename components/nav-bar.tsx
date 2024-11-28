"use client";

import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FaSun, FaMoon, FaAdjust } from "react-icons/fa";

const NavBar = () => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return (
      storedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === "auto") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(systemTheme);
      document.documentElement.setAttribute("data-bs-theme", systemTheme);
      localStorage.removeItem("theme");
    } else {
      setTheme(newTheme);
      document.documentElement.setAttribute("data-bs-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const systemTheme = e.matches ? "dark" : "light";
        setTheme(systemTheme);
        document.documentElement.setAttribute("data-bs-theme", systemTheme);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  return (
    <Navbar
      expand="lg"
      bg={theme}
      variant={theme}
      className={`${theme === "light" ? "border-bottom" : ""}`}
    >
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Dropdown align="end">
          <Dropdown.Toggle variant={theme} id="theme-dropdown">
            <FaAdjust />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleThemeChange("light")}>
              <FaSun className="me-2" />
              Modo Claro
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleThemeChange("dark")}>
              <FaMoon className="me-2" />
              Modo Oscuro
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleThemeChange("auto")}>
              <FaAdjust className="me-2" />
              Automático
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default NavBar;
