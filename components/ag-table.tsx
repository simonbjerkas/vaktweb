"use client";

import "./ag-table.css";

import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ClientSideRowModelModule, ColDef } from "ag-grid-community";

export const AgTable = <T extends Record<string, unknown>>({
  rowData,
  colDefs,
  ...props
}: {
  rowData: T[];
  colDefs: ColDef<T>[];
} & AgGridReactProps) => {
  return (
    <div className="w-full ag-theme-alpine">
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        modules={[ClientSideRowModelModule]}
        domLayout="autoHeight"
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
          flex: 1,
        }}
        suppressCellFocus
        {...props}
      />
    </div>
  );
};
