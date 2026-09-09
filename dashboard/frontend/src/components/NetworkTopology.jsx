function NetworkTopology() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg h-96">
      <h2 className="text-xl font-semibold text-cyan-400 mb-6">
        🌐 SDN Network Topology
      </h2>

      <div className="flex flex-col items-center justify-center h-72">

        {/* Internet */}
        <div className="bg-cyan-600 px-5 py-2 rounded-lg font-semibold shadow">
          🌐 Internet
        </div>

        <div className="h-5 w-1 bg-cyan-400"></div>

        {/* Controller */}
        <div className="bg-blue-600 px-5 py-2 rounded-lg font-semibold shadow">
          🎛️ OS-Ken Controller
        </div>

        <div className="h-5 w-1 bg-cyan-400"></div>

        {/* Switch */}
        <div className="bg-green-600 px-5 py-2 rounded-lg font-semibold shadow">
          🔀 Open vSwitch (s1)
        </div>

        {/* Hosts */}
        <div className="flex justify-center gap-6 mt-6">

          <div className="bg-purple-600 px-4 py-2 rounded-lg font-semibold">
            💻 h1
          </div>

          <div className="bg-purple-600 px-4 py-2 rounded-lg font-semibold">
            💻 h2
          </div>

          <div className="bg-red-600 px-4 py-2 rounded-lg font-semibold">
            💻 h3
          </div>

        </div>

        {/* Security modules */}
        <div className="flex justify-center gap-6 mt-5">

          <div className="bg-orange-500 px-4 py-2 rounded-lg font-semibold">
            🤖 ML Detector
          </div>

          <div className="bg-red-700 px-4 py-2 rounded-lg font-semibold">
            🛡️ Mitigation
          </div>

        </div>

      </div>
    </div>
  );
}

export default NetworkTopology;