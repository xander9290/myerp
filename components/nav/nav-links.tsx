"use client";
import Link from "next/link";
import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";

export type Links = {
  name: string;
  path: string;
  action?: () => void;
  subLinks?: Links;
}[];

type Props = {
  links: Links;
};

function NavLink({ links }: Props) {
  // Component to render links dynamically
  const RenderLinks = ({ links }: { links: Links }) => {
    return links.map((link) => {
      const handleClick = () => {
        if (link.action) link.action();
      };

      if (link.subLinks?.length) {
        return (
          <NavDropdown
            key={`nav-droplink#${link.name}`}
            title={link.name}
            id={`nav-dropdown#${link.name}`}
            aria-haspopup="true"
          >
            {link.subLinks.map((sublink, i) => (
              <Link
                onClick={sublink.action}
                key={`nav-sublink#${link.name + i}`}
                className="dropdown-item"
                href={sublink.path}
              >
                {sublink.name}
              </Link>
            ))}
          </NavDropdown>
        );
      }

      return (
        <Link
          key={`nav-link#${link.name}`}
          onClick={handleClick}
          className="nav-link"
          href={link.path}
        >
          {link.name}
        </Link>
      );
    });
  };

  return (
    <Nav className="me-auto">
      <RenderLinks links={links} />
    </Nav>
  );
}

export default NavLink;
