import { useEffect, useRef, useState } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css";

type Props = {
  csvUrl: string;
  // Tambahkan prop filterYear
  filterYear?: number | null; 
};

// Interface untuk data mentah
interface RawData {
    headers: string[];
    rows: string[][];
}

export default function DataTableFromCSV({ csvUrl, filterYear }: Props) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const datatableRef = useRef<any>(null);

  // State untuk menyimpan semua data mentah dari CSV (sebelum filter)
  const [rawData, setRawData] = useState<RawData>({ headers: [], rows: [] });
  
  // State untuk menyimpan baris yang sudah difilter (yang akan ditampilkan)
  const [filteredRows, setFilteredRows] = useState<string[][]>([]);

  // useEffect untuk MEMUAT DATA CSV awal
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
      const normalizedRows = lines.map(l => {
        const clone = [...l];
        while (clone.length < maxCols) clone.push(""); // padding kosong
        return clone;
      });

      const data: RawData = {
          headers: normalizedRows[0],
          rows: normalizedRows.slice(1),
      };

      // Simpan data mentah ke state
      setRawData(data);
    }
    loadCSV();
  }, [csvUrl]);

  // ---

  // useEffect untuk MELAKUKAN FILTER dan update tabel
  useEffect(() => {
    const { headers, rows: allRows } = rawData;
    
    if (allRows.length === 0) {
        setFilteredRows([]);
        return;
    }

    let currentRows = allRows;

    if (filterYear && filterYear > 0) {
      // Baris filter
      currentRows = allRows.filter(r => {
        const rawDate = (r[0] ?? '').trim(); // Tanggal ada di kolom index 0
        
        if (!rawDate) return false; // Abaikan jika tanggal kosong

        const parts = rawDate.split('-'); // Format dd-mm-yyyy
        if (parts.length !== 3) return false; // Abaikan jika format salah

        const year = parseInt(parts[2], 10);

        return year === filterYear; // Hanya kembalikan baris yang sesuai tahun
      });
    }

    setFilteredRows(currentRows);

    // -- BAGIAN INISIALISASI DATATABLE --
    if (tableRef.current && headers.length > 0 && currentRows.length >= 0) {
      // destroy datatable lama
      if (datatableRef.current) {
        datatableRef.current.destroy();
        datatableRef.current = null;
      }

      // 1. Siapkan data untuk Simple-DataTables
      // Simple-DataTables harus diinisialisasi dengan data baru
      const data = {
        headings: headers,
        data: currentRows,
      };

      // 2. Kosongkan tabel DOM yang ada, lalu inisialisasi dengan data baru
      // Karena kita me-render ulang `filteredRows` di DOM,
      // kita hanya perlu menginisialisasi datatable-nya saja.
      
      // Inisialisasi DataTable BARU
      // Catatan: Simple-DataTables seringkali lebih mudah diinisialisasi
      // setelah DOM di-render. Karena kita menggunakan React, kita inisialisasi 
      // di useEffect ini setelah setFilteredRows.
      // Solusi termudah adalah dengan menggunakan `destroy` dan `new DataTable`
      // seperti yang sudah Anda lakukan.

      // DataTable diinisialisasi di sini setelah state `filteredRows` di-set,
      // tetapi perlu diperhatikan bahwa DataTable menggunakan DOM saat ini
      // yang mungkin belum di-update oleh React.

      // --- Perbaikan Inisialisasi DataTable ---
      // Cara paling robust untuk Simple-DataTables:
      // Inisialisasi dilakukan setelah React selesai me-render baris (filteredRows)
      // Karena ini memicu rendering DOM, kita pisahkan logic inisialisasi datatable
      // ke useEffect terpisah.

    }
  }, [rawData, filterYear]); // Dipanggil setiap kali data mentah atau filterYear berubah

  // ---

  // useEffect untuk MENGINISIALISASI DATATABLE (dipicu oleh perubahan data yang sudah difilter)
  useEffect(() => {
    if (tableRef.current && rawData.headers.length > 0) {
        // Destroy datatable lama biar gak conflict
        if (datatableRef.current) {
            datatableRef.current.destroy();
            datatableRef.current = null;
        }

        // Hanya inisialisasi jika ada baris yang akan ditampilkan
        if (filteredRows.length > 0) {
            // Karena kita me-render data langsung ke DOM, kita inisialisasi datatable-nya
            datatableRef.current = new DataTable(tableRef.current, {
                searchable: true,
                fixedHeight: true,
                perPage: 15,
            });
        }
    }
  }, [filteredRows]);


  // ---

  return (
    <div className="overflow-x-auto">
      <table
        ref={tableRef}
        className="table-auto border border-gray-300 w-full text-sm"
      >
        <thead>
          <tr>
            {rawData.headers.map((h, i) => (
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
          {/* Gunakan filteredRows untuk rendering */}
          {filteredRows.map((r, i) => (
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
      {filteredRows.length === 0 && rawData.rows.length > 0 && (
          <p className="p-4 text-center text-gray-500">
              Tidak ada data yang ditemukan untuk tahun {filterYear}.
          </p>
      )}
      {rawData.rows.length === 0 && (
          <p className="p-4 text-center text-gray-500">
              Memuat data...
          </p>
      )}
    </div>
  );
}