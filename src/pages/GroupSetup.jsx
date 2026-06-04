import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupSetup = () => {
  const [groupName, setGroupName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName.trim() || !createdBy.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://michaelhyrax.alwaysdata.net/api/groups",  // ← your actual API URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: groupName.trim(),
            created_by: createdBy.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Save group info for the admin panel
      localStorage.setItem("groupId", data.id);
      localStorage.setItem("groupName", data.name);

      // Redirect to admin panel
      navigate("/adminpanel");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome to Contribution Tracker
        </h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Chama Yetu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Alice Okello"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Enter Admin Panel"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          Existing groups are automatically loaded. New groups will be created
          instantly.
        </p>
      </div>
    </div>
  );
};

export default GroupSetup;