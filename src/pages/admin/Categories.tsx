// import { useEffect, useState } from 'react';
// import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
// import { getcategories } from '../../utils/getapis';
// import { Savecategories } from '../../utils/setapis';
// import toast from 'react-hot-toast';


// export default function Categories() {
//   const [categories, setCategories] = useState<any[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editingCategory, setEditingCategory] = useState<any | null>(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     is_active: 1
//   });

//   /* ===============================
//      LOAD CATEGORIES
//      =============================== */
//   const loadCategories = async () => {
//     try {
//       const data = await getcategories();
//       setCategories(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   /* ===============================
//      HANDLERS
//      =============================== */
//   const handleAddCategory = () => {
//     setEditingCategory(null);
//     setFormData({ name: '', description: '', is_active: 1 });
//     setShowModal(true);
//   };

//   const handleEditCategory = (category: any) => {
//     setEditingCategory(category);
//     setFormData({
//       name: category.name,
//       description: category.description,
//       is_active: category.is_active
//     });
//     setShowModal(true);
//   };

//   const handleDeleteCategory = async (id: number) => {
//     if (!confirm('Are you sure you want to delete this category?')) return;

//     try {
//       const res = await Savecategories({
//         flag: 'D',
//         id
//       });

//       if (res.status === 1) {
//         toast.success(res.message);
//         loadCategories();
//       } else {
//         toast.error(res.message);
//       }
//     } catch {
//       toast.error('Failed to delete category');
//     }
//   };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = {
//       flag: editingCategory ? 'U' : 'I',
//       id: editingCategory?.id ?? null,
//       name: formData.name,
//       description: formData.description,
//       parent_id: null,
//       is_active: formData.is_active
//     };

//     try {
//       const res = await Savecategories(payload);

//       if (res.status === 1) {
//         toast.success(res.message);
//         setShowModal(false);
//         loadCategories();
//       } else {
//         toast.error(res.message);
//       }
//     } catch (err) {
//       toast.error('Something went wrong while saving category');
//     }
//   };


//   /* ===============================
//      FILTER
//      =============================== */
//   const filteredCategories = categories.filter((c) =>
//     c.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">

//       {/* Search & Add */}
//       <div className="flex flex-col sm:flex-row justify-between gap-4">
//         <div className="relative max-w-md w-full">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search categories..."
//             className="w-full pl-10 pr-4 py-2 border rounded-lg"
//           />
//         </div>

//         <button
//           onClick={handleAddCategory}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           <Plus size={18} /> Add Category
//         </button>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredCategories.map((category) => (
//           <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex-1">
//                 <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
//                 <p className="text-sm text-gray-600">{category.description}</p>
//               </div>

//               <span
//                 className={`px-3 py-1 text-xs font-medium rounded-full ${category.is_active === 1
//                     ? 'bg-green-100 text-green-800'
//                     : 'bg-gray-200 text-gray-800'
//                   }`}
//               >
//                 {category.is_active === 1 ? 'active' : 'inactive'}
//               </span>
//             </div>

//             <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
//               <button
//                 onClick={() => handleEditCategory(category)}
//                 className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
//               >
//                 <Edit className="w-4 h-4" />
//                 <span>Edit</span>
//               </button>

//               <button
//                 onClick={() => handleDeleteCategory(category.id)}
//                 className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 <span>Delete</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full">

//             <div className="flex items-center justify-between p-6 border-b border-gray-200">
//               <h2 className="text-xl font-bold text-gray-900">
//                 {editingCategory ? 'Edit Category' : 'Add Category'}
//               </h2>
//               <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-4">
//               <input
//                 required
//                 placeholder="Category Name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full border px-4 py-2 rounded-lg"
//               />

//               <textarea
//                 required
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 className="w-full border px-4 py-2 rounded-lg"
//               />

//               <select
//                 value={formData.is_active}
//                 onChange={(e) => setFormData({ ...formData, is_active: Number(e.target.value) })}
//                 className="w-full border px-4 py-2 rounded-lg"
//               >
//                 <option value={1}>Active</option>
//                 <option value={0}>Inactive</option>
//               </select>

//               <div className="flex justify-end gap-3 pt-4">
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
//                   Save
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
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { mockCategories, Category } from '../../data/mockData';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
  });

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', status: 'active' });
    setShowModal(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
    });
    setShowModal(true);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setCategories(
      categories.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id ? { ...c, ...formData } : c
        )
      );
    } else {
      const newCategory: Category = {
        id: String(categories.length + 1),
        ...formData,
      };
      setCategories([...categories, newCategory]);
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
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleAddCategory}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
              <button
                onClick={() => handleToggleStatus(category.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {category.status}
              </button>
            </div>
            <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleEditCategory(category)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
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
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
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
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
