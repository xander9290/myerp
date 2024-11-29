"use client";
import { Links } from "@/components/nav/nav-links";
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";

type Props = {
  links: Links;
};

function UiSideBar({ links }: Props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary rounded">
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="flex-column">
          {links.map((link) => (
            <Link
              key={`uisidebar#${link.name}`}
              className="nav-link"
              href={link.path}
            >
              {link.name}
            </Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default UiSideBar;
