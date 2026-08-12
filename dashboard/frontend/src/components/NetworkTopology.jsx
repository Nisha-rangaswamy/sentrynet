function NetworkTopology() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg h-96">
      <h2 className="text-xl font-semibold text-cyan-400 mb-6">
        🌐 SDN Network Topology
      </h2>

      <div className="flex flex-col items-center justify-center h-72">

        <div className="bg-cyan-600 px-5 py-2 rounded-lg font-semibold">
          🌐 Internet
        </div>

        <div className="h-6 w-1 bg-cyan-400"></div>

        <div className="bg-blue-600 px-5 py-2 rounded-lg font-semibold">
          🎛️ OS-Ken Controller
        </div>

        <div className="h-6 w-1 bg-cyan-400"></div>

        <div className="bg-green-600 px-5 py-2 rounded-lg font-semibold">
          🔀 Open vSwitch
        </div>

        <div className="flex justify-center gap-10 mt-6">

          <div className="bg-purple-600 px-4 py-2 rounded-lg">
            💻 Host 1
          </div>

          <div className="bg-orange-500 px-4 py-2 rounded-lg">
            🤖 ML Model
          </div>

          <div className="bg-red-600 px-4 py-2 rounded-lg">
            🚫 Mitigation
          </div>

        </div>

      </div>
    </div>
  );
}

export default NetworkTopology;