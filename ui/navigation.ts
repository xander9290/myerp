import { Links } from "@/components/nav/nav-links";

export const navigation: Links = [
  {
    name: "Ventas",
    path: "/sales",
    subLinks: [
      {
        name: "Cotizaciones",
        path: "/sales/qouts",
      },
      {
        name: "Órdenes",
        path: "/sales",
      },
    ],
  },
  {
    name: "Compras",
    path: "/purchases",
    subLinks: [
      {
        name: "Cotizaciones",
        path: "/purchases/qouts",
      },
      {
        name: "Órdenes",
        path: "/purchases",
      },
    ],
  },
];
