import { useEffect, useState } from 'react'

export default function HistoryList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      setLoading(true)
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/history`)
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch (e) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  if (loading && items.length === 0) {
    return <div className="text-slate-400 text-sm">Loading history…</div>
  }

  if (!items.length) {
    return <div className="text-slate-500 text-sm">No analyses yet.</div>
  }

  return (
    <div className="space-y-3">
      {items.map((it) => (
        <div key={it._id} className="rounded-lg border border-slate-700 bg-slate-900/40 p-3">
          <div className="flex items-center justify-between">
            <div className="text-slate-300 text-sm line-clamp-1">{it.title || it.text?.slice(0, 80) || 'Untitled'}</div>
            <div className="text-xs text-slate-500">{it.verdict} · {(it.score * 100).toFixed(0)}%</div>
          </div>
        </div>
      ))}
    </div>
  )
}
