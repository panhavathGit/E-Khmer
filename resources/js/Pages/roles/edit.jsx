// resources/js/Components/EditRoleModal.jsx
import React, { useEffect, useState } from "react";
import { router, usePage } from '@inertiajs/react';

export default function EditRoleModal({ role, permissions, isOpen, onClose }) {
    const { errors } = usePage().props;
    const [form, setForm] = useState({ name: '', permissions: [] });

    // useEffect(() => {
    //     if (role) {
    //         setForm({
    //             name: role.name,
    //             permissions: role.permissions.map(p => p.id)
    //         });
    //     }
    // }, [role]);
    useEffect(() => {
        if (role) {
            setForm({
                name: role.name || '',
                permissions: Array.isArray(role.permissions)
                    ? role.permissions.map(p => p.id)
                    : []
            });
        }
    }, [role]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/roles/update/${role.id}`, form, {
            onSuccess: () => onClose() // Close modal on success
        });
    };

    const handleSelectPermission = (e) => {
        const value = parseInt(e.target.value);
        if (e.target.checked) {
            setForm({ ...form, permissions: [...form.permissions, value] });
        } else {
            setForm({ ...form, permissions: form.permissions.filter(p => p !== value) });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full">
                <h2 className="text-xl font-semibold mb-4">Edit Role #{role.id}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Permissions</h3>
                        <div className="grid grid-cols-2 gap-2">
    {permissions.map((permission) => (
        <label key={permission.id} className="flex items-center space-x-2">
            <input
                type="checkbox"
                value={permission.id}
                
                checked={form.permissions.includes(Number(permission.id))}

                onChange={handleSelectPermission}
                className="form-checkbox"
            />
            <span>{permission.name}</span>
        </label>
    ))}
</div>

                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
