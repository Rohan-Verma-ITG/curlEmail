const TAG_STYLES = {
  request: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  response: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  error: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
};

function LogEntry({ entry }) {
  const tagStyle = TAG_STYLES[entry.type] || TAG_STYLES.request;
  const time = new Date(entry.ts).toLocaleTimeString();

  return (
    <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-3 text-xs font-mono bg-gray-50 dark:bg-gray-800/50">
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${tagStyle}`}>
          {entry.type}
        </span>
        <span className="text-gray-400 dark:text-gray-500">{time}</span>
        {entry.status && (
          <span className="ml-auto text-gray-500 dark:text-gray-400">HTTP {entry.status}</span>
        )}
      </div>
      <pre className="whitespace-pre-wrap break-all text-gray-700 dark:text-gray-300 leading-relaxed">
        {entry.message
          ? entry.message
          : JSON.stringify(entry.payload ?? entry.data, null, 2)}
      </pre>
    </div>
  );
}

export default function RequestLog({ logs, onClear }) {
  if (logs.length === 0) return null;

  return (
    <div className="w-full max-w-lg mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Request Log
        </h3>
        <button
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {logs.map((entry) => (
          <LogEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}
