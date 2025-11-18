export default function ResultCard({ result }) {
  if (!result) return null
  const badgeColor = result.verdict === 'Likely Fake' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : result.verdict === 'Likely Real' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-slate-200 font-semibold">Analysis Result</h3>
        <span className={`text-xs px-2 py-1 rounded-md border ${badgeColor}`}>
          {result.verdict}
        </span>
      </div>
      <div className="text-sm text-slate-300">Score: {(result.score * 100).toFixed(1)}%</div>
      {result.title && (
        <div className="mt-3 text-slate-400 text-sm"><span className="text-slate-500">Title:</span> {result.title}</div>
      )}
      {result.url && (
        <div className="mt-1 text-slate-400 text-sm"><span className="text-slate-500">Source:</span> <a href={result.url} target="_blank" rel="noreferrer" className="text-blue-400 underline">{result.url}</a></div>
      )}
      <div className="mt-4">
        <h4 className="text-slate-300 text-sm font-medium mb-2">Feature Breakdown</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {Object.entries(result.features || {}).map(([k, v]) => (
            <div key={k} className="rounded-md bg-slate-800/60 border border-slate-700 px-3 py-2 flex items-center justify-between">
              <span className="text-slate-400 capitalize">{k.replaceAll('_', ' ')}</span>
              <span className="text-slate-200 font-mono">{String(v)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
