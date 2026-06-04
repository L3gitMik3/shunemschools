import { useState, useEffect, useCallback } from "react";

// 🔧 Change this to your Alwaysdata Flask API URL
const BASE_URL = "https://michaelhyrax.alwaysdata.net/api";

const AdminPanel = () => {
  // ----- Group info (set by GroupSetup page) -----
  const groupId = Number(localStorage.getItem("groupId"));
  const groupName = localStorage.getItem("groupName") || "Your Group";
  
  // ----- Tabs -----
  const [activeTab, setActiveTab] = useState("members");

  // ----- Data states -----
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({
    total_contributions: 0,
    fully_contributed_count: 0,
    target_amount: 5000,
    recent_contributions: [],
  });
  const [loading, setLoading] = useState(false);

  // ----- Member forms -----
  const [newMember, setNewMember] = useState({ name: "", phone: "" });
  const [editMemberId, setEditMemberId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", phone: "" });
  const [editTarget, setEditTarget] = useState(false);
  const [newTarget, setNewTarget] = useState("");


  // ----- Contribution form -----
  const [contribution, setContribution] = useState({
    member_id: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });

  // ===================== DATA FETCHING =====================
  const fetchMembers = useCallback(async () => {
    if (!groupId) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/groups/${groupId}/members`);
      if (!res.ok) throw new Error("Failed to fetch members");
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const handleUpdateTarget = async (e) => {
  e.preventDefault();
  if (!newTarget || isNaN(newTarget) || Number(newTarget) <= 0) return;
  try {
    const res = await fetch(`${BASE_URL}/groups/${groupId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target_amount: Number(newTarget) }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update target");
    }
    const data = await res.json();
    setStats(prev => ({ ...prev, target_amount: data.target_amount }));
    setEditTarget(false);
    setNewTarget("");
    fetchDashboard(); // optional refresh
  } catch (err) {
    alert(err.message);
  }
};

  const fetchDashboard = useCallback(async () => {
    if (!groupId) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/groups/${groupId}/dashboard`);
      if (!res.ok) throw new Error("Failed to fetch dashboard");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    if (activeTab === "members") fetchMembers();
    if (activeTab === "dashboard") fetchDashboard();
    if (activeTab === "record") fetchMembers(); // for dropdown
  }, [activeTab, fetchMembers, fetchDashboard]);

  // ===================== MEMBER ACTIONS =====================
  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMember.name.trim() || !newMember.phone.trim()) return;
    try {
      const res = await fetch(`${BASE_URL}/groups/${groupId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add member");
      }
      setNewMember({ name: "", phone: "" });
      fetchMembers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditClick = (member) => {
    setEditMemberId(member.id);
    setEditForm({ name: member.name, phone: member.phone });
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/members/${editMemberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name,
          phone: editForm.phone,
          group_id: groupId,   // required by your API for ownership check
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Update failed");
      }
      setEditMemberId(null);
      fetchMembers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      const res = await fetch(`${BASE_URL}/members/${memberId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group_id: groupId }),   // required by your API
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Delete failed");
      }
      fetchMembers();
    } catch (err) {
      alert(err.message);
    }
  };

  // ===================== CONTRIBUTION =====================
  const handleRecordContribution = async (e) => {
    e.preventDefault();
    if (!contribution.member_id || !contribution.amount) return;
    try {
      const res = await fetch(`${BASE_URL}/contributions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          member_id: Number(contribution.member_id),
          amount: Number(contribution.amount),
          date: contribution.date,
          group_id: groupId,   // required by your API
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to record contribution");
      }
      setContribution({
        member_id: "",
        amount: "",
        date: new Date().toISOString().slice(0, 10),
      });
      fetchDashboard();
      fetchMembers();   // optional refresh
    } catch (err) {
      alert(err.message);
    }
  };

  // ===================== STYLES =====================
  const tabBase =
    "px-4 py-2 text-sm font-medium rounded-t-md transition-colors";
  const activeClass =
    "bg-white text-blue-600 border-t border-l border-r border-gray-200";
  const inactiveClass = "bg-gray-100 text-gray-600 hover:bg-gray-200";

  // If no group loaded (should not happen if GroupSetup worked)
  if (!groupId) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <p className="text-red-500">No group selected. Please set up your group first.</p>
        <a href="/" className="text-blue-600 underline">Go to setup</a>
      </div>
    );
  }

  // ===================== RENDER =====================
  return (
    <div className="max-w-6xl mx-auto p-6">

       
       <div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold text-gray-800">
    {groupName} – Admin Panel
  </h2>
  <div className="flex items-center gap-2 text-sm text-gray-500">
    Target per member:{" "}
    {editTarget ? (
      <form onSubmit={handleUpdateTarget} className="flex items-center gap-1">
        <input
          type="number"
          value={newTarget}
          onChange={(e) => setNewTarget(e.target.value)}
          className="w-20 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="e.g. 5000"
          min="1"
        />
        <button type="submit" className="text-green-600 hover:text-green-800 font-medium">
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditTarget(false)}
          className="text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </form>
    ) : (
      <>
        <span className="font-semibold">Ksh {stats.target_amount.toLocaleString()}</span>
        <button
          onClick={() => {
            setNewTarget(stats.target_amount.toString());
            setEditTarget(true);
          }}
          className="text-blue-600 hover:text-blue-800 ml-1"
        >
          ✏️
        </button>
      </>
    )}
          </div>
      
