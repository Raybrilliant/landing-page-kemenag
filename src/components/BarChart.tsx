import { useEffect, useRef } from 'react';
import Chart, { Chart as ChartJS } from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';

// function getRandomColors(n: number) {
//     return Array.from({ length: n }, () =>
//       `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
//     );
// }

export default function BarFromSheet({ csvUrl, colIndex = 8, width = '100%', height = 400, filterYear }: { csvUrl: string, colIndex?: number, width?: string|number, height?: string|number, filterYear?: number | null }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAndDraw() {
      if (!csvUrl || !canvasRef.current) return;
      try {
        const res = await fetch(csvUrl);
        const txt = await res.text();
        const rows = txt.trim().split('\n').map(r => r.split(','));

        const header = rows[0][colIndex] ?? `Kolom ${colIndex}`;

        // ambil kolom tanggal (kolom index 1 = tanggal)
        const vals: string[] = rows.slice(1).map(r => {
          const rawDate = (r[1] ?? '').trim(); // tanggal di kolom 1
          const rawValue = (r[colIndex] ?? '').trim();

          if (!rawDate || !rawValue) return '';

          const parts = rawDate.split('-'); // format dd-mm-yyyy
          if (parts.length !== 3) return '';

          const year = parseInt(parts[2], 10);

          // kalau ada filterYear, cuma ambil data sesuai tahun
          if (filterYear && year !== filterYear) return '';

          return rawValue;
        }).filter(v => v !== '');

        const counts: Record<string, number> = {};
        vals.forEach(v => counts[v] = (counts[v] || 0) + 1);

        const labels = Object.keys(counts).sort();
        const data = labels.map(l => counts[l]);

        if (cancelled) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        if (chartRef.current) {
          chartRef.current.destroy();
          chartRef.current = null;
        }

        const config: ChartConfiguration<'bar'> = {
          type: 'bar',
          data: {
            labels,
            datasets: [{
              label: filterYear ? `${header} (${filterYear})` : header,
              data,
              backgroundColor: 'green',
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: header
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Jumlah'
                }
              }
            }
          }
        };

        chartRef.current = new Chart(ctx, config as any);
      } catch (err) {
        console.error(err);
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
  }, [csvUrl, colIndex, filterYear]);

  return (
    <div style={{ width, height }}>
      <canvas ref={canvasRef} width={typeof width === 'number' ? width : undefined} height={typeof height === 'number' ? height : undefined} />
    </div>
  );
}
