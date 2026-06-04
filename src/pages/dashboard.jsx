import { useState, useEffect } from "react";

// ---------- CONFIG ----------
const BASE_URL = "http://michaelhyrax.alwaysdata.net/api";

// ---------- Helpers ----------
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);

// ---------- Reusable Stat Card ----------
const StatCard = ({
  title,
  value,
  icon,
  colorClass = "bg-white",
  textColor = "text-stone-800",
  children,
}) => (
  <div className={`${colorClass} rounded-2xl shadow-sm border border-stone-100 p-6`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-stone-500 text-sm font-medium uppercase tracking-wide">
          {title}
        </p>
        <p className={`text-3xl font-bold mt-1 ${textColor}`}>{value}</p>
      </div>
      <span className="text-4xl">{icon}</span>
    </div>
    {children}
  </div>
);

// ---------- Main Dashboard Component ----------
const Dashboard = () => {
  const groupId = Number(localStorage.getItem("groupId"));
  const groupName = localStorage.getItem("groupName") || "Your Group";

  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!groupId) {
      setError("No group selected. Please join a group first.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch both members and dashboard stats in parallel
        const [membersRes, statsRes] = await Promise.all([
          fetch(`${BASE_URL}/groups/${groupId}/members`),
          fetch(`${BASE_URL}/groups/${groupId}/dashboard`),
        ]);

        if (!membersRes.ok || !statsRes.ok) {
          throw new Error("Failed to load group data");
        }

        const membersData = await membersRes.json();
        const statsData = await statsRes.json();

        setMembers(membersData);
        setStats(statsData);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Could not load group progress. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId]);

  // Derived values
  const totalMembers = members.length;
  const fullyContributed = stats?.fully_contributed_count ?? 0;
  const notContributed = totalMembers - fullyContributed;
  const totalContributed = stats?.total_contributions ?? 0;
  const targetPerMember = stats?.target_amount ?? 5000;
  const expectedTotal = totalMembers * targetPerMember;
  const amountNotCollected = expectedTotal - totalContributed;
  const percentage =
    totalMembers > 0 ? Math.round((fullyContributed / totalMembers) * 100) : 0;
  const recentContributions = stats?.recent_contributions ?? [];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-amber-600 border-t-transparent animate-spin mx-auto" />
          <p className="mt-4 text-stone-500 font-medium">Loading group progress…</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center max-w-md">
          <span className="text-5xl mb-4 block">⚠️</span>
          <p className="text-xl text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 flex items-center gap-2">
            <span className="text-amber-600">📊</span> {groupName} – Group Progress
          </h1>
          <p className="text-stone-500 mt-1">Real‑time contribution overview</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Members" value={totalMembers} icon="👥" />
          <StatCard
            title="Fully Contributed"
            value={fullyContributed}
            icon="✅"
            textColor="text-green-600"
          />
          <StatCard
            title="Not Contributed"
            value={notContributed}
            icon="⏳"
            textColor="text-red-500"
          />
          <StatCard
            title="Participation"
            value={`${percentage}%`}
            icon="📈"
          >
            <div className="w-full bg-stone-200 rounded-full h-2 mt-3">
              <div
                className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </StatCard>
        </div>

        {/* Financial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              title="Total Contributed"
              value={formatCurrency(totalContributed)}
              icon="💰"
              textColor="text-green-600"
            />
            <StatCard
              title="Expected Total"
              value={formatCurrency(expectedTotal)}
              icon="🎯"
              textColor="text-amber-600"
            />
            <div className="sm:col-span-2">
              <StatCard
                title="Amount Not Collected"
                value={formatCurrency(amountNotCollected)}
                icon="📉"
                textColor="text-red-600"
              />
            </div>
          </div>

          {/* Participation Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-stone-700 mb-4">
              Participation Overview
            </h3>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <span className="text-3xl font-bold text-green-600">
                  {fullyContributed}
                </span>
                <p className="text-xs text-stone-500 uppercase">Paid</p>
              </div>
              <div className="h-10 w-px bg-stone-200" />
              <div className="text-center">
                <span className="text-3xl font-bold text-red-500">
                  {notContributed}
                </span>
                <p className="text-xs text-stone-500 uppercase">Pending</p>
              </div>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-3 mt-4">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-stone-500">{percentage}% complete</p>
          </div>
        </div>

        {/* Quick Summary (no deadline – just progress) */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-sm border border-amber-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">⚡</span>
            <h2 className="text-xl font-bold text-stone-800">Group Summary</h2>
          </div>
          <ul className="space-y-2 text-stone-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">→</span>
              {notContributed > 0
                ? `${notContributed} member(s) still need to contribute.`
                : "🎉 Everyone has contributed!"}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">→</span>
              Target per member: {formatCurrency(targetPerMember)}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">→</span>
              Remaining to collect: {formatCurrency(amountNotCollected)}
            </li>
          </ul>
        </div>

        {/* Members List */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">👥</span>
            <h2 className="text-xl font-bold text-stone-800">Group Members</h2>
          </div>

          {members.length === 0 ? (
            <p className="text-stone-500 text-center py-4">
              No members have been added yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="pb-3 font-semibold text-stone-600">Name</th>
                    <th className="pb-3 font-semibold text-stone-600">Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3 text-stone-800">{member.name}</td>
                      <td className="py-3 font-mono text-stone-600">{member.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Contributions */}
        {recentContributions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🕒</span>
              <h2 className="text-xl font-bold text-stone-800">Recent Contributions</h2>
            </div>
            <ul className="divide-y divide-stone-100">
              {recentContributions.map((c) => (
                <li key={c.id} className="py-3 flex justify-between items-center">
                  <span className="font-medium text-stone-700">{c.member_name}</span>
                  <span className="text-stone-500 text-sm">
                    {formatCurrency(c.amount)} – {c.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;