</div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`${tabBase} ${activeTab === "members" ? activeClass : inactiveClass}`}
          onClick={() => setActiveTab("members")}
        >
          Members
        </button>
        <button
          className={`${tabBase} ${activeTab === "record" ? activeClass : inactiveClass}`}
          onClick={() => setActiveTab("record")}
        >
          Record Contribution
        </button>
        <button
          className={`${tabBase} ${activeTab === "dashboard" ? activeClass : inactiveClass}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
      </div>

      {/* Tab content */}
      <div className="bg-white border-l border-r border-b border-gray-200 rounded-b-md p-6">
        {loading && <p className="text-gray-500 mb-4">Loading...</p>}

        {/* ===== MEMBERS TAB ===== */}
        {activeTab === "members" && (
          <div>
            {/* Add member form */}
            <form onSubmit={handleAddMember} className="mb-6 flex flex-wrap gap-3 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  required
                  className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone (254…)</label>
                <input
                  type="text"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  required
                  className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add Member
              </button>
            </form>

            {/* Members table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {editMemberId === member.id ? (
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        ) : (
                          member.name
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {editMemberId === member.id ? (
                          <input
                            type="text"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        ) : (
                          member.phone
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        {editMemberId === member.id ? (
                          <>
                            <button className="text-green-600 hover:text-green-900" onClick={handleUpdateMember}>
                              Save
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-900"
                              onClick={() => setEditMemberId(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => handleEditClick(member)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDeleteMember(member.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {members.length === 0 && !loading && (
                    <tr>
                      <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                        No members yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== RECORD CONTRIBUTION TAB ===== */}
        {activeTab === "record" && (
          <div>
            <form onSubmit={handleRecordContribution} className="max-w-md space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Member</label>
                <select
                  value={contribution.member_id}
                  onChange={(e) => setContribution({ ...contribution, member_id: e.target.value })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">-- Choose member --</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.phone})
                    </option>
                  ))}
                </select>
                {members.length === 0 && (
                  <p className="mt-1 text-sm text-yellow-600">
                    ⚠️ No members yet. Add them in the Members tab first.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (Ksh)</label>
                <input
                  type="number"
                  value={contribution.amount}
                  onChange={(e) => setContribution({ ...contribution, amount: e.target.value })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={contribution.date}
                  onChange={(e) => setContribution({ ...contribution, date: e.target.value })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Record Contribution
              </button>
            </form>
          </div>
        )}

        {/* ===== DASHBOARD TAB ===== */}
        {activeTab === "dashboard" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-blue-800">Total Contributions</h3>
                <p className="mt-2 text-3xl font-bold text-blue-900">
                  Ksh {stats.total_contributions.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-green-800">Fully Contributed</h3>
                <p className="mt-2 text-3xl font-bold text-green-900">
                  {stats.fully_contributed_count} / {members.length}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Recent Contributions</h4>
              {stats.recent_contributions.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {stats.recent_contributions.map((c, idx) => (
                    <li key={idx} className="py-2 flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{c.member_name}</span>
                      <span className="text-gray-500">
                        Ksh {c.amount} — {c.date}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No contributions recorded yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;