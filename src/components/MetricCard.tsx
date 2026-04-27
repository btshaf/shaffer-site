interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
}

export default function MetricCard({ label, value, unit }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="label">{label}</div>
      <div className="value tabular">
        {value}
        <span className="unit">{unit}</span>
      </div>
    </div>
  );
}