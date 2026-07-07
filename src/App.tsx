import { useState } from "react";

const host = import.meta.env.VITE_API_URL || "https://url.wickz.dev";

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${host}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl }),
      });

      const data = await response.json();
      setShortUrl(data.short_url);
    } catch (error) {
      console.error("Error shortening URL:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 mb-5">
            <svg
              className="w-7 h-7 text-snow/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-eggshell tracking-tight">
            URL Shortener
          </h1>
        </div>

        {/* Card */}
        <div className="bg-abyss rounded-2xl border border-white/[0.06] shadow-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="url-input"
                className="block text-sm font-medium text-snow/70 mb-1.5"
              >
                URL para acortar
              </label>
              <input
                id="url-input"
                type="url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                placeholder="https://google.com"
                required
                className="w-full px-4 py-3 bg-void border border-white/[0.06] rounded-xl text-snow placeholder-snow/20 focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-white/10 transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-snow hover:bg-eggshell disabled:bg-white/10 disabled:text-snow/30 disabled:cursor-not-allowed text-void font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer text-sm"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Acortando...
                </span>
              ) : (
                "Acortar URL"
              )}
            </button>
          </form>

          {/* Resultado */}
          {shortUrl && (
            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <p className="text-sm font-medium text-snow/50 mb-3">
                URL acortada
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-void border border-white/[0.06] rounded-xl text-snow/70 hover:text-snow font-medium text-sm truncate transition-colors"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className="px-4 py-3 bg-white/4 hover:bg-white/8 border border-white/[0.06] rounded-xl text-snow/60 hover:text-snow transition-all cursor-pointer"
                  title="Copiar al portapapeles"
                >
                  {copied ? (
                    <svg
                      className="w-5 h-5 text-snow/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-snow/20 mt-6">
          <a
            href="https://wickz.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-snow/50 transition-colors"
          >
            wickz.dev
          </a>
        </p>
      </div>
    </div>
  );
}
