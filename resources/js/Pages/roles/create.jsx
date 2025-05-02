import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function CreateRole({ permissions, onClose }){
    const { errors } = usePage().props;
    const [form, setForm] = useState({ name: '', permissions: [] });

    const handleSubmit = e => {
        e.preventDefault();
        router.post("/roles/create", form, {
            onSuccess: () => {
                if (onClose) onClose();
            }
        });
    };

    const handleSelectPermission = e => {
        const value = e.target.value;
        if (e.target.checked) {
            if (!form.permissions.includes(value)) {
                setForm({ ...form, permissions: [...form.permissions, value] });
            }
        } else {
            setForm({ ...form, permissions: form.permissions.filter(p => p !== value) });
        }
    };

    return (
        <>
            <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">Create Role</h3>
                            <button type="button" onClick={onClose}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-4 md:p-5">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Role Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    {errors.name && <div className="text-sm mt-1 text-red-600">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Permissions</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {permissions.map(permission => (
                                            <div key={permission.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="permissions"
                                                    value={permission.id}
                                                    id={permission.name}
                                                    onChange={handleSelectPermission}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                />
                                                <label htmlFor={permission.name}
                                                    className="ml-2 text-sm font-medium text-gray-900">{permission.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end space-x-2">
                                    <button type="button" onClick={onClose}
                                        className="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200">
                                        Cancel
                                    </button>
                                    <button type="submit"
                                        className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <div className="bg-gray-900/50 fixed inset-0 z-40"></div>
        </>
    );
}
