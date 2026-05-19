export default function Avatar({ label, className = "" }) {
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 text-sm font-bold text-white shadow ${className}`}
    >
      {label}
    </div>
  );
}
