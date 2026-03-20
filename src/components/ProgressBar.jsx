export default function ProgressBar({ value, max, label, sublabel, color = 'blue', enrolledValue = 0 }) {
  const completedPct = Math.min(100, (value / max) * 100);
  const enrolledPct = Math.min(100 - completedPct, (enrolledValue / max) * 100);
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };

  const total = value + enrolledValue;
  const suffix = enrolledValue > 0
    ? `${value} + ${enrolledValue} enrolled / ${max} ${sublabel || ''}`
    : `${value} / ${max} ${sublabel || ''}`;

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{suffix}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
        <div
          className={`h-3 transition-all duration-500 ${colors[color] || colors.blue}`}
          style={{ width: `${completedPct}%` }}
        />
        {enrolledValue > 0 && (
          <div
            className="h-3 transition-all duration-500 bg-blue-300 bg-stripes"
            style={{ width: `${enrolledPct}%` }}
          />
        )}
      </div>
    </div>
  );
}
