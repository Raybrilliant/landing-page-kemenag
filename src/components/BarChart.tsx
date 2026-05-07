import { useEffect, useRef } from 'react';
import Chart, { Chart as ChartJS } from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';
import Papa from 'papaparse';

// function getRandomColors(n: number) {
//     return Array.from({ length: n }, () =>
//       `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
//     );
// }

export default function BarFromSheet({
  csvUrl,
  colIndex = 8,
  groupColIndex,
  mode = 'count',
  width = '100%',
  height = 400,
  filterYear,
  yearColIndex,
}: {
  csvUrl: string;
  colIndex?: number;
  groupColIndex?: number;
  mode?: 'count' | 'sum';
  width?: string | number;
  height?: string | number;
  filterYear?: number | null;
  yearColIndex?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAndDraw() {
      if (!csvUrl || !canvasRef.current) return;
      try {
        const res = await fetch(csvUrl);
        const txt = await res.text();
        const parsed = Papa.parse<string[]>(txt, {
          skipEmptyLines: true,
          transform: (v) => v.trim(),
        });
        const rows = parsed.data;

        const header = rows[2][colIndex] ?? `Kolom ${colIndex}`;

        // filter by year if needed
        const dataRows = rows.slice(3).filter(r => {
          if (!filterYear || yearColIndex === undefined) return true;
          const match = (r[yearColIndex] ?? '').trim().match(/\d{4}/);
          return match ? Number(match[0]) === filterYear : false;
        });

        const agg: Record<string, number> = {};

        if (mode === 'sum') {
          // group by groupColIndex, sum values from colIndex
          const labelCol = groupColIndex ?? 0;
          for (const r of dataRows) {
            const label = (r[labelCol] ?? '').trim();
            const raw = (r[colIndex] ?? '').replace(/[^0-9.-]/g, '');
            const num = parseFloat(raw);
            if (!label || isNaN(num)) continue;
            agg[label] = (agg[label] ?? 0) + num;
          }
        } else {
          // count occurrences of colIndex values
          for (const r of dataRows) {
            const val = (r[colIndex] ?? '').trim();
            if (!val) continue;
            agg[val] = (agg[val] ?? 0) + 1;
          }
        }

        const labels = Object.keys(agg).sort();
        const data = labels.map(l => agg[l]);

        if (cancelled) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        if (chartRef.current) {
          chartRef.current.destroy();
          chartRef.current = null;
        }

        const yLabel = mode === 'sum' ? `Total ${header}` : 'Jumlah';

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
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { beginAtZero: true, title: { display: true, text: yLabel } },
              y: { title: { display: true, text: header } },
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
  }, [csvUrl, colIndex, groupColIndex, mode, filterYear, yearColIndex]);

  return (
    <div style={{ width, height }}>
      <canvas ref={canvasRef} width={typeof width === 'number' ? width : undefined} height={typeof height === 'number' ? height : undefined} />
    </div>
  );
}
