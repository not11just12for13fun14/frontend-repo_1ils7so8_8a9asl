export default function Header() {
  return (
    <header className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        Fake News Detector
      </h1>
      <p className="mt-3 text-blue-200/90 max-w-2xl mx-auto">
        Paste a headline, article text, or a link. We’ll run quick heuristics to estimate credibility.
      </p>
    </header>
  )
}
