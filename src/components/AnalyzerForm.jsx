import { useState } from 'react'

export default function AnalyzerForm({ onAnalyze, loading }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAnalyze({ title: title.trim() || null, url: url.trim() || null, text })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Title (optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md bg-slate-900/60 border border-slate-700 text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Headline or short summary"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Source URL (optional)</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-md bg-slate-900/60 border border-slate-700 text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/article"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-1">Claim or Article Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full rounded-md bg-slate-900/60 border border-slate-700 text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste the text you want to evaluate..."
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 transition-colors"
        >
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
        <span className="text-xs text-slate-400">The text never leaves your browser except for analysis by the backend.</span>
      </div>
    </form>
  )
}
