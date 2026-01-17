import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, X, Shield } from "lucide-react";
import { getroles } from "../../utils/getapis";

export default function Roles() {
  const [roles, setRoles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: 1 as 0 | 1,
  });

  /** 🔹 Load Roles */
  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const data = await getroles();
      setRoles(data);
    } catch (error) {
      console.error("Failed to load roles", error);
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /** 🔹 Add */
  const handleAddRole = () => {
    setEditingRole(null);
    setFormData({ name: "", description: "", status: 1 });
    setShowModal(true);
  };

  /** 🔹 Edit */
  const handleEditRole = (role: any) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.Descrption,
      status: role.status,
    });
    setShowModal(true);
  };

  /** 🔹 Toggle Active / Inactive */
  const handleToggleStatus = (id: string) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === 1 ? 0 : 1 } : r
      )
    );

    // 👉 Optional: Call update status API here
    // updateRoleStatus(id, newStatus)
  };

  /** 🔹 Delete (UI only – hook API later) */
  const handleDeleteRole = async (id: string) => {
    if (!confirm("Are you sure you want to delete this role?")) return;

    setRoles((prev) => prev.filter((r) => r.id !== id));

    // 👉 deleteRole(id)
  };

  /** 🔹 Save / Update */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: formData.description,
      status: formData.status, // 0 / 1
    };

    if (editingRole) {
      // 👉 call update role API
      // await updateRole(editingRole.id, payload)

      setRoles((prev) =>
        prev.map((r) =>
          r.id === editingRole.id ? { ...r, ...payload } : r
        )
      );
    } else {
      // 👉 call create role API
      // const savedRole = await createRole(payload)

      const tempRole: any = {
        id: crypto.randomUUID(),
        ...payload,
      };

      setRoles((prev) => [...prev, tempRole]);
    }

    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Search + Add */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleAddRole}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Role
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div key={role.id} className="bg-white rounded-xl border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{role.name}</h3>
                <p className="text-sm text-gray-600">{role.Descrption}</p>
              </div>

              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${role.active === 1
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-200 text-gray-800'
                  }`}
              >
                {role.active === 1 ? 'active' : 'inactive'}
              </span>
            </div>



            <div className="flex gap-2 pt-4 border-t mt-4">
              <button
                onClick={() => handleEditRole(role)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDeleteRole(role.id)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex justify-between p-6 border-b">
              <h2 className="font-bold text-lg">
                {editingRole ? "Edit Role" : "Add Role"}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input
                placeholder="Role Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-lg"
                required
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-lg"
                required
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: Number(e.target.value) as 0 | 1,
                  })
                }
                className="w-full border px-4 py-2 rounded-lg"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {editingRole ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
