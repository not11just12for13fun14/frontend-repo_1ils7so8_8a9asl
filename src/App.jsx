import { useState } from 'react'
import AnalyzerForm from './components/AnalyzerForm'
import ResultCard from './components/ResultCard'
import HistoryList from './components/HistoryList'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleAnalyze = async (payload) => {
    try {
      setLoading(true)
      setResult(null)
      const res = await fetch(`${backend}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({ verdict: 'Error', score: 0, features: { error: e.message } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_-100px,rgba(59,130,246,0.2),transparent)]" />
      </div>
      <header className="relative z-10 border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Flames" className="w-8 h-8" />
            <div className="font-semibold tracking-tight">Fake News Detector</div>
          </div>
          <a href="/test" className="text-sm text-blue-300 hover:text-blue-200">System Check</a>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-xl font-semibold mb-4">Analyze a claim</h2>
            <AnalyzerForm onAnalyze={handleAnalyze} loading={loading} />
          </div>

          {result && (
            <ResultCard result={result} />
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-lg font-semibold mb-3">Recent analyses</h3>
            <HistoryList />
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
            This tool uses simple linguistic heuristics for educational purposes and is not a substitute for professional fact-checking.
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App
