import { useEffect, useRef } from 'react';
import Chart, { type ChartConfiguration } from 'chart.js/auto';

// Ubah colIndex menjadi colIndices (array of numbers)
interface LineChartProps {
  csvUrl: string;
  colIndices?: number[];
  width?: string | number;
  height?: string | number;
  filterYear?: number | null;
}

export default function LineChart({ 
  csvUrl, 
  colIndices = [8], // Default ke array
  width = '100%', 
  height = 400, 
  filterYear 
}: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAndDraw() {
      if (!csvUrl || !canvasRef.current) return;
      try {
        const res = await fetch(csvUrl);
        const txt = await res.text();
        const rows = txt.trim().split('\n').map(r => r.split(','));

        const quarters = ['Triwulan 1', 'Triwulan 2', 'Triwulan 3', 'Triwulan 4'];
        
        // Logika Hitung Rata-rata per Triwulan
        const dataPerQuarter = quarters.map((_, qIndex) => {
          const allValuesInQuarter: number[] = [];
          rows.slice(1).forEach(r => {
            const dateParts = (r[0] || '').split('/');
            if (dateParts.length !== 3) return;

            const month = parseInt(dateParts[1], 10);
            const year = parseInt(dateParts[2], 10);

            // Filter Tahun
            if (filterYear && year !== filterYear) return;

            // Filter Triwulan (0-2: Q1, 3-5: Q2, dst)
            if (Math.floor((month - 1) / 3) === qIndex) {
              // Ambil semua nilai dari kolom-kolom yang ditentukan
              colIndices.forEach(idx => {
                const val = parseFloat((r[idx] || '').trim());
                if (!isNaN(val)) {
                  allValuesInQuarter.push(val);
                }
              });
            }
          });

          // Hitung Rata-rata: Total / Jumlah Data
          if (allValuesInQuarter.length === 0) return 0;
          const sum = allValuesInQuarter.reduce((a, b) => a + b, 0);
          return parseFloat((sum / allValuesInQuarter.length).toFixed(2));
        });

        if (cancelled) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        if (chartRef.current) {
          chartRef.current.destroy();
        }

        const config: ChartConfiguration<'line'> = {
          type: 'line',
          data: {
            labels: quarters, // Label x-axis adalah Triwulan
            datasets: [{
              label: `Nilai Rata-rata ${filterYear ? `(${filterYear})` : ''}`,
              data: dataPerQuarter,
              borderColor: '#2ecc71',
              backgroundColor: 'rgba(46, 204, 113, 0.2)',
              fill: true,
              tension: 0.3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: 'Nilai Rata-rata' }
              }
            }
          }
        };

        chartRef.current = new Chart(ctx, config);
      } catch (err) {
        console.error("Gagal memproses chart:", err);
      }
    }

    loadAndDraw();
    return () => {
      cancelled = true;
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [csvUrl, colIndices, filterYear]);

  return (
    <div style={{ width, height }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}