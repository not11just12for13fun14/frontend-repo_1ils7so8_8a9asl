import { useState } from 'react'

export default function Analyzer() {
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleAnalyze = async () => {
    setError('')
    setResult(null)

    if (!text && !url) {
      setError('Enter some text or provide a URL to analyze')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() || undefined, url: url.trim() || undefined })
      })

      if (!res.ok) {
        const detail = await res.json().catch(() => ({}))
        throw new Error(detail.detail || 'Failed to analyze')
      }

      const data = await res.json()
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 md:p-8 shadow-xl w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-sm text-blue-200 mb-2">Paste text or headline</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="e.g., Government announces new policy to..."
            className="w-full rounded-xl bg-slate-900/60 border border-blue-500/20 text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm text-blue-200 mb-2">Or analyze a link</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/news/..."
            className="w-full rounded-xl bg-slate-900/60 border border-blue-500/20 text-white p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing…' : 'Analyze'}
          </button>
          {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-200/80">Overall assessment</p>
              <h3 className={`mt-1 text-2xl font-bold ${
                result.label === 'Likely Real' ? 'text-green-300' : result.label === 'Uncertain' ? 'text-yellow-300' : 'text-red-300'
              }`}>{result.label}</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-200/80">Confidence</p>
              <p className="text-3xl font-extrabold text-white">{Math.round(result.score)}%</p>
            </div>
          </div>

          {(result.domain || result.title) && (
            <div className="mt-4 text-blue-200/90 text-sm">
              {result.domain && <p><span className="text-blue-300">Domain:</span> {result.domain}</p>}
              {result.title && <p><span className="text-blue-300">Title:</span> {result.title}</p>}
            </div>
          )}

          {result.reasons?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-blue-200/80 mb-1">Why this result:</p>
              <ul className="list-disc list-inside text-blue-100/90 text-sm space-y-1">
                {result.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {result.saved_id && (
            <p className="mt-4 text-xs text-blue-300/60">Saved for audit with id: {result.saved_id}</p>
          )}
        </div>
      )}
    </div>
  )
}
