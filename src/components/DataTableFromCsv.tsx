import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, type ColDef } from "ag-grid-community";
import Papa from "papaparse";

ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
  csvUrl: string;
  filterYear?: number | null;
  visibleCols?: number[];
  yearColIndex?: number;
};

export default function DataTableFromCSV({ csvUrl, filterYear, visibleCols, yearColIndex }: Props) {
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [allRawRows, setAllRawRows] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCSV() {
      setLoading(true);
      try {
        const res = await fetch(csvUrl);
        const txt = await res.text();

        const parsed = Papa.parse<string[]>(txt, {
          skipEmptyLines: true,
          transform: (v) => v.trim(),
        });
        const lines = parsed.data;

        // lines[0] = judul, lines[1] = info (C2=last update), lines[2] = header, lines[3+] = data
        const rawHeaders = lines[2] ?? [];
        const dataRows = lines.slice(3);

        const indices =
          visibleCols && visibleCols.length > 0
            ? visibleCols
            : rawHeaders.map((_, i) => i);

        const cols: ColDef[] = indices.map((i) => ({
          field: `col_${i}`,
          headerName: rawHeaders[i] || `Kolom ${i}`,
          filter: true,
          floatingFilter: true,
          sortable: true,
          resizable: true,
          minWidth: 100,
        }));

        setHeaders(rawHeaders);
        setActiveIndices(indices);
        setAllRawRows(dataRows);
        setColumnDefs(cols);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCSV();
  }, [csvUrl]);

  const rowData = useMemo(() => {
    // filter dulu dari raw rows pakai yearColIndex (bukan visible col)
    const filtered =
      filterYear && filterYear > 0 && yearColIndex !== undefined
        ? allRawRows.filter((r) => {
            const match = (r[yearColIndex] ?? "").trim().match(/\d{4}/);
            return match ? Number(match[0]) === filterYear : false;
          })
        : allRawRows;

    // transform ke visible columns untuk AG Grid
    return filtered.map((row) =>
      Object.fromEntries(
        activeIndices.map((i) => [`col_${i}`, row[i] ?? ""])
      )
    );
  }, [allRawRows, filterYear, yearColIndex, activeIndices, headers]);

  if (loading) {
    return <p className="p-4 text-center text-gray-500">Memuat data...</p>;
  }

  if (rowData.length === 0 && filterYear && filterYear > 0) {
    return (
      <p className="p-4 text-center text-gray-500">
        Tidak ada data untuk tahun {filterYear}.
      </p>
    );
  }

  return (
    <div className="ag-theme-quartz w-full" style={{ height: 500 }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        paginationPageSize={15}
        defaultColDef={{ resizable: true, minWidth: 100 }}
      />
    </div>
  );
}
