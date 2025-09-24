import { useEffect, useRef, useState } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css";

type Props = {
  csvUrl: string;
};

export default function DataTableFromCSV({ csvUrl }: Props) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const datatableRef = useRef<any>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    async function loadCSV() {
      const res = await fetch(csvUrl);
      const txt = await res.text();

      // split by newline & comma
      const lines = txt
      .trim()
      .split("\n")
      .map(l => l.split(",").map(c => c.trim()))
      .map(row => {
        // hapus kolom kosong di ujung
        while (row.length && row[row.length - 1] === "") {
          row.pop();
        }
        return row;
      });    

      // pastikan semua row punya jumlah kolom sama
      const maxCols = Math.max(...lines.map(l => l.length));
      const normalized = lines.map(l => {
        const clone = [...l];
        while (clone.length < maxCols) clone.push(""); // padding kosong
        return clone;
      });

      setHeaders(normalized[0]);
      setRows(normalized.slice(1));
    }
    loadCSV();
  }, [csvUrl]);

  useEffect(() => {
    if (tableRef.current && headers.length > 0 && rows.length > 0) {
      // destroy datatable lama biar gak conflict
      if (datatableRef.current) {
        datatableRef.current.destroy();
        datatableRef.current = null;
      }

      datatableRef.current = new DataTable(tableRef.current, {
        searchable: true,
        fixedHeight: true,
        perPage: 15,
      });
    }
  }, [headers, rows]);

  return (
    <div className="overflow-x-auto">
      <table
        ref={tableRef}
        className="table-auto border border-gray-300 w-full text-sm"
      >
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="border border-gray-300 px-2 py-1 bg-gray-100"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="border border-gray-300 px-2 py-1">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}