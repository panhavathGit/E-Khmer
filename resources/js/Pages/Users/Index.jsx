import Layout from "@/Layouts/Layout.jsx";
import { router, usePage  } from "@inertiajs/react";
import { useState } from "react";
import EditUserModal from "../Users/EditUserModal";
// import { usePage } from "@inertiajs/inertia-react";

const ListUsers = ({ users, roles }) => {
    const [selectedUser, setSelectedUser] = useState(null);

    const { auth } = usePage().props;
    const can = auth?.can ?? {};
    console.log("my log: ", can);
    
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete?")) {
            router.delete(`/users/${id}`);
        }
    };

    return (
        <div className="mx-5">
            <div className="flex justify-between my-6">
                <h2 className="text-2xl">All Users</h2>
            </div>
            <div className="relative">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user) => (
                            <tr key={user.id} className="bg-white border-b">
                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => setSelectedUser(user)}
                                        className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    roles={roles}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
};

ListUsers.layout = (page) => <Layout children={page} title="Users" />;
export default ListUsers;
