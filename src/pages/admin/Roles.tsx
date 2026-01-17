// import { useEffect, useState } from "react";
// import { Plus, Edit, Trash2, Search, X, Shield } from "lucide-react";
// import { getroles } from "../../utils/getapis";

// export default function Roles() {
//   const [roles, setRoles] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editingRole, setEditingRole] = useState<any | null>(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     status: 1 as 0 | 1,
//   });

//   /** 🔹 Load Roles */
//   useEffect(() => {
//     loadRoles();
//   }, []);

//   const loadRoles = async () => {
//     try {
//       const data = await getroles();
//       setRoles(data);
//     } catch (error) {
//       console.error("Failed to load roles", error);
//     }
//   };

//   const filteredRoles = roles.filter((role) =>
//     role.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   /** 🔹 Add */
//   const handleAddRole = () => {
//     setEditingRole(null);
//     setFormData({ name: "", description: "", status: 1 });
//     setShowModal(true);
//   };

//   /** 🔹 Edit */
//   const handleEditRole = (role: any) => {
//     setEditingRole(role);
//     setFormData({
//       name: role.name,
//       description: role.Descrption,
//       status: role.status,
//     });
//     setShowModal(true);
//   };

//   /** 🔹 Toggle Active / Inactive */
//   const handleToggleStatus = (id: string) => {
//     setRoles((prev) =>
//       prev.map((r) =>
//         r.id === id ? { ...r, status: r.status === 1 ? 0 : 1 } : r
//       )
//     );

//     // 👉 Optional: Call update status API here
//     // updateRoleStatus(id, newStatus)
//   };

//   /** 🔹 Delete (UI only – hook API later) */
//   const handleDeleteRole = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this role?")) return;

//     setRoles((prev) => prev.filter((r) => r.id !== id));

//     // 👉 deleteRole(id)
//   };

//   /** 🔹 Save / Update */
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = {
//       name: formData.name,
//       description: formData.description,
//       status: formData.status, // 0 / 1
//     };

//     if (editingRole) {
//       // 👉 call update role API
//       // await updateRole(editingRole.id, payload)

//       setRoles((prev) =>
//         prev.map((r) =>
//           r.id === editingRole.id ? { ...r, ...payload } : r
//         )
//       );
//     } else {
//       // 👉 call create role API
//       // const savedRole = await createRole(payload)

//       const tempRole: any = {
//         id: crypto.randomUUID(),
//         ...payload,
//       };

//       setRoles((prev) => [...prev, tempRole]);
//     }

//     setShowModal(false);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Search + Add */}
//       <div className="flex flex-col sm:flex-row justify-between gap-4">
//         <div className="relative flex-1 max-w-md">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search roles..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border rounded-lg"
//           />
//         </div>
//         <button
//           onClick={handleAddRole}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           <Plus size={18} />
//           Add Role
//         </button>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredRoles.map((role) => (
//           <div key={role.id} className="bg-white rounded-xl border p-6">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex-1">
//                 <h3 className="text-lg font-bold text-gray-900 mb-2">{role.name}</h3>
//                 <p className="text-sm text-gray-600">{role.Descrption}</p>
//               </div>

//               <span
//                 className={`px-3 py-1 text-xs font-medium rounded-full ${role.active === 1
//                   ? 'bg-green-100 text-green-800'
//                   : 'bg-gray-200 text-gray-800'
//                   }`}
//               >
//                 {role.active === 1 ? 'active' : 'inactive'}
//               </span>
//             </div>



//             <div className="flex gap-2 pt-4 border-t mt-4">
//               <button
//                 onClick={() => handleEditRole(role)}
//                 className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
//               >
//                 <Edit className="w-4 h-4" />
//                 <span>Edit</span>
//               </button>
//               <button
//                 onClick={() => handleDeleteRole(role.id)}
//                 className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 <span>Delete</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white rounded-xl w-full max-w-md">
//             <div className="flex justify-between p-6 border-b">
//               <h2 className="font-bold text-lg">
//                 {editingRole ? "Edit Role" : "Add Role"}
//               </h2>
//               <button onClick={() => setShowModal(false)}>
//                 <X />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-4">
//               <input
//                 placeholder="Role Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="w-full border px-4 py-2 rounded-lg"
//                 required
//               />

//               <textarea
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//                 className="w-full border px-4 py-2 rounded-lg"
//                 required
//               />

//               <select
//                 value={formData.status}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     status: Number(e.target.value) as 0 | 1,
//                   })
//                 }
//                 className="w-full border px-4 py-2 rounded-lg"
//               >
//                 <option value={1}>Active</option>
//                 <option value={0}>Inactive</option>
//               </select>

//               <div className="flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="border px-4 py-2 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   {editingRole ? "Update" : "Save"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import { Plus, Edit, Trash2, Search, X, Shield } from 'lucide-react';
import { mockRoles, Role } from '../../data/mockData';

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
  });

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '', status: 'active' });
    setShowModal(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      status: role.status,
    });
    setShowModal(true);
  };

  const handleDeleteRole = (id: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter((r) => r.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setRoles(
      roles.map((r) =>
        r.id === id ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRole) {
      setRoles(
        roles.map((r) =>
          r.id === editingRole.id ? { ...r, ...formData } : r
        )
      );
    } else {
      const newRole: Role = {
        id: String(roles.length + 1),
        ...formData,
      };
      setRoles([...roles, newRole]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleAddRole}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Role</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div key={role.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 capitalize">{role.name}</h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <button
                onClick={() => handleToggleStatus(role.id)}
                className={`w-full px-3 py-2 text-sm font-medium rounded-lg ${
                  role.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {role.status}
              </button>
            </div>
            <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingRole ? 'Edit Role' : 'Add New Role'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {editingRole ? 'Update Role' : 'Add Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
