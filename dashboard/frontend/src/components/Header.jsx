function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700 shadow-lg">

      <div className="flex items-center justify-between px-8 py-5">

        <div>
          <h1 className="text-3xl font-bold text-cyan-400">
            🛡️ SentryNet SOC Dashboard
          </h1>

          <p className="text-slate-400 mt-1">
            AI Powered Intrusion Detection & Automated Mitigation
          </p>
        </div>

        <div className="flex items-center gap-6 text-2xl">

          🔔

          👤

          ⚙️

        </div>

      </div>

    </header>
  );
}

export default Header;