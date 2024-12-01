"use client";

import { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

export type TabLink = {
  title: string;
  component: React.ReactNode;
}[];

type Props = {
  children?: React.ReactNode;
  tab?: boolean;
  tabs?: TabLink;
};

function UILayout({ children, tab, tabs }: Props) {
  const [key, setKey] = useState<string>(tabs?.[0]?.title || ""); // Establecer el primer tab como predeterminado

  // Renderizar Tabs solo si 'tab' es true
  const RenderTabs = () => {
    if (tab && tabs) {
      return (
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k || "")}
          variant="tabs"
          role="tablist"
        >
          {tabs.map((tab) => (
            <Tab key={tab.title} eventKey={tab.title} title={tab.title}>
              {tab.component}
            </Tab>
          ))}
        </Tabs>
      );
    }
    return children; // Si no hay tabs, renderiza el contenido hijo
  };

  return (
    <Container fluid className="h-100">
      <RenderTabs />
    </Container>
  );
}

export default UILayout;

// IMPLEMENTACIÓN
// const tabs: TabLink = [
//     {
//       title: "Usarios",
//       component: <h1>Componente usuarios</h1>,
//     },
//     {
//       title: "Perfiles",
//       component: <h1>Componente perfiles</h1>,
//     },
//     {
//       title: "Grupos",
//       component: <h1>Componente grupos</h1>,
//     },
//   ];
//   export default function Home() {
//     return <UiLayuot tab tabs={tabs} />;
//   }
