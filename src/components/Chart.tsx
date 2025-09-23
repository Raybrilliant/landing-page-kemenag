import { useEffect, useRef } from 'react';
import Chart, { Chart as ChartJS } from 'chart.js/auto';
import type { ChartConfiguration } from 'chart.js';

type Props = {
  csvUrl: string;
  colIndex?: number;
  width?: number | string;
  height?: number | string;
};

export default function PieFromSheet({ csvUrl, colIndex = 8, width = '100%', height = 400 }: Props) {
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
        const vals: string[] = rows.slice(1).map(r => (r[colIndex] ?? '').trim()).filter(v => v !== '');
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

        const config: ChartConfiguration<'pie'> = {
          type: 'pie',
          data: {
            labels,
            datasets: [{
              data,
              backgroundColor: ['#4e79a7','#f28e2b','#e15759','#76b7b2','#59a14f'],
            }]
          },
          options: { responsive: true, maintainAspectRatio: false }
        };

        chartRef.current = new Chart(ctx, config as any);
      } catch (err) {
        // ignore fetch/parse errors for now
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
  }, [csvUrl, colIndex]);

  return (
    <div style={{ width, height }}>
      <canvas ref={canvasRef} width={typeof width === 'number' ? width : undefined} height={typeof height === 'number' ? height : undefined} />
    </div>
  );
}