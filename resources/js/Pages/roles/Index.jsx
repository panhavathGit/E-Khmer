import Layout from "@/Layouts/Layout.jsx";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import CreateRole from "./create.jsx";
import EditRoleModal from "./edit.jsx";

const ListRoles = ({ roles, permissions }) => {
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [editRole, setEditRole] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete?")) {
            router.delete(`/roles/delete/${id}`);
        }
    };

    return (
        <div className="mx-5">
            <div className="flex justify-between my-6">
                <h2 className="text-2xl">All Roles</h2>
                <button
                    type="button"
                    onClick={() => setShowRoleModal(true)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                    Create Role
                </button>
            </div>
            <div className="relative">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Guard</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.data.map((role) => {
                            return (
                                <tr key={role.id} className="bg-white border-b">
                                    <td className="px-6 py-4">{role.id}</td>
                                    <td className="px-6 py-4">{role.name}</td>
                                    <td className="px-6 py-4">
                                        {role.guard_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => setEditRole(role)} // ✅ OPEN EDIT MODAL
                                            className="bg-green-500 text-white rounded-lg hover:bg-green-700 font-medium px-2 py-1 mx-2"
                                        >
                                            Edit
                                        </button>
                                        <a
                                            href="#"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                handleDelete(role.id);
                                            }}
                                            className="bg-red-400 text-white rounded-lg hover:bg-red-800 focus:ring-4 font-medium px-2 py-1 mx-2"
                                        >
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {showRoleModal && (
                <CreateRole
                    permissions={permissions}
                    onClose={() => setShowRoleModal(false)}
                />
            )}

            {editRole && (
                <EditRoleModal
                    role={editRole}
                    permissions={permissions}
                    isOpen={!!editRole} // ✅ isOpen is true when a role is selected
                    onClose={() => setEditRole(null)} // ✅ close modal function
                />
            )}
        </div>
    );
};
ListRoles.layout = (page) => <Layout children={page} title="Welcome" />;
export default ListRoles;
