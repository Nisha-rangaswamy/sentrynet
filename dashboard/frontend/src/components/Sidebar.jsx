import {
  FaTachometerAlt,
  FaBell,
  FaNetworkWired,
  FaShieldAlt,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen p-5">

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        🛡️ SentryNet
      </h1>

      <nav className="space-y-4">

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
          <FaTachometerAlt />
          Dashboard
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
          <FaBell />
          Alerts
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
          <FaNetworkWired />
          Network
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
          <FaShieldAlt />
          Security
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer">
          <FaCog />
          Settings
        </div>

      </nav>

    </aside>
  );
}

export default Sidebar;