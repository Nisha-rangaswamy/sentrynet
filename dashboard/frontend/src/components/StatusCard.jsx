function StatusCard({ title, status }) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 shadow-lg border border-slate-700">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-3 text-green-400 font-bold">
        🟢 {status}
      </p>
    </div>
  );
}

export default StatusCard;