import { useEffect, useRef } from 'react';
import Chart, { Chart as ChartJS } from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';
import Papa from 'papaparse';

type Props = {
  csvUrl: string;
  colIndex?: number;
  scaleType: '1-4' | '1-6';
  width?: number | string;
  height?: number | string;
};

// **Fungsi helper untuk memetakan nilai numerik ke label deskriptif**
const mapValue = (value: string, type: '1-4' | '1-6'): string => {
  const trimmedValue = value.trim();

  if (type === '1-4') {
    switch (trimmedValue) {
      case '1': return 'Sangat Tidak Baik';
      case '2': return 'Tidak Baik';
      case '3': return 'Baik';
      case '4': return 'Sangat Baik';
      default: return value;
    }
  } 

  if (type === '1-6') {
    switch (trimmedValue) {
      case '1': return 'Sangat Tidak Setuju';
      case '2': return 'Tidak Setuju';
      case '3': return 'Kurang Setuju';
      case '4': return 'Setuju';
      case '5': return 'Sangat Setuju';
      case '6': return 'Sangat Sangat Setuju';
      default: return value;
    }
  }

  return value;
};

export default function PieFromSheet({ csvUrl, colIndex = 0, scaleType }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAndDraw() {
      if (!csvUrl || !canvasRef.current) return;
      
      try {
        // --- PERUBAHAN UTAMA: MENGGUNAKAN PAPAPARSE UNTUK FETCH DAN PARSING ---
        
        // PapaParse bisa membaca dari URL secara langsung, tapi karena ini di Google Sheets, 
        // kita tetap gunakan fetch untuk mendapatkan teksnya, lalu parsing teksnya.
        // Atau, cara yang lebih elegan untuk URL publik:
        
        Papa.parse(csvUrl, {
          download: true, // PapaParse akan menangani proses fetch/download
          header: false,  // Kita tidak menggunakan baris pertama sebagai kunci objek
          skipEmptyLines: true,
          complete: (results) => {
            if (cancelled) return;

            const rows: string[][] = results.data as string[][];

            if (rows.length < 2) {
              console.error("Data terlalu pendek untuk diolah.");
              return;
            }

            // 1. Ambil Header (Baris 0)
            const header = rows[0][colIndex] ?? `Kolom ${colIndex}`;

            // 2. Ambil Nilai (Baris 1 dan seterusnya)
            const vals: string[] = rows.slice(1)
              .map(r => (r[colIndex] ?? '').trim())
              .filter(v => v !== '');

            // 3. Mapping nilai (1-4) ke label deskriptif
            const descriptiveVals = vals.map(v => mapValue(v, scaleType));
            
            // 4. Hitung Frekuensi
            const counts: Record<string, number> = {};
            descriptiveVals.forEach(v => counts[v] = (counts[v] || 0) + 1);
            
            const labels = Object.keys(counts).sort();
            const data = labels.map(l => counts[l]);

            // --- DRAWING CHART ---
            const ctx = canvasRef.current?.getContext('2d');
            if (!ctx) return;

            if (chartRef.current) {
              chartRef.current.destroy();
              chartRef.current = null;
            }

            const config: ChartConfiguration<'pie'> = {
              type: 'pie',
              data: {
                labels,
                datasets: [{
                  data,
                  backgroundColor: ['#e15759', '#f28e2b', '#76b7b2', '#59a14f', '#4e79a7'],
                }]
              },
              options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { 
                  legend: { position: 'bottom' },
                  title: { 
                    display: true,
                    text: header 
                  }
                } 
              }
            };

            chartRef.current = new Chart(ctx, config as any);
          },
          error: (error) => {
            console.error("Error PapaParse:", error);
          }
        });
        
        // --- PERUBAHAN UTAMA SELESAI DI SINI ---
        
      } catch (err) {
        console.error("General Error:", err);
      }
    }

    loadAndDraw();
    return () => {
      cancelled = true;
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [csvUrl, colIndex]);

  return (
    <div className='w-full h-full'>
      <canvas ref={canvasRef} />
    </div>
  );
}