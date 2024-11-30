"use client";

import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { Table, Pagination, Form } from "react-bootstrap";
import { FaSortUp, FaSortDown } from "react-icons/fa";

export interface IHeaders {
  title: string;
  type: "number" | "date" | "string";
  obKey?: string;
  style?: CSSProperties;
  css?: string;
}

interface TableLayoutProps {
  css?: string;
  style?: CSSProperties;
  headers: IHeaders[];
  children: (row: Record<string, any>) => ReactNode;
  computeData: (data: any[] | undefined) => void;
  data?: Record<string, any>[];
  itemsPerPage?: number;
  onSelectedRowsChange?: (selectedRows: Record<string, any>[]) => void; // Callback para manejar registros seleccionados
}

const TableLayout = ({
  css,
  style,
  headers,
  children,
  computeData,
  data = [],
  itemsPerPage = 5, // Valor por defecto
  onSelectedRowsChange,
}: TableLayoutProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [paginatedData, setPaginatedData] = useState<Record<string, any>[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "", direction: "asc" });
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set()); // Set para almacenar IDs seleccionados

  useEffect(() => {
    // Paginación y ordenamiento
    const sortedData = [...data].sort((a, b) => {
      if (!sortConfig.key) return 0; // Si no hay clave, no ordenar
      const order = sortConfig.direction === "asc" ? 1 : -1;

      switch (headers.find((h) => h.obKey === sortConfig.key)?.type) {
        case "string":
          return order * a[sortConfig.key].localeCompare(b[sortConfig.key]);
        case "date":
          return (
            order *
            (new Date(a[sortConfig.key]).getTime() -
              new Date(b[sortConfig.key]).getTime())
          );
        case "number":
          return order * ((a[sortConfig.key] ?? 0) - (b[sortConfig.key] ?? 0));
        default:
          return 0;
      }
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(sortedData.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(sortedData.length / itemsPerPage)); // Calcular el número total de páginas
  }, [currentPage, data, itemsPerPage, sortConfig]);

  useEffect(() => {
    if (onSelectedRowsChange) {
      // Pasar los registros seleccionados cuando cambie la selección
      const selectedData = data.filter((row) => selectedRows.has(row.id));
      onSelectedRowsChange(selectedData);
    }
  }, [selectedRows, data, onSelectedRowsChange]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(id)) {
        newSelectedRows.delete(id); // Deseleccionar si ya está seleccionado
      } else {
        newSelectedRows.add(id); // Seleccionar si no lo está
      }
      return newSelectedRows;
    });
  };

  const handleSelectAllRows = () => {
    if (paginatedData.every((row) => selectedRows.has(row.id))) {
      setSelectedRows((prevSelectedRows) => {
        const newSelectedRows = new Set(prevSelectedRows);
        paginatedData.forEach((row) => newSelectedRows.delete(row.id));
        return newSelectedRows;
      });
    } else {
      setSelectedRows((prevSelectedRows) => {
        const newSelectedRows = new Set(prevSelectedRows);
        paginatedData.forEach((row) => newSelectedRows.add(row.id));
        return newSelectedRows;
      });
    }
  };

  return (
    <>
      <Pagination size="sm" className="mb-1 d-flex justify-content-end">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <Table
        size="sm"
        responsive
        hover
        bordered
        style={{ ...style }}
        className={`text-uppercase non-select ${css}`}
      >
        <thead>
          <tr>
            <th className="text-center p-1">
              <Form.Check
                type="checkbox"
                onChange={handleSelectAllRows}
                checked={
                  paginatedData.every((row) => selectedRows.has(row.id)) &&
                  paginatedData.length > 0
                }
              />
            </th>
            {headers.map((h) => (
              <th
                key={h.title}
                scope="col"
                className={h.css || ""}
                style={{ ...h.style }}
                onDoubleClick={() => handleSort(h.obKey || "")} // Ordenar al hacer doble clic
              >
                {h.title}
                {sortConfig.key === h.obKey &&
                  (sortConfig.direction === "asc" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  ))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr key={`table_row_${index}`}>
                <td className="text-center">
                  <Form.Check
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </td>
                {children(row)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1} className="text-center">
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TableLayout;
