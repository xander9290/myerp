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
              <NavDropdown.Item
                key={`nav-sublink#${link.name + i}`}
                onClick={sublink.action}
                as={Link}
                href={sublink.path}
              >
                {sublink.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        );
      }

      return (
        <Nav.Link
          href={link.path}
          as={Link}
          key={`nav-link#${link.name}`}
          onClick={handleClick}
        >
          {link.name}
        </Nav.Link>
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
